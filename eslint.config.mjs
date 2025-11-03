// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
    },
  },
 
  {
    rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: '@nest/**',
						group: 'external',
						position: 'before'
					},
					{
						pattern: '@app/**',
						group: 'internal',
						position: 'after'
					}
				],
				pathGroupsExcludedImportTypes: ['internal'],
				'newlines-between': 'always',
				groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index', 'object', 'type'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				}
			}
		]
	}
  },
);
