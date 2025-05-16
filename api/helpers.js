import { formatPetDescription } from "../utils/htmlUtils";
import {
  cleanPetDescription,
  generatePersonalityTraits,
} from "./gemini/descriptionCleaner";
import { extractPetTraits } from "./gemini/extractPetTraits";

export const getAnimalImageUrls = (response) => {
  if (!response || !response.included) {
    console.error("Missing included data in response");
    return {};
  }

  const picturesMap = new Map();
  const animalImageMap = {};

  for (const item of response.included || []) {
    if (item.type === "pictures") {
      const { id, attributes } = item;
      picturesMap.set(id, {
        original: attributes.original?.url,
        large: attributes.large?.url,
        small: attributes.small?.url,
      });
    }
  }
  if (response.data && Array.isArray(response.data)) {
    response.data.forEach((animal) => {
      const imageIds =
        animal.relationships?.pictures?.data?.map((p) => p.id) || [];
      const imageUrls = imageIds
        .map((id) => picturesMap.get(id))
        .filter(Boolean);

      animalImageMap[animal.id] =
        imageUrls.length > 0
          ? imageUrls[0].original ||
            imageUrls[0].large ||
            imageUrls[0].small ||
            ""
          : "";
    });
  }

  return animalImageMap;
};

export const getAnimalLocationData = (response) => {
  if (!response || !response.included) {
    console.error("Missing included data in response");
    return {};
  }

  const locationsMap = new Map();
  const animalLocationMap = {};

  for (const item of response.included || []) {
    if (item.type === "locations") {
      const { id, attributes } = item;
      locationsMap.set(id, {
        address: attributes.street,
        city: attributes.city,
        state: attributes.state,
        citystate: attributes.citystate,
        coordinates: attributes.coordinates,
        postalcode: attributes.postalcode,
      });
    }
  }

  if (response.data && Array.isArray(response.data)) {
    response.data.forEach((animal) => {
      const locationIds =
        animal.relationships?.locations?.data?.map((l) => l.id) || [];
      const locationData = locationIds
        .map((id) => locationsMap.get(id))
        .filter(Boolean);

      animalLocationMap[animal.id] =
        locationData.length > 0 ? locationData[0] : {};
    });
  }

  return animalLocationMap;
};

export const formatRescueGroupsPet = async (response) => {
  if (!response || !response.data) {
    console.error("Invalid response format:", response);
    return [];
  }

  const imageUrlsMap = getAnimalImageUrls(response);
  const locationMap = getAnimalLocationData(response);

  const formattedPets = [];

  for (const animal of response.data) {
    const basicFormattedDescription = formatPetDescription(
      animal.attributes.descriptionText
    );

    let enhancedDescription;
    let personalityTraits;
    let extractedTraits;

    try {
      // Process with Gemini API in parallel, passing pet ID for caching
      const petId = animal.id.toString();
      const [descriptionPromise, traitsPromise, extractedTraitsPromise] =
        await Promise.all([
          cleanPetDescription(basicFormattedDescription, petId),
          generatePersonalityTraits(
            basicFormattedDescription,
            animal.attributes.species?.singular?.toLowerCase() || "pet",
            petId
          ),
          extractPetTraits(basicFormattedDescription, petId),
        ]);

      enhancedDescription = descriptionPromise;
      personalityTraits = traitsPromise;
      extractedTraits = extractedTraitsPromise;
    } catch (error) {
      console.error("Error using Gemini API:", error);
      enhancedDescription = basicFormattedDescription;
      personalityTraits = animal.attributes.qualities || [];
      extractedTraits = null;
    }

    const locationData = locationMap[animal.id] || {};
    const locationString =
      locationData.city && locationData.state
        ? `${locationData.city}, ${locationData.state}`
        : locationData.name || "Location unavailable";

    const safeExtractedTraits = extractedTraits || {
      isKidsOk: "Unknown",
      isDogsOk: "Unknown",
      isCatsOk: "Unknown",
      isSpecialNeeds: "Unknown",
      energyLevel: "Unknown",
      idealHome: null,
      location: null,
      notes: [],
    };

    const mergedTraits = {
      isKidsOk: animal.attributes.isKidsOk || safeExtractedTraits.isKidsOk,
      isDogsOk: animal.attributes.isDogsOk || safeExtractedTraits.isDogsOk,
      isCatsOk: animal.attributes.isCatsOk || safeExtractedTraits.isCatsOk,
      isSpecialNeeds:
        animal.attributes.isSpecialNeeds || safeExtractedTraits.isSpecialNeeds,

      // Additional extracted data that might not be in the API
      energyLevel: safeExtractedTraits.energyLevel,
      idealHome: safeExtractedTraits.idealHome,
      extractedLocation: safeExtractedTraits.location,
      extractedNotes: safeExtractedTraits.notes,
    };

    formattedPets.push({
      id: animal.id,
      name: safeExtractedTraits.descName || animal.attributes.name,
      age: animal.attributes.ageGroup,
      breed: animal.attributes.breedPrimary,
      size: animal.attributes.sizeGroup || "N/A",
      gender: animal.attributes.sex,
      isKidsOk: mergedTraits.isKidsOk,
      isDogsOk: mergedTraits.isDogsOk,
      isCatsOk: mergedTraits.isCatsOk,
      isSpecialNeeds: mergedTraits.isSpecialNeeds,
      energyLevel: mergedTraits.energyLevel,
      idealHome: mergedTraits.idealHome,
      description: enhancedDescription || "No description available",
      qualities: personalityTraits || animal.attributes.qualities || [],
      location: locationString,
      locationData: locationData,
      extractedLocation: mergedTraits.extractedLocation,
      extractedNotes: mergedTraits.extractedNotes,
      image: imageUrlsMap[animal.id] || "",
      pictures: animal.relationships?.pictures?.data?.map((p) => p.id) || [],
      orgId: animal.relationships?.orgs?.data?.[0]?.id || null,
    });
  }

  return formattedPets;
};
