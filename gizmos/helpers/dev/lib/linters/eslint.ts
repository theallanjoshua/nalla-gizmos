import antfu from '@antfu/eslint-config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import eslintPluginImportX from 'eslint-plugin-import-x';

export interface SetupESLintProps {
	pathToTSConfigs: string[];
	internalImportsPathAliases: string[];
	productionFilesGlobPattern: string;
	testsDirName?: string;
	disallowedProductionImportsGlobPatterns?: string[];
}

export function setupESlint(props: SetupESLintProps): unknown {
	const {
		pathToTSConfigs,
		internalImportsPathAliases,
		productionFilesGlobPattern,
		testsDirName = '__tests__',
		disallowedProductionImportsGlobPatterns = [],
	} = props;

	return antfu(
		{
			gitignore: true,
			react: true,
			markdown: false,
			stylistic: {
				indent: 'tab',
				quotes: 'single',
				semi: true,
				jsx: false,
			},
			typescript: {
				parserOptions: {
					project: pathToTSConfigs,
				},
				erasableOnly: true,
			},
			test: true,
			overrides: {
				typescript: {
					'ts/prefer-nullish-coalescing': 'error',
					'ts/prefer-optional-chain': 'error',
					'ts/prefer-readonly': 'error',
					'ts/prefer-string-starts-ends-with': 'error', // Use startsWith/endsWith over regex
					'ts/prefer-includes': 'error', // Use includes() over indexOf() !== -1
					'ts/no-unnecessary-condition': 'error', // Remove always true/false conditions
					'ts/no-unnecessary-type-assertion': 'error', // Remove redundant type assertions
					'ts/prefer-reduce-type-parameter': 'error', // Better reduce() typing
					'ts/prefer-return-this-type': 'error', // Better method chaining types
					'ts/switch-exhaustiveness-check': 'error', // Ensure switch covers all cases
					'ts/consistent-generic-constructors': 'error', // Consistent generic syntax
					'ts/no-confusing-void-expression': 'error', // Prevent confusing void usage
				},
				test: {
					'vitest/consistent-test-filename': [
						'error',
						{ pattern: String.raw`.*\/${testsDirName}\/.*\.spec\.ts$` },
					],
					'vitest/require-top-level-describe': 'error',
					'vitest/prefer-lowercase-title': 'off',
					'vitest/consistent-test-it': ['error', { fn: 'it' }],
					'vitest/valid-title': [
						'error',
						{
							mustMatch: {
							// Targets it() blocks
								it: [
									'^SHOULD: .+ WHEN: .+$',
									'Test titles must follow the pattern: \'SHOULD: [action] WHEN: [condition]\'',
								],
							},
						},
					],
					'vitest/no-conditional-expect': 'error', // Prevents conditional assertions
					'vitest/no-conditional-in-test': 'error', // Prevents if/else in tests
					'vitest/prefer-each': 'error', // Suggests using test.each() for similar tests
					'vitest/prefer-to-be': 'error', // Prefer toBe() over toEqual() for primitives
					'vitest/prefer-to-have-length': 'error', // Prefer toHaveLength() over .length checks
					'vitest/prefer-strict-equal': 'error', // Prefer toStrictEqual() over toEqual()
					'vitest/no-commented-out-tests': 'error',
					'vitest/prefer-todo': 'error',
					'vitest/prefer-spy-on': 'error',
					'vitest/prefer-hooks-on-top': 'error',
					'vitest/no-duplicate-hooks': 'error',
					'vitest/consistent-each-for': ['error', { it: 'for' }],
				},
			},
			rules: {
				'unicorn/filename-case': ['error', { case: 'kebabCase' }],
				'perfectionist/sort-imports': [
					'error',
					{
						internalPattern: internalImportsPathAliases,
						newlinesBetween: 0,
					},
				],
				'perfectionist/sort-named-imports': [
					'error',
					{
						type: 'natural',
						order: 'asc',
						newlinesBetween: 0,
						newlinesInside: 0,
						partitionByComment: true,
					},
				],
				'style/padded-blocks': [
					'error',
					'never',
					{
						allowSingleLineBlocks: true,
					},
				],
				'style/object-curly-newline': [
					'error',
					{
						consistent: true,
						multiline: true,
						minProperties: 3,
					},
				],
				'antfu/consistent-list-newline': ['error'],
				'no-warning-comments': 'warn',
				'unicorn/prevent-abbreviations': 'off',
				'unicorn/no-array-reduce': 'off',
				'unicorn/no-array-callback-reference': 'off',
				'style/arrow-parens': ['error', 'always'],
				'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
			},
		},
		{
			files: [productionFilesGlobPattern],
			ignores: [`**/${testsDirName}/**`],
			plugins: {
				'import-x': eslintPluginImportX,
			},
			settings: {
				'import-x/resolver-next': [createTypeScriptImportResolver()],
			},
			rules: {
				'import-x/no-extraneous-dependencies': [
					'error',
					{
						peerDependencies: true,
						devDependencies: false,
					},
				],
				'import-x/no-restricted-paths': [
					'error',
					{
						zones: [
							{
								target: productionFilesGlobPattern,
								from: [`**/${testsDirName}/**`, '**/__mocks__/**', ...disallowedProductionImportsGlobPatterns],
								message: 'Production code should not import from test files',
							},
						],
					},
				],
			},
		},
	);
}
