import { COLORS } from "@/app/constants/app_colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProductDetailModalProps {
  visible: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    rate: number;
    brand: { name: string };
  } | null;
}

export default function ProductDetailModal({
  visible,
  onClose,
  product,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const fullStars = Math.floor(product.rate);
  const hasHalfStar = product.rate - fullStars >= 0.5;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.handle} />

          <Image
            source={require("../../../assets/images/ads.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>
              {product.name}
            </Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.brandName}>{product.brand.name}</Text>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            dignissim ac ac ac. Nibh et sed ac, eget malesuada.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.reviewLabel}>Review</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <MaterialCommunityIcons
                key={star}
                name={
                  star <= fullStars
                    ? "star"
                    : star === fullStars + 1 && hasHalfStar
                      ? "star-half-full"
                      : "star-outline"
                }
                size={28}
                color="#F5A623"
              />
            ))}
            <Text style={styles.ratingText}>({product.rate.toFixed(1)})</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={18}
                  color={COLORS.text}
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={[styles.quantityButton, styles.quantityButtonPlus]}
                onPress={() => setQuantity(quantity + 1)}
              >
                <MaterialCommunityIcons name="plus" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.continueButton} onPress={onClose}>
              <Text style={styles.continueButtonText}>Continue shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewCartButton}>
              <Text style={styles.viewCartText}>View cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.lightGray,
    alignSelf: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    alignSelf: "center",
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
    marginRight: 12,
  },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: COLORS.darkGray,
    lineHeight: 20,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginBottom: 14,
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonPlus: {
    backgroundColor: COLORS.primary,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginHorizontal: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  continueButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  viewCartButton: {
    flex: 0.6,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },
  viewCartText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
});
