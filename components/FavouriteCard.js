import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { Image } from 'expo-image';
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');


const FavouriteCard = ({ name, age, image, onPress, breed, id, gender, viewType }) => {
  console.log(viewType);

  const cardStyle = viewType === "grid" ? styles.gridCardContainer : styles.listCardContainer;
  const imageWrapperStyle = viewType === "grid" ? styles.gridImageWrapper : styles.listImageWrapper;

  return (
    <View style={cardStyle}>
        <TouchableOpacity style={imageWrapperStyle} onPress={onPress}>
          <Image source={image} style={styles.image} />
          <FontAwesome name="heart" size={13} color="#FF3366" style={styles.heartIcon} />
        <View style={styles.infoText}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{name},</Text>
            <Text style={styles.age}>{age}</Text>
          </View>
          <Text style={styles.middleInfo}>{gender}</Text>
          <Text style={styles.middleInfo}>{breed}</Text>
          <Text style={styles.middleInfo}>{id}</Text>
        <View style={styles.shelterInfo}>
          <Image style={styles.locationIcon} source={require("../assets/images/Location.png")}/>
          <Text style={styles.shelterText}>Calgary Humane Society</Text>
        </View>
        </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listCardContainer: {
    marginVertical: 2,
    paddingHorizontal: 16,
  },
  listImageWrapper: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "row",
    padding: 6,
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: height * 0.15,
    width: width * 0.325,
    borderRadius: 12,
  },
  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  topRow: {
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    color: "#0c7dd6",
    fontSize: 16,
  },
  age: {
    fontSize: 16,
    marginLeft: width * 0.01,
    color: "#8e8e8e",
  },
  middleInfo: {
    color: "#333333"
  },
  savedText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  nameText: {
    color: "grey"
  },
  infoText: {
    paddingLeft: width * 0.03,
  },
  locationIcon: {
    height: height * 0.017,
    width: width * 0.035,
    color: "#d7a100"
  },
  shelterInfo: {
    flexDirection: "row",
    marginTop: height * 0.06
  },
  shelterText: {
    fontSize: 12,
    color: "#666",
    marginLeft: width * 0.01,
  },
});

export default FavouriteCard;
