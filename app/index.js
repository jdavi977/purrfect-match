import React, { useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { getPets } from "../api/api-conn";

const { width, height } = Dimensions.get("screen");

export default function IntroScreen() {

const slides = [
  {
    key: 1,
    image: require("../assets/images/Logo.png"),
    imageStyle: {width: width * 0.7, height: width * 0.232,}
  },
  {
    key: 2,
    image: require("../assets/images/Location-2.png"),
    imageStyle: {width: width * 0.1895, height: width * 0.1895,},
    containerStyle: styles.containerStyle,
    title: "Find Your Purfect Match",
    subtitle: "We're here to help you connect with a pet that truly fits your lifestyle and vibe.",
  },
  {
    key: 3,
    image: require("../assets/images/Location-2.png"),
    imageStyle: {width: width * 0.1895, height: width * 0.1895},
    containerStyle: styles.containerStyle,
    title: "Shelters You Can Trust",
      subtitle: "Explore a variety of verified shelter. All in one place, without the mess or stress.",
  },
  {
    key: 4,
    image: require("../assets/images/Location-2.png"),
    imageStyle: {width: width * 0.1895, height: width * 0.1895},
    containerStyle: styles.containerStyle,
    title: "Let's Get to Know You",
    subtitle: "Answer a few quick questions to discover pets that match your personality and routine.",
  },
  ]


  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleStart = () => {
    router.push("/questionnaire"); // Go to questionnaire screen
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      {item.containerStyle ? (
        <View style={item.containerStyle}>
          <Image source={item.image} style={item.imageStyle} />
        </View>
      ) : (
        <Image source={item.image} style={item.imageStyle} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );  

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
      {currentIndex === slides.length - 1 && (
      <TouchableOpacity 
        style={styles.button}
        onPress={handleStart}
      >
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  containerStyle: { 
    padding: 30, 
    backgroundColor: "#B5DCFB", 
    borderRadius: 999, 
    justifyContent: "center", 
    alignItems: "center",
    marginBottom: height * 0.02
  },
  title: {
    fontSize: 27,
    fontWeight: 600,
    textAlign: "center",
    color: "#0c7dd6",
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: width * 0.1
  },
  pagination: {
    position: "absolute",
    bottom: height * 0.2,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: "#ccc",
    margin: 4,
  },
  activeDot: {
    backgroundColor: "#007AFF",
  },
  button: {
    position: "absolute",
    bottom: height * 0.1,
    width: width * 0.9,
    height: height * 0.06,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
  },
});
