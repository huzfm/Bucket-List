const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

config.resolver.assetExts.push("cjs"); // Support .cjs files
module.exports = withNativeWind(config, { input: './global.css' })