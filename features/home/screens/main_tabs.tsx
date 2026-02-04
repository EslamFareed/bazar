import { COLORS } from "@/app/constants/app_colors";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "./cart_screen";
import CategoryScreen from "./category_screen";
import HomeScreen from "./home_screen";
import ProfileScreen from "./profile_screen";
import { RootParams } from "@/app/navigation";

// export type TabParams = {
//   Home: undefined;
//   Category: undefined;
//   Cart: undefined;
//   Profile: undefined;
// };

const Tab = createBottomTabNavigator<RootParams>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.darkGray,        
      }}
    >
      <Tab.Screen
        name="HomeRoute"
        component={HomeScreen}
        options={{
          title:"Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CategoryRoute"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartRoute"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileRoute"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
