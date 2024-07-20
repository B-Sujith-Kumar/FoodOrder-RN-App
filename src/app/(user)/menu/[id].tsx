import { View, Text, StyleSheet, Image, Pressable, Alert, ActivityIndicator } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/provider/CartProvider";
import { CartItem, PizzaSize } from "@/assets/types";
import { useProduct } from "@/src/api/products";
import { defaultImage } from "@/src/components/ProductListItem";
import RemoteImage from "@/src/components/RemoteImage";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreeen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString![0]);
  const {data: product, error, isLoading} = useProduct(id);
  const { addItem, items } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text style={styles.notFound}>Failed to fetch product</Text>;
  }
  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product?.name}` }} />
      <RemoteImage
        path={product?.image!}
        fallback={defaultImage}
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
      <Text style={styles.price}>${product?.price}</Text>
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
