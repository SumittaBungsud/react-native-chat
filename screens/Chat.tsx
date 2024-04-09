import { useState, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  GiftedChat,
  IMessage,
} from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { ChatProps } from "../sources/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { auth, database } from "../appconfig/firebase";
import { signOut } from "firebase/auth";
import { renderBubble, inputToolbar } from "../components/customChat";

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigation = useNavigation<ChatProps["navigation"]>();

  const onSignOut = async () => {
    await signOut(auth).catch((error) =>
      console.log("Error logging out: ", error)
    );
    await AsyncStorage.removeItem("user");
    console.log("Logout successful");
  };

  const onSend = useCallback(async (chatMessages = []) => {
    const { _id, createdAt, text, user } = chatMessages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, chatMessages)
    );

    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <View className="flex-1 bg-rose-500">
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages: any) => onSend(messages)}
      messagesContainerStyle={{ backgroundColor: "#fff" }} 
      renderBubble={renderBubble}
      renderInputToolbar={inputToolbar}
      user={{
        _id: auth?.currentUser?.email || 0,
        avatar: "https://i.pravatar.cc/300",
      }}
    />
    </View>
  );
}

const style = {
  container: "flex-1 justify-end items-end bg-white",
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
