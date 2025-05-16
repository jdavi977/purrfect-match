import getGeminiClient from "./geminiConn";
import {
  getCachedData,
  saveCachedData,
  CACHE_KEYS,
} from "../../utils/cacheUtils";

/**
 * Format pet descriptions to be mobile-friendly without markdown
 * @param {string} description - Original pet description text
 * @param {object} pet - Pet object with additional metadata
 * @param {string} petId - Pet's unique identifier for caching
 * @returns {Promise<string>} - Formatted pet description
 */
export const formatPetDescription = async (
  description,
  pet = {},
  petId = null
) => {
  try {
    // Return original description for empty descriptions
    if (!description || description.trim() === "") {
      return "";
    }

    // Check cache if petId is provided
    if (petId) {
      const cachedDescription = await getCachedData(
        petId,
        CACHE_KEYS.FORMATTED_DESCRIPTION
      );
      if (cachedDescription) {
        console.log(`Using cached formatted description for pet ID: ${petId}`);
        return cachedDescription;
      }
    }

    // Get Gemini client with better error handling
    const genAI = getGeminiClient();
    if (!genAI) {
      console.error(
        "Failed to initialize Gemini client - returning original description"
      );
      return description;
    }

    // Create prompt for formatting the description
    const prompt = `You are an assistant that formats pet descriptions to be mobile-friendly without using markdown. 
    
Format the following pet description to be clear, engaging, and easy to read on a mobile app. Keep the most important parts and be truthful to the original description.

Guidelines:
1. NO markdown formatting - absolutely no bold, italics, bullet points, or any other markdown syntax
2. Keep the text concise but informative
3. Maintain the original personality and key details
4. Keep the text in paragraph form - do not create lists or sections
5. Preserve factual information about age, breed, location, etc.
6. Make sure the text flows naturally and is engaging for potential adopters
7. Do not include section headings - the app will handle that separately

Here is some additional information about the pet:
Name: ${pet.name || "This pet"}
Breed: ${pet.breed || "Unknown breed"}
Age: ${pet.age || "Unknown age"}
Gender: ${pet.gender || "Unknown gender"}

Original description:
${description}`;

    // Configure the model generation parameters
    const generationConfig = {
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
    };

    // Generate content using the SDK
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      generationConfig,
    });

    // Get the text response
    const formattedDescription = response.text.trim();

    // Save to cache if petId is provided
    if (petId) {
      await saveCachedData(
        petId,
        CACHE_KEYS.FORMATTED_DESCRIPTION,
        formattedDescription
      );
      console.log(`Saved formatted description to cache for pet ID: ${petId}`);
    }

    return formattedDescription;
  } catch (error) {
    console.error("Error formatting pet description with Gemini:", error);
    // Return original description in case of error
    return description;
  }
};

export default formatPetDescription;
