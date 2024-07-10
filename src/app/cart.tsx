import { View, Text, Platform, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { useCart } from "../provider/CartProvider";

const CartScreen = () => {
  const { items } = useCart();
  return (
    <View>
      <Text style={styles.text}>Cart items length : {items.length}</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});

export default CartScreen;
