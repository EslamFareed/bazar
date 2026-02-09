import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface CartItemModel {
  id: number;
  name: string;
  mainImg: string;
  price: number;
  quantity: number;
}

type Props = NativeStackScreenProps<RootParams, "CartRoute">;

export default function CartScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const [getItems, setItems] = useState<CartItemModel[]>([]);
  const getCart = async () => {
    const data = await AsyncStorage.getItem("cart");
    if (data) {
      setItems(JSON.parse(data!));
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCart();
    }, []),
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={getItems}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingEnd: 24,
                }}
              >
                <Text style={styles.itemPrice}>{item.price}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.itemPrice}>{item.quantity}</Text>
                  <Ionicons
                    name="remove-circle"
                    size={24}
                    color={COLORS.primary}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={async () => {
                // const data = await AsyncStorage.getItem("products");
                // let products: ProductModel[] = [];
                // if (data) {
                //   products = JSON.parse(data!);
                // }
                // Alert.alert("Confirm Unfavourite", item.name, [
                //   {
                //     text: "Yes",
                //     onPress: async () => {
                //       products = products.filter((p) => p.id !== item.id);
                //       await AsyncStorage.setItem(
                //         "products",
                //         JSON.stringify(products),
                //       );
                //       setProducts(products);
                //     },
                //   },
                //   {
                //     text: "No",
                //   },
                // ]);
              }}
            >
              <Ionicons name="trash-bin" size={24} color={COLORS.primary} />
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
