import { getFontSizeClass } from "@/utils/accessibilityStyles";
import React from "react";
import { tileData } from "../../../data/tileData";
import { AccessibilityFontSizeProps, MapLegendProps } from "../../types/types";

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
  const fontSizeClass = getFontSizeClass(
    settings as AccessibilityFontSizeProps
  );

  const legendItems = [
    { label: "Classroom", color: tileData.classroom.color },
    { label: "Entry Point", color: tileData.classroomEntry.color },
    { label: "Path", color: tileData.path.color },
    { label: "Bathroom", color: tileData.bathroom.color },
    { label: "Elevator", color: tileData.elevator.color },
    { label: "Stairs", color: tileData.stairs.color },
    { label: "Fire Equipment", color: tileData.fireEquipment.color },
    { label: "Utility Room", color: tileData.utilityRoom.color },
  ];

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
      {/* Apply settings to the title */}
      <h3
        className={`text-lg font-semibold mb-3 text-gray-200 ${fontSizeClass}`}
      >
        Map Legend
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-6 h-6 mr-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            {/* Apply settings to the label span */}
            <span className={`text-gray-300 ${fontSizeClass}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
