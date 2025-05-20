import { useFocusEffect, useNavigation } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Card from "../../components/Card.js";
import { petData as petDataArray } from "../../utils/petData.js";
import Swiper from "react-native-deck-swiper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CardButton from "../../components/CardButtons.js";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import PetDescription from "../../components/PetDescription.js";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPets } from "../../api/api-conn.js";
import { getRescueGroupsPets } from "../../api/api-conn.js";
import { useAnswers } from "../../context/AnswersContext";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("screen");

const ICON_SIZE = 26;

export default function Index() {
  const navigation = useNavigation();
  const swiperRef = useRef(null);

  //const [swipeDirection, setSwipeDirection] = useState(null);

  const [likedPets, setLikedPets] = useState([]);
  const [dislikedPets, setDislikedPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [petData, setPetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const answersContext = useAnswers();

  // Used to read AsyncStorage for likedPets
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const json = await AsyncStorage.getItem("likedPets");
          if (json) {
            setLikedPets(JSON.parse(json));
          }
        } catch (e) {
          console.error("Failed to load likedPets from storage", e);
        }
      })();
    }, [])
  );

  // Changes local likedPets based on the reading above
  useEffect(() => {
    AsyncStorage.setItem("likedPets", JSON.stringify(likedPets)).catch(console.error);
  }, [likedPets]);

  // Fetch pets from Petfinder API
  useEffect(() => {
    async function fetchPets() {
      setIsLoading(true);
      try {
        // Extract answers from context - it returns an array [answers, setAnswers]
        const [answers] = answersContext;
        // Pass the answers to the API function
        const pets = await getRescueGroupsPets("cat", answers);
        setPetData(pets || []);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPets();
  }, [answersContext]);

  const handleLiked = (index) => {
    const pet = petData[index];

    // Only add if not already in the likedPets array (by id)
    setLikedPets((prev) => {
      const alreadyLiked = prev.some((p) => p.id === pet.id);
      if (!alreadyLiked) {
        return [...prev, pet];
      }
      console.log("likedPets: ", likedPets)
      return prev;
    });
  };

  const handleDisliked = (index) => {
    setDislikedPets((prev) => [...prev, petData[index]]);
  };

  // Need to fix
  const handleUndo = () => {
  if (cardIndex > 0) {
    swiperRef.current?.swipeBack();
    setCardIndex((prev) => Math.max(prev - 1, 0));
      console.log(likedPets)
      console.log(dislikedPets)
    const petToRemove = petData[cardIndex - 1];
    setLikedPets((prev) => prev.filter((p) => p.id !== petToRemove.id));
    setDislikedPets((prev) => prev.filter((p) => p.id !== petToRemove.id));
      console.log("liked after: ", likedPets)
      console.log("disliked after: ", dislikedPets)
  }
};


  useEffect(() => {
    const saveLikedPets = async () => {
      try {
        await AsyncStorage.setItem("likedPets", JSON.stringify(likedPets));
      } catch (error) {
        console.error("Error saving liked pets:", error);
      }
    };

    saveLikedPets();
  }, [likedPets]);

  useEffect(() => {
    console.log("Pets disliked: ", dislikedPets);
  }, [dislikedPets]);

  // If there are no more pets it will loop back
  useEffect(() => {
    if (!petData.length) {
      setPetData(petData);
    }
  }, [petData.length]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          <Text style={styles.title}><Text style={{color: "#0c7dd6"}}>1223</Text> Happy Matches</Text>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => router.replace("/profile")}
          >
            <Image 
              source={require("../../assets/images/Setting.png")}
              style={styles.settingIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.locationContainer}>
          <FontAwesome name="location-arrow" size={18} color="#FF9900" />
          <Text style={styles.locationText}>Calgary, Alberta</Text>
        </View>
      </View>

      <View style={styles.returnButtonContainer}>
        <TouchableOpacity onPress={handleUndo}>
          <Image 
            source={require("../../assets/images/wUndo.png")}
            style={styles.undoIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading pets...</Text>
          </View>
        ) : petData && petData.length > 0 ? (
          <Swiper
            ref={swiperRef}
            cards={petData}
            cardVerticalMargin={0} 
            renderCard={(card) => {
              if (!card) return null; // Skip rendering if card is undefined
              console.log("card", card);
              return (
                <Card
                  name={card.name}
                  age={card.age}
                  breed={card.breed}
                  size={card.size}
                  image={card.image}
                  location={card.location}
                  gender={card.gender}
                  id={card.id}
                  onPress={() => setSelectedPet(card)}
                  pictures={card.pictures}
                />
              );
            }}
            verticalSwipe={false}
            onSwipedRight={handleLiked}
            onSwipedLeft={handleDisliked}
            onSwiped={() => setCardIndex((prev) => prev + 1)}
            horizontalThreshold={100}
            cardIndex={0}
            infinite
            backgroundColor="transparent"
          />
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              No pets found. Try again later.
            </Text>
          </View>
        )}
        <Modal visible={!!selectedPet} animationType="slide">
          <PetDescription
            pet={selectedPet}
            likedPets={likedPets}
            setLikedPets={setLikedPets}
            liked={false}
            onClose={(liked) => {
              if (liked) {
                swiperRef.current?.swipeRight();
                setTimeout(() => setSelectedPet(null), 300); // adjust to match your swipe duration
              } else {
                setSelectedPet(null);
              }
            }}
            handleLiked={() => handleLiked(cardIndex)}
          />
        </Modal>
      </View>
      <View style={styles.cardButtonsContainer}>
        <CardButton
          style={styles.dislikeButton}
          onTap={() => {
            swiperRef.current?.swipeLeft();
          }}>
          <AntDesign name="close" size={ICON_SIZE} color="orange" />
        </CardButton>

        <CardButton
          style={styles.likeButton}
          onTap={() => {
            swiperRef.current?.swipeRight();
          }}>
          <FontAwesome name="heart-o" size={ICON_SIZE} color="white" />
        </CardButton>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // Header
  headerContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,

  },
  topRow: {
    flexDirection: "row",
    marginTop: width * 0.06
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
  },

  filterButton: {
    backgroundColor: "#eee",
    padding: 7,
    borderRadius: 20,
    marginLeft: width * 0.312,
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    fontSize: 15,
    color: "#888888",
    marginLeft: 4,
    fontWeight: 500
  },

  container: {
    flex: 1, // Takes full available height
    justifyContent: "flex-start", // Centers vertically
    alignItems: "stretch", // Centers horizontally
    backgroundColor: "white",
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    marginTop: height * 0.028
  },
  dislikeButton: {
    height: width * 0.11, 
    width: width * 0.39,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  likeButton: {
    height: width * 0.11, 
    width: width * 0.39,
    borderRadius: 10, 
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: height * 0.03,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 10,
    zIndex: 10,
  },
  navigationButtonsContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    bottom: 0,
    height: 120,
    borderTopWidth: 40,
    borderBottomWidth: 70,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20,
    position: "absolute",
    zIndex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: "#444",
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  returnButtonContainer: {
    position: "absolute",
    flexDirection: "row",
    top: height * 0.14,
    right: width * 0.08,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 10,
    borderRadius: 18,
    height: 37,
    width: 37,
    backgroundColor: "#333333",
  },
  settingIcon: {
    height: width * 0.05,
    width: width * 0.05
  },
  undoIcon: {
    height: width * 0.025,
    width: width * 0.037
  },
});
