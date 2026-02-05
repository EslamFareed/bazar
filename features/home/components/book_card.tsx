import { COLORS } from "@/app/constants/app_colors";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BookCardProps {
  image: any;
  title: string;
  price: string;
  onPress?: () => void;
}

export default function BookCard({
  image,
  title,
  price,
  onPress,
}: BookCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 130,
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
