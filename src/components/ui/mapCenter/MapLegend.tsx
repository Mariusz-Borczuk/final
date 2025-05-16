import { AccessibilitySettings, MapLegendProps } from "@/types/types";
import { getSettings } from "@/utils/accessibilityStyles";
import React from "react";
import { tileData } from "../../../data/tileData";

/**
 * A component that displays a legend for the map, showing what each color represents.
 *
 * This component renders a grid of color blocks with labels for different map elements
 * such as classrooms, entry points, paths, etc. The component applies accessibility settings
 * including font size and font family based on user preferences.
 *
 * @component
 * @param {object} props - Component props
 * @param {object} props.settings - Accessibility settings object
 * @param {string} props.settings.fontSize - Font size setting ('small', 'normal', 'large', etc.)
 * @param {string} props.settings.contrast - Contrast setting ('normal', 'high', etc.)
 *
 * @example
 * ```tsx
 * <MapLegend settings={{
 *   fontSize: "large",
 *   contrast: "high",
 * }} />
 * ```
 */
export const MapLegend: React.FC<MapLegendProps> = ({ settings }) => {
  // Determine font size and family classes
  const fontSizeClass = getSettings(settings as AccessibilitySettings);
  const legendItems = [
    {
      label: "Classroom",
      color: tileData.classroom.color,
      description: "Rooms designated for teaching and learning activities",
    },
    {
      label: "Entry Point",
      color: tileData.classroomEntry.color,
      description: "Access points to enter or exit rooms and areas",
    },
    {
      label: "Path",
      color: tileData.path.color,
      description: "Walkable routes for navigation through the building",
    },
    {
      label: "Bathroom",
      color: tileData.bathroom.color,
      description: "Restroom facilities, including accessible options",
    },
    {
      label: "Elevator",
      color: tileData.elevator.color,
      description:
        "Vertical transportation between floors, wheelchair accessible",
    },
    {
      label: "Stairs",
      color: tileData.stairs.color,
      description: "Steps connecting different floor levels",
    },
    {
      label: "Fire Equipment",
      color: tileData.fireEquipment.color,
      description: "Fire safety equipment including extinguishers and alarms",
    },
    {
      label: "Utility Room",
      color: tileData.utilityRoom.color,
      description: "Maintenance and building services areas",
    },
    {
      label: "Exit",
      color: tileData.exit.color,
      description: "Designated points for leaving the building",
    },
  ];

  return (
    <div
      className="mt-4 p-8 w-full bg-gray-800 rounded-lg shadow-lg border-2 border-gray-700"
      role="region"
      aria-label="Map legend"
      aria-describedby="map-legend-desc"
    >
      {/* Enhanced description for screen readers */}
      <div id="map-legend-desc" className="sr-only">
        This legend explains the meaning of different colors and symbols on the
        campus map. Each item shows a color block followed by its meaning,
        helping you identify features like classrooms, bathrooms, and navigation
        paths throughout the building.
      </div>
      <h3
        className={`text-2xl font-bold mb-6 text-gray-100 ${getSettings(
          settings as AccessibilitySettings
        )}`}
      >
        Map Legend
      </h3>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        role="list"
      >
        {legendItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center group hover:bg-gray-700 p-4 rounded-md transition-colors relative"
            role="listitem"
            aria-label={`${item.label} indicator`}
          >
            <div
              className="w-12 h-12 mr-4 rounded border-2 border-gray-600 shadow-md"
              style={{ backgroundColor: item.color }}
              role="img"
              aria-label={`Color block representing ${item.label}`}
            />
            <span
              className={`text-gray-200 ${fontSizeClass} text-xl font-medium group-hover:text-blue-300 transition-colors cursor-help`}
              aria-label={`Represents ${item.label}`}
              role="text"
              aria-describedby={`tooltip-${index}`}
              title={item.description}
            >
              {item.label}
            </span>
            <div
              id={`tooltip-${index}`}
              role="tooltip"
              className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                       bg-gray-900 text-white p-3 rounded-lg shadow-xl z-10 left-0 -bottom-16 w-64 text-sm border border-gray-600"
            >
              {item.description}
              <div className="absolute -top-2 left-8 w-4 h-4 bg-gray-900 border-l border-t border-gray-600 transform rotate-45"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
