import getGeminiClient from "./geminiConn";
import {
  getCachedData,
  saveCachedData,
  CACHE_KEYS,
} from "../../utils/cacheUtils";

/**
 * Extract structured pet traits from adoption bios
 * @param {string} description - Pet adoption bio text
 * @param {string} petId - Pet's unique identifier for caching
 * @returns {Promise<Object>} - Structured pet traits in JSON format
 */
export const extractPetTraits = async (description, petId = null) => {
  try {
    // Return default values for empty descriptions
    if (!description || description.trim() === "") {
      return {
        isDogsOk: "Unknown",
        isCatsOk: "Unknown",
        isKidsOk: "Unknown",
        isSpecialNeeds: "Unknown",
        energyLevel: "Unknown",
        idealHome: null,
        location: null,
        notes: [],
      };
    }

    // Check cache if petId is provided
    if (petId) {
      const cachedTraits = await getCachedData(petId, CACHE_KEYS.PET_TRAITS);
      if (cachedTraits) {
        console.log(`Using cached traits for pet ID: ${petId}`);
        return cachedTraits;
      }
    }

    // Get Gemini client with better error handling
    const genAI = getGeminiClient();
    if (!genAI) {
      console.error(
        "Failed to initialize Gemini client - returning default values"
      );
      // Return default values instead of null to prevent downstream errors
      return {
        isDogsOk: "Unknown",
        isCatsOk: "Unknown",
        isKidsOk: "Unknown",
        isSpecialNeeds: "Unknown",
        energyLevel: "Unknown",
        idealHome: null,
        location: null,
        notes: ["Gemini API unavailable - using default values"],
      };
    }

    // Get the model using the new SDK format
    // Note: In the new SDK, we access models directly from the client

    // Create prompt for extracting structured information
    const prompt = `You are an assistant that extracts structured information from pet adoption bios written in plain English. The bios come from a rescue organization and often include detailed notes on behavior, medical needs, preferences, and background.

Your goal is to extract clean, structured traits that can be used to populate profile cards on a pet adoption app. Please analyze the following bio and return ONLY a valid JSON object with no additional text, comments, or markdown formatting.

Extract the following fields:

1. **isDogsOk**: Is this pet good with dogs? (Use: "Yes", "No", "Not recommended", or "Unknown")
2. **isCatsOk**: Is this pet good with cats? (Use: "Yes", "No", or "Unknown")
3. **isKidsOk**: Is this pet good with children? (Use: "Yes", "No", "Not recommended", or "Unknown")
4. **descName**: The name of the pet.
5. **isSpecialNeeds**: Does the pet have any known medical or behavioral needs? If yes, explain briefly (e.g. "Yes – resource guarding and anxiety"). If no, just say "No".
6. **energyLevel**: One of "Low", "Medium", "High", or a range (e.g. "Medium – High") if described that way.
7. **idealHome**: Short summary of the ideal home based on the bio. Include mentions of quiet homes, experienced handlers, fenced yards, no kids/pets, etc.
8. **location**: Mention the location if available, either as a city, province/state, or general reference.
9. **notes**: Any extra traits that seem important (e.g., "crate trained", "history of trauma", "needs leash training", "protective", "escape artist").

If a trait is not mentioned or unclear, return "Unknown" or null.

IMPORTANT: Your response must be ONLY a valid JSON object with no additional text before or after. Do not include any markdown formatting, code blocks, or explanations. Just return the raw JSON object.

Example of correct response format:
{
  "isDogsOk": "Yes",
  "isCatsOk": "Unknown",
  "isKidsOk": "Not recommended",

  "isSpecialNeeds": "Yes - anxiety",
  "energyLevel": "Medium",
  "idealHome": "Quiet home with experienced owner",
  "location": "Calgary",
  "notes": ["crate trained", "needs leash training"]
}

Bio:
${description}`;

    // Configure the model generation parameters
    const generationConfig = {
      temperature: 0.2, // Lower temperature for more deterministic outputs
      topP: 0.8,
      topK: 40,
    };

    // Generate content using the new SDK format
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash", // Using the latest model version
      contents: prompt,
      generationConfig,
    });

    // Get the text response
    const textResponse = response.text;

    try {
      // Try to extract JSON from the response
      // First, check if the response is already valid JSON
      try {
        const parsedTraits = JSON.parse(textResponse);
        console.log("Successfully parsed JSON response");

        // Save to cache if petId is provided
        if (petId) {
          await saveCachedData(petId, CACHE_KEYS.PET_TRAITS, parsedTraits);
          console.log(`Saved traits to cache for pet ID: ${petId}`);
        }

        return parsedTraits;
      } catch (directParseError) {
        // If direct parsing fails, try to extract JSON from the text
        console.log(
          "Direct JSON parsing failed, attempting to extract JSON from text"
        );

        // Look for JSON-like structure in the response
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/m);
        if (jsonMatch) {
          try {
            const extractedJson = jsonMatch[0];
            const parsedTraits = JSON.parse(extractedJson);
            console.log("Successfully extracted and parsed JSON from text");
            return parsedTraits;
          } catch (extractionError) {
            console.error("Error parsing extracted JSON:", extractionError);
          }
        }

        // If we couldn't extract valid JSON, log the error and return default values
        console.error("Could not extract valid JSON from response");
        console.log("Raw response:", textResponse);
        return {
          isDogsOk: "Unknown",
          isCatsOk: "Unknown",
          isKidsOk: "Unknown",
          isSpecialNeeds: "Unknown",
          energyLevel: "Unknown",
          idealHome: null,
          location: null,
          notes: ["Could not parse Gemini response"],
        };
      }
    } catch (parseError) {
      console.error("Error processing Gemini response:", parseError);
      console.log("Raw response:", textResponse);
      return null;
    }
  } catch (error) {
    console.error("Error extracting pet traits with Gemini:", error);
    return null;
  }
};

export default extractPetTraits;
