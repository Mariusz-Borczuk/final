import {
  AddCustomNavigationButtonProps,
  LocationSearchResult,
  NavigationItem,
} from "@/components/types/types";
import { formatIconName } from "@/utils/formatUtils"; // Import from the new utility file
import { IoMdArrowDropdown, MdLocationPin } from "@/utils/icons";
import React, { useState } from "react";
import IconSelector from "./IconSelector";

/**
 * A component that provides a UI for adding custom navigation points.
 *
 * This component allows users to:
 * - Toggle an accordion panel to show/hide the form
 * - Enter a name for the navigation point
 * - Set X and Y coordinates
 * - Select an icon from a comprehensive list of available icons
 * - Choose a color for the location marker
 * - Submit the new custom navigation point
 *
 * The component is fully accessible with proper ARIA attributes and keyboard navigation.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.onAdd - Callback function that receives the new navigation point data when added
 * @param {Function} props.onSelectLocation - Optional callback to select a location for navigation
 * @param {number} props.currentFloor - The current floor number
 * @returns {JSX.Element} A form interface for adding custom navigation points
 */
const AddCustomNavigationButton: React.FC<
  AddCustomNavigationButtonProps & {
    onSelectLocation?: (location: LocationSearchResult) => void;
    currentFloor: number;
  }
> = ({ onAdd, onSelectLocation, currentFloor }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    <MdLocationPin />
  );
  const [selectedIconName, setSelectedIconName] = useState("MdLocationPin");
  const [markerColor, setMarkerColor] = useState("#4CAF50"); // Default green color
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);

  const colorOptions = [
    { name: "Blue", value: "#0072B2" },
    { name: "Orange", value: "#E69F00" },
    { name: "Purple", value: "#CC79A7" },
    { name: "Green", value: "#009E73" },
    { name: "Red", value: "#D55E00" },
    { name: "Yellow", value: "#F0E442" },
    { name: "Cyan", value: "#56B4E9" },
    { name: "Teal", value: "#00C4CC" },
    { name: "Pink", value: "#FF2D55" },
    { name: "Brown", value: "#A0522D" },
    { name: "Navy", value: "#34495E" },
    { name: "Lime", value: "#BFFF00" },
  ];

  const handleAddCustomNavigation = () => {
    if (!name.trim()) return;

    const newItem: NavigationItem = {
      name,
      coordinates,
      icon: selectedIcon,
      color: markerColor,
    };

    onAdd(newItem);

    // Also select this location if onSelectLocation is provided
    if (onSelectLocation) {
      const locationResult: LocationSearchResult = {
        type: "coordinate",
        name: name,
        floor: currentFloor,
        location: { x: coordinates.x, y: coordinates.y },
        description: `Custom location: ${name}`,
        color: markerColor,
      };
      onSelectLocation(locationResult);
    }

    // Reset form
    setName("");
    setCoordinates({ x: 0, y: 0 });
    setSelectedIcon(<MdLocationPin />);
    setSelectedIconName("MdLocationPin");
  };

  // Handle icon selection from IconSelector
  const handleIconSelect = (icon: React.ReactNode, iconName: string) => {
    setSelectedIcon(icon);
    setSelectedIconName(iconName);
    setIsIconSelectorOpen(false);
  };

  return (
    <div className="mt-6 w-full">
      <div>
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="p-3 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition duration-200 font-medium"
          aria-expanded={isAccordionOpen}
          aria-controls="custom-navigation-panel"
        >
          {isAccordionOpen ? "Close Settings" : "Add Custom Navigation"}
        </button>
      </div>
      {isAccordionOpen && (
        <div
          id="custom-navigation-panel"
          className="mt-4 w-full p-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 shadow-md"
          role="region"
          aria-label="Custom navigation settings"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Custom Navigation Settings
          </h2>
          <div className="mb-4">
            <label
              htmlFor="nav-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name:
            </label>
            <input
              id="nav-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              aria-required="true"
              placeholder="Name for the navigation point"
              aria-label="Navigation point name"
            />
          </div>
          <div className="mb-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="coord-x"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  X Coordinate
                </label>
                <input
                  id="coord-x"
                  type="number"
                  placeholder="X"
                  value={coordinates.x}
                  onChange={(e) =>
                    setCoordinates({
                      ...coordinates,
                      x: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  aria-label="X coordinate"
                  aria-required="true"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="coord-y"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Y Coordinate
                </label>
                <input
                  id="coord-y"
                  type="number"
                  placeholder="Y"
                  value={coordinates.y}
                  onChange={(e) =>
                    setCoordinates({
                      ...coordinates,
                      y: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  aria-label="Y coordinate"
                  aria-required="true"
                />
              </div>
            </div>
          </div>

          {/* Icon Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Icon:
            </label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white dark:bg-gray-700 border-2 border-blue-500 rounded-md flex items-center justify-center">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: markerColor }}
                >
                  <span className="text-xl text-white">{selectedIcon}</span>
                </div>
              </div>

              <div className="flex-1">
                <button
                  type="button"
                  onClick={() => setIsIconSelectorOpen(!isIconSelectorOpen)}
                  className="block w-full text-left px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex items-center justify-between">
                    <span>
                      <span className="flex flex-col">
                        {formatIconName(selectedIconName)}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          (Click to change)
                        </span>
                      </span>
                    </span>
                    <span className="text-gray-400 text-3xl">
                      <IoMdArrowDropdown />
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {isIconSelectorOpen && (
              <div className="mt-2 max-h-64 overflow-auto border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                <IconSelector
                  selectedIcon={selectedIcon}
                  onIconSelect={handleIconSelect}
                />
              </div>
            )}
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label
              id="color-group-label"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Marker Color:
            </label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setMarkerColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform focus:outline-none focus:ring-2 ${
                    markerColor === color.value
                      ? "border-white scale-125 shadow-lg"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                  aria-pressed={markerColor === color.value}
                  title={color.name}
                ></button>
              ))}
            </div>
            {/* Custom Color Input */}
            <div className="mt-3 flex items-center gap-2">
              <label
                htmlFor="custom-color-input"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Custom Color:
              </label>
              <input
                id="custom-color-input"
                type="color"
                value={markerColor}
                onChange={(e) => setMarkerColor(e.target.value)}
                className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer p-1 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800"
                aria-label="Select custom marker color"
              />
            </div>
          </div>

          <button
            onClick={handleAddCustomNavigation}
            className={`w-full mt-4 p-3 rounded-lg transition duration-200 font-medium ${
              !name.trim()
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            }`}
            disabled={!name.trim()}
            aria-disabled={!name.trim()}
            aria-label="Add custom navigation point"
          >
            Add Custom Navigation
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCustomNavigationButton;
