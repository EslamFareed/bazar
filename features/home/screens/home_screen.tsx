import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingVertical: 25,
      }}
    >
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "LoginRoute" }],
            })
          );
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
