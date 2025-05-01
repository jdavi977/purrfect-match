import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getPets } from "../api/api-conn";

export default function IntroScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/questionnaire"); // Go to questionnaire screen
  };

  const goToMainApp = () => {
    router.replace("/(tabs)/"); // Move into tabbed app
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "" }} // Replace with your logo
        style={styles.image}
      />
      <Text style={styles.title}>Find Your{"\n"}Purrfect Match!</Text>
      <Text style={styles.subtitle}>
        Answer a few quick questions to discover{"\n"}pets that match your
        lifestyle and preferences.
      </Text>
      <TouchableOpacity onPress={handleStart} style={styles.button}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToMainApp} style={styles.accountButton}>
        <Text style={styles.accountButtonText}>I already have an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 32,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  accountButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  accountButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
});
