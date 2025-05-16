import getGeminiClient from "./geminiConn";
import {
  getCachedData,
  saveCachedData,
  CACHE_KEYS,
} from "../../utils/cacheUtils";

/**
 * Extract health information from pet descriptions using Gemini AI
 * @param {string} description - Pet description text
 * @param {object} petData - Pet data object with additional fields
 * @param {string} petId - Pet's unique identifier for caching
 * @returns {Promise<Array>} - Array of health bullet points
 */
export const extractPetHealth = async (
  description,
  petData = {},
  petId = null
) => {
  try {
    // Check cache if petId is provided
    if (petId) {
      const cachedHealth = await getCachedData(petId, CACHE_KEYS.PET_HEALTH);
      if (cachedHealth) {
        console.log(`Using cached health data for pet ID: ${petId}`);
        return cachedHealth;
      }
    }

    // If no description and no pet data, return default unavailable message
    if (
      (!description || description.trim() === "") &&
      Object.keys(petData).length === 0
    ) {
      return ["Health information unavailable", "Contact shelter for details"];
    }

    // Get Gemini client
    const genAI = getGeminiClient();
    if (!genAI) {
      console.error(
        "Failed to initialize Gemini client - returning default values"
      );
      return ["Health information unavailable", "Contact shelter for details"];
    }

    // Create a combined context from description and pet data
    let context = "";

    if (description && description.trim() !== "") {
      context += `Pet Description: ${description}\n\n`;
    }

    if (Object.keys(petData).length > 0) {
      context += "Pet Data:\n";
      // Add relevant fields from pet data
      const relevantFields = [
        "name",
        "age",
        "gender",
        "species",
        "breed",
        "size",
        "attributes",
        "environment",
        "tags",
        "status",
      ];

      relevantFields.forEach((field) => {
        if (petData[field]) {
          if (typeof petData[field] === "object") {
            context += `${field}: ${JSON.stringify(petData[field])}\n`;
          } else {
            context += `${field}: ${petData[field]}\n`;
          }
        }
      });
    }

    // Create prompt for extracting health information
    const prompt = `You are an assistant that extracts health information from pet adoption descriptions and data. 
    
Your task is to generate 5-7 bullet points about the pet's health based on the information provided. If specific health information is not available, make reasonable assumptions based on the pet's age, breed, and other details.

For each bullet point:
1. Focus on vaccination status, spay/neuter status, microchipping, general health condition, and any specific health needs
2. If the information is explicitly mentioned in the data, use it
3. If the information is not available but can be reasonably inferred, make a conservative inference
4. If no information is available and no reasonable inference can be made, include "Health information unavailable" as one of the bullet points

Return ONLY an array of strings, with each string being a single bullet point (without the bullet character). Do not include any additional text, comments, or formatting.

Example of correct response format:
[
  "Vaccinated and up-to-date on all shots",
  "Spayed female",
  "Microchipped for identification",
  "Regular vet check-ups completed",
  "Tested negative for FIV and FeLV",
  "Healthy weight and active lifestyle"
]

Context:
${context}`;

    // Configure the model generation parameters
    const generationConfig = {
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
    };

    // Generate content
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      generationConfig,
    });

    // Get the text response
    const textResponse = response.text;

    try {
      // Try to extract JSON array from the response
      try {
        const parsedHealth = JSON.parse(textResponse);

        // Validate that it's an array of strings
        if (
          Array.isArray(parsedHealth) &&
          parsedHealth.every((item) => typeof item === "string")
        ) {
          // Save to cache if petId is provided
          if (petId) {
            await saveCachedData(petId, CACHE_KEYS.PET_HEALTH, parsedHealth);
            console.log(`Saved health data to cache for pet ID: ${petId}`);
          }

          return parsedHealth;
        } else {
          throw new Error("Response is not an array of strings");
        }
      } catch (directParseError) {
        // If direct parsing fails, try to extract array from the text
        console.log(
          "Direct JSON parsing failed, attempting to extract array from text"
        );

        // Look for array-like structure in the response
        const arrayMatch = textResponse.match(/\[[\s\S]*\]/m);
        if (arrayMatch) {
          try {
            const extractedArray = arrayMatch[0];
            const parsedHealth = JSON.parse(extractedArray);

            if (Array.isArray(parsedHealth)) {
              return parsedHealth;
            }
          } catch (extractionError) {
            console.error("Error parsing extracted array:", extractionError);
          }
        }

        // If extraction fails, split by newlines and clean up
        const lines = textResponse
          .split("\n")
          .map((line) => line.trim())
          .filter(
            (line) =>
              line &&
              !line.startsWith("[") &&
              !line.startsWith("]") &&
              !line.includes("```")
          );

        if (lines.length > 0) {
          return lines.map((line) => {
            // Remove bullet points, quotes and other formatting
            return line.replace(/^["'\s*•\-]+|["'\s]+$/g, "");
          });
        }

        // Fallback
        return [
          "Health information unavailable",
          "Contact shelter for details",
        ];
      }
    } catch (parseError) {
      console.error("Error processing Gemini response:", parseError);
      return ["Health information unavailable", "Contact shelter for details"];
    }
  } catch (error) {
    console.error("Error extracting pet health with Gemini:", error);
    return ["Health information unavailable", "Contact shelter for details"];
  }
};

export default extractPetHealth;
