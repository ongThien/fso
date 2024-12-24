const { getDefaultConfig } = require('@expo/metro-config');
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs', 'mjs');

defaultConfig.resolver.extraNodeModules = {
  '@react-native-picker/picker': path.resolve(__dirname, 'node_modules/@react-native-picker/picker/dist/module/Picker.android.js'),
};

module.exports = defaultConfig;
