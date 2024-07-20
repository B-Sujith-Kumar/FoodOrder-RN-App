import { View } from "./Themed";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
import { Link, useSegments } from "expo-router";
import { Tables } from "@/assets/types";
import RemoteImage from "./RemoteImage";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: { product: Tables<'products'> }) => {
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.imageContainer}>
          <RemoteImage
            path={product.image}
            fallback={defaultImage}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price: {
    fontSize: 15,
    marginTop: 15,
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default ProductListItem;
