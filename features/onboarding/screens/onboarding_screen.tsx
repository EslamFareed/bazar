import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    image: require("@/assets/images/onboarding1.png"),
    title: "Start Your Adventure",
    description:
      "Ready to embark on a quest for inspiration and knowledge? Your adventure begins now. Let's go!",
  },
  {
    id: 2,
    image: require("@/assets/images/onboarding2.png"),
    title: "Your Bookish Soulmate Awaits",
    description:
      "Let us be your guide to the perfect read. Discover books tailored to your tastes for a truly rewarding experience.",
  },
  {
    id: 3,
    image: require("@/assets/images/onboarding3.png"),
    title: "Now reading books will be easier",
    description:
      "Discover new worlds, join a vibrant reading community. Start your reading adventure effortlessly with us.",
  },
];

type Props = NativeStackScreenProps<RootParams, "OnBoardingRoute">;

export default function OnboardingScreen({ navigation }: Props) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      navigation.replace("LoginRoute");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          navigation.replace("LoginRoute");
        }}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={(scroll) => {
          const scrollPosition = scroll.nativeEvent.contentOffset.x;
          const index = Math.round(scrollPosition / width);
          setIndex(index);
        }}
        scrollIndicatorInsets={{ right: 1 }}
        showsHorizontalScrollIndicator={false}
      >
        {onboardingData.map((item) => (
          <View key={item.id} style={styles.slideContainer}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {onboardingData.map((item, index) => (
          <View
            key={item.id}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          {currentIndex === onboardingData.length - 1 ? (
            <Text style={styles.buttonText}>Get Started</Text>
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.replace("LoginRoute");
          }}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical:25,
    flex: 1,
    backgroundColor: COLORS.background,
  },
  skipButton: {
    paddingTop: 16,
    paddingLeft: 16,
  },
  skipText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },
  slideContainer: {
    width,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.darkGray,
    textAlign: "center",
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "600",
  },
  signInButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  signInText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },
});
