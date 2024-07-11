import { View, Text, Platform, StyleSheet, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { useCart } from "../provider/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const CartScreen = () => {
  const { items } = useCart();
  return (
    <View style={{padding: 10}}>
      {items.length > 0 && (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => <CartListItem cartItem={item} />}
            contentContainerStyle={{}}
          />
          <Button text="Checkout" onPress={() => {}} />
        </>
      )}
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
