import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache keys
export const CACHE_KEYS = {
  PET_TRAITS: 'pet_traits_cache_',
  PET_DESCRIPTION: 'pet_description_cache_',
  PET_PERSONALITY: 'pet_personality_cache_',
  PET_HEALTH: 'pet_health_cache_',
  FORMATTED_DESCRIPTION: 'formatted_description_cache_',
};

/**
 * Get cached data for a specific pet and cache type
 * @param {string} petId - The pet's unique identifier
 * @param {string} cacheType - The type of cache to retrieve (from CACHE_KEYS)
 * @returns {Promise<any|null>} - The cached data or null if not found
 */
export const getCachedData = async (petId, cacheType) => {
  try {
    const cacheKey = `${cacheType}${petId}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);
    
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      
      // Optional: Check if cache is expired (e.g., older than 7 days)
      const now = Date.now();
      const cacheAge = now - timestamp;
      const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      
      if (cacheAge > CACHE_EXPIRY) {
        console.log(`Cache expired for ${cacheKey}, will refresh data`);
        return null;
      }
      
      console.log(`Using cached data for ${cacheKey}`);
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving cached data:', error);
    return null;
  }
};

/**
 * Save data to cache for a specific pet and cache type
 * @param {string} petId - The pet's unique identifier
 * @param {string} cacheType - The type of cache to save (from CACHE_KEYS)
 * @param {any} data - The data to cache
 * @returns {Promise<boolean>} - Whether the operation was successful
 */
export const saveCachedData = async (petId, cacheType, data) => {
  try {
    const cacheKey = `${cacheType}${petId}`;
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    
    await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData));
    console.log(`Saved data to cache for ${cacheKey}`);
    return true;
  } catch (error) {
    console.error('Error saving data to cache:', error);
    return false;
  }
};

/**
 * Clear all cached data or specific cache types
 * @param {string[]} [cacheTypes] - Optional array of cache types to clear
 * @returns {Promise<boolean>} - Whether the operation was successful
 */
export const clearCache = async (cacheTypes = Object.values(CACHE_KEYS)) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keysToRemove = keys.filter(key => 
      cacheTypes.some(cacheType => key.startsWith(cacheType))
    );
    
    if (keysToRemove.length > 0) {
      await AsyncStorage.multiRemove(keysToRemove);
      console.log(`Cleared ${keysToRemove.length} cache entries`);
    }
    
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

export default {
  CACHE_KEYS,
  getCachedData,
  saveCachedData,
  clearCache,
};
