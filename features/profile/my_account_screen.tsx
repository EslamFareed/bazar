import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootParams, "MyAccountRoute">;

export default function MyAccountScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(route.params.userName);
  const [email, setEmail] = useState(route.params.email);
  const [image, setImage] = useState<string | null>(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              marginBottom: 32,
              width: 72,
              height: 72,
              borderRadius: 72,
            }}
          />
        )}

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.darkGray}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={COLORS.darkGray}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <Button
          title="Choose Image"
          onPress={async () => {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            // const result = await ImagePicker.launchImageLibraryAsync({
            //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //   allowsEditing: true,
            //   aspect: [1, 1],
            //   quality: 1,
            // });
            let imageUri = "";
            if (!result.canceled) {
              imageUri = result.assets[0].uri;
              setImage(imageUri);
            }

            const fromData = new FormData();
            // fromData.append("name", name);
            // fromData.append("email", email);
            fromData.append("image", {
              uri: imageUri,
              type: "image/jpeg",
              name: "profile.jpg",
            } as any);
            const response = await fetch("", {
              method: "POST",
              body: fromData,
            });
          }}
        ></Button>
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
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
