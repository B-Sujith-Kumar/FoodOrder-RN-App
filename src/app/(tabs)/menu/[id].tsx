import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const ProductDetailsScreeen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: `Details: ${id}` }} />
      <Text style={styles.text}>Product Details Screeen {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});

export default ProductDetailsScreeen;
