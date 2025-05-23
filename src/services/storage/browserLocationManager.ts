import { LocationSearchResult } from "@/styles/types";

const STORAGE_KEY = "savedLocations";

// Default locations that will be used when storage is empty
const defaultLocations: LocationSearchResult[] = [
  {
    type: "utilityRoom",
    name: "Gymnasium",
    floor: 1,
    location: { x: 10, y: 20 },
    description: "Sports and recreation area",
    color: "#4CAF50",
  },
  {
    type: "bathroom",
    name: "Restrooms",
    floor: 1,
    location: { x: 15, y: 25 },
    description: "Public restrooms",
    color: "#2196F3",
  },
  {
    type: "elevator",
    name: "Elevators",
    floor: 1,
    location: { x: 5, y: 10 },
    description: "Main elevator access",
    color: "#673AB7",
  },
  {
    type: "emergency",
    name: "Escape route",
    floor: 1,
    location: { x: 30, y: 40 },
    description: "Emergency exit route",
    color: "#FF5722",
  },
  {
    type: "facility",
    name: "Water",
    floor: 1,
    location: { x: 50, y: 60 },
    description: "Water fountain",
    color: "#00BCD4",
  },
];

/**
 * Read all saved locations from localStorage.
 * If storage is empty, initializes it with default locations.
 */
export const readLocationsFromFile = (): LocationSearchResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with default locations if storage is empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLocations));
      return defaultLocations;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading locations:", error);
    return defaultLocations; // Return defaults if there's an error
  }
};

/**
 * Save a new location to localStorage
 */
export const saveLocationToFile = (location: LocationSearchResult): boolean => {
  try {
    const locations = readLocationsFromFile();
    locations.push(location);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    return true;
  } catch (error) {
    console.error("Error saving location:", error);
    return false;
  }
};

/**
 * Update an existing location in localStorage
 */
export const updateLocationInFile = (
  oldLocation: LocationSearchResult,
  newLocation: LocationSearchResult
): boolean => {
  try {
    const locations = readLocationsFromFile();
    const index = locations.findIndex(
      (loc) =>
        loc.name === oldLocation.name &&
        loc.floor === oldLocation.floor &&
        loc.location.x === oldLocation.location.x &&
        loc.location.y === oldLocation.location.y
    );

    if (index === -1) return false;

    locations[index] = newLocation;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    return true;
  } catch (error) {
    console.error("Error updating location:", error);
    return false;
  }
};

/**
 * Delete a location from localStorage
 */
export const deleteLocationFromFile = (
  location: LocationSearchResult
): boolean => {
  try {
    const locations = readLocationsFromFile();
    const filteredLocations = locations.filter(
      (loc) =>
        !(
          loc.name === location.name &&
          loc.floor === location.floor &&
          loc.location.x === location.location.x &&
          loc.location.y === location.location.y
        )
    );

    if (filteredLocations.length === locations.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLocations));
    return true;
  } catch (error) {
    console.error("Error deleting location:", error);
    return false;
  }
};

/**
 * Search for locations by query
 */
export const searchLocationsInFile = (
  query: string
): LocationSearchResult[] => {
  const locations = readLocationsFromFile();
  const lowerQuery = query.toLowerCase();

  return locations.filter(
    (location) =>
      location.name.toLowerCase().includes(lowerQuery) ||
      location.description?.toLowerCase().includes(lowerQuery) ||
      String(location.type).toLowerCase().includes(lowerQuery)
  );
};
