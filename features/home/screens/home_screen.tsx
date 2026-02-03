import { RootParams } from "@/app/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

type Props = NativeStackScreenProps<RootParams, "HomeRoute">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View
      style={{
        paddingVertical:25,
      }}
    >
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.replace("LoginRoute");
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
