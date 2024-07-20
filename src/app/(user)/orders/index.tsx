import {
  View,
  Text,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import { Order, OrderItem } from "@/assets/types";
import { useMyOrderList } from "@/src/api/orders";

const OrdersScreen = () => {
  const { data: orders, error, isLoading } = useMyOrderList();
  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderListItem order={item} />
        )}
      />
    </>
  );
};

export default OrdersScreen;
