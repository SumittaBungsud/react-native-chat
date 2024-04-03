import { View, Text } from 'react-native';
import { HomeProps } from "../sources/typs";

export default function Home({ route, navigation }:HomeProps) {
  return (
    <View>
      <Text onPress={() => navigation.push('Chat')}>Chat</Text>
      <Text onPress={() => navigation.push('Login')}>Login</Text>
    </View>
  )
}
