import Colors from "@/src/constants/Colors";
import { StyleSheet, Text, View, Image } from "react-native";
import products from "@/assets/data/products";

const product = products[1];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
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
    marginTop: 25,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
