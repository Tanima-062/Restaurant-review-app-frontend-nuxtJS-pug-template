module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['prettier', '@typescript-eslint', 'standard', 'import'],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    },
    sourceType: 'module',
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    /*
     ** ISSUE: Use the latest vue-eslint-parser
     ** README: https://github.com/mysticatea/vue-eslint-parser#-options
     */
    // parser: 'babel-eslint'
    // TODO: 依存モジュールエラーが解消された場合、このオプションは外すこと
    warnOnUnsupportedTypeScriptVersion: false
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
    // 'prettier',
    // 'plugin:prettier/recommended'
  ],
  ignorePatterns: ['src/static/*', 'logs/*', 'api/*', 'node_modules/*'],
  // ルールは後で書きながら設定していく
  // e.g. https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md
  rules: {
    camelcase: 'warn',
    'no-var': ['error'],
    'no-unused-expressions': ['error'],
    'prefer-const': ['error'],
    'no-return-await': 'warn',
    'no-empty-pattern': 'warn',
    'no-use-before-define': 'warn',
    'no-unused-vars': 'warn',
    'standard/computed-property-even-spacing': 0,
    '@typescript-eslint/no-namespace': 'off',
    // warn出るのめんどくさいので開発中のみoffっとく
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        // 'allowExpressions': true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/component-definition-name-casing': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    indent: 'off',
    'vue/multi-word-component-names': 'warn',
    'no-unreachable-loop': 'warn',
    'array-callback-return': 'warn'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue']
      },
      typescript: {
        alwaysTryTypes: true,
        config: 'tsconfig.json'
      }
    }
  }
}
