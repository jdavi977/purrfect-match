import axios from "axios";
import Constants from "expo-constants";
import { formatRescueGroupsPet } from "./helpers";

const { RESCUE_GROUPS_API_KEY } = Constants.expoConfig?.extra || {};

const API_KEY = RESCUE_GROUPS_API_KEY;
const BASE_URL = "https://api.rescuegroups.org/v5";

const catFilters = [
  {
    fieldName: "statuses.name",
    operation: "equals",
    criteria: "Available",
  },
  {
    fieldName: "species.singular",
    operation: "equals",
    criteria: "Cat",
  },
];
const dogFilters = [
  {
    fieldName: "statuses.name",
    operation: "equals",
    criteria: "Available",
  },
  {
    fieldName: "species.singular",
    operation: "equals",
    criteria: "Dog",
  },
];

export const getRescueGroupsPets = async (petType = "cat", answers = null) => {
  try {
    if (answers) {
      console.log("Answers: ", answers);
    }

    // Determine pet type - either from parameter or from answers
    let selectedPetType = petType;
    
    // Check if answers contains pet type preference (question 6)
    if (answers && answers[6] && answers[6].length > 0) {
      const answeredPetType = answers[6][0];
      if (answeredPetType === "Cat" || answeredPetType === "Dog") {
        selectedPetType = answeredPetType.toLowerCase();
      }
    }
    
    // Use the appropriate filters based on pet type
    const filters = selectedPetType === "cat" ? catFilters : dogFilters;
    
    // Simple filter processing for just pet type
    const filterProcessing = "1 AND 2";

    const response = await axios({
      method: "post",
      url: `${BASE_URL}/public/animals/search/?sort=random&limit=18`,
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      data: {
        data: {
          filters: filters,
          filterProcessing: filterProcessing,
          filterRadius: {
            miles: 100,
            coordinates: "51.0111,-114.1319",
          },
        },
      },
    });

    console.log("Pet type:", selectedPetType);
    console.log("Filters used:", filters);
    console.log("API response status:", response.status);
    console.log("Number of pets returned:", response.data?.data?.length || 0);
    console.log("Processing pet descriptions with Gemini API...");

    // Process the response data with Gemini API for enhanced descriptions
    const formattedPets = await formatRescueGroupsPet(response.data);
    return formattedPets;
  } catch (error) {
    console.error("Failed to fetch pets:", error);
    console.error("Error details:", error.response?.data || error.message);
    return [];
  }
};

export const getSingleRescueGroupPet = async (id) => {
  const response = await axios.get(`${BASE_URL}/public/animals/${id}`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data.data;
};
