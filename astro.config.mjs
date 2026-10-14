// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

// French owns the root, English lives under /en — the same split as the
// klastro.io marketing site, so a visitor who lands on one keeps their language
// on the other. Every page exists in both locales under the same slug.
//
// Sidebar groups autogenerate from their directory; order inside a group comes
// from each page's `sidebar.order` frontmatter. Only the group labels are
// declared here, once per locale.
/** @param {string} fr @param {string} en @param {string} directory */
const group = (fr, en, directory) => ({
	label: fr,
	translations: { en },
	items: [{ autogenerate: { directory } }],
});

export default defineConfig({
	site: 'https://docs.klastro.io',
	integrations: [
		starlight({
			title: 'Klastro Docs',
			description:
				'Documentation utilisateur de Klastro : labs, évaluations techniques, formations et Scenario Studio.',
			logo: {
				light: './src/assets/logo-light.png',
				dark: './src/assets/logo-dark.png',
				replacesTitle: true,
			},
			favicon: '/favicon.ico',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Français', lang: 'fr' },
				en: { label: 'English', lang: 'en' },
			},
			social: [
				{ icon: 'external', label: 'app.klastro.io', href: 'https://app.klastro.io' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/edixos/docs.klastro.io' },
			],
			editLink: {
				baseUrl: 'https://github.com/edixos/docs.klastro.io/edit/main/',
			},
			lastUpdated: true,
			// Same three families as klastro.io, self-hosted (CSP font-src 'self').
			customCss: [
				'@fontsource/space-grotesk/400.css',
				'@fontsource/space-grotesk/500.css',
				'@fontsource/space-grotesk/600.css',
				'@fontsource/space-grotesk/700.css',
				'@fontsource-variable/bricolage-grotesque/wght.css',
				'@fontsource/source-code-pro/400.css',
				'@fontsource/source-code-pro/500.css',
				'@fontsource/source-code-pro/600.css',
				'./src/styles/custom.css',
			],
			expressiveCode: {
				styleOverrides: {
					borderRadius: '0.625rem',
					codeFontFamily: "'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, monospace",
					uiFontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
					codeFontSize: '0.875rem',
					codeLineHeight: '1.65',
				},
			},
			sidebar: [
				group('Premiers pas', 'Getting started', 'getting-started'),
				group('Candidats et apprenants', 'Candidates & learners', 'learners'),
				group('Environnement de lab', 'Lab experience', 'lab'),
				group('Recruteurs', 'Recruiters & hiring managers', 'recruiters'),
				group('Formateurs et auteurs', 'Instructors & authors', 'instructors'),
				group('Administration', 'Organization admins', 'admins'),
				group('Facturation et crédits', 'Billing & credits', 'billing'),
				group('Support', 'Support', 'support'),
				group('Intégrations IA (MCP)', 'AI integrations (MCP)', 'mcp'),
				group('FAQ et dépannage', 'FAQ & troubleshooting', 'troubleshooting'),
			],
			plugins: [starlightLinksValidator()],
		}),
	],
});
