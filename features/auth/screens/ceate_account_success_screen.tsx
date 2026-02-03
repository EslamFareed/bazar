import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/primary_button";
const width = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootParams, "RegisterSuccessRoute">;
export default function CreateAccountSuccessScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/success.png")} />
      <Text style={styles.title}>Congratulation!</Text>
      <Text style={styles.subtitle}>
        your account is complete, please enjoy the best menu from us.
      </Text>

      <PrimaryButton
        style={{
          width: width - 32,
        }}
        title="Get Started"
        onPress={() => {
          navigation.replace("LoginRoute");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginHorizontal: 24,
    textAlign: "center",
  },
});
