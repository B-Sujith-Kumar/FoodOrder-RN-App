import { View, Text, FlatList } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { Order, OrderItem } from "@/assets/types";

const OrdersScreen = () => {
  return (
    <>
      {/* <Stack.Screen options={{title: "Orders"}} /> */}
      <FlatList
        data={orders}
        renderItem={({ item }: { item: Order }) => (
          <OrderListItem order={item} />
        )}
      />
    </>
  );
};

export default OrdersScreen;
