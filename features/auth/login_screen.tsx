import { RootParams } from "@/app/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";

type Props = NativeStackScreenProps<RootParams, "LoginRoute">;

export default function LoginScreen() {
  return <View></View>;
}
