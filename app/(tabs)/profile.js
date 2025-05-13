import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { QUESTIONS } from "../../utils/questions";
import { useAnswers } from "../../context/AnswersContext";

const { height, width } = Dimensions.get("screen");

export default function Profile() {
    const router = useRouter();
    const [answers] = useAnswers();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>Account Pet Preferences</Text>
            </View>


            <Text style={styles.summaryTitle}>One last look before we find your new best friend!</Text>
            <Text style={styles.subText}>You can update your answers at any time in your settings.</Text>

            <ScrollView>
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
    container: {
        flex: 1,
        padding: 20,
    },
    questionContainer: {
        flexDirection: "row"
    },
    header: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: height * 0.1,
        marginBottom: -8
    },
    leftArrow: {
        position: "absolute",
        left: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 15,
        fontWeight: "500",
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
