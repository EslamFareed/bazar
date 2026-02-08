import { COLORS } from "@/app/constants/app_colors";
import { RootParams } from "@/app/navigation";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootParams, "OrderHistoryRoute">;

const ordersData = [
  {
    id: "1",
    title: "The Da vinci Code",
    status: "Delivered",
    items: 1,
  },
  {
    id: "2",
    title: "Carrie Fisher",
    status: "Delivered",
    items: 5,
  },
  {
    id: "3",
    title: "The Waiting",
    status: "Cancelled",
    items: 2,
  },
];

export default function OrderHistoryScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>October 2021</Text>

        <View style={styles.ordersCard}>
          {ordersData.map((order, index) => (
            <View key={order.id}>
              <View style={styles.orderItem}>
                <Image
                  source={require("../../assets/images/ads.png")}
                  style={styles.orderImage}
                />
                <View style={styles.orderInfo}>
                  <Text style={styles.orderTitle}>{order.title}</Text>
                  <View style={styles.orderMeta}>
                    <Text
                      style={[
                        styles.orderStatus,
                        {
                          color:
                            order.status === "Delivered"
                              ? "#22C55E"
                              : "#E53E3E",
                        },
                      ]}
                    >
                      {order.status}
                    </Text>
                    <Text style={styles.orderDot}> • </Text>
                    <Text style={styles.orderItems}>{order.items} items</Text>
                  </View>
                </View>
              </View>
              {index < ordersData.length - 1 && (
                <View style={styles.orderSeparator} />
              )}
            </View>
          ))}
        </View>
      </View>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  ordersCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: 16,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 14,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  orderMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  orderDot: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  orderItems: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  orderSeparator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 4,
  },
});
