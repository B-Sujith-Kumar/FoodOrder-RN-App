import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order, OrderItem, Tables } from "@/assets/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";

dayjs.extend(relativeTime);

type OrderListItemProps = {
    order: Tables<"orders">
}

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.orderContainer}>
        <View style={{ gap: 9 }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Order #{order.id}
          </Text>
          <Text style={{ color: "white" }}>
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {order.status}
        </Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 10,
  },
});

export default OrderListItem;
