import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import { Order, OrderItem } from "@/assets/types";
import { useAdminOrderList } from "@/src/api/orders";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderListener } from "@/src/api/orders/subscription";

const OrdersScreen = () => {
  const { data, error, isLoading } = useAdminOrderList({ archived: false });
  let orders = data;
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  useInsertOrderListener();

  return (
    <>
      {/* <Stack.Screen options={{title: "Orders"}} /> */}
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
};

export default OrdersScreen;
