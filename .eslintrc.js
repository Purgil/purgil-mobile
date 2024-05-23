module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: 'off',
    'jsx-quotes': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/react-in-jsx-scope': 'off',
    'no-bitwise': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
  },
}
