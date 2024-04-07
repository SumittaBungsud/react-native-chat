import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { TouchableOpacity } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { ChatProps } from "../sources/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// interface QueryDocument {
//   _id: string,
//   createdAt: string,
//   text: string,
//   user: string,
// }

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigation = useNavigation<ChatProps["navigation"]>();

  const onSignOut = async () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
    await AsyncStorage.removeItem("user");
  };

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user } = messages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
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
      console.log(querySnapshot.docs);
      const queryMessage = querySnapshot.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));
      setMessages(queryMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages: any) => onSend(messages)}
      messagesContainerStyle={{ backgroundColor: "#fff" }}
      // textInputStyle={{backgroundColor: '#fff',borderRadius: 20,}}
      user={{
        _id: auth?.currentUser?.email || 0,
        avatar: "https://i.pravatar.cc/300",
      }}
    />
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
