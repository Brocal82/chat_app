# chat_app

Chat App is a mobile application built using React Native that provides a seamless chatting experience. It offers real-time messaging, multimedia sharing, and location sharing features.

![Chat App Screenshot](images/Captura%20de%20pantalla%202023-09-16%20065736.png)

## Technology Stack

- React Native
- Expo (for cross-platform development)
- React Native Gifted Chat library
- Google Firestore Database
- Google Firebase Authentication
- AsyncStorage (for offline data caching)
- Firebase Cloud Storage (for media files)
- Expo ImagePicker & MediaLibrary (for communication features)

## Key Features

1. **Personalize Your Chat**: Customize your chat screen by setting a background color and display name.

2. **Real-Time Chat**: Enjoy real-time messaging with an intuitive chat interface.

3. **Multimedia Sharing**: Share images effortlessly within your conversations.

4. **Location Sharing**: Share your location with friends for meetups and event planning.

5. **Offline Access**: Stay connected even when offline with data caching for uninterrupted chatting.

## Getting Started

Follow these steps to set up and run Chat App on your device:

1. Ensure Node.js 16.19.0 or a compatible version is installed:
   npm install 16.19.0
   npm use 16.19.0
   npm alias default 16.19.0
Install Expo CLI globally:

Copy code
npm install -g expo-cli
Create an Expo account at Expo and install the Expo Go app on your smartphone or set up a virtual machine on your computer.

Create a new Chat App project with React Native:

Copy code
npx create-expo-app ChatApp --template
Start Expo:

Copy code
npm start
To resolve image-related issues, run:

Copy code
npm i whatwg-fetch@3.6.2
Connect your smartphone (install Expo Go app) or use an emulator to preview Chat App.

Database Configuration
If you want to use your own database, follow these steps:

Create a new database on Firebase (signup required).

Install Firebase:

Copy code
npm i firebase
Navigate to the Firebase console, create a new project, and set up Firestore Database in production mode.

Adjust Firestore rules to allow read and write:

Copy code
allow read, write: if true;
Create a web app and copy the Firebase configuration code (starts with const firebaseConfig =) into App.js, replacing the existing code.

Android Studio Integration
To unlock all features, install these libraries:

Copy code
expo install expo-image-picker
expo install react-native-maps
expo install expo-location
expo install expo-media-library
GitHub Repository
Find the Chat App source code on GitHub.

License
This project is licensed under the MIT License.

Contributions
Contributions to Chat App are welcome! Please check the Contribution Guidelines for details on how to get involved.

Enjoy Chat App, your ultimate chat companion!
