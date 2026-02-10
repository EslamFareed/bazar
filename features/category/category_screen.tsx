import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootParams, "CategoryRoute">;

interface CategoryModel {
  id: number;
  name: string;
}

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  rate: number;
  discount: number;
  quantity: number;
  mainImg: string;
  category: CategoryBrandModel;
  brand: CategoryBrandModel;
}

interface CategoryBrandModel {
  id: number;
  name: string;
}

export default function CatergoryScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [products, setProducts] = useState<ProductModel[]>([]);
  let allProducts: ProductModel[];

  const [isLoading, setIsLoading] = useState(false);

  const [categorySelected, selectCategory] = useState<CategoryModel>({
    id: 0,
    name: "All",
  });

  const getBrands = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://oman.somee.com/ecommerce_publish/Customer/Categories",
      );

      if (response.ok) {
        const data = await response.json();

        setCategories([
          {
            id: 0,
            name: "All",
          },
          ...data.categories,
        ]);
      } else {
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

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
    getBrands();
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
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            navigation.navigate("SearchRoute");
          }}
        >
          <MaterialCommunityIcons
            name="magnify"
            size={22}
            color={COLORS.darkGray}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Categories</Text>

        <TouchableOpacity style={styles.notificationButton}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={22}
            color={COLORS.text}
          />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <View style={{ height: 60 }}>
        <FlatList
          data={categories}
          horizontal
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  selectCategory(item);
                }}
              >
                <View
                  style={{
                    marginHorizontal: 12,
                    marginVertical: 18,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.cs,
                      item.id === categorySelected.id && styles.css,
                    ]}
                  >
                    {item.name}
                  </Text>
                  {item.id === categorySelected.id && (
                    <View
                      style={{
                        width: 12,
                        height: 2,
                        marginTop: 6,
                        backgroundColor: COLORS.primary,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>

      <FlatList
        data={
          categorySelected.id !== 0
            ? products.filter(
                (item) => item.category.id === categorySelected.id,
              )
            : products
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
  cs: {
    color: "#A5A5A5",
  },

  css: {
    color: "black",
  },

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
    backgroundColor: COLORS.background,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightGray,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4444",
  },

  content: {
    paddingBottom: 20,
  },

  sliderSection: {
    paddingVertical: 12,
  },

  sectionWrapper: {
    marginBottom: 32,
  },

  booksListContainer: {
    overflow: "hidden",
  },
  booksList: {
    paddingHorizontal: 20,
    gap: 12,
  },

  brandsListContainer: {
    overflow: "hidden",
  },
  brandsList: {
    paddingHorizontal: 20,
    gap: 12,
  },

  authorsListContainer: {
    overflow: "hidden",
  },
  authorsList: {
    paddingHorizontal: 20,
    gap: 16,
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
