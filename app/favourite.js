import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SafeAreaView, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavouriteCard from "../components/FavouriteCard";
import { useNavigation } from "expo-router";
import PetDescription from "../components/PetDescription";

export default function Favourite() {
  const [likedPets, setLikedPets] = useState([]);
  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    navigation.setOptions({
       title: "Favourite List",
       headerTitleAlign: "center"
        });
  }, [navigation]);

  useEffect(() => {
    const loadLikedPets = async () => {
      try {
        const storedPets = await AsyncStorage.getItem("likedPets");
        if (storedPets) {
          setLikedPets(JSON.parse(storedPets));
        }
      } catch (error) {
        console.error("Error loading liked pets:", error);
      }
    };

    loadLikedPets();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={likedPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FavouriteCard
            name={item.name}
            age={item.age}
            breed={item.breed}
            image={item.image}
            onPress={() => setSelectedPet(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <Modal visible={!!selectedPet} animationType="slide">
        <PetDescription
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

})
