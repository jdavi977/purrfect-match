import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Image } from 'expo-image';
import { FontAwesome } from "@expo/vector-icons";

const FavouriteCard = ({ name, age, image, onPress }) => {
  return (
    <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
          <Image source={image} style={styles.image} />
          <FontAwesome name="heart" size={20} color="#FF3366" style={styles.heartIcon} />
          
        <Text style={styles.name}>{name}, {age}</Text>
        <Text style={styles.subText}>Calgary Humane Society · 13 people viewed this pet</Text>
        <Text style={styles.savedText}>Saved 14 days ago</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },
  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
  },
  subText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  savedText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});

export default FavouriteCard;
