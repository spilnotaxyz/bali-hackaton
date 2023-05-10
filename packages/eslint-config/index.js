module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'prettier',
    'next',
    'next/core-web-vitals',
    'turbo'
  ],
  rules: {
    // `@typescript-eslint`
    // https://github.com/typescript-eslint/typescript-eslint
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: true,
        prefer: 'type-imports'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react/jsx-curly-brace-presence': [
      2,
      { props: 'never', children: 'never', propElementValues: 'always' }
    ]
  },
  ignorePatterns: [
    'CHANGELOG.md',
    'build',
    'dist',
    'node_modules',
    'storybook-static',
    '**/*.config.js',
    '**/*.config.mjs',
    '**/wagmi.*.ts'
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    },
    react: {
      version: 'detect'
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  }
}
