import { getFontSizeClass } from "@/utils/accessibilityStyles";
import { IoMdGrid } from "@/utils/icons";
import React from "react";
import {
  AccessibilityFontSizeProps,
  GridToggleButtonProps,
} from "../../../types/types";
import { ToggleButtonContainer } from "./ToggleButtonContainer";

/**
 * A button component that toggles the grid visibility on the map.
 *
 * @component
 * @param {Object} props - The component props
 * @param {boolean} props.showGrid - The current state of grid visibility
 * @param {() => void} props.onToggle - Function to toggle grid visibility
 * @param {Object} [props.settings] - Accessibility settings for the component
 * @param {string} [props.settings.contrast="normal"] - Contrast setting ("normal" or "high")
 * @param {string} [props.settings.fontSize="normal"] - Font size setting
 *
 * @returns {JSX.Element} A button with appropriate styling based on grid visibility state
 */
export const GridToggleButton: React.FC<GridToggleButtonProps> = ({
  showGrid,
  onToggle,
  settings,
}) => {
  // Simplified initialization using the current showGrid state for the label
  const gridLabel = showGrid ? "Hide Grid" : "Show Grid";
  // Get font size class from settings
  const fontSizeClass = getFontSizeClass(
    settings as AccessibilityFontSizeProps
  );

  // Get contrast-appropriate styles
  const labelClass =
    settings.contrast === "high"
      ? `text-white font-bold ${fontSizeClass} px-0 py-0 rounded-md`
      : `text-white font-medium ${fontSizeClass} px-0 py-0 rounded-md`;

  // Create size mapping based on font size
  let containerSize: "small" | "medium" | "large" = "medium";
  if (settings?.fontSize === "large") containerSize = "medium";
  if (settings?.fontSize === "xlarge") containerSize = "large";

  // Create the button element
  const buttonElement = (
    <button
      onClick={onToggle}
      className={`p-3.5 rounded-lg ${
        showGrid
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-700 hover:bg-gray-800"
      } hover:shadow-lg hover:scale-105 flex items-center justify-center border`}
      title={gridLabel}
      aria-label={gridLabel}
    >
      <IoMdGrid
        className={`w-8 h-8 ${showGrid ? "text-white" : "text-gray-300"}`}
      />
    </button>
  );

  // Create the label element
  const labelElement = (
    <span className={`text-center ${labelClass} pb-8`}>{gridLabel}</span>
  );

  return (
    <ToggleButtonContainer
      label={labelElement}
      button={buttonElement}
      size={containerSize}
    />
  );
};
