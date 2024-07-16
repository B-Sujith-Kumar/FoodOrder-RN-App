import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { FlatList } from "react-native";
import { OrderStatusList } from "@/assets/types";
import Colors from "@/src/constants/Colors";

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
                ListFooterComponent={() => <>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                      {OrderStatusList.map((status) => (
                        <Pressable
                          key={status}
                          onPress={() => console.warn('Update status')}
                          style={{
                            borderColor: Colors.light.tint,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginVertical: 10,
                            backgroundColor:
                              order?.status === status
                                ? Colors.light.tint
                                : 'transparent',
                          }}
                        >
                          <Text
                            style={{
                              color:
                                order?.status === status ? 'white' : Colors.light.tint,
                            }}
                          >
                            {status}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </>
                  }
            />
        </View>
    </>
  );
};

export default OrderDetailsScreen;
