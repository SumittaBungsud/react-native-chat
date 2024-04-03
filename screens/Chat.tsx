import {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';


export default function Chat() {
    const [messages, setMessages] = useState([]);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => 
            GiftedChat.append(previousMessages, messages)
        );
    }, []);

    return (
       <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={false} 
            onSend={(messages:any) => onSend(messages)}
        />
    );
}


