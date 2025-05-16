import "dotenv/config";

export default {
  name: "Purrfect Match",
  slug: "purrfect-match",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  extra: {
    PETFINDER_CLIENT_ID: process.env.PETFINDER_CLIENT_ID,
    PETFINDER_CLIENT_SECRET: process.env.PETFINDER_CLIENT_SECRET,
    RESCUE_GROUPS_API_KEY: process.env.RESCUE_GROUPS_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY, // Use Gemini API key from .env file
    eas: {
      projectId: "your-project-id",
    },
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  }
};
