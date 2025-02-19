import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";


const SwipingDeck = () => {
    const [likedPets, setLikedPets] = useState([]);
    const [dislikedPets, setDislikedPets] = useState([]);

    const handleLikedPets = (index) => {
        setLikedPets((prev) => ([...prev, pets[index]]));
    };
    
    const handleDislikedPets = (index) => {
        setDislikedPets((prev) => ([...prev, pets[index]]));
    };

    useEffect(() => {
        console.log("Liked pets: ", likedPets);}, [likedPets]);
    
    useEffect(() => {
        console.log("Disliked pets: ", dislikedPets)}, [dislikedPets]);

    return (
        <Text>Hello</Text>
    )
}

export default SwipingDeck;