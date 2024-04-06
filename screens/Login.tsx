import { useState } from "react";
import { 
    Text, 
    View, 
    TextInput, 
    Image, 
    SafeAreaView, 
    TouchableOpacity, 
    StatusBar, 
    Alert 
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { LoginProps } from "../sources/NavigationTypes";
const backImage = require("../assets/background.png");

export default function Login({ route, navigation }:LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View className={style.container}>
      <Image className={style.bgimg} source={backImage} />
      <View className={style.whiteSheet} />
      <SafeAreaView className={style.form}>
        <Text className={style.title}>Log In</Text>
        <TextInput
          className={style.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className={style.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity className={style.button} onPress={onHandleLogin}>
          <Text className="text-lg font-bold text-white"> Log In</Text>
        </TouchableOpacity>
        <View className="mt-5 flex-row items-center self-center" >
          <Text className="text-slate-400 font-semibold text-sm" >Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className="text-orange-500 font-semibold text-sm" > Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  )
}

const style = {
  container: "flex-1 bg-white",
  form: "flex-1 justify-center mx-7",
  input: "text-base p-3 mb-5 h-14 rounded-lg bg-[#F6F7FB]",
  title: "text-4xl text-orange-400 font-bold self-center pb-6",
  bgimg: "w-full h-80 absolute top-0 bg-top",
  button: "bg-[#f57c00] h-14 rounded-lg mt-10 justify-center items-center",
  whiteSheet: "w-full h-3/4 absolute bottom-0 bg-white rounded-tl-[2rem]",
}

