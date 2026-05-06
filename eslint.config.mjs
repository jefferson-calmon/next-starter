import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

console.log('Loading ESLint configuration...');
// console.log(...nextTs);

export default defineConfig([
	// Next presets
	...nextVitals,
	...nextTs,

	// Ignores (Next + seus diretórios pesados)
	globalIgnores([
		// Default ignores of eslint-config-next
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',

		// Seus ignores
		'**/node_modules/**',
		'**/.git/**',
		'**/dist/**',
		'**/coverage/**',
		'**/.turbo/**',
		'**/.cache/**',
		'**/public/**',
		'**/storybook-static/**',
		'src/generated/**',
	]),

	// Base JS recommended
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
	},

	// Browser globals
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		languageOptions: { globals: globals.browser },
	},

	// TypeScript recommended
	...tseslint.configs.recommended,

	// React
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			'react/self-closing-comp': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/no-unknown-property': 'error',
			// -- Fix overrides
			// 'react/display-name': 'off',
			// 'react/no-direct-mutation-state': 'off',
			// 'react/no-render-return-value': 'off',
			// 'react/no-string-refs': 'off',
			// 'react/require-render-return': 'off',
		},
	},

	// React hooks
	pluginReactHooks.configs.flat['recommended-latest'],

	// Accessibility
	{
		// ...pluginJsxA11y.flatConfigs.recommended,
		rules: {
			...pluginJsxA11y.flatConfigs.recommended.rules,
			'jsx-a11y/aria-role': 'off',
		},
	},

	// Prettier
	{
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			'prettier/prettier': [
				'warn',
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
						['^\\u0000'],
						['^react$', '^next'],
						['^@?\\w', 'next-bricks'],
						[
							'^(utils|hooks|types|contexts|components|middlewares|services|styles|config|constants|controllers|helpers|icons|layouts|models|views|theme|themes)(/.*|$)',
							'^@(/.*|$)',
						],
						[
							'^\\.',
							'^\\.\\.(?!/?$)',
							'^\\.\\./?$',
							'^\\./(?=.*/)(?!/?$)',
							'^\\./?$',
						],
						['^(assets)(/.*|$)'],
						['^./styles', '^./.*\\.css$', '^./.*\\.scss$'],
						['^[^.]'],
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
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: 'directive', next: '*' },
				{ blankLine: 'any', prev: 'directive', next: 'directive' },
				{ blankLine: 'always', prev: 'import', next: '*' },
				{ blankLine: 'any', prev: 'import', next: 'import' },
			],
		},
	},

	{
		settings: {
			react: { version: '19' }, // Avoids auto-detection crash
		},
	},
]);
