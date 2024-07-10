import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/provider/CartProvider";
import { CartItem, PizzaSize } from "@/assets/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreeen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const product = products.find((item) => item.id.toString() === id);
  if (!product) {
    return <Text style={styles.notFound}>Product not found!</Text>;
  }
  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product.name}` }} />
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.size}>Select size</Text>
      <View style={styles.sizeView}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            style={
              selectedSize === size ? styles.textView : styles.originalTextView
            }
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={
                selectedSize === size
                  ? styles.sizeText
                  : styles.originalSizeText
              }
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  notFound: { color: "white", fontSize: 20, marginTop: 20 },
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 35,
    marginBottom: 20,
  },
  size: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  sizeView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 35,
  },
  sizeText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  originalSizeText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  textView: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "gainsboro",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
  originalTextView: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default ProductDetailsScreeen;
