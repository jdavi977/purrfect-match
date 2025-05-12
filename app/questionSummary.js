import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { QUESTIONS } from "../utils/questions";

const { height } = Dimensions.get("screen");

export default function QuestionSummaryScreen() {
    const router = useRouter();
    const { answers } = useLocalSearchParams();
    const parsedAnswers = answers ? JSON.parse(answers) : {};

    const goToTerms = () => {
        router.push("/terms");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>QUICK SUMMARY</Text>
            </View>

            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${(9 / 10) * 100}%` },
                    ]}
                />
            </View>

            <Text style={styles.summaryTitle}>One last look before we find your new best friend!</Text>
            <Text style={styles.subText}>You can update your answers at any time in your settings.</Text>

            <ScrollView>
                {QUESTIONS.map((q) => (
                    <View key={q.id} style={styles.questionCard}>
                        <Text style={styles.questionText}>{q.question}</Text>
                        <Text style={styles.answerText}>
                            {parsedAnswers[q.id]
                                ? Array.isArray(parsedAnswers[q.id])
                                    ? parsedAnswers[q.id].join(", ")
                                    : parsedAnswers[q.id]
                                : "No answer"}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.nextButton}
              onPress={goToTerms}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: height * 0.1,
        marginBottom: -6
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
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 4,
    },
    subText: {
        fontSize: 14,
        color: "#777",
        marginBottom: 16,
    },
    questionCard: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },
    questionText: {
        fontSize: 16,
        fontWeight: "600",
    },
    answerText: {
        fontSize: 14,
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
