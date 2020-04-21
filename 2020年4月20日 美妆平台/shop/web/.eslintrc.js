module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    "prettier/prettier": "off"
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     tabWidth: 2,
    //     useTabs: false,
    //     semi: false,
    //     singleQuote: true,
    //     trailingComma: 'none',
    //     bracketSpacing: true,
    //     jsxBracketSameLine: true,
    //     arrowParens: 'always',
    //     printWidth: 200
    //   }
    // ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    $App: true
  }
}