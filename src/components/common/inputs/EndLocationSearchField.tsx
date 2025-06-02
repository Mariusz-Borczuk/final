import {
  AccessibilitySettings,
  allFloorData,
  Coordinate,
  coordRegex,
  getEndLocationStyles,
  getSettings,
  LocationSearchProps,
  LocationSearchResult,
} from "@/styles/types";
import {
  FaElevator,
  FaMapMarkerAlt,
  FaRestroom,
  MdLocationPin,
  SiGoogleclassroom,
} from "@/utils/icons/icons";
import React, { useCallback, useEffect, useState } from "react";

/**
 * Search field component for selecting a destination location.
 * Allows searching by classroom number, bathroom type, elevator, stairs, utility room, exit, or coordinates.
 */
export const EndLocationSearchField: React.FC<LocationSearchProps & {
  externalLocation?: LocationSearchResult | null;
  onExternalLocationSet?: () => void;
}> = ({
  onSearch,
  currentFloor,
  setCurrentFloor,
  settings,
  externalLocation,
  onExternalLocationSet,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>(
    []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDisplayLocation, setSelectedDisplayLocation] =
    useState<LocationSearchResult | null>(null);

  // Handle external location selection
  useEffect(() => {
    if (externalLocation) {
      console.log("External end location detected:", externalLocation);
      handleLocationSelection(externalLocation);
      if (onExternalLocationSet) {
        onExternalLocationSet();
      }
    }
  }, [externalLocation, onExternalLocationSet]);

  // Handle location selection
  const handleLocationSelection = useCallback((location: LocationSearchResult) => {
    console.log("EndLocationSearchField: handleLocationSelection called with:", location);
    if (location.floor !== currentFloor && setCurrentFloor) {
      setCurrentFloor(location.floor);
    }
    setSelectedDisplayLocation(location);
    onSearch(location);
    setSearchQuery(location.name);
    setIsDropdownOpen(false);
  }, [currentFloor, setCurrentFloor, onSearch]);

  // Function to parse coordinates from search query
  const parseCoordinates = (query: string): Coordinate | null => {
    const match = query.match(coordRegex);
    if (match) {
      const x = parseInt(match[1] || match[3] || "0");
      const y = parseInt(match[2] || match[4] || "0");
      if (!isNaN(x) && !isNaN(y)) {
        return { x, y };
      }
    }
    return null;
  };

  // Effect to perform search based on query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const results: LocationSearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();
    const coordinates = parseCoordinates(searchQuery);

    // Add coordinate result if valid
    if (coordinates) {
      results.push({
        type: "coordinate",
        name: `Destination at (${coordinates.x}, ${coordinates.y})`,
        floor: currentFloor,
        location: coordinates,
        description: `Coordinates (${coordinates.x}, ${coordinates.y}) on current floor`,
      });
    }

    // Search through floor data for matching locations
    allFloorData.forEach((floorData, floorIndex) => {
      const floorNumber = floorIndex + 1;

      // Search classrooms
      floorData.classrooms.forEach((room) => {
        if (room.number.toLowerCase().includes(lowerQuery)) {
          
          results.push({
            type: "classroom",
            name: `Classroom ${room.number}`,
            floor: floorNumber,
            location: room.entry as Coordinate,
            description: `Classroom ${room.number} on floor ${floorNumber}`,
          });
        }
      });

      // Search bathrooms
      floorData.bathrooms.forEach((bathroom) => {
        if (bathroom.type.toLowerCase().includes(lowerQuery)) {
          
          results.push({
            type: "bathroom",
            name: `${bathroom.type} Bathroom`,
            floor: floorNumber,
            location: bathroom.entry,
            description: `${bathroom.type} Bathroom on floor ${floorNumber}`,
          });
        }
      });

      // Search elevators
      floorData.elevators.forEach((elevator, index) => {
        if ("elevator".includes(lowerQuery)) {
          
          results.push({
            type: "elevator",
            name: `Elevator ${index + 1}`,
            floor: floorNumber,
            location: elevator.entry,
            description: `Elevator ${index + 1} on floor ${floorNumber}`,
          });
        }
      });

      // Search stairs
      floorData.stairs.forEach((stair, index) => {
        if ("stair".includes(lowerQuery) || "stairs".includes(lowerQuery)) {
          
          results.push({
            type: "stairs",
            name: `Stairs ${index + 1}`,
            floor: floorNumber,
            location: stair.entry,
            description: `Stairs ${index + 1} on floor ${floorNumber}`,
          });
        }
      });

      // Search utility rooms
      floorData.utilityRooms.forEach((room) => {
        if (room.name.toLowerCase().includes(lowerQuery)) {
          
          results.push({
            type: "utilityRoom",
            name: room.name,
            floor: floorNumber,
            location: room.entry,
            description: `${room.name} on floor ${floorNumber}`,
          });
        }
      });

      // Search exit points
      floorData.exits?.forEach((exit) => {
        if (
          lowerQuery.includes("exit") ||
          (exit.description &&
            exit.description.toLowerCase().includes(lowerQuery))
        ) {
          
          results.push({
            type: "exit",
            name: exit.description || `Exit`,
            floor: floorNumber,
            location: exit.location as Coordinate,
            description: `${
              exit.description || "Building Exit"
            } on floor ${floorNumber}`,
          });
        }
      });
    });

    setSearchResults(results);
    setIsDropdownOpen(results.length > 0);
  }, [searchQuery, currentFloor]);

  // Handle result click
  const handleResultClick = useCallback((result: LocationSearchResult) => {
    handleLocationSelection(result);
  }, [handleLocationSelection]);

  // --- UI Rendering ---
  const styles = getEndLocationStyles(settings);

  const getLocationIcon = useCallback((type?: string) => {
    switch (type?.toLowerCase()) {
      case "classroom":
        return <SiGoogleclassroom className="text-green-600" />;
      case "bathroom":
        return <FaRestroom className="text-green-600" />;
      case "elevator":
        return <FaElevator className="text-green-600" />;
      case "exit":
        return <FaMapMarkerAlt className="text-green-600" />;
      case "coordinate":
        return <MdLocationPin className="text-green-600" />;
      default:
        return <MdLocationPin className="text-green-600" />;
    }
  }, []);

  return (
    <div
      className="relative w-full"
      aria-label="End location search field"
      aria-describedby="end-location-search-desc"
    >
      {/* Description for screen readers */}
      <div id="end-location-search-desc" className="sr-only">
        Use this field to search for and select the destination location for
        navigation.
      </div>
      {/* Label and Input */}
      <div className="relative">
        <label
          htmlFor="end-location-search"
          className={`block text-sm font-medium ${
            styles.labelText
          } ${getSettings(settings as AccessibilitySettings)}`}
        >
          Set Destination
          {selectedDisplayLocation && (
            <span className="ml-2 text-red-600 font-bold">✓ Selected</span>
          )}
        </label>
        <div className="flex items-center">
          <input
            id="end-location-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              selectedDisplayLocation
                ? "Change destination..."
                : "Search destination..."
            }
            className={`w-full px-3 pr-10 py-2 ${styles.inputBg} ${styles.inputText} ${styles.inputBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm}`}
            onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            aria-label="Search for a destination location"
          />
          <div className="absolute inset-y-0 right-0 flex items-center top-5">
            <button
              className={`${styles.buttonBg} ${styles.buttonText} h-full px-2 rounded-r-lg shadow-sm hover:scale-105 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 flex items-center justify-center border-l ${styles.inputBorder}`}
              onClick={() => {
                if (searchResults.length > 0 && searchResults[0]) {
                  handleResultClick(searchResults[0]);
                  setSearchQuery(searchResults[0].name);
                } else {
                  const coords = parseCoordinates(searchQuery);
                  if (coords) {
                    const coordResult: LocationSearchResult = {
                      type: "coordinate",
                      name: `Destination at (${coords.x}, ${coords.y})`,
                      floor: currentFloor,
                      location: coords,
                      description: `Coordinates (${coords.x}, ${coords.y}) on current floor`,
                    };
                    handleResultClick(coordResult);
                    setSearchQuery(coordResult.name);
                  } else {
                    onSearch(null);
                    setSelectedDisplayLocation(null);
                  }
                }
              }}
              aria-label="Set destination"
            >
              <FaMapMarkerAlt className={`h-4 w-4 ${styles.iconColor}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Location Display */}
      {selectedDisplayLocation && (
        <div
          className={`mt-1 p-2 ${styles.inputBg} border-2 border-red-500 rounded-lg flex items-center`}
        >
          {/* Updated icon wrapper with green styling */}
          <div className="mr-2 text-lg flex items-center justify-center w-6 h-6 rounded-md ring-2 ring-red-500 bg-red-100/30 text-bold">
            {getLocationIcon(selectedDisplayLocation.type as string)}
          </div>
          <div className="flex flex-col flex-1">
            <span className={`font-semibold ${styles.resultText}`}>
              {selectedDisplayLocation.name.replace("Destination at ", "")}
            </span>
            <span className={`text-xs ${styles.resultDetailText}`}>
              {selectedDisplayLocation.type !== "coordinate"
                ? `Floor ${selectedDisplayLocation.floor} • `
                : ""}
              {`(${selectedDisplayLocation.location.x}, ${selectedDisplayLocation.location.y})`}
            </span>
          </div>
          {selectedDisplayLocation.floor !== currentFloor && (
            <span
              className={`text-xs ${styles.highlightBadge} px-2 py-1 rounded mx-1`}
            >
              Floor {selectedDisplayLocation.floor}
            </span>
          )}
        </div>
      )}

      {/* Search Results Dropdown */}
      {isDropdownOpen && searchResults.length > 0 && (
        <div
          className={`absolute z-180 mt-1 w-full ${styles.dropdownBg} ${styles.dropdownBorder} border-2 border-red-500 rounded-lg p-1 shadow-lg max-h-60 overflow-auto`}
        >
          {searchResults.map((result, index) => (
            <div
              key={`${result.type}-${result.floor}-${result.location.x}-${result.location.y}-${index}`}
              className={`px-4 py-2 cursor-pointer ${
                styles.dropdownItemHover
              } flex items-center ${getSettings(
                settings as AccessibilitySettings
              )}`}
              onClick={() => handleResultClick(result)}
            >
              <div className="mr-1 pr-2 text-lg">
                {getLocationIcon(result.type as string)}
              </div>
              <div className="flex flex-col">
                <span className={`font-semibold ${styles.resultText}`}>
                  {result.name}
                </span>
                <span className={`text-sm ${styles.resultDetailText}`}>
                  {result.type !== "coordinate"
                    ? `Floor ${result.floor} • `
                    : ""}
                  {`(${result.location.x}, ${result.location.y})`}
                </span>
              </div>
              {result.floor !== currentFloor && (
                <span
                  className={`text-xs ${styles.highlightBadge} px-1 py-0.5 rounded ml-auto`}
                >
                  Floor {result.floor}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
