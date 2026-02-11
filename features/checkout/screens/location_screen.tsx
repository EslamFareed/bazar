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
import LocationInput from "../components/location_input";

type Props = NativeStackScreenProps<RootParams, "LocationRoute">;

export default function LocationScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [block, setBlock] = useState("");
  const [streetName, setStreetName] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [floor, setFloor] = useState("");
  const [flat, setFlat] = useState("");
  const [avenue, setAvenue] = useState("");

  const handleConfirmation = () => {
    navigation.navigate("ConfirmOrderRoute", {
      location: {
        governorate,
        city,
        block,
        streetName,
        buildingName,
        floor,
        flat,
        avenue,
      },
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
        <Text style={styles.headerTitle}>Location</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LocationInput
          label="Governorate"
          placeholder="Governorate"
          value={governorate}
          onChangeText={setGovernorate}
        />

        <LocationInput
          label="City"
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <LocationInput
          label="Block"
          placeholder="Block"
          value={block}
          onChangeText={setBlock}
        />

        <LocationInput
          label="Street name /number"
          placeholder="Street name /number"
          value={streetName}
          onChangeText={setStreetName}
        />

        <LocationInput
          label="Building name/number"
          placeholder="Building name/number"
          value={buildingName}
          onChangeText={setBuildingName}
        />

        <LocationInput
          label="Floor"
          placeholder="Floor (option)"
          value={floor}
          onChangeText={setFloor}
          optional={true}
        />

        <LocationInput
          label="Flat"
          placeholder="Flat(option)"
          value={flat}
          onChangeText={setFlat}
          optional={true}
        />

        <LocationInput
          label="Avenue"
          placeholder="Avenue (option)"
          value={avenue}
          onChangeText={setAvenue}
          optional={true}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton title="Confirmation" onPress={handleConfirmation} />
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
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
