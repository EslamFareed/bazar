import { COLORS } from "@/app/constants/app_colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

interface DeliveryDateModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

export default function DeliveryDateModal({
  visible,
  onClose,
  onSelectDate,
  onSelectTime,
  selectedDate,
  selectedTime,
}: DeliveryDateModalProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(selectedDate || new Date());

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setTempDate(date);
    }
  };

  const timeSlots = ["Between 10PM : 11PM", "Between 10PM : 11PM"];

  const handleDateSelect = (date: Date) => {
    onSelectDate(date);
    setShowDatePicker(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.handleBar} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery date</Text>

              <View style={styles.dateButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    selectedDate?.toDateString() === today.toDateString() &&
                      styles.selectedDateButton,
                  ]}
                  onPress={() => handleDateSelect(today)}
                >
                  <Text style={styles.dateButtonLabel}>Today</Text>
                  <Text
                    style={[
                      styles.dateButtonValue,
                      selectedDate?.toDateString() === today.toDateString() &&
                        styles.selectedDateButtonText,
                    ]}
                  >
                    {today.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    selectedDate?.toDateString() === tomorrow.toDateString() &&
                      styles.selectedDateButton,
                  ]}
                  onPress={() => handleDateSelect(tomorrow)}
                >
                  <Text style={styles.dateButtonLabel}>Tomorrow</Text>
                  <Text
                    style={[
                      styles.dateButtonValue,
                      selectedDate?.toDateString() ===
                        tomorrow.toDateString() &&
                        styles.selectedDateButtonText,
                    ]}
                  >
                    {tomorrow.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateButtonLabel}>Pick</Text>
                  <Text style={styles.dateButtonValue}>a date</Text>
                </TouchableOpacity>
              </View>
            </View>

            {showDatePicker && (
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  minimumDate={today}
                />
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => {
                    handleDateSelect(tempDate);
                  }}
                >
                  <Text style={styles.datePickerButtonText}>Confirm Date</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery time</Text>

              <View style={styles.timeButtonsContainer}>
                {timeSlots.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeButton,
                      selectedTime === time && styles.selectedTimeButton,
                    ]}
                    onPress={() => onSelectTime(time)}
                  >
                    <Text
                      style={[
                        styles.timeButtonText,
                        selectedTime === time && styles.selectedTimeButtonText,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.bottomSpacing} />
          </ScrollView>

          <View style={styles.confirmButtonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.8,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.lightGray,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  dateButtonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDateButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGray,
  },
  dateButtonLabel: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontWeight: "500",
    marginBottom: 4,
  },
  dateButtonValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  selectedDateButtonText: {
    color: COLORS.primary,
  },
  datePickerContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  datePickerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  datePickerButtonText: {
    color: COLORS.background,
    fontWeight: "600",
    fontSize: 14,
  },
  timeButtonsContainer: {
    gap: 12,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  selectedTimeButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGray,
  },
  timeButtonText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  selectedTimeButtonText: {
    color: COLORS.primary,
  },
  bottomSpacing: {
    height: 20,
  },
  confirmButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.lightGray,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: COLORS.background,
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
