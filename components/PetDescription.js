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
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";


const { width, height } = Dimensions.get("screen");

const PetDescription = ({ pet, onClose, liked }) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [activeTab, setActiveTab] = useState("about");
  const [readMore, setReadMore] = useState(false);
  const [petData, setPetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [healthData, setHealthData] = useState([]);
  const [isHealthLoading, setIsHealthLoading] = useState(false);
  const [formattedDescription, setFormattedDescription] = useState("");
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);
  const router = useRouter();


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
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.iconPadding}
            onPress={() => onClose(isLiked)}
          >
            <Image 
              source={require("../assets/images/Left.png")}
              style={styles.backArrowIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Pawsonality Peek</Text>
          <TouchableOpacity style={styles.iconPadding}>
            <Image
              source={require("../assets/images/Share.png")}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.scrollContainer}>
        <Image source={pet.image} style={styles.image} />

        {/* Like Buttons */}
        <View style={styles.likeButton}>
          <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
            <FontAwesome
              name={isLiked ? "heart" : "heart-o"}
              size={17}
              color="#ff4081"
            />
          </TouchableOpacity>
        </View>

        {/* Age, Weight, Gender */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Sex</Text>
            <Text style={styles.infoValue}>{pet.age}/{pet.gender}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Age</Text>

            <Text style={styles.infoValue}>{pet.age}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Size</Text>
            <Text style={styles.infoValue}>{pet.size}</Text>
          </View>
        </View>

        {/* Name, Breed, Location */}
        <View style={styles.nameSection}>
          <Text style={styles.nameText}>{pet.name}</Text>
          <Text style={styles.breedText}>{pet.breed} │ {pet.id}</Text>
        </View>

        {/* Pet Highlights */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Pet Highlights
          </Text>
          <View >
            <View style={styles.socialItem}>
              <View style={styles.socialPadding}>
                <Image 
                  source={require("../assets/images/bHome.png")}
                  style={styles.socialIcon}
                />
              </View>
              <View>
                <Text style={styles.careTitle}>Living History</Text>
                <Text>
                  {pet.environment?.dogs ? 
                    (typeof pet.environment.dogs === 'string' ? pet.environment.dogs : 'Yes') : 
                    (pet.isDogsOk || 'Unknown')}
                </Text>
              </View>
            </View>
            <View style={styles.socialItem}>
              <View style={styles.socialPadding}>
                <Image 
                  source={require("../assets/images/bHealth.png")}
                  style={styles.socialIcon}
                />
              </View>
              <View>
                <Text style={styles.careTitle}>Vaccination Status</Text>
                <Text>
                  {pet.environment?.children ? 
                    (typeof pet.environment.children === 'string' ? pet.environment.children : 'Yes') : 
                    (pet.isKidsOk || 'Unknown')}
                </Text>
              </View>
            </View>
            <View style={styles.socialItem}>
              <View style={styles.socialPadding}>
                <Image 
                  source={require("../assets/images/bChip.png")}
                  style={styles.socialIcon}
                />
              </View>
              <View>
                <Text style={styles.careTitle}>Microchip Check</Text>
                <Text>
                  {pet.attributes?.special_needs ? 'Yes' : 
                    (pet.isSpecialNeeds && pet.isSpecialNeeds !== 'Unknown' ? 'Yes' : 'No')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Social Interaction */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Social Interaction & Care
          </Text>
          <View >
            <View style={styles.socialItem}>
              <View style={styles.socialPadding}>
                <Image 
                  source={require("../assets/images/bDog2.png")}
                  style={styles.socialIcon}
                />
              </View>
              <View>
                <Text style={styles.careTitle}>Dog-Compatible</Text>
                <Text>
                  {pet.environment?.dogs ? 
                    (typeof pet.environment.dogs === 'string' ? pet.environment.dogs : 'Yes') : 
                    (pet.isDogsOk || 'Unknown')}
                </Text>
              </View>
            </View>
            <View style={styles.socialItem}>
              <View style={styles.socialPadding}>
                <Image 
                  source={require("../assets/images/bCat2.png")}
                  style={styles.socialIcon}
                />
              </View>
              <View>
                <Text style={styles.careTitle}>Cat-Compatible</Text>
                <Text>
                  {pet.environment?.cats ? 
                    (typeof pet.environment.cats === 'string' ? pet.environment.cats : 'Yes') : 
                    (pet.isCatsOk || 'Unknown')}
                </Text>
              </View>
            </View>
            <View style={styles.socialItem}>
              <View style={styles.socialPadding}>
                <Image 
                  source={require("../assets/images/bKids.png")}
                  style={styles.socialIcon}
                />
              </View>
              <View>
                <Text style={styles.careTitle}>Great With Kids</Text>
                <Text>
                  {pet.environment?.children ? 
                    (typeof pet.environment.children === 'string' ? pet.environment.children : 'Yes') : 
                    (pet.isKidsOk || 'Unknown')}
                </Text>
              </View>
            </View>
            <View style={styles.socialItem}>
              <View style={styles.socialPadding}>
                <Image 
                  source={require("../assets/images/bSpecial.png")}
                  style={styles.socialIcon}
                />
              </View>
              <View>
                <Text style={styles.careTitle}>Special Care</Text>
                <Text>
                  {pet.attributes?.special_needs ? 'Yes' : 
                    (pet.isSpecialNeeds && pet.isSpecialNeeds !== 'Unknown' ? 'Yes' : 'No')}
                </Text>
              </View>
            </View>
          </View>
        </View>


        {/* Tab Content */}
        <View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Hi, I'm {pet.name}!</Text>
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

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Health Information</Text>
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

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <Text>
            Starter kit included: leash, collar, favorite toy, and 1-month
            food supply.
          </Text>
        </View>

        {/* Shelter Listing */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Shelter Listing</Text>
          <Text style={styles.shelterTitle}>{pet.location}</Text>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: height * 0.03,
      marginHorizontal: width * 0.04,
      paddingBottom: height * 0.01
  },
    iconPadding: {
    padding: width * 0.02,
    backgroundColor: "#e8e8e8",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  socialPadding: {
    padding: width * 0.02,
    backgroundColor: "#b5dcfb",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center"
  },
    backArrowIcon: {
    height: width * 0.05,
    width: width * 0.05,
  },
  shareIcon: {
    height: width * 0.05,
    width: width * 0.05
  },
    title: {
    fontWeight: 600,
    fontSize: 19,
  },
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1 },
  image: { width: "100%", height: height * 0.45 },
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
    top: height * 0.39,
    right: width * 0.04,
    backgroundColor: "black",
    borderRadius: 30,
    padding: 8,
  },
  heartIcon: {
    
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.01
  },
  infoBox: { flex: 1, alignItems: "center" },
  infoValue: { fontSize: 14, color: "#777777" },
  infoLabel: { fontSize: 15, color: "#ff9800", fontWeight: 500 },
  nameSection: { paddingHorizontal: width * 0.04, paddingBottom: height * 0.03, paddingTop: height * 0.01 },
  breedText: { fontSize: 14, color: "black", fontWeight: 500 },
  nameText: { fontSize: 26, fontWeight: 700, color: "#0c7dd6" },
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
  sectionContainer: { paddingHorizontal: width * 0.04, paddingVertical: height * 0.02 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: height * 0.005 },
  socialItem: {
    paddingVertical: height * 0.005,
    flexDirection: "row",
    gap: width * 0.03,
  },
  socialIcon: {
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    height: width * 0.05,
    width: width * 0.05
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
  readMoreText: { color: "#0c7dd6", marginTop: 5 },
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
    backgroundColor: "#b5dcfb",
    color: "#064577",
    fontWeight: 500,
    fontSize: 15,
    paddingVertical: height * 0.004,
    paddingHorizontal: width * 0.03,
    borderRadius: 20,
  },
  shelterListing: { padding: 20 },
  shelterTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: width * 0.035,
    gap: width * 0.03
  },
  favoriteButton: {
    backgroundColor: "white",
    borderRadius: 8,
    width: width * 0.45,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center", 
    borderWidth: 1,
    borderColor: "#ff9800"
  },
  favoriteButtonText: { fontSize: 16, color: "#ff9800", fontWeight: 600 },
  adoptionButton: {
    backgroundColor: "#ff9800",
    borderRadius: 8,
    width: width * 0.45,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center", 

  },
  adoptionButtonText: { fontSize: 16, color: "white", fontWeight: 600 },
  careTitle: {
    color: "#064577",
    fontWeight: 600
  },
});

export default PetDescription;
