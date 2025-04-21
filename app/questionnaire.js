import React, {useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { QUESTIONS } from "../utils/questions";

export default function QuestionScreen() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const router = useRouter();

    const goToSignUp = () => {
        router.push("/signUp"); 
    };

    const current = QUESTIONS[step];

    const handleAnswer = (option) => {
        const newAnswers = { ...answers, [current.id]: option};
        setAnswers(newAnswers);
        console.log(newAnswers);

        if (step + 1 < QUESTIONS.length) {
            setStep(step + 1);
        } else {
            goToSignUp();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.steps}>
                STEP {current.id} OF {QUESTIONS.length}
            </Text>
            <Text style={styles.question}>
                {current.question}
            </Text>
            {current.options.map((option) => (
                <TouchableOpacity
                    key={option}
                    onPress={() => handleAnswer(option)}
                    style={styles.questionButtons}
                >
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20, 
        justifyContent: "center"
    },
    steps: {
        fontSize: 10,
        marginBottom: 20
    },
    question: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20
    },
    questionButtons: {
        padding: 12,
        backGroundColor: "#eee",
        borderRadius: 8,
        marginVertical: 6
    }
});