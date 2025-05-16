import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SafeAreaView, Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavouriteCard from "../../components/FavouriteCard";
import { useNavigation } from "expo-router";
import PetDescription from "../../components/PetDescription";
import { useFocusEffect } from '@react-navigation/native';
import { Image } from "expo-image";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const { width, height } = Dimensions.get('window');


export default function Favourite() {
  const [ viewType, setViewType ] = useState("list");
  const [ likedPets, setLikedPets ] = useState([]);
  const navigation = useNavigation();
  const [ selectedPet, setSelectedPet ] = useState(null);
  const router = useRouter();


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
          <TouchableOpacity 
            style={styles.iconPadding}
            onPress={() => router.replace("/")}
          >
            <Image 
              source={require("../../assets/images/Left.png")}
              style={styles.backArrowIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>My Paw-tential Matches</Text>
          <TouchableOpacity style={styles.iconPadding}>
            <Image
              source={require("../../assets/images/Share.png")}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.borderLine}/>
        <View style={styles.favouriteContainer}>
          <View style={styles.topRow}>
            <Text style={styles.title}>Favourites</Text>
            <View style={styles.topRight}>
              <TouchableOpacity
                style={[styles.iconBase,
                viewType === "list" ? styles.activeIcon : styles.inactiveIcon, styles.listIcon,
                ]}
                onPress={() => setViewType("list")}
              >
                <FontAwesome5 name="list" size={13} color="#0961A7" style={{marginTop: 4}}/>
                <Text style={styles.iconText}>List</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconBase,
                viewType === "grid" ? styles.activeIcon : styles.inactiveIcon, styles.gridIcon,
                ]}
                onPress={() => setViewType("grid")}
              >
                <MaterialCommunityIcons name="grid-large" size={16} color="#0961A7" style={{marginTop: 2}}/>
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
          key={viewType}
          data={likedPets}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewType === "grid" ? 2 : 1}
          columnWrapperStyle={
            viewType === "grid" ? { justifyContent: "space-between", paddingHorizontal: width * 0.055, } : null
          }
          renderItem={({ item }) => (
            <FavouriteCard
              name={item.name}
              age={item.age}
              image={item.image}
              onPress={() => setSelectedPet(item)}
              id={item.id}
              breed={item.breed}
              gender={item.gender}
              viewType={viewType}
              location={item.location}
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
    backgroundColor: "#FFFFFF"
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
  iconPadding: {
    padding: width * 0.02,
    backgroundColor: "#e8e8e8",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center"
  },
  backArrowIcon: {
    height: width * 0.05,
    width: width * 0.05
  },
  shareIcon: {
    height: width * 0.05,
    width: width * 0.05
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  topRight: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: width * 0.375,
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
  iconBase: {
    borderWidth: 1.5,
    borderColor: "#b5dcfb",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A4A4A4",
    paddingRight: 6,
    paddingLeft: 9,
    paddingVertical: 3
  },
  listIcon: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  iconText: {
    paddingLeft: 6,
    fontSize: 14,
    color: "#0961A7",
    fontWeight: 500
  },
  gridIcon: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  activeIcon: {
    backgroundColor: "#b5dcfb"
  },
  inactiveIcon: {
    backgroundColor: "white"
  },
  favouriteContainer: {
    paddingHorizontal: width * 0.065,
    paddingTop: height * 0.0125,
    paddingBottom: height * 0.03
  }
})
