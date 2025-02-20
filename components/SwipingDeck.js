import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";

const pets = [
    {name: "Coco", breed: "hamster"},
    {name: "Mila", breed: "bunny"},
    {name: "Nori", breed: "bunny"}
];

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
        <View style={{justifyContent: "center", alignItems: "center"}}> 
        <Text>Hello</Text>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Swiper style={{justifyContent: "center", alignItems: "center"}}
                    cards={pets}
                    renderCard={(pet) => (
                        <View style={styles.card}>
                            <Text style>{pet.name}</Text>
                            <Text>{pet.breed}</Text>
                        </View>
                        )}
                    onSwipedRight={handleLikedPets}
                    onSwipedLeft={handleDislikedPets}
                    stackSize={3}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 300, 
        height: 400,
        backgroundColor: "white",
        justifyContent: "center", 
        alignItems: "center",
    },
})

export default SwipingDeck;