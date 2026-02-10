import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "../auth/components/input_field";
import { ProductModel } from "../category/category_screen";

type Props = NativeStackScreenProps<RootParams, "SearchRoute">;

export default function SearchScreen({ navigation }: Props) {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearchText] = useState("");

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://oman.somee.com/ecommerce_publish/Customer/Products",
      );

      if (response.ok) {
        setProducts(await response.json());
      } else {
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
      </View>

      <InputField
        placeHolder="Search"
        value={search}
        onChangeText={setSearchText}
      />

      <FlatList
        data={
          search
            ? products.filter(
                (p) =>
                  p.name.toLowerCase().includes(search.toLowerCase()) ||
                  p.category.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  p.brand.name.toLowerCase().includes(search.toLowerCase()),
              )
            : []
        }
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProductDetailsRoute", item);
            }}
          >
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
                  }}
                >
                  <Text style={styles.itemTitle}>{item.brand.name}</Text>

                  <Text style={styles.itemTitle}>{item.category.name}</Text>
                </View>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
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
  listContent: {
    paddingHorizontal: 20,
  },
});
