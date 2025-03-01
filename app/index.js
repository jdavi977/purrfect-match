import { useNavigation } from "expo-router";
import React, {useState, useEffect} from "react";
import { View } from "react-native";
import Card from "../components/Card.js";
import {petData as petDataArray} from "../utils/petData";
import Swiper from "react-native-deck-swiper";


export default function Index() {
  const navigation = useNavigation();

  const [petData, setPetData] = useState(petDataArray);
  const [likedPets, setLikedPets] = useState([]);
  const [dislikedPets, setDislikedPets] = useState([]);

  const handleLiked = (index) => {
    setLikedPets((prev) => ([...prev, petData[index]]));
  };

  const handleDisliked = (index) => {
    setDislikedPets((prev) => ([...prev, petData[index]]));
  };

  const handleOutline = (colour) => {
    if (colour === "green") {

    } else {
// borderColor: "green",
// borderWidth: 5,
// borderRadius: 25
    }
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      <Swiper 
        cards = {petData}
        renderCard = { (card) =>  (
          <Card 
            key= {card.name}
            name = {card.name}
            age = {card.age}
            breed = {card.breed}
            image = {card.image}
          />
        )}
        onSwipedRight = {handleLiked}
        onSwipedLeft = {handleDisliked}
        horizontalThreshold={225}
        verticalSwipe={false}
        cardIndex = {0}
        infinite
        backgroundColor="transparent"
      />
    </View>
  );
}
