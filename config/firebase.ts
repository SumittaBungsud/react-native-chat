import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: Constants.expoGoConfig.extra.apiKey,
  authDomain: Constants.expoGoConfig.extra.authDomain,
  projectId: Constants.expoGoConfig.extra.projectId,
  storageBucket: Constants.expoGoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoGoConfig.extra.messagingSenderId,
  appId: Constants.expoGoConfig.extra.appId,
  databaseURL: Constants.expoGoConfig.extra.databaseURL,
  //   @deprecated is deprecated Constants.manifest
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();