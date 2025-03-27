import { useNavigation } from "expo-router";
import React, {useState, useEffect, useRef} from "react";
import { View, StyleSheet, Modal, Dimensions, Text } from "react-native";
import Card from "../components/Card.js";
import {petData as petDataArray} from "../utils/petData";
import Swiper from "react-native-deck-swiper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CardButton from "../components/CardButtons.js";
import NavigationButtons from "../components/NavigationButtons.js"
import { FontAwesome } from '@expo/vector-icons';
import PetDescription from "../components/PetDescription.js";
import {useRouter} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get("screen");


const ICON_SIZE = 28;

export default function Index() {
  const navigation = useNavigation();
  const swiperRef = useRef(null);

  //const [swipeDirection, setSwipeDirection] = useState(null);
  const [petData, setPetData] = useState(petDataArray);
  const [likedPets, setLikedPets] = useState([]);
  const [dislikedPets, setDislikedPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);

  const router = useRouter();

  const handleLiked = (index) => {
    const pet = petData[index];
  
    // Only add if not already in the likedPets array (by id)
    setLikedPets((prev) => {
      const alreadyLiked = prev.some((p) => p.id === pet.id);
      if (!alreadyLiked) {
        return [...prev, pet];
      }
      return prev;
    });
  };

  const handleDisliked = (index) => {
    setDislikedPets((prev) => ([...prev, petData[index]]));
  };

  useEffect(() => {
    const saveLikedPets = async () => {
      try {
        await AsyncStorage.setItem("likedPets", JSON.stringify(likedPets));
      } catch (error) {
        console.error("Error saving liked pets:", error);
      }
    };
  
    saveLikedPets();
  }, [likedPets]);

  useEffect(() => {
    console.log("Pets disliked: ", dislikedPets)
  }, [dislikedPets]);

  // If there are no more pets it will loop back
  useEffect(() => {
    if (!petData.length) { 
      setPetData(petDataArray);
    }
  }, [petData.length]);

  useEffect(() => {
    navigation.setOptions({
       title: "Browse Pets",
       headerTitleAlign: "center"
        });
  }, [navigation]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.subContainer}>
        <Swiper
          ref = {swiperRef}
          cards = {petData}
          renderCard = { (card) =>  (
            <Card 
              name = {card.name}
              age = {card.age}
              breed = {card.breed}
              image = {card.image}
              location = {card.location}
              onPress={() => setSelectedPet(card)}
            />
          )}
          verticalSwipe={false}
          onSwipedRight = {handleLiked}
          onSwipedLeft = {handleDisliked}
          onSwiped = {() => setCardIndex((prev) => prev + 1)}
          horizontalThreshold={100} 
          cardIndex = {0}
          infinite
          backgroundColor="transparent"
        />
        <Modal visible={!!selectedPet} animationType="slide">
            <PetDescription 
            pet={selectedPet}
            likedPets={likedPets}
            setLikedPets={setLikedPets}
            onClose={(liked) => {
              if (liked) {
                setSelectedPet(null)
                swiperRef.current?.swipeRight()
              } else {
                setSelectedPet(null)
              }
            }} 
            handleLiked = {() => handleLiked(cardIndex)}
            />
        </Modal>
    </View>
    <View style={styles.cardButtonsContainer}>
      <CardButton
          style={styles.cardButtons}
          onTap={() => {
            swiperRef.current?.swipeLeft()
            //handleDisliked(cardIndex)
          }
          }
        >
        <FontAwesome name="thumbs-o-down" size={ICON_SIZE} color="black" />
      </CardButton>

      <CardButton
          style={styles.cardButtons}
          onTap={() => {
            swiperRef.current?.swipeRight()
            //handleLiked(cardIndex)
          }
          }
        >
        <FontAwesome name="heart-o" size={ICON_SIZE} color="red" />
      </CardButton>
    </View>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes full available height
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally 
    backgroundColor: "white",
  },
  subContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    width: "100%",
    maxWidth: "100%",
  },
  cardButtons: {
    height: 60,
    borderRadius: 40,
    aspectRatio: 1,
    backgroundColor: "white",
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  navigationButtons: {
    height: 60,
    aspectRatio: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardButtonsContainer: {
    position: "absolute",
    flexDirection: 'row',
    bottom: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 110,
    position: 'absolute',
    zIndex: 10,
  }, 
  navigationButtonsContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: 'row',
    bottom: 0,
    height: 120,
    borderTopWidth: 40,
    borderBottomWidth: 70,
    borderColor: "white",
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 20,
    position: 'absolute',
    zIndex: 1,
  },
  navLabel: {
  fontSize: 12,
  color: '#444',
  marginTop: 4,
},
});