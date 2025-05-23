import { LocationSearchResult } from "@/styles/types";
import * as fs from "fs";
import * as path from "path";

const LOCATIONS_FILE = "saved_locations.txt";
const LOCATIONS_PATH = path.join(process.cwd(), LOCATIONS_FILE);

// Ensure the file exists when the module is loaded
if (!fs.existsSync(LOCATIONS_PATH)) {
  fs.writeFileSync(LOCATIONS_PATH, "", "utf-8");
}

/**
 * Read all saved locations from file
 */
export const readLocationsFromFile = (): LocationSearchResult[] => {
  try {
    const content = fs.readFileSync(LOCATIONS_PATH, "utf-8");
    return content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => JSON.parse(line));
  } catch (error) {
    console.error("Error reading locations:", error);
    return [];
  }
};

/**
 * Save a new location to file
 */
export const saveLocationToFile = (location: LocationSearchResult): boolean => {
  try {
    // Convert location to JSON string with proper formatting
    const locationString = JSON.stringify(location);
    fs.appendFileSync(LOCATIONS_PATH, locationString + "\n");
    return true;
  } catch (error) {
    console.error("Error saving location:", error);
    return false;
  }
};

/**
 * Update an existing location in file
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
    writeLocationsToFile(locations);
    return true;
  } catch (error) {
    console.error("Error updating location:", error);
    return false;
  }
};

/**
 * Delete a location from file
 */
export const deleteLocationFromFile = (
  location: LocationSearchResult
): boolean => {
  try {
    const locations = readLocationsFromFile();
    const filtered = locations.filter(
      (loc) =>
        !(
          loc.name === location.name &&
          loc.floor === location.floor &&
          loc.location.x === location.location.x &&
          loc.location.y === location.location.y
        )
    );

    if (filtered.length === locations.length) return false;

    writeLocationsToFile(filtered);
    return true;
  } catch (error) {
    console.error("Error deleting location:", error);
    return false;
  }
};

/**
 * Write all locations back to file
 */
const writeLocationsToFile = (locations: LocationSearchResult[]): void => {
  try {
    const content = locations
      .map((location) => JSON.stringify(location))
      .join("\n");
    fs.writeFileSync(LOCATIONS_PATH, content + "\n");
  } catch (error) {
    console.error("Error writing locations:", error);
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
