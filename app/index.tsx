import LoginScreen from "@/features/auth/login_screen";
import OnboardingScreen from "@/features/onboarding/screens/onboarding_screen";
import SplashScreen from "@/features/onboarding/screens/splash_screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootParams } from "./navigation";

const stack = createNativeStackNavigator<RootParams>();

export default function App() {
  return (
    <stack.Navigator initialRouteName="SplashRoute">
      <stack.Screen
        name="SplashRoute"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="OnBoardingRoute"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="LoginRoute"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
}
