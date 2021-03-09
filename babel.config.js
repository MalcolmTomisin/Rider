module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: __DEV__ ? [] : ['transform-remove-console'],
};
