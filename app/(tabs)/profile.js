import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { QUESTIONS } from "../../utils/questions";
import { useAnswers } from "../../context/AnswersContext";
import { Image } from "expo-image";


const { height, width } = Dimensions.get("screen");

export default function Profile() {
    const router = useRouter();
    const [answers] = useAnswers();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity 
                    style={styles.iconPadding}
                    onPress={() => router.replace("/")}
                >
                <Image 
                    source={require("../../assets/images/Left.png")}
                    style={styles.backArrowIcon}
                />
                </TouchableOpacity>
                <Text style={styles.title}>My Paw-tential Matches</Text>
                <TouchableOpacity style={styles.hiddenIconPadding}>
                    <Image 
                    source={require("../../assets/images/adaptive-icon.png")}
                    style={styles.backArrowIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.borderLine}/>
            <View style={styles.screenPadding}>
                <Text style={styles.summaryTitle}>One last look before we find your new best friend!</Text>
                <Text style={styles.subText}>You can update your answers at any time in your settings.</Text>
            </View>
                <ScrollView style={styles.screenPadding}>
                    {QUESTIONS.map((q) => (
                        <TouchableOpacity
                            key={q.id}
                            style={styles.questionCard}
                            onPress={() =>
                                router.push({
                                    pathname: "../questionnaire",
                                    params: {
                                        questionId: q.id,
                                        fromProfile: true, 
                                    }
                                })
                            }
                        >
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>{q.question}</Text>
                                <FontAwesome name="angle-right" size={21} style={{ color: "#064577", marginLeft: width * 0.35}}/>
                            </View>
                            <Text style={styles.answerText}>
                                {answers[q.id]
                                    ? Array.isArray(answers[q.id])
                                        ? answers[q.id].join(", ")
                                        : answers[q.id]
                                    : "No answer"}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: height * 0.045,
        paddingLeft: 15,
        paddingRight: 15,
    },
    iconPadding: {
        padding: width * 0.02,
        backgroundColor: "#e8e8e8",
        borderRadius: 9999,
        alignItems: "center",
        justifyContent: "center"
    },
    hiddenIconPadding: {
        padding: width * 0.02,
        backgroundColor: "white",
        borderRadius: 9999,
        alignItems: "center",
        justifyContent: "center"
    },
    borderLine: {
        height: 2,
        backgroundColor: "#F6F6F6",
        marginVertical: 8
    },
        backArrowIcon: {
        height: width * 0.05,
        width: width * 0.05
    },
    container: {
        flex: 1,
    },
    questionContainer: {
        flexDirection: "row"
    },
    screenPadding: {
        paddingHorizontal: width * 0.065,
    },
    header: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: height * 0.1,
    },
    leftArrow: {
        position: "absolute",
        left: 0,
        width: width * 0.07,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontWeight: 600,
        fontSize: 19,
    },
    progressBarContainer: {
        height: 10,
        width: "100%",
        backgroundColor: "#E8E8E8",
        borderRadius: 5,
        overflow: "hidden",
        alignSelf: "center",
        marginBottom: height * 0.02,
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#ff9800",
    },
    summaryTitle: {
        fontSize: 25,
        fontWeight: "600",
        marginBottom: width * 0.02,
    },
    subText: {
        fontSize: 14,
        color: "#777",
        marginBottom: 16,
        fontWeight: 600
    },
    questionCard: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },
    questionText: {
        fontSize: 17,
        fontWeight: "600",
        color: "#064577",
        marginBottom: width * 0.01,
    },
    answerText: {
        fontSize: 15,
        color: "#0c7dd6",
        marginTop: 4,
    },
    nextButton: {
        backgroundColor: "#ff9800",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: height * 0.02,
    },
    nextButtonText: {
        color: "white",
        fontWeight: "600",
    },
});
