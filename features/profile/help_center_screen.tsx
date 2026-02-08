import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootParams, "HelpCenterRoute">;

export default function HelpCenterScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Help Center</Text>
        <Text style={styles.bannerSubtitle}>Tell us how we can help 👋</Text>
        <Text style={styles.bannerText}>
          Chapter are standing by for service & support!
        </Text>
      </View>

      <View style={styles.cardsRow}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Ionicons name="mail" size={28} color={COLORS.primary} />
          </View>
          <Text style={styles.cardTitle}>Email</Text>
          <Text style={styles.cardSubtitle}>Send to your email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Ionicons name="call" size={28} color={COLORS.primary} />
          </View>
          <Text style={styles.cardTitle}>Phone Number</Text>
          <Text style={styles.cardSubtitle}>Send to your phone</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  banner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 0,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 6,
  },
  bannerText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  cardsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0EBFA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
});
