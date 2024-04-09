import {
  Bubble,
  BubbleProps,
  IMessage,
  MessageProps,
  InputToolbar,
  InputToolbarProps,
} from "react-native-gifted-chat";
import { View } from "react-native";

export const renderBubble = (props: BubbleProps<IMessage>) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          fontSize: 17,
          padding: 6,
          paddingBottom: 3,
          color: "white",
        },
        left: {
          fontSize: 17,
          padding: 6,
          paddingBottom: 3,
          color: "white",
        },
      }}
      wrapperStyle={{
        left: {
          marginBottom: 10,
          backgroundColor: "#c7505c",
        },
        right: {
          marginBottom: 10,
          backgroundColor: "#0ea7b5",
        },
      }}
    />
  );
};

export const inputToolbar = (props: InputToolbarProps<IMessage>) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
        borderTopWidth: 1,
        borderStartWidth: 1,
        borderTopColor: "#bcbcbc",
        borderStartColor: "#bcbcbc",
        margin: 15,
        paddingHorizontal: 10,
      }}
    />
  );
};

