import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	// IGNORAR diretórios pesados
	{
		ignores: [
			'**/node_modules/**',
			'**/.git/**',
			'**/.next/**',
			'**/out/**',
			'**/dist/**',
			'**/build/**',
			'**/coverage/**',
			'**/.turbo/**',
			'**/.cache/**',
			'**/public/**',
			'**/storybook-static/**',
			'src/generated/**',
		],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.recommended,

	// React
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			'react/self-closing-comp': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/no-unknown-property': 'error',
		},
	},

	// React hooks
	pluginReactHooks.configs['recommended-latest'],

	// Accessibility
	{
		plugins: {
			'jsx-a11y': pluginJsxA11y,
		},
		rules: {
			'jsx-a11y/alt-text': [
				'warn',
				{ elements: ['img'], img: ['Image'] },
			],
			'jsx-a11y/aria-props': 'warn',
			'jsx-a11y/aria-proptypes': 'warn',
			'jsx-a11y/aria-unsupported-elements': 'warn',
			'jsx-a11y/role-has-required-aria-props': 'warn',
			'jsx-a11y/role-supports-aria-props': 'warn',
		},
	},

	// Prettier
	{
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					printWidth: 80,
					tabWidth: 4,
					singleQuote: true,
					trailingComma: 'all',
					quoteProps: 'as-needed',
					arrowParens: 'always',
					semi: true,
					endOfLine: 'auto',
					useTabs: true,
					jsxSingleQuote: false,

					plugins: ['prettier-plugin-tailwindcss'],
				},
			],
		},
	},

	// Import auto sorting
	{
		plugins: {
			'simple-import-sort': pluginSimpleImportSort,
		},
		rules: {
			'simple-import-sort/exports': 'error',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Imports com caracteres especiais, como imports de side effects
						['^\\u0000'],

						// Imports dos frameworks principais, como React e Next.js
						['^react$', '^next'],

						// Imports de pacotes de terceiros
						['^@?\\w', 'next-bricks'],

						// Imports organizados por estrutura de projeto e pacotes de terceiros
						[
							// Imports de módulos internos do projeto, como utils, components, etc.
							'^(utils|hooks|types|contexts|components|middlewares|services|styles|config|constants|controllers|helpers|icons|layouts|models|views|theme|themes)(/.*|$)',
							// Imports com path aliases (começando com '@/')
							'^@(/.*|$)',
						],

						// Imports relativos (começando com './' ou '../')
						[
							'^\\.',
							'^\\.\\.(?!/?$)',
							'^\\.\\./?$',
							'^\\./(?=.*/)(?!/?$)',
							'^\\./?$',
						],

						// Imports de arquivos estáticos
						['^(assets)(/.*|$)'],

						// Imports de estilização
						['^./styles', '^./.*\\.css$', '^./.*\\.scss$'],

						// Imports absolutos não cobertos pelos grupos anteriores
						['^[^.]'],

						// Grupo geral de captura para qualquer coisa não capturada anteriormente
						['^'],
					],
				},
			],
		},
	},

	// Remove unused vars e imports
	{
		plugins: {
			'unused-imports': pluginUnusedImports,
		},
		rules: {
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},

	// Others rules
	{
		rules: {
			'no-empty-pattern': 'off',
			'prefer-const': 'error',
			// só exige uma linha em branco após o bloco de imports
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: 'directive', next: '*' },
				{ blankLine: 'any', prev: 'directive', next: 'directive' },
				{ blankLine: 'always', prev: 'import', next: '*' },
				{ blankLine: 'any', prev: 'import', next: 'import' },
			],
		},
	},
]);
