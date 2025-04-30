import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import CardButton from "../components/CardButtons.js";

const { width, height } = Dimensions.get("screen");

const PetDescription = ({ pet, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [readMore, setReadMore] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={pet.image} style={styles.image} />

        {/* Close and Like Buttons */}
        <TouchableOpacity style={styles.closeButton} onPress={() => onClose(isLiked)}>
          <FontAwesome name="angle-left" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
          <FontAwesome name={isLiked ? "heart" : "heart-o"} size={28} color="red" />
        </TouchableOpacity>

        {/* Age, Weight, Gender */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}><Text style={styles.infoValue}>{pet.age}</Text><Text style={styles.infoLabel}>Age</Text></View>
          <View style={styles.infoBox}><Text style={styles.infoValue}>{pet.weight}</Text><Text style={styles.infoLabel}>Weight</Text></View>
          <View style={styles.infoBox}><Text style={styles.infoValue}>{pet.gender}</Text><Text style={styles.infoLabel}>Gender</Text></View>
        </View>

        {/* Name, Breed, Location */}
        <View style={styles.nameSection}>
          <Text style={styles.breedText}>{pet.breed}</Text>
          <Text style={styles.nameText}>{pet.name}</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>{pet.location}</Text>
            <Text style={styles.viewLocation}>View Location</Text>
          </View>
        </View>

        {/* Social Interaction */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Social Interaction & Care Overview</Text>
          <View style={styles.socialRow}>
            <View style={styles.socialItem}><FontAwesome name="child" size={20} color="#4A56E2" /><Text>Good with Children: Yes</Text></View>
            <View style={styles.socialItem}><MaterialIcons name="healing" size={20} color="#4A56E2" /><Text>Special Care: No</Text></View>
            <View style={styles.socialItem}><FontAwesome name="paw" size={20} color="#4A56E2" /><Text>Dog Friendly: Yes</Text></View>
            <View style={styles.socialItem}><FontAwesome name="cat" size={20} color="#4A56E2" /><Text>Cat Friendly: Limited</Text></View>
          </View>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabContainer}>
          {['about', 'health', 'resources'].map(tab => (
            <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
              <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === "about" && (
            <View>
              <Text>
                Barry is a happy, energetic golden retriever who loves to play fetch and snuggle! {readMore && "He thrives in outdoor environments and would love a home with a big backyard. Barry enjoys socializing with people and other pets."}
              </Text>
              <TouchableOpacity onPress={() => setReadMore(!readMore)}>
                <Text style={styles.readMoreText}>{readMore ? "Show Less" : "Read More"}</Text>
              </TouchableOpacity>
            </View>
          )}
          {activeTab === "health" && <Text>Vaccinated, neutered, and microchipped. Healthy and active!</Text>}
          {activeTab === "resources" && <Text>Starter kit included: leash, collar, favorite toy, and 1-month food supply.</Text>}
        </View>

        {/* Lifestyle Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lifestyle Preference</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>{"\u2022"} Barry thrives in an active household that enjoys outdoor adventures.</Text>
            <Text style={styles.bulletText}>{"\u2022"} He needs space to run and prefers a home with a yard or regular park trips.</Text>
          </View>
        </View>

        {/* Personality Traits */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personality Traits</Text>
          <View style={styles.tagsContainerOutlined}>
            <Text style={styles.tagOutlined}>Friendly</Text>
            <Text style={styles.tagOutlined}>Affectionate</Text>
            <Text style={styles.tagOutlined}>Curious</Text>
          </View>
        </View>

        {/* Behavioral Traits */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Behavioral Traits</Text>
          <View style={styles.tagsContainerOutlined}>
            <Text style={styles.tagOutlined}>Potty-trained</Text>
            <Text style={styles.tagOutlined}>Crate-trained</Text>
            <Text style={styles.tagOutlined}>Knows "Sit" command</Text>
          </View>
        </View>

        {/* Shelter Listing */}
        <View style={styles.shelterListing}>
          <Text style={styles.shelterTitle}>{pet.location}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.favoriteButton} onPress={toggleLike}>
              <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adoptionButton} onPress={() => console.log("Apply for Adoption")}> 
              <Text style={styles.adoptionButtonText}>Apply for Adoption</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1 },
  image: { width: "100%", height: height * 0.4 },
  closeButton: { position: 'absolute', top: 40, left: 20, backgroundColor: "white", borderRadius: 30, padding: 8 },
  likeButton: { position: 'absolute', top: height * 0.34, right: 20, backgroundColor: "white", borderRadius: 30, padding: 8 },
  infoContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
  infoBox: { alignItems: 'center' },
  infoValue: { fontSize: 16, color: "#555" },
  infoLabel: { fontSize: 12, color: "gray" },
  nameSection: { padding: 20 },
  breedText: { fontSize: 12, color: "gray" },
  nameText: { fontSize: 28, fontWeight: "bold", color: "#333" },
  locationRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  locationText: { fontSize: 14 },
  viewLocation: { fontSize: 14, color: "blue", textDecorationLine: "underline" },
  sectionContainer: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  socialRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  socialItem: { width: "45%", backgroundColor: "#fff", borderRadius: 10, padding: 15, borderWidth: 1, borderColor: "#ddd", flexDirection: "row", alignItems: "center", gap: 8 },
  tabContainer: { flexDirection: "row", marginHorizontal: 20, marginTop: 10 },
  tab: { flex: 1, alignItems: "center", padding: 10, borderBottomWidth: 2, borderColor: "transparent" },
  activeTab: { borderColor: "#4A56E2" },
  tabText: { color: "gray" },
  activeTabText: { color: "#4A56E2", fontWeight: "bold" },
  tabContent: { padding: 20 },
  readMoreText: { color: "#4A56E2", marginTop: 5 },
  bulletContainer: { marginTop: 10 },
  bulletText: { marginBottom: 5, fontSize: 16, color: "#555" },
  tagsContainerOutlined: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 5 },
  tagOutlined: { borderColor: "#4A56E2", borderWidth: 1, color: "#4A56E2", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  shelterListing: { padding: 20 },
  shelterTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  favoriteButton: { backgroundColor: "#f2f2f2", padding: 12, borderRadius: 8, width: "48%", alignItems: "center" },
  favoriteButtonText: { fontSize: 16, color: "black" },
  adoptionButton: { backgroundColor: "#4A56E2", padding: 12, borderRadius: 8, width: "48%", alignItems: "center" },
  adoptionButtonText: { fontSize: 16, color: "white", fontWeight: "bold" },
});

export default PetDescription;