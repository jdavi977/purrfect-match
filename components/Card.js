import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";

const {width, height} = Dimensions.get("screen");

const Card = ({name, age, breed, image, location, onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
                <Image source={image} style={styles.image} />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,.9)']}
                    style={styles.gradient}
                    >
                        <View style={styles.userContainer}>
                            <Text style={styles.breedText}>{breed}</Text>
                            <Text style={styles.nameText}>{name}, {age}</Text>
                            <Text style={styles.locationText}>{location}</Text>
                        </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            top: -30,
        },
        imageWrapper: {
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
          },
        outlineLeft: {
            borderColor: "red",
            borderWidth: 5,
            borderRadius: 25
        },

        outlineRight: {
            borderColor: "green",
            borderWidth: 5,
            borderRadius: 25
        },

        outlineReset: {
            borderColor: "white",
            borderWidth: 0,
            borderRadius: 0
        },

        userContainer: {
            position: "absolute",
            bottom: 40,
            left: 15
        },
        image: {
            width: width * 0.9,
            height: height * 0.67,
            borderRadius: 20,
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
            fontSize: 27,
            color: "yellow",
        },
        breedText: {
            fontSize: 12,
            color: "white",
            fontWeight: 300,
        },
        locationText: {
            fontSize: 14,
            color: "white",
            height: 30,
        },
});

export default Card;