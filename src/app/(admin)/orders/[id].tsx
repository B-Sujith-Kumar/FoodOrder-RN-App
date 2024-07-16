import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { FlatList } from "react-native";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);
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
