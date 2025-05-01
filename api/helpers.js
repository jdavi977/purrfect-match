import { formatPetDescription } from "../utils/htmlUtils";

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

export const formatRescueGroupsPet = (response) => {
  if (!response || !response.data) {
    console.error("Invalid response format:", response);
    return [];
  }

  const imageUrlsMap = getAnimalImageUrls(response);
  const locationMap = getAnimalLocationData(response);

  return response.data.map((animal) => {
    const formattedDescription = formatPetDescription(
      animal.attributes.descriptionText
    );

    const locationData = locationMap[animal.id] || {};
    const locationString =
      locationData.city && locationData.state
        ? `${locationData.city}, ${locationData.state}`
        : locationData.name || "Location unavailable";

    return {
      id: animal.id,
      name: animal.attributes.name,
      age: animal.attributes.ageGroup,
      breed: animal.attributes.breedPrimary,
      size: animal.attributes.sizeGroup || "N/A",
      gender: animal.attributes.sex,
      isKidsOk: animal.attributes.isKidsOk,
      isDogsOk: animal.attributes.isDogsOk,
      isCatsOk: animal.attributes.isCatsOk,
      isSpecialNeeds: animal.attributes.isSpecialNeeds,
      description: formattedDescription || "No description available",
      qualities: animal.attributes.qualities,
      location: locationString,
      locationData: locationData,
      image: imageUrlsMap[animal.id] || "",
      pictures: animal.relationships?.pictures?.data?.map((p) => p.id) || [],
      orgId: animal.relationships?.orgs?.data?.[0]?.id || null,
    };
  });
};
