import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "../components/input_field";
import PrimaryButton from "../components/primary_button";

type Props = NativeStackScreenProps<RootParams, "RegisterRoute">;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    if (!email || !password || !name) {
      Alert.alert("Please Enter Email and password");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://oman.somee.com/ecommerce_publish/Identity/Accounts/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            confirmPassword: password,
          }),
        },
      );

      if (response.ok) {
        navigation.replace("RegisterSuccessRoute");
      } else {
        Alert.alert("Create Account Failed");
      }
    } catch {
      Alert.alert("Create Account Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Create account and choose favorite menu
        </Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputLabel}>
          <Text style={styles.label}>Name</Text>
        </View>
        <InputField
          placeHolder="Your Name"
          value={name}
          onChangeText={setName}
        />
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

        {isLoading && (
          <ActivityIndicator
            style={{
              margin: 16,
              paddingVertical: 14,
            }}
          />
        )}

        {!isLoading && <PrimaryButton title="Register" onPress={register} />}

        <View style={styles.signUpSection}>
          <Text style={styles.signUpText}>{"Have an account?"}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("LoginRoute");
            }}
          >
            <Text style={styles.signUpLink}> Sign In</Text>
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
    paddingVertical: 25,
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
