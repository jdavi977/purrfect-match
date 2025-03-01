import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";


const {width, height} = Dimensions.get("screen");

const Card = ({name, age, breed, image}) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,.9)']}
                style={styles.gradient}
                >
                    <View style={styles.userContainer}>
                        <Text style={styles.nameText}>{name}, {age}</Text>
                        <Text style={styles.breedText}>{breed}</Text>
                    </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            position: "absolute",
            top: -30,
        },
        userContainer: {
            position: "absolute",
            bottom: 24,
            left: 24
        },
        image: {
            width: width * 0.9,
            height: height * 0.67,
            borderRadius: 20
        },
        gradient: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 300,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
        },
        nameText: {
            fontSize: 40,
            color: "white",
            fontWeight: 300
        },
        breedText: {
            fontSize: 20,
            color: "white",
            fontWeight: 300
        },
});

export default Card;