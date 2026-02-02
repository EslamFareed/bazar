import { COLORS } from "@/app/constants/app_colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface InputFieldParams {
  placeHolder: string;
  value: string;
  onChangeText: (text: string) => void;
  secured?: boolean;
  inputType?: "default" | "email-address" | "numeric" | "phone-pad";
  isPassword?: boolean;
}

export default function InputField({
  placeHolder,
  value,
  onChangeText,
  secured = false,
  inputType = "default",
  isPassword = false,
}: InputFieldParams) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor={COLORS.darkGray}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        keyboardType={inputType}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        >
          <MaterialIcons
            size={22}
            color={COLORS.darkGray}
            name={showPassword ? "visibility" : "visibility-off"}
          ></MaterialIcons>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  eyeIcon: {
    padding: 8,
  },
});
