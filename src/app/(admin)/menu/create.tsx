import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import { defaultImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString![0]);
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

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

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    Alert.alert(
      "Product Created",
      `Product has been created, name: ${name}, price: ${price}`
    );
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          setErrors("");
          resetFields();
          router.back();
        },
      }
    );
    setErrors("");
    resetFields();
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }
    Alert.alert(
      "Product Created",
      `Product has been created, name: ${name}, price: ${price}`
    );
    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          setErrors("");
          resetFields();
          router.back();
        },
      }
    );
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

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel" },
      { text: "Delete", onPress: onDelete, style: "destructive" },
    ]);
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        Alert.alert("Product Deleted", "Product has been deleted");
        resetFields();
        router.replace("/(admin)");
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${isUpdating ? "Update Product" : "Create Product"}`,
        }}
      />
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
      <Button
        text={`${isUpdating ? "Update Product" : "Create"}`}
        onPress={onSubmit}
      ></Button>
      {isUpdating && (
        <Pressable style={{ ...styles.textButton }} onPress={confirmDelete}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Delete Product
          </Text>
        </Pressable>
      )}
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
  textButton: {
    color: "white",
    backgroundColor: "red",
    padding: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    borderRadius: 100,
    marginTop: 20,
  },
});

export default CreateProductScreen;
