import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../sources/Types";
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from "../sources/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../appconfig/firebase";

import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Stack = createStackNavigator<RootStackParamList>();

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const [user, setUser] = useState<User | null>(null);

  const initialUser = async () => {
    const userData = await AsyncStorage.getItem("user");
    const storedata = userData ? JSON.parse(userData):null;
    if (storedata){
      await signInWithEmailAndPassword(auth, storedata.email, storedata.password)
      .then(async (userCredential) => {
        await setUser(userCredential.user);
        console.log("Login success");
      })
      .catch((err) => console.log("Login error", err.message));
    }
  }

  useEffect(() => {
    initialUser();
  },[]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser): setUser(null);
      }
    );
    return unsubscribeAuth;
  }, [user]);

  const screensSelect = user ? <ChatStack /> : <AuthStack />;

  return (
    <AuthenticatedUserProvider>
      <NavigationContainer>
        {screensSelect}
      </NavigationContainer>
    </AuthenticatedUserProvider>
  );
}
