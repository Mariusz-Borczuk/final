import { LocationSearchResult } from "@/styles/types";

const STORAGE_KEY = "savedLocations";

// Default locations that will be always present
export const defaultLocations: LocationSearchResult[] = [
  {
    type: "utilityRoom",
    name: "Gymnasium",
    floor: 1,
    location: { x: 16, y: 21 },
    description: "Sports and recreation area",
    color: "#4CAF50",
    icon: "Location Pin",
  },
  {
    type: "utilityRoom",
    name: "Change Room",
    floor: 1,
    location: { x: 27, y: 10 },
    description: "Change room",
    color: "#4CAF50",
    icon: "Location Pin",
  },
  {
    type: "bathroom",
    name: "Male Restrooms",
    floor: 1,
    location: { x: 10, y: 17 },
    description: "Public male restrooms",
    color: "#2196F3",
    icon: "Location Pin",
  },
  {
    type: "bathroom",
    name: "Female Restrooms",
    floor: 1,
    location: { x: 45, y: 17 },
    description: "Public female restrooms",
    color: "#E91E63",
    icon: "Location Pin",
  },
  {
    type: "elevator",
    name: "Elevators",
    floor: 1,
    location: { x: 10, y: 32 },
    description: "Main elevator access",
    color: "#673AB7",
    icon: "Location Pin",
  },
  // {
  //   type: "emergency",
  //   name: "Escape route",
  //   floor: 1,
  //   location: { x: 30, y: 40 },
  //   description: "Emergency exit route",
  //   color: "#FF5722",
  //   icon: "Location Pin",
  // },
  {
    type: "facility",
    name: "Water",
    floor: 1,
    location: { x: 46, y: 10 },
    description: "Water fountain",
    color: "#00BCD4",
    icon: "Location Pin",
  },
  {
    type: "exit",
    location: { x: 55, y: 13 },
    floor: 1,
    name: "Exit 1 with automatic doors",
    description: "Main exit with automatic doors",
    color: "#5efc37",
  },
  {
    type: "exit",
    location: { x: 8, y: 50 },
    floor: 1,
    name: "Exit 2 leading to parking",
    description: "Secondary exit leading to parking area near CNTI",
    color: "#5efc37",
  },
  {
    type: "exit",
    location: { x: 47, y: 50 },
    floor: 1,
    name: "Exit 3 to start of the parking",
    description: "Tertiary exit to the start of the parking area",
    color: "#5efc37",
  },
 ];

export const fetchLocationsFromSession = (): LocationSearchResult[] => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLocations));
      return defaultLocations;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading locations:", error);
    return defaultLocations;
  }
};

/**
 * Save a new location to sessionStorage
 */
export const storeLocationInSession = (
  location: LocationSearchResult
): boolean => {
  try {
    const locations = fetchLocationsFromSession();
    locations.push(location);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    return true;
  } catch (error) {
    console.error("Error saving location:", error);
    return false;
  }
};

/**
 * Update an existing location in sessionStorage
 */
export const replaceLocationInSession = (
  oldLocation: LocationSearchResult,
  newLocation: LocationSearchResult
): boolean => {
  try {
    const locations = fetchLocationsFromSession();
    const index = locations.findIndex(
      (loc) =>
        loc.name === oldLocation.name &&
        loc.floor === oldLocation.floor &&
        loc.location.x === oldLocation.location.x &&
        loc.location.y === oldLocation.location.y
    );

    if (index === -1) return false;

    locations[index] = newLocation;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    return true;
  } catch (error) {
    console.error("Error updating location:", error);
    return false;
  }
};

/**
 * Delete a location from sessionStorage
 */
export const removeLocationFromSession = (
  location: LocationSearchResult
): boolean => {
  try {
    const locations = fetchLocationsFromSession();
    const filteredLocations = locations.filter(
      (loc) =>
        !(
          loc.name === location.name &&
          loc.floor === location.floor &&
          loc.location.x === location.location.x &&
          loc.location.y === location.location.y
        )
    );

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLocations));
    return true;
  } catch (error) {
    console.error("Error deleting location:", error);
    return false;
  }
};

/**
 * Search for locations by query
 */
export const searchLocationsInSession = (
  query: string
): LocationSearchResult[] => {
  const locations = fetchLocationsFromSession();
  const lowerQuery = query.toLowerCase();

  return locations.filter(
    (location) =>
      location.name.toLowerCase().includes(lowerQuery) ||
      location.description?.toLowerCase().includes(lowerQuery) ||
      String(location.type).toLowerCase().includes(lowerQuery)
  );
};
