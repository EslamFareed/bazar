import { COLORS } from "@/app/constants/app_colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PrimaryButtonParams {
  title: string;
  onPress: () => void;
}

export default function PrimaryButton({ title, onPress }: PrimaryButtonParams) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: 16,
    margin: 16,
    paddingVertical: 14,
  },
  txt: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
