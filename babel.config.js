module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // react-native-dotenv has been removed as it's incompatible with expo-router
      // Expo CLI has built-in support for .env files
    ],
  };
};
