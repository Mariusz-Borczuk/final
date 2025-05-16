import { LocationSearchResult } from "@/components/types/types";
import * as fs from "fs";
import path from "path";

const LOCATIONS_FILE_PATH = path.join(process.cwd(), "locations.txt");

/**
 * Reads all locations from the locations file
 * @returns Array of LocationSearchResult objects
 */
export const readLocations = (): LocationSearchResult[] => {
  try {
    if (!fs.existsSync(LOCATIONS_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(LOCATIONS_FILE_PATH, "utf-8");
    return fileContent
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => JSON.parse(line));
  } catch (error) {
    console.error("Error reading locations:", error);
    return [];
  }
};

/**
 * Saves a new location to the locations file
 * @param location LocationSearchResult object to save
 * @returns boolean indicating success
 */
export const saveLocation = (location: LocationSearchResult): boolean => {
  try {
    const locationString = JSON.stringify(location);
    fs.appendFileSync(LOCATIONS_FILE_PATH, locationString + "\n");
    return true;
  } catch (error) {
    console.error("Error saving location:", error);
    return false;
  }
};

/**
 * Updates a location in the locations file
 * @param oldLocation The location to update
 * @param newLocation The new location data
 * @returns boolean indicating success
 */
export const updateLocation = (
  oldLocation: LocationSearchResult,
  newLocation: LocationSearchResult
): boolean => {
  try {
    const locations = readLocations();
    const index = locations.findIndex(
      (loc) =>
        loc.name === oldLocation.name &&
        loc.floor === oldLocation.floor &&
        loc.type === oldLocation.type
    );

    if (index === -1) return false;

    locations[index] = newLocation;
    writeLocations(locations);
    return true;
  } catch (error) {
    console.error("Error updating location:", error);
    return false;
  }
};

/**
 * Deletes a location from the locations file
 * @param location The location to delete
 * @returns boolean indicating success
 */
export const deleteLocation = (location: LocationSearchResult): boolean => {
  try {
    const locations = readLocations();
    const filteredLocations = locations.filter(
      (loc) =>
        !(
          loc.name === location.name &&
          loc.floor === location.floor &&
          loc.type === location.type
        )
    );

    if (filteredLocations.length === locations.length) return false;

    writeLocations(filteredLocations);
    return true;
  } catch (error) {
    console.error("Error deleting location:", error);
    return false;
  }
};

/**
 * Helper function to write all locations to file
 * @param locations Array of LocationSearchResult objects
 */
const writeLocations = (locations: LocationSearchResult[]): void => {
  const content = locations
    .map((location) => JSON.stringify(location))
    .join("\n");
  fs.writeFileSync(LOCATIONS_FILE_PATH, content + "\n");
};

/**
 * Search for locations matching a query
 * @param query Search query string
 * @returns Array of matching LocationSearchResult objects
 */
export const searchLocations = (query: string): LocationSearchResult[] => {
  const locations = readLocations();
  const lowerQuery = query.toLowerCase();

  return locations.filter(
    (location) =>
      location.name.toLowerCase().includes(lowerQuery) ||
      location.description?.toLowerCase().includes(lowerQuery) ||
      String(location.type).toLowerCase().includes(lowerQuery)
  );
};
