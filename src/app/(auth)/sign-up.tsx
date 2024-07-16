import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { Link } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder=""
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button text="Create Account" onPress={() => {}}></Button>
      <Link href="/(auth)/sign-in" style={{marginVertical: 15}}>
          <Text
            style={{
              color: "white",
              marginVertical: 20,
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Already have an account? Sign In
          </Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
});

export default SignUp;
