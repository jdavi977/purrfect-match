import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import CardButton from "../components/CardButtons.js";

const { width, height } = Dimensions.get("screen");

const PetDescription = ({ pet, onClose }) => {
    if (!pet) return null; 

    return (
        <View style={styles.container}>

        <ScrollView style={styles.scrollContainer}>

            {/* Pet Image */}
            <Image source={pet.image} style={styles.image} />

            {/* Close Button */}
            <View style={styles.closeButtonContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <FontAwesome name="angle-left" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Like Button */}
            <View style={styles.cardButtonsContainer}>
                <CardButton
                    style={styles.cardButtons}
                    //onTap={() => swiperRef.current?.swipeRight()}
                >
                    <FontAwesome name="heart-o" size={30} color="red" />
                </CardButton>
            </View>

            {/* Age, Weight, Gender */}
            <View style={styles.ageContainer}>
                <View style={styles.ageInfo}>
                    <Text style={styles.ageValue}>{pet.age} years</Text>
                    <Text style={styles.ageLabel}>Age</Text>
                </View>
                <View style={styles.ageInfo}>
                    <Text style={styles.ageValue}>{pet.weight}</Text>
                    <Text style={styles.ageLabel}>Weight</Text>
                </View>
                <View style={styles.ageInfo}>
                    <Text style={styles.ageValue}>{pet.gender}</Text>
                    <Text style={styles.ageLabel}>Gender</Text>
                </View>
            </View>

            {/* Name, Breed, and Location */}
            <View style={styles.nameContainer}>
                <Text style={styles.breedText}>{pet.breed}</Text>
                <Text style={styles.nameText}>{pet.name}</Text>
                <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>{pet.location}</Text>
                    <Text style={styles.viewLocationText}>View the location</Text>
                </View>
            </View>

            {/* Animal Shelter Info */}
            <View style={styles.shelterInfo}>
                <Text style={styles.shelterText}>🐾 Pet has been at the animal shelter for an extended period.</Text>
            </View>

            {/* Description & Health Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={styles.tabTextActive}>Description</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Health</Text>
                </TouchableOpacity>
            </View>

            {/* About Me */}
            <View style={styles.aboutMeContainer}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <Text style={styles.aboutMeText}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                </Text>
            </View>

            {/* Lifestyle Preferences */}
            <View style={styles.lifestyleContainer}>
                <Text style={styles.sectionTitle}>Lifestyle Preference</Text>
                <View style={styles.tagsContainer}>
                    <Text style={styles.tag}>Energetic</Text>
                    <Text style={styles.tag}>Only dog in home</Text>
                    <Text style={styles.tag}>Unknown history with children</Text>
                </View>
            </View>

            {/* Apply for Adoption Button */}
            <TouchableOpacity style={styles.adoptionButton} onPress={() => console.log("Applying for adoption")}>
                <Text style={styles.adoptionButtonText}>Apply for Adoption</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 20,
    },
    image: {
        width: "100%",
        height: height * 0.35,
    },
    closeButtonContainer: {
        position: "absolute",
        flexDirection: 'row',
        top: height * 0.06,
        width: width * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    closeButton: {
        height: 35,
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
    cardButtonsContainer: {
        position: "absolute",
        flexDirection: 'row',
        top: height * 0.28,
        right: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 10,
    }, 
    cardButtons: {
        height: 60,
        borderRadius: 40,
        aspectRatio: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20
    },
    ageContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 10,
        paddingHorizontal: 20,
    },
    locationContainer: {
        flexDirection: "row",
        gap: 115,
    },
    ageInfo: {
        alignItems: "center",
    },
    ageValue: {
        fontSize: 14,
        color: "gray",
    },
    ageLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "gray",
    },
    nameContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    breedText: {
        fontSize: 12,
        color: "gray",
    },
    nameText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
    },
    locationText: {
        fontSize: 14,
        color: "#333",
    },
    viewLocationText: {
        fontSize: 14,
        color: "blue",
        textDecorationLine: 'underline',
    },
    shelterInfo: {
        backgroundColor: "#E6E8F3",
        padding: 12,
        borderRadius: 10,
        margin: 20,
    },
    shelterText: {
        fontSize: 14,
        color: "#333",
    },
    tabContainer: {
        flexDirection: "row",
        left: 15
    },
    tab: {
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    activeTab: {
        backgroundColor: "blue",
    },
    tabText: {
        color: "#333",
        fontSize: 14,
    },
    tabTextActive: {
        color: "white",
        fontSize: 14,
    },
    aboutMeContainer: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    aboutMeText: {
        fontSize: 14,
        color: "#555",
    },
    lifestyleContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 5,
    },
    tag: {
        backgroundColor: "#E6E8F3",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        fontSize: 14,
        color: "#333",
    },
    adoptionButton: {
        backgroundColor: "#4A56E2",
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 15,
        alignItems: "center",
    },
    adoptionButtonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});

export default PetDescription;
