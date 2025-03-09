import { useNavigation } from "expo-router";
import React, {useState, useEffect, useRef} from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card.js";
import {petData as petDataArray} from "../utils/petData";
import Swiper from "react-native-deck-swiper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CardButton from "../components/CardButtons.js";
import {FontAwesome} from '@expo/vector-icons';

const ICON_SIZE = 29;

export default function Index() {
  const navigation = useNavigation();
  const swiperRef = useRef(null);

  const [swipeDirection, setSwipeDirection] = useState(null);
  const [petData, setPetData] = useState(petDataArray);
  const [likedPets, setLikedPets] = useState([]);
  const [dislikedPets, setDislikedPets] = useState([]);

  const handleLiked = (index) => {
    setLikedPets((prev) => ([...prev, petData[index]]));
  };

  const handleDisliked = (index) => {
    setDislikedPets((prev) => ([...prev, petData[index]]));
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
      <View
        style={styles.subContainer}
      >
        <Swiper 
          ref={swiperRef}
          cards = {petData}
          renderCard = { (card) =>  (
            <Card 
              key= {card.name}
              name = {card.name}
              age = {card.age}
              breed = {card.breed}
              image = {card.image}
              swipeDirection={swipeDirection}
            />
          )}
          verticalSwipe={false}
          onSwiping={(x) => {
            if (x > 100) {
              setSwipeDirection((prev) => (prev !== "right" ? "right" : prev));
          } else if (x < -100) {
              setSwipeDirection((prev) => (prev !== "left" ? "left" : prev));
          } else {
              setSwipeDirection((prev) => (prev !== "reset" ? "reset" : prev));
          }
          }}
          
          onSwiped={() => setSwipeDirection(null)}
          onSwipedRight = {handleLiked}
          onSwipedLeft = {handleDisliked}
          horizontalThreshold={100} 
          cardIndex = {0}
          infinite
          backgroundColor="transparent"
          //onTapCard={} use for pet profile
        />
      </View>
      <View style={styles.buttonsContainer}>
      <CardButton
          style={styles.button}
          onTap={() => swiperRef.current?.swipeLeft()}
        >
          <FontAwesome name="thumbs-o-down" size={ICON_SIZE} color="black" />
        </CardButton>
      <CardButton
          style={styles.button}
          onTap={() => swiperRef.current?.swipeRight()}
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
  },
  subContainer: {
    flex: 1, // Takes full available height
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    width: "100%",
  },

  button: {
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
  buttonsContainer: {
    flexDirection: 'row',
    bottom: 130,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 120,
    position: 'absolute',
    zIndex: 10,
  },
});