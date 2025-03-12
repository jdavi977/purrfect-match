import React from "react";
import { Text, View, StyleSheet, Dimensions, Button } from "react-native";
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import CardButton from "../components/CardButtons.js";



const {width, height} = Dimensions.get("screen");

const PetDescription = ({ pet, onClose }) => {
    if (!pet) return null; 

    return (
        <View style={styles.container}>
            <View style={styles.closeButtonContainer}>
                <CardButton
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <FontAwesome name="angle-left" size={24} color="black" />
                </CardButton>
            </View>
            <Image source={pet.image} style={styles.image} />
            <View style={styles.ageContainer}>
                <Text style={styles.age}>{pet.age}</Text>
                <Text style={styles.weight}>{pet.weight}</Text>
                <Text style={styles.breed}>{pet.gender}</Text>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.breed}>{pet.breed}</Text>
                <Text style={styles.name}>{pet.name}</Text>
                <Text style={styles.location}>{pet.location}</Text>
            </View>
            <View style={styles.aboutMeContainer}>
                <Text style={styles.aboutMe}>About me</Text>
            </View>
            <View style={styles.lifestyleContainer}>
                <Text style={styles.lifestyle}>Lifestyle Preference</Text>

            </View>

            <CardButton
                    style={styles.adoptionContainer}
                    onPress={onClose}
                >
                    <Text>Apply for adoption</Text>
                </CardButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: "100%",
        height: height * 0.35,
    },
    ageContainer: {
        justifyContent: "center",
        flexDirection: 'row',
        gap: 60
    },
    nameContainer: {

    },
    aboutMeContainer: {

    },
    lifestyleContainer: {

    },
    closeButtonContainer: {
        position: "absolute",
        flexDirection: 'row',
        top: height * 0.06,
        width: width * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 110,
        position: 'absolute',
        zIndex: 10,
    },
    adoptionContainer: {
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "aqua",

    },
    aboutMe: {
        fontSize: 30,
    },
    lifestyle: {
        fontSize: 30,
    },
    closeButton: {
        height: 40,
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

})

export default PetDescription;
