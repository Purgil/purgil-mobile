module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: 'off',
    'jsx-quotes': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
  },
}
