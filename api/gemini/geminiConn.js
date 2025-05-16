import { GoogleGenAI } from "@google/genai";
import Constants from "expo-constants";

const getGeminiClient = () => {
  try {
    const GEMINI_API_KEY = "AIzaSyBNrWnJMSlZu5a6qlhET6XyIygkslTknOs";
    console.log("Using direct Gemini API key with new SDK");
    return new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  } catch (error) {
    console.error("Error initializing Gemini client:", error);
    return null;
  }
};

export default getGeminiClient;
