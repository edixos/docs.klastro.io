// Fails the build when a page exists in one locale but not the other.
//
// Starlight silently falls back to the default locale for a missing
// translation, so an English reader would land on French text (or the reverse)
// with nothing in CI to say so. Every page ships in both languages.
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = 'src/content/docs';
const enRoot = join(root, 'en');

/** Page slugs under `dir`, relative to it, skipping the `skip` subtree. */
const slugs = (dir, skip) =>
	new Set(
		readdirSync(dir, { recursive: true, withFileTypes: true })
			.filter((e) => e.isFile() && /\.mdx?$/.test(e.name))
			.map((e) => join(e.parentPath, e.name))
			.filter((p) => !skip || !p.startsWith(skip + '/'))
			.map((p) => relative(dir, p).replace(/\.mdx?$/, '')),
	);

const fr = slugs(root, enRoot);
const en = slugs(enRoot);

const missing = [
	...[...fr].filter((p) => !en.has(p)).map((p) => `en/${p} (exists in French)`),
	...[...en].filter((p) => !fr.has(p)).map((p) => `${p} (exists in English)`),
];

if (missing.length) {
	console.error(`Missing translations:\n  ${missing.join('\n  ')}`);
	process.exit(1);
}
console.log(`Locales in sync: ${fr.size} pages in each.`);
