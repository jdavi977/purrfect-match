// components/Card.js

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
import { Entypo } from "@expo/vector-icons";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

// Configuration
const WIDTH_FRACTION = 0.9;    // 90% of screen width
const ASPECT_RATIO = 4 / 8;    // width / height = 4:3
const MAX_HEIGHT_FRACTION = 0.70; // card height ≤ 70% of screen height

export default function Card({
  name,
  age,
  breed,
  image,
  location,
  onPress,
  gender,
  id,
  size,
}) {
  // 1) calculate width
  const wrapperWidth = SCREEN_W * WIDTH_FRACTION;

  // 2) calculate height based on aspect ratio
  const heightByAspect = wrapperWidth / ASPECT_RATIO;

  // 3) clamp to max 70% of screen height
  const wrapperHeight = Math.min(heightByAspect, SCREEN_H * MAX_HEIGHT_FRACTION);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.imageWrapper,
          { width: wrapperWidth, height: wrapperHeight },
        ]}
        onPress={onPress}
      >
        <Image source={image} style={styles.image} />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
        >
          <View style={styles.userContainer}>
            <Text style={styles.descriptionText}>
              {size} {breed} ︳ {age}/{gender} ︳ {id}
            </Text>
            <Text style={styles.topText}>
              <Text style={styles.nameText}>{name},</Text> {age}
            </Text>
            <View style={styles.locationRow}>
              <Entypo name="location" size={SCREEN_H * 0.02} color="#007AFF" />
              <Text style={styles.locationLabel}>{location}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // no flex here—parent Swiper handles layout
  },

  imageWrapper: {
    borderRadius: SCREEN_W * 0.05, // 5% corner radius
    overflow: "hidden",
    backgroundColor: "#eee",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30%", // fade covers bottom 30%
  },

  userContainer: {
    position: "absolute",
    bottom: SCREEN_H * 0.08, // 10% up from bottom
    left: "4%",
    right: "4%",
  },

  descriptionText: {
    fontSize: SCREEN_W * 0.045,
    color: "#fff",
  },
  topText: {
    fontSize: SCREEN_W * 0.07,
    color: "#fff",
    marginBottom: SCREEN_H * 0.005,
  },
  nameText: {
    fontSize: SCREEN_W * 0.07,
    fontWeight: "bold",
    color: "#fff",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationLabel: {
    marginLeft: SCREEN_W * 0.02,
    fontSize: SCREEN_W * 0.04,
    color: "#fff",
    fontWeight: "500",
  },
});
