import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./sources/Types";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Chat from "./screens/Chat";
import Signup from "./screens/Signup";

type AuthPropsContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const Stack = createStackNavigator<RootStackParamList>();
const AuthenticatedUserContext = createContext<AuthPropsContext | {}>({});

const AuthenticatedUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(
    AuthenticatedUserContext
  ) as AuthPropsContext;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const getUser = async () => {
        const savedUser = await AsyncStorage.getItem("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;
        console.log(currentUser);

        if (currentUser !== null) {
          await setEmail(currentUser.email);
          await setPassword(currentUser.password);
          await signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Login success"))
            .catch((err) => Alert.alert("Login error", err.message));
        }
      };
      const unsubscribeAuth = onAuthStateChanged(
        auth,
        async (authenticatedUser) => {
          await setUser(() => (authenticatedUser ? authenticatedUser : null));
          setIsLoading(false);
          console.log(user);
        }
      );

      getUser();
      return unsubscribeAuth;
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthenticatedUserProvider>
        {user ? <ChatStack /> : <AuthStack />}
      </AuthenticatedUserProvider>
    </NavigationContainer>
  );
}

export default function App() {
  return <RootNavigator />;
}
