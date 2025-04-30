import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SafeAreaView, Modal, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavouriteCard from "../../components/FavouriteCard";
import { useNavigation } from "expo-router";
import PetDescription from "../../components/PetDescription";
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons";

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

  useFocusEffect(
    React.useCallback(() => {
      const loadLikedPets = async () => {
        try {
          const storedPets = await AsyncStorage.getItem("likedPets");
          if (storedPets) {
            setLikedPets(JSON.parse(storedPets));
          } else {
            setLikedPets([]); // Clear list if nothing is saved
          }
        } catch (error) {
          console.error("Error loading liked pets:", error);
        }
      };
  
      loadLikedPets();
    }, [])
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Favourite List</Text>
          <TouchableOpacity style={styles.filterButton}>
            <FontAwesome name="sliders" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.layoutContainer}>
        <TouchableOpacity style={styles.leftFilter}>
          <FontAwesome name="heart" size={20} color="#FF3366" style={styles.heartIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightFilter}>
          <FontAwesome name="heart" size={20} color="#FF3366" style={styles.heartIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={likedPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FavouriteCard
            name={item.name}
            age={item.age}
            image={item.image}
            onPress={() => setSelectedPet(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <Modal visible={!!selectedPet} animationType="slide">
            <PetDescription 
            pet={selectedPet}
            likedPets={likedPets}
            setLikedPets={setLikedPets}
            onClose={() => setSelectedPet(null)} 
            handleLiked = {() => handleLiked(cardIndex)}
            />
        </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#eee',
    padding: 7,
    borderRadius: 20,
    marginLeft: 210,  
  },
  headerContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  layoutContainer: {
    flexDirection: 'row',
  },
  leftFilter: {
    backgroundColor: "white",
    padding: 7,
  },
  rightFilter: {
    backgroundColor: "white",
    padding: 7,
  },
  container: {
    backgroundColor: "white",
  }
})
