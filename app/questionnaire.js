import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { QUESTIONS } from "../utils/questions";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export default function QuestionScreen() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState([]);
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const totalQuestions = 10;

    const goToSignUp = () => {
        router.push({ pathname: "/questionSummary", params: { answers: JSON.stringify(answers) } });
    };

    const current = QUESTIONS[step];

    const handleOptionPress = (option) => {
        if (current.type === "radio") {
            setSelectedOption([option]);
        } else if (current.type === "checkbox") {
            if (selectedOption.includes(option)) {
                setSelectedOption(selectedOption.filter((item) => item !== option));
            } else {
                setSelectedOption([...selectedOption, option]);
            }
        }
    };

    const handleContinue = () => {
        if (selectedOption.length === 0) return;

        const newAnswers = {
            ...answers,
            [current.id]: current.type === "radio" ? selectedOption[0] : selectedOption,
        };
        setAnswers(newAnswers);
        console.log("answers: ", answers);

        setSelectedOption([]);

        if (step + 1 < QUESTIONS.length) {
            setStep(step + 1);
            setCurrentQuestion(currentQuestion + 1);
        } else {
            goToSignUp();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.stepContainer}>
                {step > 0 && (
                <TouchableOpacity
                    style={styles.leftArrow}
                    onPress={() => {
                        setStep(step - 1);
                        setCurrentQuestion(currentQuestion - 1);
                    }}
                >
                    <FontAwesome name="angle-left" size={25}/>
                </TouchableOpacity>
                )}
                <Text style={styles.steps}>STEP {current.id} OF {QUESTIONS.length}</Text>
            </View>

            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${(currentQuestion / totalQuestions) * 100}%` },
                    ]}
                />
            </View>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>{current.question}</Text>

                {current.type === "checkbox" && (
                    <Text style={styles.subText}>(Select all that applies)</Text>
                )}
            </View>
            

            <View style={current.id === 8 ? styles.optionsContainer : null}>
                {current.options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => handleOptionPress(option)}
                        style={[
                            current.id === 8 ? styles.optionButton : styles.questionButtons,
                            selectedOption.includes(option) &&
                                (current.id === 8 ? styles.optionButtonSelected : styles.selectedButton),
                        ]}
                    >
                        <Text
                            style={[
                                current.id === 8 ? styles.optionText : styles.option,
                                selectedOption.includes(option) &&
                                    (current.id === 8 ? styles.optionTextSelected : styles.textSelected),
                            ]}
                        >
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={[
                    styles.continueButton,
                    { opacity: selectedOption.length === 0 ? 0.5 : 1 },
                ]}
                onPress={handleContinue}
                disabled={selectedOption.length === 0}
            >
                <Text style={styles.continueButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    stepContainer: {
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
    steps: {
        fontSize: 15,
        fontWeight: "500",
    },
    questionContainer: {
        marginBottom: height * 0.02,
    },
    question: {
        fontSize: 25,
        fontWeight: "600",
        marginBottom: height * 0.01,
    },
    subText: {
        fontSize: 15,
        fontWeight: 600,
        color: "#777777"
    },
    questionButtons: {
        padding: 8,
        backgroundColor: "white",
        borderRadius: 8,
        marginVertical: 6,
        borderWidth: 2,
        borderColor: "#b5dcfb",
    },
    selectedButton: {
        backgroundColor: "#b5dcfb",
    },
    option: {
        fontWeight: "600",
        color: "#0c7dd6",
    },
    textSelected: {
        fontWeight: "600",
        color: "#064577",    
    },
    // Pills only for Question 8
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginVertical: 10,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: "#4DA9FF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        margin: 6,
        backgroundColor: "white",
        alignSelf: "flex-start",
    },
    optionButtonSelected: {
        backgroundColor: "#cce5ff",
    },
    optionText: {
        color: "#4DA9FF",
        fontWeight: 600,
    },
    optionTextSelected: {
        color: "#064577",
        fontWeight: 600
    },
    continueButton: {
        marginTop: height * 0.85,
        width: "90%",
        backgroundColor: "#ff9800",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        position: "absolute",
    },
    continueButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
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
});
