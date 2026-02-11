import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import PrimaryButton from "@/features/auth/components/primary_button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeliveryDateModal from "../components/delivery_date_modal";

type Props = NativeStackScreenProps<RootParams, "ConfirmOrderRoute">;

export default function ConfirmOrderScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const location = route.params?.location || {};

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleOrder = () => {
    // Handle order confirmation
    console.log("Order confirmed:", {
      location,
      date: selectedDate,
      time: selectedTime,
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Choose date and time";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color={COLORS.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color={COLORS.primary}
            />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Address</Text>
              <Text style={styles.cardSubtitle}>Utama Street No.20</Text>
              <Text style={styles.cardDescription}>
                Dumbo Street No.20, Dumbo, New York 10001, United States
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={COLORS.darkGray}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("LocationRoute")}
            style={styles.changeButton}
          >
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Price</Text>
            <Text style={styles.summaryValue}>$87.10</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>$2</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalValue}>$89.10</Text>
          </View>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.selectableItem}
            onPress={() => setShowDateModal(true)}
          >
            <View style={styles.itemContent}>
              <MaterialCommunityIcons
                name="calendar"
                size={24}
                color={COLORS.primary}
              />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemLabel}>Date & time</Text>
                <Text style={styles.itemValue}>
                  {selectedDate && selectedTime
                    ? `${formatDate(selectedDate)}`
                    : "Choose date and time"}
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={COLORS.darkGray}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.selectableItem}>
            <View style={styles.itemContent}>
              <MaterialCommunityIcons
                name="credit-card"
                size={24}
                color={COLORS.primary}
              />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemLabel}>Payment</Text>
                <Text style={styles.itemValue}>Cash</Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={COLORS.darkGray}
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton title="Order" onPress={handleOrder} />
      </View>

      <DeliveryDateModal
        visible={showDateModal}
        onClose={() => setShowDateModal(false)}
        onSelectDate={handleDateSelect}
        onSelectTime={handleTimeSelect}
        selectedDate={selectedDate || undefined}
        selectedTime={selectedTime || undefined}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 13,
    color: COLORS.darkGray,
    lineHeight: 18,
  },
  changeButton: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  changeButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 13,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightGray,
  },
  totalItem: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 0,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  selectableItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: 4,
    fontWeight: "500",
  },
  itemValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
