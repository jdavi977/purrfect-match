import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const Card = ({ name, age, breed, image, location, onPress, gender, id }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
        <Image source={image} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,.9)"]}
          style={styles.gradient}>
          <View style={styles.userContainer}>
            <Text style={styles.topText}>
              <Text style={styles.nameText}>{name},</Text> {age}
            </Text>
            <Text style={styles.descriptionText}>
              {gender} • {breed} • {id}
            </Text>
            <View style={styles.preferenceContainer}>
              <FontAwesome name="sliders" size={16} color="#007AFF" />
              <Text style={styles.preferenceText}>Matched 5+ Preferences</Text>
            </View>
            <Text style={styles.locationText}>
              <Entypo name="location-pin" size={16} color="#007AFF" />
              {location}
            </Text>
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
    borderRadius: 10,
    overflow: "hidden",
  },
  outlineLeft: {
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 25,
  },

  outlineRight: {
    borderColor: "green",
    borderWidth: 5,
    borderRadius: 25,
  },

  outlineReset: {
    borderColor: "white",
    borderWidth: 0,
    borderRadius: 0,
  },

  userContainer: {
    position: "absolute",
    bottom: 40,
    left: 15,
  },
  image: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 18,
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
  topText: {
    fontSize: 30,
    color: "white",
  },
  nameText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  preferenceText: {
    marginLeft: 3,
    marginTop: 3,
    fontSize: 13,
    color: "white",
  },
  locationText: {
    marginTop: 3,
    fontSize: 13,
    color: "white",
    height: 60,
  },
  descriptionText: {
    fontSize: 18,
    color: "white",
  },
  preferenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
