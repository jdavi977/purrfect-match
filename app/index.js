import { useNavigation } from "expo-router";
import React, {useState, useEffect, useRef} from "react";
import { View, StyleSheet, Modal, Dimensions } from "react-native";
import Card from "../components/Card.js";
import {petData as petDataArray} from "../utils/petData";
import Swiper from "react-native-deck-swiper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CardButton from "../components/CardButtons.js";
import NavigationButtons from "../components/NavigationButtons.js"
import { FontAwesome } from '@expo/vector-icons';
import PetDescription from "../components/PetDescription.js"

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

  const handleLiked = (index) => {
    setLikedPets((prev) => ([...prev, petData[index]]));
  };

  const handleDisliked = (index) => {
    setDislikedPets((prev) => ([...prev, petData[index]]));
  };

  const tappedCard = (index) => {
    setSelectedPet(petData[index]); 
  };
  useEffect(() => {
    console.log("Pets liked: ", likedPets)
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
       title: "Purrfect Match",
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
            />
          )}
          verticalSwipe={false}
//          onSwiping={(x) => {
//            if (x > 100) {
//              setSwipeDirection((prev) => (prev !== "right" ? "right" : prev));
//          } else if (x < -100) {
//              setSwipeDirection((prev) => (prev !== "left" ? "left" : prev));
//          } else {
//              setSwipeDirection((prev) => (prev !== "reset" ? "reset" : prev));
//          }
//          }}
          
          //onSwiped={() => setSwipeDirection(null)}
          onSwipedRight = {handleLiked}
          onSwipedLeft = {handleDisliked}
          horizontalThreshold={100} 
          cardIndex = {0}
          infinite
          backgroundColor="transparent"
          onTapCard={tappedCard}
        />
        <Modal visible={!!selectedPet} animationType="slide">
            <PetDescription pet={selectedPet} onClose={() => setSelectedPet(null)} />
        </Modal>
    </View>
    <View style={styles.cardButtonsContainer}>
      <CardButton
          style={styles.cardButtons}
          onTap={() => swiperRef.current?.swipeLeft()}
        >
        <FontAwesome name="thumbs-o-down" size={ICON_SIZE} color="black" />
      </CardButton>

      <CardButton
          style={styles.cardButtons}
          onTap={() => swiperRef.current?.swipeRight()}
        >
        <FontAwesome name="heart-o" size={ICON_SIZE} color="red" />
      </CardButton>
    </View>
    <View style={styles.navigationButtonsContainer}>
      <NavigationButtons
        style={styles.navigationButtons}
      >
        <FontAwesome name="user" size={ICON_SIZE} color="black" />
      </NavigationButtons>
      <NavigationButtons
        style={styles.navigationButtons}
      >
        <FontAwesome name="user" size={ICON_SIZE} color="black" />
      </NavigationButtons>
      <NavigationButtons
        style={styles.navigationButtons}
      >            
        <FontAwesome name="user" size={ICON_SIZE} color="black" />
      </NavigationButtons>
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
    bottom: height * 0.12,
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
    borderTopWidth: 60,
    borderBottomWidth: 30,
    borderColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    position: 'absolute',
    zIndex: 1,
  }
});