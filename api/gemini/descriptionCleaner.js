import getGeminiClient from "./geminiConn";
import {
  getCachedData,
  saveCachedData,
  CACHE_KEYS,
} from "../../utils/cacheUtils";

/**
 * Clean and enhance pet descriptions using Gemini API
 * @param {string} description - Original pet description
 * @param {string} petId - Pet's unique identifier for caching
 * @returns {Promise<string>} - Enhanced and cleaned description
 */
export const cleanPetDescription = async (description, petId = null) => {
  try {
    if (!description || description.trim() === "") {
      return "No description available";
    }

    // Check cache if petId is provided
    if (petId) {
      const cachedDescription = await getCachedData(
        petId,
        CACHE_KEYS.PET_DESCRIPTION
      );
      if (cachedDescription) {
        console.log(`Using cached description for pet ID: ${petId}`);
        return cachedDescription;
      }
    }

    const genAI = getGeminiClient();
    if (!genAI) {
      console.error("Failed to initialize Gemini client");
      return description;
    }

    // Create prompt for description cleaning
    const prompt = `
      You are a pet adoption specialist. Please clean and enhance the following pet description 
      to make it more engaging, well-structured, and appealing to potential adopters.
      
      Remove any HTML tags, fix grammatical errors, organize information logically, 
      and highlight the pet's positive qualities. Keep the tone warm and inviting.
      
      Make sure to preserve all factual information about the pet, including medical needs, 
      behavioral traits, and adoption requirements.
      
      Original description:
      ${description}
    `;

    // Generate content using the new SDK format
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    // Get the text response
    const cleanedDescription = response.text;

    // Save to cache if petId is provided
    if (petId && cleanedDescription) {
      await saveCachedData(
        petId,
        CACHE_KEYS.PET_DESCRIPTION,
        cleanedDescription
      );
      console.log(`Saved description to cache for pet ID: ${petId}`);
    }

    return cleanedDescription || description;
  } catch (error) {
    console.error("Error cleaning pet description with Gemini:", error);
    // Return original description if there's an error
    return description;
  }
};

/**
 * Generate personality traits based on pet description
 * @param {string} description - Pet description
 * @param {string} petType - Type of pet (cat, dog, etc.)
 * @param {string} petId - Pet's unique identifier for caching
 * @returns {Promise<string[]>} - Array of personality traits
 */
export const generatePersonalityTraits = async (
  description,
  petType = "cat",
  petId = null
) => {
  try {
    if (!description || description.trim() === "") {
      return ["Friendly", "Curious", "Playful"];
    }

    // Check cache if petId is provided
    if (petId) {
      const cachedTraits = await getCachedData(
        petId,
        CACHE_KEYS.PET_PERSONALITY
      );
      if (cachedTraits) {
        console.log(`Using cached personality traits for pet ID: ${petId}`);
        return cachedTraits;
      }
    }

    const genAI = getGeminiClient();
    if (!genAI) {
      console.error("Failed to initialize Gemini client");
      return ["Friendly", "Curious", "Playful"];
    }

    // Create prompt for generating personality traits
    const prompt = `
      Based on the following description of a ${petType}, identify 5-7 key personality traits 
      that best describe this pet. Return ONLY the traits as a comma-separated list with no additional text.
      
      Description:
      ${description}
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const traitsText = response.text;

    const traits = traitsText
      .split(",")
      .map((trait) => trait.trim())
      .filter((trait) => trait.length > 0);

    const finalTraits =
      traits.length > 0 ? traits : ["Friendly", "Curious", "Playful"];

    // Save to cache if petId is provided
    if (petId && finalTraits.length > 0) {
      await saveCachedData(petId, CACHE_KEYS.PET_PERSONALITY, finalTraits);
      console.log(`Saved personality traits to cache for pet ID: ${petId}`);
    }

    return finalTraits;
  } catch (error) {
    console.error("Error generating personality traits with Gemini:", error);
    return ["Friendly", "Curious", "Playful"];
  }
};
