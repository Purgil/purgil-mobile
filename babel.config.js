module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // plungins 중 마지막에 추가되어야 한다.
    'react-native-reanimated/plugin',
  ],
}
