# Purrfect Match 🐾

A React Native mobile application that helps you find your perfect pet match through an intelligent questionnaire and swipe-based browsing experience. Connect with verified animal shelters and discover pets that truly fit your lifestyle.

## Features

### 🎯 Smart Matching
- **Personalized Questionnaire**: Answer 8 questions about your lifestyle, experience, and preferences
- **AI-Enhanced Descriptions**: Pet descriptions are enhanced using Google Gemini AI for better insights
- **Filtered Results**: Get pet recommendations based on your answers

### 🎴 Swipe-Based Browsing
- **Tinder-Style Interface**: Swipe right to like, left to pass on pets
- **Pet Cards**: View key information including name, age, breed, size, location, and photos
- **Detailed Profiles**: Tap on cards to see comprehensive pet descriptions and health information

### ❤️ Favorites & Management
- **Save Favorites**: Like pets and save them to your favorites list
- **Undo Swipes**: Change your mind with the undo feature
- **Profile Management**: Update your preferences and questionnaire answers anytime

### 🏠 Shelter Integration
- **RescueGroups API**: Connects to verified animal shelters
- **Location-Based Search**: Find pets near you (currently configured for Calgary, Alberta)
- **Real-Time Availability**: Browse only available pets from trusted shelters

## Tech Stack

- **Framework**: React Native with Expo (~52.0)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data persistence
- **APIs**:
  - [RescueGroups API](https://rescuegroups.org/) - Pet data and shelter information
  - [Google Gemini AI](https://ai.google.dev/) - Enhanced pet descriptions
- **UI Components**: 
  - React Native Deck Swiper for card swiping
  - Expo Vector Icons
  - Custom styled components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator, or Expo Go app on your phone

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd purrfect-match
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file or configure `app.config.js` with:
     - `RESCUE_GROUPS_API_KEY` - Your RescueGroups API key
     - Gemini API key (currently configured in code)

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Project Structure

```
purrfect-match/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.js       # Main browsing/swiping screen
│   │   ├── favourite.js   # Favorites list
│   │   └── profile.js     # User profile
│   ├── index.js           # Intro/onboarding screens
│   ├── questionnaire.js   # Questionnaire flow
│   └── questionSummary.js # Review answers
├── api/                   # API integrations
│   ├── api-conn.js        # RescueGroups API client
│   └── gemini/            # Gemini AI utilities
├── components/            # Reusable UI components
│   ├── Card.js            # Pet card component
│   ├── CardButtons.js     # Swipe action buttons
│   └── PetDescription.js  # Detailed pet view
├── context/               # React Context providers
│   └── AnswersContext.js  # Questionnaire answers state
└── utils/                 # Utility functions
    ├── questions.js       # Questionnaire definitions
    └── petData.js         # Pet data utilities
```

## Key Features Explained

### Questionnaire System
The app uses an 8-question questionnaire to understand:
- Household composition (adults, children)
- Pet ownership experience
- Activity level
- Pet type preference (Cat/Dog)
- Age preference
- Desired traits

Answers are stored in context and used to filter and match pets from the RescueGroups API.

### AI-Enhanced Descriptions
Pet descriptions from shelters are processed through Google Gemini AI to:
- Clean and format descriptions
- Extract health information
- Identify key traits
- Create more readable, informative profiles

### Swipe Interface
Built with `react-native-deck-swiper`, the app provides:
- Smooth card swiping animations
- Like/dislike tracking
- Undo functionality
- Infinite scroll through available pets

## Configuration

### API Keys
The app requires API keys for:
1. **RescueGroups API**: Set in `app.config.js` under `extra.RESCUE_GROUPS_API_KEY`
2. **Google Gemini API**: Currently configured in `api/gemini/geminiConn.js`

### Location
Default location is set to Calgary, Alberta (coordinates: 51.0111, -114.1319). You can modify this in `api/api-conn.js` in the `filterRadius` configuration.

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private.

## Acknowledgments

- [RescueGroups](https://rescuegroups.org/) for providing pet adoption data
- [Google Gemini](https://ai.google.dev/) for AI-powered description enhancement
- [Expo](https://expo.dev/) for the amazing React Native framework

---

Made with ❤️ for finding forever homes for pets
