import 'react-native-gesture-handler/jestSetup';

// mock reanimates
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// mock async storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// mock firebase/auth
jest.mock('firebase/auth', () => {
  return {
    onAuthStateChanged: jest.fn(), 
    signInWithEmailAndPassword: jest.fn(), 
    getAuth: jest.fn(),
    User: {}
  }
});

// mock firebase/app
jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn()
  }
});

// mock firebase/firestore
jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn()
  }
});

// mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  return {
    FontAwesome: {},
    Entypo: {}
  }
});