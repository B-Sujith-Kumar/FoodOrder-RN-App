import { View, Text, StyleSheet, TextInput, Alert, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { defaultImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Invalid Input", "Name and price are required");
      setErrors("Name and price are required");
      return false;
    }
    if (isNaN(Number(price))) {
      Alert.alert("Invalid Price", "Price must be a number");
      setErrors("Price must be a number");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    Alert.alert(
      "Product Created",
      `Product has been created, name: ${name}, price: ${price}`
    );
    setErrors("");
    resetFields();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image || defaultImage }} style={styles.image} />
      <Text style={styles.selectImage} onPress={pickImage}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        placeholder="9.99"
        style={styles.input}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      {errors && <Text style={styles.error}>{errors}</Text>}
      <Button text="Create" onPress={onCreate}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    color: "balck",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 15,
    marginBottom: 20,
    borderRadius: 7,
  },
  error: {
    color: "red",
    marginBottom: 20,
    fontWeight: "bold",
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  selectImage: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.light.tint,
    marginVertical: 15,
  },
});

export default CreateProductScreen;
