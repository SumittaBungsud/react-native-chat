import { Dispatch, SetStateAction } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "firebase/auth";

export type AsyncStoreUser = {
  email: string;
  password: string;
};

export type AuthPropsContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chat: undefined;
  Signup: undefined;
};

// Home
type HomeRouteProp = RouteProp<RootStackParamList, "Home">;
type HomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
export type HomeProps = {
  route: HomeRouteProp;
  navigation: HomeNavigationProp;
};

// Login
type LoginRouteProp = RouteProp<RootStackParamList, "Login">;
type LoginNavigationProp = StackNavigationProp<RootStackParamList, "Login">;
export type LoginProps = {
  route: LoginRouteProp;
  navigation: LoginNavigationProp;
};

// Signup
type SignupRouteProp = RouteProp<RootStackParamList, "Signup">;
type SignupNavigationProp = StackNavigationProp<RootStackParamList, "Signup">;
export type SignupProps = {
  route: SignupRouteProp;
  navigation: SignupNavigationProp;
};

// Chat
type ChatRouteProp = RouteProp<RootStackParamList, "Chat">;
type ChatNavigationProp = StackNavigationProp<RootStackParamList, "Chat">;
export type ChatProps = {
  route: ChatRouteProp;
  navigation: ChatNavigationProp;
};
