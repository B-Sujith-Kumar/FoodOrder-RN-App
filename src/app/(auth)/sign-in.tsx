import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true)
    const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) {
        Alert.alert(error.message)
    }
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />
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
      <Button text={!loading ? "Sign In" : "Signing In..."} onPress={signIn} disabled={loading}></Button>
      <Link href="/(auth)/sign-up" style={{ marginVertical: 15 }}>
        <Text
          style={{
            color: "white",
            marginVertical: 20,
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Don't have an account? Sign Up
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
    width: "100%",
  },
});

export default SignIn;
