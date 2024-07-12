import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import React from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/provider/CartProvider";
import { CartItem, PizzaSize } from "@/assets/types";
import { FontAwesome } from "@expo/vector-icons";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreeen = () => {
  const { id } = useLocalSearchParams();
  const { addItem, items } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const product = products.find((item) => item.id.toString() === id);
  if (!product) {
    return <Text style={styles.notFound}>Product not found!</Text>;
  }
  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color="white"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: `${product.name}` }} />
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.price}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
    marginTop: 5,
    marginBottom: 20,
  },
});

export default ProductDetailsScreeen;
