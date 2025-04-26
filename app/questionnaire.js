import React, {useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { QUESTIONS } from "../utils/questions";

export default function QuestionScreen() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState([]);
    const router = useRouter();

    const goToSignUp = () => {
        router.push("/signUp"); 
    };

    const current = QUESTIONS[step];

    const handleOptionPress = (option) => {
        if (current.type === "radio" ) {
            setSelectedOption([option])
        } else if (current.type === "checkbox") {
            if (selectedOption.includes(option)) {  // deselect item
                setSelectedOption(selectedOption.filter((item) => item !== option)); // goes through each item in list and keeps if option is not in already
            } else {
                setSelectedOption([...selectedOption, option]); // adds the option to the current selectedOption List
            }
        }
    };

    const handleContinue = () => {
        if (selectedOption.length === 0) {
            return; // makes sure cant continue without an answer
        }

        const newAnswers = {
            ...answers, [current.id]: current.type === "radio" ? selectedOption[0]: selectedOption // if radio type, will show only "Answer" instead of ["Answer"], if checkbox will show the list of answers
        };
        setAnswers(newAnswers);
        console.log(newAnswers);

        setSelectedOption([]); // Resets for next question

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
                    onPress={() => handleOptionPress(option)}
                    style={[styles.questionButtons,
                    selectedOption.includes(option) ? styles.selectedButton: null]
                    }
                >
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                style={[styles.continueButton,
                    { opacity: selectedOption.length === 0 ? 0.5: 1}, // Disabled button

                ]}
                onPress={handleContinue}
                disabled={selectedOption.length === 0}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
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
      backgroundColor: "#eee",
      borderRadius: 8,
      marginVertical: 6,
    },
    selectedButton: {
      backgroundColor: "#cce5ff",
    },
    continueButton: {
      marginTop: 20,
      backgroundColor: "#007AFF",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    continueButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });