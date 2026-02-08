import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootParams, "FavoritesRoute">;

const favoritesData = [
  { id: "1", title: "In in amet ultrices sit.", price: "$19.99" },
  { id: "2", title: "Bibendum facilisis.", price: "$27.12" },
  { id: "3", title: "Nulla et diam cras.", price: "$13.52" },
  { id: "4", title: "Risus malesuada in.", price: "$31.00" },
];

export default function FavoritesScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Favorites</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={favoritesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={require("../../assets/images/ads.png")}
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <Ionicons name="heart" size={24} color={COLORS.primary} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
});
