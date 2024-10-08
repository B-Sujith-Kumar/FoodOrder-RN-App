import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { FlatList } from "react-native";
import { OrderStatusList } from "@/assets/types";
import Colors from "@/src/constants/Colors";
import { useOrderDetails, useUpdateOrder } from "@/src/api/orders";
import { notifyUser } from "@/src/lib/notifications";

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString![0]);
  const { data: order, error, isLoading } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch the orders</Text>;
  }
  const updateStatus = async (status: string) => {
    await updateOrder({ id, updatedFields: { status } });
    notifyUser({...order, status});
  };
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
          ListFooterComponent={() => (
            <>
              <Text style={{ fontWeight: "bold" }}>Status</Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => updateStatus(status)}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        order?.status === status
                          ? Colors.light.tint
                          : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          order?.status === status
                            ? "white"
                            : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        />
      </View>
    </>
  );
};

export default OrderDetailsScreen;
