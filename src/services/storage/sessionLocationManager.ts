import { LocationSearchResult } from "@/styles/types";

const LOCATIONS_KEY = "saved_locations";

export const getSessionLocations = (): LocationSearchResult[] => {
  const locationsJson = sessionStorage.getItem(LOCATIONS_KEY);
  return locationsJson ? JSON.parse(locationsJson) : [];
};

export const saveSessionLocation = (
  location: LocationSearchResult
): boolean => {
  try {
    const locations = getSessionLocations();
    locations.push(location);
    sessionStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations));
    return true;
  } catch (error) {
    console.error("Error saving location to session:", error);
    return false;
  }
};

export const deleteSessionLocation = (
  location: LocationSearchResult
): boolean => {
  try {
    const locations = getSessionLocations();
    const filteredLocations = locations.filter(
      (loc) =>
        !(
          loc.name === location.name &&
          loc.floor === location.floor &&
          loc.location.x === location.location.x &&
          loc.location.y === location.location.y
        )
    );
    sessionStorage.setItem(LOCATIONS_KEY, JSON.stringify(filteredLocations));
    return true;
  } catch (error) {
    console.error("Error deleting location from session:", error);
    return false;
  }
};
