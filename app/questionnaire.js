import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { QUESTIONS } from "../utils/questions";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useAnswers } from "../context/AnswersContext";

const { width, height } = Dimensions.get("screen");

// map each Q6 option to both unselected and selected image assets
const Q6_IMAGES = {
  Cat: {
    default: require("../assets/images/lCat.png"),
    selected: require("../assets/images/dCat.png"),
  },
  Dog: {
    default: require("../assets/images/lDog.png"),
    selected: require("../assets/images/dDog.png"),
  },
};

export default function QuestionScreen() {
  const { questionId, fromSummary, fromProfile } = useLocalSearchParams();
  const [answers, setAnswers] = useAnswers();
  const router = useRouter();

  const initialStep = questionId
    ? QUESTIONS.findIndex((q) => q.id == questionId)
    : 0;
  const [step, setStep] = useState(initialStep >= 0 ? initialStep : 0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");

  const current = QUESTIONS[step];
  const totalQuestions = QUESTIONS.length;

  // restore saved answers
  useEffect(() => {
    const saved = answers[current.id];
    if (current.id === 4) {
      if (Array.isArray(saved)) {
        const known = saved.filter((v) => current.options.includes(v));
        const typed = saved.filter((v) => !current.options.includes(v));
        setSelectedOption(known);
        setOtherText(typed.join(", "));
      } else if (typeof saved === "string") {
        setSelectedOption([]);
        setOtherText(saved);
      } else {
        setSelectedOption([]);
        setOtherText("");
      }
    } else {
      if (saved !== undefined) {
        if (current.type === "radio") setSelectedOption([saved]);
        else if (current.type === "checkbox")
          setSelectedOption(Array.isArray(saved) ? saved : []);
      } else {
        setSelectedOption([]);
      }
      setOtherText("");
    }
  }, [step, answers]);

  // sync Others pill only when there is text
  useEffect(() => {
    if (current.id === 4) {
      const otherSelected = selectedOption.includes("Others (please specify)");
      const hasText = otherText.trim().length > 0;
      if (hasText && !otherSelected) {
        setSelectedOption((prev) => [...prev, "Others (please specify)"]);
      } else if (!hasText && otherSelected) {
        setSelectedOption((prev) => prev.filter((v) => v !== "Others (please specify)"));
      }
    }
  }, [otherText]);

  const handleOptionPress = (option) => {
    if (current.id === 4 && option === "Others (please specify)") return;
    if (current.type === "radio") {
      setSelectedOption([option]);
    } else {
      setSelectedOption((prev) =>
        prev.includes(option)
          ? prev.filter((i) => i !== option)
          : [...prev, option]
      );
    }
  };

  const isContinueEnabled = () => {
    if (current.id === 4) {
      return selectedOption.length > 0 || otherText.trim().length > 0;
    }
    return selectedOption.length > 0;
  };

  const handleContinue = () => {
    if (
      current.id === 4
        ? selectedOption.length === 0 && !otherText.trim()
        : selectedOption.length === 0
    ) {
      return;
    }

    const updated = { ...answers };

    if (current.id === 4) {
      const known = selectedOption.filter((v) => v !== "Others (please specify)");
      const result = [...known];
      if (otherText.trim()) result.push(otherText.trim());
      updated[current.id] = result;
    } else {
      updated[current.id] =
        current.type === "radio" ? selectedOption[0] : selectedOption;
    }

    setAnswers(updated);
    setTimeout(() => {
      if (fromProfile) router.replace("(tabs)/profile");
      else if (fromSummary) router.replace("/questionSummary");
      else if (step + 1 < totalQuestions) setStep(step + 1);
      else router.push("/questionSummary");
    }, 100);
  };

  return (
    <View style={styles.container}>
      {/* Step header */}
      <View style={styles.stepContainer}>
        {step > 0 && (
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => setStep(step - 1)}
          >
            <FontAwesome name="angle-left" size={25} />
          </TouchableOpacity>
        )}
        <Text style={styles.steps}>
          STEP {current.id} OF {totalQuestions}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${(current.id / totalQuestions) * 100}%` },
          ]}
        />
      </View>

      {/* Question text */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{current.question}</Text>
        {current.type === "checkbox" && (
          <Text style={styles.subText}>(Select all that applies)</Text>
        )}
      </View>

      {/* Options grid */}
      {current.id === 8 ? (
        <View style={styles.pillContainer}>
          {current.options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionPress(option)}
              style={[
                styles.pillButton,
                selectedOption.includes(option) && styles.pillButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  selectedOption.includes(option) && styles.pillTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.optionsContainer}>
          {current.options.map((option) => {
            if (current.id === 4 && option === "Others (please specify)") {
              const isSel = selectedOption.includes(option);
              return (
                <View
                  key={option}
                  style={[styles.questionButtons, isSel && styles.selectedButton]}
                >
                  <TextInput
                    style={[styles.inputOption, isSel ? styles.textSelected : styles.option]}
                    placeholder="Please specify"
                    value={otherText}
                    onChangeText={setOtherText}
                  />
                </View>
              );
            }
            const isChecked = selectedOption.includes(option);
            if (current.id === 6 && Q6_IMAGES[option]) {
              const imgSrc = isChecked
                ? Q6_IMAGES[option].selected
                : Q6_IMAGES[option].default;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleOptionPress(option)}
                  style={[styles.imageOptionButton, isChecked && styles.selectedImageButton]}
                >
                  <View style={styles.imageTextContainer}>
                    <Text style={[styles.imageText, isChecked && styles.textSelected]}>
                      {option}
                    </Text>
                  </View>
                  <Image
                    source={imgSrc}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={option}
                onPress={() => handleOptionPress(option)}
                style={[styles.questionButtons, isChecked && styles.selectedButton]}
              >
                <Text style={[styles.option, isChecked && styles.textSelected]}>
                {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Continue button */}
      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: isContinueEnabled() ? "#ff9800" : "#ccc" }]}
        onPress={handleContinue}
        disabled={!isContinueEnabled()}
      >
        <Text style={styles.continueButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  stepContainer: { position: "relative", justifyContent: "center", alignItems: "center", height: height * 0.1, marginBottom: -6 },
  leftArrow: { position: "absolute", left: 0, width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F5F5" },
  steps: { fontSize: 15, fontWeight: "500" },
  progressBarContainer: { height: 10, width: "100%", backgroundColor: "#E8E8E8", borderRadius: 5, overflow: "hidden", alignSelf: "center", marginBottom: height * 0.02 },
  progressBar: { height: "100%", backgroundColor: "#ff9800" },
  questionContainer: { marginBottom: height * 0.02 },
  question: { fontSize: 25, fontWeight: "600", marginBottom: height * 0.01 },
  subText: { fontSize: 15, fontWeight: "600", color: "#777777" },
  optionsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 10 },
  questionButtons: { padding: 8, backgroundColor: "white", borderRadius: 8, marginVertical: 6, width: "100%", borderWidth: 2, borderColor: "#b5dcfb" },
  selectedButton: { backgroundColor: "#b5dcfb" },
  option: { fontWeight: "600", color: "#0c7dd6" },
  textSelected: { fontWeight: "600", color: "#064577" },
  inputOption: { flex: 1, fontWeight: "600" },
  imageText: { fontWeight: "600", color: "#0c7dd6" },
  imageTextContainer: { marginLeft: width * 0.05 },
  imageOptionButton: { width: (width - 60) / 2, borderWidth: 2, borderColor: "#b5dcfb", borderRadius: 8, paddingTop: width * 0.06 },
  selectedImageButton: { backgroundColor: "#b5dcfb" },
  optionImage: { width: (width - 70) / 2, height: (width - 70) / 2 },

  // question 8
  pillContainer: { flexDirection: "row", flexWrap: "wrap", marginVertical: 10 },
  pillButton: { borderWidth: 1, borderColor: "#4DA9FF", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, margin: 6, backgroundColor: "white" },
  pillButtonSelected: { backgroundColor: "#cce5ff" },
  pillText: { color: "#4DA9FF", fontWeight: "600" },
  pillTextSelected: { color: "#064577" },
  continueButton: { marginTop: height * 0.85, width: "90%", padding: 14, borderRadius: 8, alignItems: "center", position: "absolute" },
  continueButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
