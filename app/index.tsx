import CreateAccountSuccessScreen from "@/features/auth/screens/ceate_account_success_screen";
import LoginScreen from "@/features/auth/screens/login_screen";
import RegisterScreen from "@/features/auth/screens/register_screen";
import MainTabs from "@/features/home/screens/main_tabs";
import OnboardingScreen from "@/features/onboarding/screens/onboarding_screen";
import SplashScreen from "@/features/onboarding/screens/splash_screen";
import FavoritesScreen from "@/features/profile/favorites_screen";
import HelpCenterScreen from "@/features/profile/help_center_screen";
import MyAccountScreen from "@/features/profile/my_account_screen";
import OrderHistoryScreen from "@/features/profile/order_history_screen";
import SearchScreen from "@/features/search/search_screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootParams } from "./navigation";

const stack = createNativeStackNavigator<RootParams>();

export default function App() {
  return (
    // <NavigationContainer>
    <stack.Navigator initialRouteName="MainTabs">
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
      <stack.Screen
        name="RegisterRoute"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="RegisterSuccessRoute"
        component={CreateAccountSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="SearchRoute"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="MyAccountRoute"
        component={MyAccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="FavoritesRoute"
        component={FavoritesScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="OrderHistoryRoute"
        component={OrderHistoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="HelpCenterRoute"
        component={HelpCenterScreen}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
    // </NavigationContainer>
  );
}
