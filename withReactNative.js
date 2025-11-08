const { withAppBuildGradle } = require('@expo/config-plugins');

function withRemoveBundleCompression(config) {
  return withAppBuildGradle(config, async (config) => {
    const buildGradle = config.modResults.contents;
    // Remove the problematic line: react.enableBundleCompression = false
    const newBuildGradle = buildGradle.replace(
      /react\.enableBundleCompression = false/g,
      ''
    );
    config.modResults.contents = newBuildGradle;
    return config;
  });
}

module.exports = withRemoveBundleCompression;
