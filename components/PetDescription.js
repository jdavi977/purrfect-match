import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { getRescueGroupsPets } from "../api/api-conn.js";
import CardButton from "../components/CardButtons.js";
import { formatPetDescription as formatHtmlDescription } from "../utils/htmlUtils";
import formatPetDescription from "../api/gemini/formatPetDescription";
import extractPetHealth from "../api/gemini/extractPetHealth";

const { width, height } = Dimensions.get("screen");

const PetDescription = ({ pet, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [readMore, setReadMore] = useState(false);
  const [petData, setPetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [healthData, setHealthData] = useState([]);
  const [isHealthLoading, setIsHealthLoading] = useState(false);
  const [formattedDescription, setFormattedDescription] = useState("");
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);

  // Fetch pets from Petfinder API
  useEffect(() => {
    async function fetchPets() {
      setIsLoading(true);
      try {
        const pets = await getRescueGroupsPets();
        setPetData(pets || []);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPets();
  }, []);
  
  // Format pet description when pet changes or when about tab is selected
  useEffect(() => {
    async function fetchFormattedDescription() {
      if (!pet || activeTab !== "about") return;
      
      setIsDescriptionLoading(true);
      try {
        // Use Gemini to format the description for mobile
        const formattedText = await formatPetDescription(
          pet.description,
          pet,
          pet.id // For caching
        );
        setFormattedDescription(formattedText || formatHtmlDescription(pet.description));
      } catch (error) {
        console.error("Error formatting description:", error);
        setFormattedDescription(formatHtmlDescription(pet.description));
      } finally {
        setIsDescriptionLoading(false);
      }
    }
    
    fetchFormattedDescription();
  }, [pet, activeTab]);
  
  // Fetch health data when pet changes or when health tab is selected
  useEffect(() => {
    async function fetchHealthData() {
      if (!pet || activeTab !== "health") return;
      
      setIsHealthLoading(true);
      try {
        // Use the pet's description and data to generate health information
        const healthInfo = await extractPetHealth(
          pet.description,
          pet,
          pet.id // For caching
        );
        setHealthData(healthInfo || []);
      } catch (error) {
        console.error("Error extracting health data:", error);
        setHealthData(["Health information unavailable"]);
      } finally {
        setIsHealthLoading(false);
      }
    }
    
    fetchHealthData();
  }, [pet, activeTab]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // Early return if pet is null or undefined
  if (!pet) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={pet.image} style={styles.image} />

        {/* Close and Like Buttons */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => onClose(isLiked)}>
          <FontAwesome name="angle-left" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
          <FontAwesome
            name={isLiked ? "heart" : "heart-o"}
            size={28}
            color="red"
          />
        </TouchableOpacity>

        {/* Age, Weight, Gender */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>{pet.age}</Text>
            <Text style={styles.infoLabel}>Age</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>{pet.size}</Text>
            <Text style={styles.infoLabel}>Size</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>{pet.gender}</Text>
            <Text style={styles.infoLabel}>Gender</Text>
          </View>
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
          <Text style={styles.sectionTitle}>
            Social Interaction & Care Overview
          </Text>
          <View style={styles.socialRow}>
            <View style={styles.socialItem}>
              <FontAwesome name="child" size={20} color="#4A56E2" />
              <Text>
                Good with Children: {pet.environment?.children ? 
                  (typeof pet.environment.children === 'string' ? pet.environment.children : 'Yes') : 
                  (pet.isKidsOk || 'Unknown')}
              </Text>
            </View>
            <View style={styles.socialItem}>
              <MaterialIcons name="healing" size={20} color="#4A56E2" />
              <Text>
                Special Care: {pet.attributes?.special_needs ? 'Yes' : 
                  (pet.isSpecialNeeds && pet.isSpecialNeeds !== 'Unknown' ? 'Yes' : 'No')}
              </Text>
            </View>
            <View style={styles.socialItem}>
              <FontAwesome name="paw" size={20} color="#4A56E2" />
              <Text>
                Dog Friendly: {pet.environment?.dogs ? 
                  (typeof pet.environment.dogs === 'string' ? pet.environment.dogs : 'Yes') : 
                  (pet.isDogsOk || 'Unknown')}
              </Text>
            </View>
            <View style={styles.socialItem}>
              <FontAwesome name="cat" size={20} color="#4A56E2" />
              <Text>
                Cat Friendly: {pet.environment?.cats ? 
                  (typeof pet.environment.cats === 'string' ? pet.environment.cats : 'Yes') : 
                  (pet.isCatsOk || 'Unknown')}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabContainer}>
          {["about", "health", "resources"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={
                  activeTab === tab ? styles.activeTabText : styles.tabText
                }>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === "about" && (
            <View>
              {isDescriptionLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#4A56E2" />
                  <Text style={styles.loadingText}>Enhancing description...</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.descriptionText}>
                    {formattedDescription && formattedDescription.length > 150
                      ? readMore
                        ? formattedDescription
                        : `${formattedDescription.substring(0, 150)}...`
                      : formattedDescription}
                  </Text>
                  {formattedDescription && formattedDescription.length > 150 && (
                    <TouchableOpacity onPress={() => setReadMore(!readMore)}>
                      <Text style={styles.readMoreText}>
                        {readMore ? "Show Less" : "Read More"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          )}
          {activeTab === "health" && (
            <View>
              <Text style={styles.descriptionText}>Health information for {pet.name}:</Text>
              {isHealthLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#4A56E2" />
                  <Text style={styles.loadingText}>Analyzing health information...</Text>
                </View>
              ) : (
                <View style={styles.bulletContainer}>
                  {healthData && healthData.length > 0 ? (
                    healthData.map((item, index) => (
                      <Text key={index} style={styles.bulletText}>
                        {"\u2022"} {item}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.bulletText}>
                      {"\u2022"} Health information unavailable
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}
          {activeTab === "resources" && (
            <Text>
              Starter kit included: leash, collar, favorite toy, and 1-month
              food supply.
            </Text>
          )}
        </View>

        {/* Lifestyle Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Is {pet.name} Right for You?</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.descriptionText}>
              If you're looking for an {pet.qualities && pet.qualities.length > 0 ? pet.qualities.join(", ").toLowerCase() : "loving"} pet who will thrive in a home committed to their needs, then {pet.name} might be the perfect addition to your family.
            </Text>
          </View>
        </View>

        {/* Personality Traits */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personality Traits</Text>
          <View style={styles.tagsContainerOutlined}>
            {pet.qualities && pet.qualities.length > 0 ? (
              pet.qualities.map((quality) => (
                <Text key={quality} style={styles.tagOutlined}>
                  {quality}
                </Text>
              ))
            ) : (
              <Text style={styles.tagOutlined}>Friendly</Text>
            )}
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
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={toggleLike}>
              <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.adoptionButton}
              onPress={() => console.log("Apply for Adoption")}>
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
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 8,
  },
  likeButton: {
    position: "absolute",
    top: height * 0.34,
    right: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  infoBox: { alignItems: "center" },
  infoValue: { fontSize: 16, color: "#555" },
  infoLabel: { fontSize: 12, color: "gray" },
  nameSection: { padding: 20 },
  breedText: { fontSize: 12, color: "gray" },
  nameText: { fontSize: 28, fontWeight: "bold", color: "#333" },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  locationText: { fontSize: 14 },
  viewLocation: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  sectionContainer: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  socialRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  socialItem: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabContainer: { flexDirection: "row", marginHorizontal: 20, marginTop: 10 },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeTab: { borderColor: "#4A56E2" },
  tabText: { color: "gray" },
  activeTabText: { color: "#4A56E2", fontWeight: "bold" },
  tabContent: { padding: 20 },
  readMoreText: { color: "#4A56E2", marginTop: 5 },
  descriptionText: { fontSize: 16, lineHeight: 24, color: "#333" },
  bulletContainer: { marginTop: 10 },
  bulletText: { marginBottom: 5, fontSize: 16, color: "#555" },
  lifestyleContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    marginTop: 10,
    justifyContent: "space-between",
  },
  lifestyleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9ff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    width: "48%",
    borderLeftWidth: 3,
    borderLeftColor: "#4A56E2",
  },
  lifestyleText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    fontWeight: "500",
  },
  tagsContainerOutlined: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 5,
  },
  tagOutlined: {
    borderColor: "#4A56E2",
    borderWidth: 1,
    color: "#4A56E2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  shelterListing: { padding: 20 },
  shelterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  favoriteButton: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  favoriteButtonText: { fontSize: 16, color: "black" },
  adoptionButton: {
    backgroundColor: "#4A56E2",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  adoptionButtonText: { fontSize: 16, color: "white", fontWeight: "bold" },
});

export default PetDescription;
