import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

type Props = NativeStackScreenProps<RootParams, "SplashRoute">;

export default function SplashScreen({ navigation }: Props) {
  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.replace("MainTabs");
    } else {
      navigation.replace("OnBoardingRoute");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkLogin();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
