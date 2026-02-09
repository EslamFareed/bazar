import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductModel } from "../home/screens/home_screen";

type Props = NativeStackScreenProps<RootParams, "FavoritesRoute">;

// const favoritesData = [
//   { id: "1", title: "In in amet ultrices sit.", price: "$19.99" },
//   { id: "2", title: "Bibendum facilisis.", price: "$27.12" },
//   { id: "3", title: "Nulla et diam cras.", price: "$13.52" },
//   { id: "4", title: "Risus malesuada in.", price: "$31.00" },
// ];

export default function FavoritesScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const [getProducts, setProducts] = useState<ProductModel[]>([]);

  const getFavs = async () => {
    const data = await AsyncStorage.getItem("products");

    if (data) {
      setProducts(JSON.parse(data!));
    }
  };

  useEffect(() => {
    getFavs();
  }, []);

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
        data={getProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{
                uri:
                  "http://oman.somee.com/ecommerce_publish/images/product_imgs/" +
                  item.mainImg,
              }}
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={async () => {
                const data = await AsyncStorage.getItem("products");
                let products: ProductModel[] = [];
                if (data) {
                  products = JSON.parse(data!);
                }

                Alert.alert("Confirm Unfavourite", item.name, [
                  {
                    text: "Yes",
                    onPress: async () => {
                      products = products.filter((p) => p.id !== item.id);
                      await AsyncStorage.setItem(
                        "products",
                        JSON.stringify(products),
                      );

                      setProducts(products);
                    },
                  },
                  {
                    text: "No",
                  },
                ]);
              }}
            >
              <Ionicons name="heart" size={24} color={COLORS.primary} />
            </TouchableOpacity>
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
