import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("screen");

export default function Terms() {
    const slides = [
        {
            key: 1,
            image: require("../assets/images/Location-2.png"),
            imageStyle: { width: width * 0.1895, height: width * 0.1895 },
            title: "Enable Location",
            subtitle: "You'll need to enable your location in order to suggest nearby rescue shelters.",
            firstButton: "Turn On My Location",
            secondButton: "Tell Me More",
            isWhiteButton: true,
        },
        {
            key: 2,
            image: require("../assets/images/Vector.png"),
            imageStyle: { width: width * 0.142, height: width * 0.17 },
            title: "We value your privacy",
            subtitle: "Enabling location helps us connect you to nearby shelters without tracking you across other apps.",
            firstButton: "I Accept",
            secondButton: "Personalize",
        },
    ];

    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentSlide = slides[currentIndex];

    const handleNextSlide = () => {
        if (currentIndex + 1 < slides.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.push("/(tabs)/");
        }
    };

return (
    <View style={{ flex: 1, justifyContent: "space-between"}}>
        {/* Slide content */}
        <View style={styles.slideContent}>
            <View style={styles.containerStyle}>
                <Image source={currentSlide.image} style={currentSlide.imageStyle} />
            </View>
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>
        </View>

        <View style={[styles.buttonsContainer, {bottom: height * 0.055}]}>
            <TouchableOpacity style={styles.button} onPress={handleNextSlide}>
                <Text style={styles.buttonText}>{currentSlide.firstButton}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={currentSlide.isWhiteButton ? styles.whiteButton : styles.button}
                onPress={handleNextSlide}
            >
                <Text
                    style={currentSlide.isWhiteButton ? styles.whiteButtonText : styles.buttonText}
                >
                    {currentSlide.secondButton}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    containerStyle: {
        width: width * 0.35,
        height: width * 0.35,
        backgroundColor: "#B5DCFB",
        borderRadius: width * 0.35 / 2,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: height * 0.02,
    },
    title: {
        fontSize: 27,
        fontWeight: "600",
        textAlign: "center",
        color: "#0c7dd6",
        marginBottom: height * 0.01,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: width * 0.05,
    },
    buttonsContainer: {
        justifyContent: "flex-end",
    },
    button: {
        width: width * 0.9,
        height: height * 0.06,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff9800",
        borderRadius: 8,
        marginTop: height * 0.016,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: 400
    },
    whiteButton: {
        width: width * 0.9,
        height: height * 0.06,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 8,
        marginTop: height * 0.016,
    },
    whiteButtonText: {
        color: "#ff9800",
        fontSize: 17,
        fontWeight: 400
    },
    slideContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonsContainer: {
        paddingBottom: height * 0.05,
    },
});
