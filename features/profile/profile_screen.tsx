import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootParams, "ProfileRoute">;

// const menuItems: {
//   icon: keyof typeof Ionicons.glyphMap;
//   title: string;
//   route: keyof RootParams;
// }[] = [
//   { icon: "person", title: "My Account", route: "MyAccountRoute" },
//   { icon: "heart", title: "Your Favorites", route: "FavoritesRoute" },
//   {
//     icon: "document-text",
//     title: "Order History",
//     route: "OrderHistoryRoute",
//   },
//   {
//     icon: "chatbubble-ellipses",
//     title: "Help Center",
//     route: "HelpCenterRoute",
//   },
// ];

export interface ProfileModel {
  id: string;
  userName: string;
  email: string;
}

export default function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [showLogout, setShowLogout] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>({
    id: "",
    email: "",
    userName: "",
  });
  //  const [profile, setProfile] = useState<ProfileModel | null>({
  //   id: "",
  //   email: "",
  //   userName: "",
  // });

  const logout = async () => {
    await AsyncStorage.clear();
    setShowLogout(false);
    navigation.replace("LoginRoute");
  };

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "http://oman.somee.com/ecommerce_publish/Customer/Profiles",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      if (response.ok) {
        setProfile(await response.json());
      } else {
      }
    } catch {}
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>Profile</Text>

      <View style={styles.divider} />

      <View style={styles.userCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={36} color="#FFFFFF" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{profile.userName}</Text>
          <Text style={styles.userPhone}>{profile.email}</Text>
        </View>
        <TouchableOpacity onPress={() => setShowLogout(true)}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MyAccountRoute", profile)}
      >
        <View style={styles.menuIconContainer}>
          <Ionicons name={"person"} size={22} color={COLORS.primary} />
        </View>
        <Text style={styles.menuTitle}>{"My Account"}</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("FavoritesRoute")}
      >
        <View style={styles.menuIconContainer}>
          <Ionicons name={"heart"} size={22} color={COLORS.primary} />
        </View>
        <Text style={styles.menuTitle}>{"Your Favorites"}</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("OrderHistoryRoute")}
      >
        <View style={styles.menuIconContainer}>
          <Ionicons name={"document-text"} size={22} color={COLORS.primary} />
        </View>
        <Text style={styles.menuTitle}>{"Order History"}</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("HelpCenterRoute")}
      >
        <View style={styles.menuIconContainer}>
          <Ionicons
            name={"chatbubble-ellipses"}
            size={22}
            color={COLORS.primary}
          />
        </View>
        <Text style={styles.menuTitle}>{"Help Center"}</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
      </TouchableOpacity>

      {/* {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.route)}
        >
          <View style={styles.menuIconContainer}>
            <Ionicons name={item.icon} size={22} color={COLORS.primary} />
          </View>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
        </TouchableOpacity>
      ))} */}

     

      <Modal
        visible={showLogout}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogout(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLogout(false)}
        >
          <View
            style={styles.bottomSheet}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Logout</Text>
            <Text style={styles.sheetMessage}>Are You Sure?</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowLogout(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F6AD55",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  userPhone: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginTop: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E53E3E",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0EBFA",
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.darkGray,
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  sheetMessage: {
    fontSize: 15,
    color: COLORS.darkGray,
    lineHeight: 22,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "600",
  },
});
