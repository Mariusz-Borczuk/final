import {
  AccessibilitySettings,
  LocationSearchResult,
  NavigationItem,
  RightSidebarProps,
} from "@/components/types/types";
import { getSettings } from "@/utils/accessibilityStyles";
import {
  FaElevator,
  FaRestroom,
  FaWalking,
  MdSportsTennis,
  MdWater,
} from "@/utils/icons";
import React, { useState } from "react";
import AddCustomNavigationButton from "./CustomLocation";

/**
 * QuickNavigation component provides a list of predefined locations and custom navigation items.
 *
 * The component displays a list of locations, each with an icon, name, and coordinates. Users can
 * also add custom navigation items which will appear alongside the predefined ones.
 *
 * @component
 * @param {RightSidebarProps} props - Props for the QuickNavigation component
 * @param {Object} props.settings - The settings for displaying the component
 * @param {number} props.currentFloor - The current floor number
 * @param {Function} [props.onSelectLocation] - Optional callback for when a location is selected
 * @param {Function} [props.onUpdateSettings] - Optional callback for updating settings
 *
 * @returns {JSX.Element} A sidebar section with quick navigation options and ability to add custom locations
 */
export const QuickNavigation: React.FC<
  RightSidebarProps & {
    onSelectLocation?: (location: LocationSearchResult) => void;
    onUpdateSettings?: (settings: AccessibilitySettings) => void;
  }
> = ({ settings, currentFloor, onSelectLocation, onUpdateSettings }) => {
  const [customNavigation, setCustomNavigation] = useState<NavigationItem[]>(
    []
  );

  // Default settings for locations if not already set
  const initializeDefaultSettings = () => {
    if (!settings.preferredBathroom) {
      onUpdateSettings?.({ preferredBathroom: "Any" });
    }

    if (!settings.walkingSpeedMPS) {
      onUpdateSettings?.({ walkingSpeedMPS: 1.4 });
    }
  };

  // Initialize default settings on component mount
  React.useEffect(() => {
    initializeDefaultSettings();
  }, []);

  // Predefined locations with colors
  const predefinedLocations: NavigationItem[] = [
    {
      icon: <MdSportsTennis />,
      name: "Gymnasium",
      coordinates: { x: 10, y: 20 },
      color: "#4CAF50", // Green
    },
    {
      icon: <FaRestroom />,
      name: "Restrooms",
      coordinates: { x: 15, y: 25 },
      color: "#2196F3", // Blue
    },
    {
      icon: <FaElevator />,
      name: "Elevators",
      coordinates: { x: 5, y: 10 },
      color: "#673AB7", // Deep Purple
    },
    {
      icon: <FaWalking />,
      name: "Escape route",
      coordinates: { x: 30, y: 40 },
      color: "#FF5722", // Deep Orange
    },
    {
      icon: <MdWater />,
      name: "Water",
      coordinates: { x: 50, y: 60 },
      color: "#00BCD4", // Cyan
    },
  ];

  const handleAddCustomNavigation = (item: NavigationItem) => {
    setCustomNavigation((prev) => [...prev, item]);
  };

  // Handle location click
  const handleLocationClick = (location: NavigationItem) => {
    if (onSelectLocation) {
      const locationResult: LocationSearchResult = {
        type: "coordinate",
        name: location.name,
        floor: currentFloor,
        location: { x: location.coordinates.x, y: location.coordinates.y },
        description: `Quick navigation to ${location.name}`,
        color: location.color || "#4CAF50", // Use provided color or default to green
      };
      onSelectLocation(locationResult);
    }

    // If clicking on bathroom, update preferred bathroom setting
    if (location.name === "Restrooms" && onUpdateSettings) {
      onUpdateSettings({ preferredBathroom: "Any" });
    }
  };

  return (
    <div>
      <h2
        className={`font-semibold mb-3 text-gray-200 ${getSettings(settings)}`}
      >
        Quick Navigation
      </h2>
      <ul className="space-y-2 flex flex-col">
        {[...predefinedLocations, ...customNavigation].map(
          (location, index) => (
            <li key={index}>
              <button
                className="w-full p-3 text-left bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none flex items-center"
                onClick={() => handleLocationClick(location)}
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex items-center justify-center">
                    <div
                      className="w-8 h-8 rounded-[4px] mr-2 flex items-center justify-center"
                      style={{ backgroundColor: location.color || "#4CAF50" }}
                    >
                      <span className="text-white">{location.icon}</span>
                    </div>
                  </div>
                  <span className="flex-1">{location.name}</span>
                  <span className="text-xs text-gray-400">
                    ({location.coordinates.x}, {location.coordinates.y})
                  </span>
                </div>
              </button>
            </li>
          )
        )}
      </ul>
      <AddCustomNavigationButton
        onAdd={handleAddCustomNavigation}
        onSelectLocation={onSelectLocation}
        currentFloor={currentFloor}
      />
    </div>
  );
};
