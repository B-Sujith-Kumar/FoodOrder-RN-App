import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const OrderLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: "Orders" }} /> */}
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OrderLayout;
