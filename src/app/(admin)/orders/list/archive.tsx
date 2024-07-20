import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import { Order, OrderItem } from "@/assets/types";
import { useAdminOrderList } from "@/src/api/orders";

const OrdersScreen = () => {
  const { data, error, isLoading } = useAdminOrderList({ archived: true });
  let orders = data;
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }
  return (
    <>
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
