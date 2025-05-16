import axios from "axios";
import Constants from "expo-constants";
import { formatRescueGroupsPet } from "./helpers";

const { RESCUE_GROUPS_API_KEY } = Constants.expoConfig?.extra || {};

const API_KEY = RESCUE_GROUPS_API_KEY;
const BASE_URL = "https://api.rescuegroups.org/v5";

const filters = [
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
  {
    fieldName: "species.singular",
    operation: "equals",
    criteria: "Dog",
  },
];

export const getRescueGroupsPets = async () => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/public/animals/search/?sort=random&limit=18`,
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      data: {
        data: {
          filters,
          filterProcessing: "1 AND (2 OR 3)",
          filterRadius: {
            miles: 100,
            coordinates: "51.0111,-114.1319",
          },
        },
      },
    });

    console.log("All data: ", response.data);
    console.log("API response status:", response.status);
    console.log("Number of pets returned:", response.data?.data?.length || 0);

    return formatRescueGroupsPet(response.data);
  } catch (error) {
    console.error("Failed to fetch pets:", error);
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
