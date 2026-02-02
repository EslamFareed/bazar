import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "../components/input_field";
import PrimaryButton from "../components/primary_button";

type Props = NativeStackScreenProps<RootParams, "LoginRoute">;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {

    

  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign to your account</Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputLabel}>
          <Text style={styles.label}>Email</Text>
        </View>
        <InputField
          placeHolder="Your Email"
          value={email}
          onChangeText={setEmail}
          inputType="email-address"
        />
        <View style={styles.inputLabel}>
          <Text style={styles.label}>Password</Text>
        </View>
        <InputField
          placeHolder="Your password"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />

        <TouchableOpacity style={styles.forgotSection}>
          <Text style={styles.forgotText}>Forget Password ?</Text>
        </TouchableOpacity>

        <PrimaryButton title="Login" onPress={login} />

        <View style={styles.signUpSection}>
          <Text style={styles.signUpText}>{"Don't haave an account?"}</Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={20} color="#1F2937" />
            <Text style={styles.socialText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={20} color="#1F2937" />
            <Text style={styles.socialText}>Sign in with Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  headerSection: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  formSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  inputLabel: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  forgotSection: {
    marginBottom: 16,
  },
  forgotText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  signUpSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  signUpText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  signUpLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  dividerText: {
    marginHorizontal: 12,
    color: COLORS.darkGray,
    fontSize: 12,
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 12,
  },
  socialText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
});
