import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AdsSlider from "../components/ads_view";
import BookCard from "../components/book_card";
import BrandCard from "../components/brand_card";
import SectionHeader from "../components/section_header";

const topBooksData = [
  {
    id: "1",
    title: "The Kite Runner",
    price: "$14.99",
    image: require("@/assets/images/ads.png"),
  },
  {
    id: "2",
    title: "The Subtle Art of Not Giving a F*ck",
    price: "$20.99",
    image: require("@/assets/images/ads.png"),
  },
  {
    id: "3",
    title: "The Art of War",
    price: "$14.99",
    image: require("@/assets/images/ads.png"),
  },
];

const brandsData = [
  {
    id: "1",
    name: "Warehouse",
    image: require("@/assets/images/brand.png"),
  },
  {
    id: "2",
    name: "Sanrio",
    image: require("@/assets/images/brand.png"),
  },
  {
    id: "3",
    name: "GoodDay",
    image: require("@/assets/images/brand.png"),
  },
  {
    id: "4",
    name: "Crane",
    image: require("@/assets/images/brand.png"),
  },
];
type Props = NativeStackScreenProps<RootParams, "HomeRoute">;
export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

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

        <Text style={styles.headerTitle}>Home</Text>

        <TouchableOpacity style={styles.notificationButton}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={22}
            color={COLORS.text}
          />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[{ id: "main" }]}
        renderItem={() => (
          <View style={styles.content}>
            <View style={styles.sliderSection}>
              <AdsSlider />
            </View>

            <View style={styles.sectionWrapper}>
              <SectionHeader
                title="Top of Week"
                onSeeAll={() => console.log("See all books")}
              />
              <View style={styles.booksListContainer}>
                <FlatList
                  data={topBooksData}
                  renderItem={({ item }) => (
                    <BookCard
                      image={item.image}
                      title={item.title}
                      price={item.price}
                      onPress={() => console.log("Book:", item.title)}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.booksList}
                  scrollEventThrottle={16}
                />
              </View>
            </View>

            <View style={styles.sectionWrapper}>
              <SectionHeader
                title="Best Vendors"
                onSeeAll={() => console.log("See all vendors")}
              />
              <View style={styles.brandsListContainer}>
                <FlatList
                  data={brandsData}
                  renderItem={({ item }) => (
                    <BrandCard
                      image={item.image}
                      onPress={() => console.log("Brand:", item.name)}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.brandsList}
                  scrollEventThrottle={16}
                />
              </View>
            </View>

            <View style={styles.sectionWrapper}>
              <SectionHeader
                title="Best Sales"
                onSeeAll={() => console.log("See all books")}
              />
              <View style={styles.booksListContainer}>
                <FlatList
                  data={topBooksData}
                  renderItem={({ item }) => (
                    <BookCard
                      image={item.image}
                      title={item.title}
                      price={item.price}
                      onPress={() => console.log("Book:", item.title)}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.booksList}
                  scrollEventThrottle={16}
                />
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
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
});
