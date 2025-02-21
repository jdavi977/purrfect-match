import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";



const Card = ({name, age, breed, image}) => {
    <View stlye={styles.container}>
        <Image source={image} style={styles.image}/>
        <LinearGradient
            color={['transparent', 'rgba(0,0,0,0.9']}
            style={styles.gradient}
        >
        <View style={styles.userContainer}>
            <Text style={styles.nameText}>{name}, {age}</Text>
            <Text style={styles.breedText}>{breed}</Text>
        </View>
        </LinearGradient>
    </View>
}

const styles = StyleSheet.create({
    container: {

    },
    
    image: {
        
    },

    gradient: {

    },
    userContainer: {

    },
    nameText: {

    },
    breedText: {

    },


});

export default Card;