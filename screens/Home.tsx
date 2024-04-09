import { useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { HomeProps } from "../sources/Types";
const catImageUrl =
  "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

export default function Home() {
  const navigation = useNavigation<HomeProps["navigation"]>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.gray}
          style={{marginStart: 15}}
        />
      ),
      headerRight: () => (
        <Image source={{ uri: catImageUrl }} className={style.img} />
      ),
    });
  }, [navigation]);

  return (
    <View className={style.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        className={style.chatButton}
      >
        <Entypo name="chat" size={58} color={colors.lightGray} />
      </TouchableOpacity>
    </View>
  );
}

const style = {
  container: "flex-1 space-y-20 justify-center items-center bg-rose-200",
  img: "w-10 h-10 mr-4",
  chatButton:
    "w-[3.2rem] h-[3.2rem] mr-5 mb-[3.2rem] rounded-3xl justify-center items-center shadow-[0_0.1rem_0.4rem_rgba(0, 0, 0)] shadow-orange-500/90",
};

const colors = {
  primary: "#f57c00",
  gray: "#C5C5C7",
  mediumGray: "#F6F7FB",
  lightGray: "#FAFAFA",
};
