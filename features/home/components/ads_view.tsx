import { COLORS } from "@/app/constants/app_colors";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const adsData = [
  {
    id: "1",
    title: "Special Offer",
    discount: "Discount 25%",
    buttonText: "Order Now",
    image: require("@/assets/images/ads.png"),
  },
  {
    id: "2",
    title: "Limited Time",
    discount: "Discount 40%",
    buttonText: "Shop Now",
    image: require("@/assets/images/ads.png"),
  },
  {
    id: "3",
    title: "Flash Sale",
    discount: "Discount 30%",
    buttonText: "Buy Now",
    image: require("@/assets/images/ads.png"),
  },
];

export default function AdsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width - 48));
    currentIndexRef.current = index;
    setCurrentIndex(index);
  };
const currentIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      changeAuto();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const changeAuto = () => {
    const nextIndex = currentIndexRef.current < adsData.length - 1
    ? currentIndexRef.current + 1 : 0 ;

    flatListRef.current?.scrollToIndex({
      index:nextIndex,
      animated:true
    });

    currentIndexRef.current = nextIndex;
    // setCurrentIndex(nextIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={adsData}
        renderItem={({ item }) => (
          <View style={styles.slideContainer}>
            <View style={styles.slide}>
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.discount}>{item.discount}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.dotsContainer}>
        {adsData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  slideContainer: {
    width: width - 48,
    marginHorizontal: 24,
  },
  slide: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    height: 180,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  discount: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: "600",
    fontSize: 14,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 150,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.darkGray,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 8,
    height: 8,
    borderRadius: 8,
  },
});
