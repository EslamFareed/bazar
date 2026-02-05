import { COLORS } from "@/app/constants/app_colors";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface BrandCardProps {
  image: any;
  onPress?: () => void;
}

export default function BrandCard({ image, onPress }: BrandCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    marginRight: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
});
