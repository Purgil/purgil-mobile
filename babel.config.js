module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'app',
      },
    ],
    // plungins 중 마지막에 추가되어야 한다.
    'react-native-reanimated/plugin',
  ],
}
