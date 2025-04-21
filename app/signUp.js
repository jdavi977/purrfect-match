import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();

  const goToMainApp = () => {
    router.replace("/(tabs)/"); // Move into tabbed app
};

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "" }} // Replace with your logo
        style={styles.image}
      />
      <Text style={styles.title}>You're One Step Closer to{"\n"}Your Purrfect Match!</Text>
      <Text style={styles.subtitle}>
        Sign up now to view profiles of pets that{"\n"}match your preferences and get started on {"\n"}your adoption journey!.
      </Text>
      <TouchableOpacity onPress={goToMainApp} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
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
    padding: 20 },
  image: {
     width: 150, 
     height: 150, 
     marginBottom: 32, 
     backgroundColor: "#ddd", 
     borderRadius: 8 },
  title: {
     fontSize: 24, 
     fontWeight: "bold", 
     textAlign: "center", 
     marginBottom: 12 },
  subtitle: { 
    fontSize: 16, 
    textAlign: "center", 
    color: "#555", marginBottom: 40 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  accountButtonText: { 
    color: "#007AFF", 
    fontSize: 16, 
    fontWeight: "600" 
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
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
