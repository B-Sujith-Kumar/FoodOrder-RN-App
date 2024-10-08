import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { FlatList } from "react-native";
import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrderListener } from "@/src/api/orders/subscription";

const OrderDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseInt(typeof idString === "string" ? idString : idString![0]);
    const { data: order, error, isLoading } = useOrderDetails(id);
    useUpdateOrderListener(id);
    if (isLoading) {
      return <ActivityIndicator />
    }
    if (error) {
      return <Text>Failed to fetch the orders</Text>
    }
  return (
    <>
      <Stack.Screen options={{ title: `Order #${id}` }} />
        <View>
            <FlatList
                data={order!.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order!} />}
            />
        </View>
    </>
  );
};

export default OrderDetailsScreen;
