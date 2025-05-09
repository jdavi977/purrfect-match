import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SafeAreaView, Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavouriteCard from "../../components/FavouriteCard";
import { useNavigation } from "expo-router";
import PetDescription from "../../components/PetDescription";
import { useFocusEffect } from '@react-navigation/native';
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');


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
          <TouchableOpacity>
            <Image 
              source={require("../../assets/images/Left.png")}
              style={{ width: width * 0.02, height: height * 0.025, marginLeft: width * 0.02}}
              
            />
          </TouchableOpacity>
          <Text style={styles.title}>My Paw-tential Matches</Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/Share.png")}
              style={{ width: width * 0.045, height: height * 0.020, marginRight: width * 0.02}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.borderLine}/>
        <View style={styles.favouriteContainer}>
          <View style={styles.topRow}>
            <Text style={styles.title}>Favourites</Text>
            <View style={styles.topRight}>
              <TouchableOpacity
                style={styles.listIcon}
              >
                <Image 
                  source={require("../../assets/images/List.png")}
                  style={{ width: 15, height: 15}}
                />
                <Text style={styles.iconText}>List</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.gridIcon}
              >
                <Image
                  source={require("../../assets/images/Grid.png")}
                  style={{ width: 15, height: 15}}
                />
                <Text style={styles.iconText}>Grid</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.petSaved}>
            <FontAwesome name="heart" size={13} color="#FF3366" style={styles.heartIcon} />
            <Text style={styles.petSavedText}>{likedPets.length} pets saved</Text>
          </View>
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
              id={item.id}
              breed={item.breed}
              gender={item.gender}
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
  container: {
    flex: 1,
  },
  headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: height * 0.045,
      paddingLeft: 15,
      paddingRight: 15,
  },
  title: {
    fontWeight: 600,
    fontSize: 19,
  },
  borderLine: {
    height: 2,
    backgroundColor: "#F6F6F6",
    marginVertical: 8
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  topRight: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: width * 0.38,
  },
  heartIcon: {
    marginTop: height * 0.005
  },
  petSaved: {
    flexDirection: "row",
  },
  petSavedText: {
    marginLeft: width * 0.01,
    fontWeight: 500,
    color: "#a4a4a4",
  },
  listIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    paddingRight: 5,
    paddingLeft: 9,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5"
  },
    iconText: {
    paddingLeft: 8,
    fontSize: 16,
  },
  gridIcon: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 9,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  gridText: {
    fontSize: 16,
  },
  favouriteContainer: {
    paddingHorizontal: width * 0.065,
    paddingTop: height * 0.0125,
    paddingBottom: height * 0.03
  }
})
