import { COLORS } from "@/app/constants/app_colors";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  optional?: boolean;
}

export default function LocationInput({
  label,
  placeholder,
  value,
  onChangeText,
  optional = false,
}: LocationInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {optional && <Text style={styles.optional}> (option)</Text>}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.darkGray}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  optional: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.darkGray,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
  },
});
