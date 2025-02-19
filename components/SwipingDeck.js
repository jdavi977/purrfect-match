import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";


const SwipingDeck = () => {
    const [pets, setPets] = useState([
        { name: 'Bella', breed: 'Labrador' },
        { name: 'Charlie', breed: 'Beagle' },
        { name: 'Max', breed: 'Golden Retriever' }
    ]);

    const [likedPets, setLikedPets] = useState([]);

    const [dislikePets, setDislikePets] = useState([]);

    const handleLikedPets = (index) => {
        console.log("Liked pet", pet[index].name);
    };

    const handleDislikedPets = (index) => {
        console.log("Disliked", pet[index].name);
    };

    return (
        <View style={styles.container}>
            <Swiper>
                cards = {pets}
                renderCard={(pet) => (
                    <View>
                        <Text>{pet.name}</Text>
                        <Text>{pet.breed}</Text>
                    </View>
                )}
                onSwipedRight={handleLikedPets}
                onSwipedLeft={handleDislikedPets}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    }
});

export default SwipingDeck;