const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure these file extensions are supported
config.resolver.assetExts.push(
  // Adds support for additional file types
  'bin',
  'txt',
  'jpg',
  'png',
  'json',
  'webp'
);

// Ensure source map generation for better debugging
config.transformer.minifierConfig = {
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;
