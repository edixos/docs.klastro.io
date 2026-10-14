/**
 * French typography lint for the French pages, ported from klastro.io's
 * scripts/check-copy.mjs so docs and marketing follow one rule set:
 *
 *   - narrow no-break space (U+202F) before `: ? ! ; »` and `€`, and after `«`.
 *     A plain space there is a spelling error in French and lets the line break
 *     between the word and its punctuation;
 *   - no U+00A0 (visibly too wide next to a colon at body size);
 *   - typographic apostrophe (U+2019), never a straight one between letters;
 *   - no double space inside a sentence.
 *
 * Only prose is checked. Fenced code, inline code, link targets, URLs, HTML/JSX
 * tags, MDX expressions, imports, aside directives and table separator rows are
 * masked out, because a `:` or `'` there is syntax, not typography.
 *
 * `node scripts/check-copy.mjs --fix` rewrites the files in place.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'src/content/docs';
const FIX = process.argv.includes('--fix');
const NNBSP = ' ';
const NBSP = ' ';

// Spans inside a prose line that must never be touched.
const PROTECTED = /(`[^`]*`|\]\([^)]*\)|<[^>]*>|\{[^}]*\}|https?:\/\/\S+)/;

/** French pages: everything under the docs root except the `en/` mirror. */
const files = readdirSync(ROOT, { recursive: true, withFileTypes: true })
	.filter((e) => e.isFile() && /\.mdx?$/.test(e.name))
	.map((e) => join(e.parentPath, e.name))
	.filter((p) => !relative(ROOT, p).startsWith('en/'));

const fixProse = (text) =>
	text
		.replaceAll(NBSP, NNBSP)
		.replace(/ ([?!;:»€])/g, `${NNBSP}$1`)
		.replace(/« /g, `«${NNBSP}`)
		.replace(/(\p{L})'(\p{L})/gu, '$1’$2')
		.replace(/(\S) {2,}(?=\S)/g, '$1 ');

const fixLine = (line) =>
	line
		.split(PROTECTED)
		.map((part, i) => (i % 2 === 1 ? part : fixProse(part)))
		.join('');

const failures = [];

for (const file of files) {
	const lines = readFileSync(file, 'utf8').split('\n');
	let inFence = false;
	let frontmatterFences = 0;
	let changed = false;

	const out = lines.map((line, n) => {
		if (line.trim() === '---' && frontmatterFences < 2 && (n === 0 || frontmatterFences === 1)) {
			frontmatterFences++;
			return line;
		}
		if (/^\s*(```|~~~)/.test(line)) {
			inFence = !inFence;
			return line;
		}
		const skip =
			inFence ||
			/^\s*(import|export)\s/.test(line) ||
			/^\s*:::/.test(line) ||
			/^\s*\|?[\s:|-]+\|?\s*$/.test(line);
		if (skip) return line;

		const fixed = fixLine(line);
		if (fixed !== line) {
			changed = true;
			failures.push(`${file}:${n + 1}: ${line.trim().slice(0, 90)}`);
		}
		return fixed;
	});

	if (FIX && changed) writeFileSync(file, out.join('\n'));
}

if (failures.length && !FIX) {
	console.error(`\n✗ French typography check failed (${failures.length} lines):\n`);
	for (const f of failures.slice(0, 40)) console.error(`  • ${f}`);
	if (failures.length > 40) console.error(`  … and ${failures.length - 40} more`);
	console.error('\nRun `node scripts/check-copy.mjs --fix` to correct them.\n');
	process.exit(1);
}
console.log(
	FIX
		? `✓ French typography fixed on ${failures.length} lines across ${files.length} pages`
		: `✓ French typography verified across ${files.length} pages`,
);
