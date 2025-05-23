import { IconSelectorProps } from "@/styles/types";
import * as Icons from "@/utils/icons/icons";
import React from "react";

/**
 * IconSelector component displays a grid of all available icons for users to choose from
 * when creating or editing a custom location.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.selectedIcon - Currently selected icon
 * @param {Function} props.onIconSelect - Callback when an icon is selected
 * @param {string} [props.className] - Optional additional CSS classes
 */
const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  onIconSelect,
  className = "",
}) => {
  // Define all icons from the icons module
  const iconComponents: { [key: string]: React.ElementType } = {
    // UI elements
    IoMdEye: Icons.IoMdEye,
    IoMdGrid: Icons.IoMdGrid,
    FiType: Icons.FiType,
    MdDarkMode: Icons.MdDarkMode,
    MdSearch: Icons.MdSearch,

    // Location & Navigation
    MdLocationPin: Icons.MdLocationPin,
    FaPlay: Icons.FaPlay,
    FaRoute: Icons.FaRoute,
    FaWalking: Icons.FaWalking,
    MdHome: Icons.MdHome,

    // Facilities
    FaRestroom: Icons.FaRestroom,
    MdFemale: Icons.MdFemale,
    MdMale: Icons.MdMale,
    MdWater: Icons.MdWater,
    MdElevator: Icons.FaElevator,
    MdStairs: Icons.MdStairs,
    SiGoogleclassroom: Icons.SiGoogleclassroom,

    // Special icons
    FaWheelchair: Icons.FaWheelchair,
    // Compound icons
    RestroomIcon: Icons.FaRestroom,
    MdSportsTennis: Icons.MdSportsTennis,

    // Status & Info icons
    FaArrowRight: Icons.FaArrowRight,
    FaCheck: Icons.FaCheck,
    FaClock: Icons.FaClock,
    FaRuler: Icons.FaRuler,
  };

  // Check if an icon matches the selected one
  const isSelected = (Icon: React.ElementType): boolean => {
    // Check if selectedIcon is a React element and compare its type
    if (React.isValidElement(selectedIcon)) {
      return selectedIcon.type === Icon;
    }
    return false;
  };

  return (
    <div
      className={`p-4 bg-gray-100 dark:bg-gray-800 rounded-md ${className}`}
      aria-label="Icon selector container"
      aria-describedby="icon-selector-desc"
    >
      {/* Description for screen readers */}
      <div id="icon-selector-desc" className="sr-only">
        This section allows you to select an icon for a custom location. Icons
        represent different types of locations and features on the map.
      </div>

      {/* Primary Icons - Most commonly used */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-300 dark:border-gray-600">
          Recommended Icons
        </h4>
        <div className="flex gap-4 justify-center">
          {/* Location Pin Icon */}
          <div className="flex flex-col items-center">
            <button
              onClick={() =>
                onIconSelect(
                  React.createElement(Icons.MdLocationPin),
                  "MdLocationPin"
                )
              }
              className={`p-3 flex items-center justify-center rounded-md w-12 h-12 transition-all ${
                isSelected(Icons.MdLocationPin)
                  ? "bg-blue-500 text-white ring-2 ring-blue-300 scale-105"
                  : "bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
              }`}
              title="Location Pin (Primary Location Icon)"
            >
              {React.createElement(Icons.MdLocationPin, {
                className: "text-2xl",
              })}
            </button>
            <span className="text-xs mt-1 text-center text-gray-500 dark:text-gray-400">
              Location
            </span>
          </div>

          {/* Walking Icon */}
          <div className="flex flex-col items-center">
            <button
              onClick={() =>
                onIconSelect(React.createElement(Icons.FaWalking), "FaWalking")
              }
              className={`p-3 flex items-center justify-center rounded-md w-12 h-12 transition-all ${
                isSelected(Icons.FaWalking)
                  ? "bg-blue-500 text-white ring-2 ring-blue-300 scale-105"
                  : "bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
              }`}
              title="Walking (Primary Walking Icon)"
            >
              {React.createElement(Icons.FaWalking, { className: "text-2xl" })}
            </button>
            <span className="text-xs mt-1 text-center text-gray-500 dark:text-gray-400">
              Walking
            </span>
          </div>

          {/* Wheelchair Icon */}
          <div className="flex flex-col items-center">
            <button
              onClick={() =>
                onIconSelect(
                  React.createElement(Icons.FaWheelchair),
                  "FaWheelchair"
                )
              }
              className={`p-3 flex items-center justify-center rounded-md w-12 h-12 transition-all ${
                isSelected(Icons.FaWheelchair)
                  ? "bg-blue-500 text-white ring-2 ring-blue-300 scale-105"
                  : "bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
              }`}
              title="Wheelchair (Accessibility Icon)"
            >
              {React.createElement(Icons.FaWheelchair, {
                className: "text-2xl",
              })}
            </button>
            <span className="text-xs mt-1 text-center text-gray-500 dark:text-gray-400">
              Wheelchair
            </span>
          </div>
        </div>
      </div>

      {/* Group icons by category for better organization */}
      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-300 dark:border-gray-600">
        All Icons
      </h4>

      {/* Navigation */}
      <div className="mb-4">
        <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-2">
          Navigation
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {[
            "MdLocationOn",
            "MdLocationPin",
            "FaMapMarkerAlt",
            "FaPlay",
            "FaRoute",
            "MdOutlineDirectionsWalk",
            "FaWalking",
          ].map((iconName) => {
            const Icon = iconComponents[iconName];
            return Icon ? (
              <button
                key={iconName}
                onClick={() =>
                  onIconSelect(React.createElement(Icon), iconName)
                }
                className={`p-2 flex items-center justify-center rounded-md transition-all ${
                  isSelected(Icon)
                    ? "bg-blue-500 text-white ring-2 ring-blue-300 scale-110"
                    : "bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                }`}
                title={iconName}
              >
                {React.createElement(Icon, { className: "text-3xl" })}
              </button>
            ) : null;
          })}
        </div>
      </div>

      {/* Facilities */}
      <div className="mb-4">
        <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-2">
          Facilities
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {[
            "SiGoogleclassroom",
            "FaRestroom",
            "MdFemale",
            "MdMale",
            "MdWater",
            "MdElevator",
            "MdStairs",
            "FaWheelchair",
          ].map((iconName) => {
            const Icon = iconComponents[iconName];
            return Icon ? (
              <button
                key={iconName}
                onClick={() =>
                  onIconSelect(React.createElement(Icon), iconName)
                }
                className={`p-2 flex items-center justify-center rounded-md transition-all ${
                  isSelected(Icon)
                    ? "bg-blue-500 text-white ring-2 ring-blue-300 scale-110"
                    : "bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                }`}
                title={iconName}
              >
                {React.createElement(Icon, { className: "text-3xl" })}
              </button>
            ) : null;
          })}
        </div>
      </div>

      {/* Places */}
      <div className="mb-4">
        <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-2">
          Places
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {["MdHome", "MdSportsTennis", "FaWrench"].map((iconName) => {
            const Icon = iconComponents[iconName];
            return Icon ? (
              <button
                key={iconName}
                onClick={() =>
                  onIconSelect(React.createElement(Icon), iconName)
                }
                className={`p-2 flex items-center justify-center rounded-md transition-all ${
                  isSelected(Icon)
                    ? "bg-blue-500 text-white ring-2 ring-blue-300 scale-110"
                    : "bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                }`}
                title={iconName}
              >
                {React.createElement(Icon, { className: "text-3xl" })}
              </button>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default IconSelector;
