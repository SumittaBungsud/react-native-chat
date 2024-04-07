import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

interface FirebaseProps {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// const firebaseConfig = {
//   apiKey: "AIzaSyDDwYFV4vKjRzJVWNz8Wz_efL5xB6CQ3Fc",
//   authDomain: "rn-chatapp-31eba.firebaseapp.com",
//   projectId: "rn-chatapp-31eba",
//   storageBucket: "rn-chatapp-31eba.appspot.com",
//   messagingSenderId: "991578267247",
//   appId: "1:991578267247:web:172ef429afc8f3287b779a",
// }

const firebaseConfig = <FirebaseProps>{
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

// initialize firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
