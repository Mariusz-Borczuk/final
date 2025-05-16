import {
  AccessibilitySettings,
  LocationSearchResult,
  NavigationItem,
  RightSidebarProps,
} from "@/components/types/types";
import { getSettings } from "@/utils/accessibilityStyles";
import {
  deleteLocationFromFile,
  readLocationsFromFile,
  saveLocationToFile,
} from "@/utils/browserLocationManager";
import * as Icons from "@/utils/icons";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import AddCustomNavigationButton from "./CustomLocation";

/**
 * QuickNavigation component provides a list of saved locations and custom navigation items.
 */
export const QuickNavigation: React.FC<
  RightSidebarProps & {
    onSelectLocation?: (location: LocationSearchResult) => void;
    onUpdateSettings?: (settings: AccessibilitySettings) => void;
  }
> = ({ settings, currentFloor, onSelectLocation }) => {
  const [savedLocations, setSavedLocations] = useState<LocationSearchResult[]>(
    []
  );

  // Load saved locations on mount
  useEffect(() => {
    const loadedLocations = readLocationsFromFile();
    setSavedLocations(loadedLocations);
  }, []);

  // Function to render the icon based on icon name
  const renderIcon = (iconName?: string) => {
    if (!iconName || !(iconName in Icons)) {
      return <Icons.MdLocationPin className="text-white text-xl" />;
    }
    const Icon = Icons[iconName as keyof typeof Icons] as IconType;
    return <Icon className="text-white text-xl" />;
  };

  const handleAddCustomNavigation = (item: NavigationItem) => {
    const locationResult: LocationSearchResult = {
      type: "custom",
      name: item.name,
      floor: currentFloor,
      location: { x: item.coordinates.x, y: item.coordinates.y },
      description: `Custom location: ${item.name}`,
      color: item.color,
      icon: item.iconName, // Save the icon name
    };

    if (saveLocationToFile(locationResult)) {
      setSavedLocations((prev) => [...prev, locationResult]);
    }
  };

  // Handle location click
  const handleLocationClick = (location: LocationSearchResult) => {
    if (onSelectLocation) {
      onSelectLocation(location);
    }
  };

  // Handle location deletion
  const handleDeleteLocation = (location: LocationSearchResult) => {
    if (deleteLocationFromFile(location)) {
      setSavedLocations((prev) =>
        prev.filter(
          (loc) =>
            !(
              loc.name === location.name &&
              loc.floor === location.floor &&
              loc.location.x === location.location.x &&
              loc.location.y === location.location.y
            )
        )
      );
    }
  };

  return (
    <div
      className="mb-4"
      aria-label="Quick navigation panel"
      aria-describedby="quick-navigation-desc"
    >
      {/* Description for screen readers */}
      <div id="quick-navigation-desc" className="sr-only">
        This panel provides quick access to saved locations and allows you to
        add custom locations.
      </div>
      <div className="rounded-2xl p-4 bg-gray-700">
        <h2
          className={`font-semibold mb-3 text-gray-200 ${getSettings(
            settings
          )}`}
        >
          Saved Locations
        </h2>
        <ul className="space-y-2 flex flex-col max-h-80  overflow-y-auto">
          {savedLocations.map((location, index) => (
            <li key={`${location.name}-${location.floor}-${index}`}>
              <div className="flex items-center justify-between p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                <div className="flex-1 flex items-center text-white text-left">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-[4px] flex items-center justify-center"
                      style={{ backgroundColor: location.color || "#4CAF50" }}
                    >
                      {renderIcon(location.icon)}
                    </div>
                    <div className="flex flex-col">
                      <span>{location.name}</span>
                      <span className="text-xs text-gray-400">
                        Floor {location.floor} • ({location.location.x},{" "}
                        {location.location.y})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLocationClick(location)}
                    className="p-2 bg-green-600 text-white hover:bg-green-500 rounded-lg transition-colors flex items-center gap-1"
                    aria-label={`Show ${location.name} on map`}
                  >
                    <Icons.FaMapMarkerAlt />
                  </button>
                  <button
                    onClick={() => handleDeleteLocation(location)}
                    className="p-2 bg-red-500 text-white hover:bg-red-400 rounded-lg transition-colors flex items-center gap-1"
                    aria-label={`Delete ${location.name} from saved locations`}
                  >
                    <Icons.FaTrashAlt />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {savedLocations.length === 0 && (
            <li className="text-gray-400 text-center p-4">
              No saved locations yet. Add some using the form below.
            </li>
          )}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-600">
          <AddCustomNavigationButton
            onAdd={handleAddCustomNavigation}
            onSelectLocation={onSelectLocation}
            currentFloor={currentFloor}
          />
        </div>
      </div>
    </div>
  );
};
