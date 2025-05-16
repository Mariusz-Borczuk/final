import {
  AddCustomNavigationButtonProps,
  LocationSearchResult,
  NavigationItem,
} from "@/types/types";
import { formatIconName } from "@/utils/formatUtils"; // Import from the new utility file
import { IoMdArrowDropdown, MdLocationPin } from "@/utils/icons";
import React, { useState } from "react";
import IconSelector from "./IconSelector";

/**
 * AddCustomNavigationButton component provides a fully accessible UI for adding custom navigation points.
 *
 * Features:
 * - Accordion panel to show/hide the form
 * - Name, X/Y coordinates, icon, and color selection
 * - Accessible with ARIA labels, descriptions, and keyboard navigation
 * - All form fields and controls have clear instructions for screen readers
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
      iconName: selectedIconName,
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
        icon: selectedIconName, // Add the selected icon name
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
    <div
      className="relative"
      aria-label="Custom location form"
      aria-describedby="custom-location-desc"
    >
      {/* Description for screen readers */}
      <div id="custom-location-desc" className="sr-only">
        Use this form to add or edit a custom location on the map. Specify the
        name, icon, and coordinates for the location.
      </div>
      <div
        className="mt-6 w-full"
        aria-label="Add custom navigation point section"
        aria-describedby="add-custom-nav-section-desc"
      >
        <span id="add-custom-nav-section-desc" className="sr-only">
          This section allows you to add a custom navigation point by specifying
          a name, coordinates, icon, and marker color. All controls are
          accessible and provide screen reader instructions.
        </span>
        <div>
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="p-3 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition duration-200 font-medium"
            aria-expanded={isAccordionOpen}
            aria-controls="custom-navigation-panel"
            aria-label={
              isAccordionOpen
                ? "Close custom navigation settings"
                : "Open custom navigation settings"
            }
            aria-describedby="custom-nav-desc"
          >
            {isAccordionOpen ? "Close Settings" : "Add Custom Navigation"}
          </button>
          <span id="custom-nav-desc" className="sr-only">
            Add a custom navigation point by specifying a name, coordinates,
            icon, and marker color.
          </span>
        </div>
        {isAccordionOpen && (
          <div
            id="custom-navigation-panel"
            className="mt-4 w-full p-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 shadow-md"
            role="region"
            aria-label="Custom navigation settings panel"
            aria-describedby="custom-nav-panel-desc"
          >
            <span id="custom-nav-panel-desc" className="sr-only">
              Fill out the form to add a new custom navigation point. All fields
              are required. Use the form controls to enter a name, coordinates,
              select an icon, and choose a marker color.
            </span>
            <h2
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              id="custom-nav-settings-heading"
            >
              Custom Navigation Settings
            </h2>
            <form
              aria-labelledby="custom-nav-settings-heading"
              aria-describedby="custom-nav-form-desc"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCustomNavigation();
              }}
            >
              <span id="custom-nav-form-desc" className="sr-only">
                Enter a name, X and Y coordinates, select an icon and marker
                color, then submit to add your custom navigation point.
              </span>
              <div className="mb-4">
                <label
                  htmlFor="nav-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name:
                  <span className="sr-only">
                    Required. Name for the navigation point.
                  </span>
                </label>
                <input
                  id="nav-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 8))}
                  maxLength={8}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  aria-required="true"
                  placeholder="Name (max 8 chars)"
                  aria-label="Navigation point name, maximum 8 characters"
                  aria-describedby="nav-name-desc"
                />
                <span id="nav-name-desc" className="sr-only">
                  Enter a descriptive name for your custom navigation point.
                </span>
              </div>
              <div className="mb-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="coord-x"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      X Coordinate
                      <span className="sr-only">
                        Required. X coordinate for the location.
                      </span>
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
                      aria-describedby="coord-x-desc"
                    />
                    <span id="coord-x-desc" className="sr-only">
                      Enter the X coordinate for the custom location.
                    </span>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="coord-y"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Y Coordinate
                      <span className="sr-only">
                        Required. Y coordinate for the location.
                      </span>
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
                      aria-describedby="coord-y-desc"
                    />
                    <span id="coord-y-desc" className="sr-only">
                      Enter the Y coordinate for the custom location.
                    </span>
                  </div>
                </div>
              </div>
              {/* Icon Selection */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  id="icon-select-label"
                >
                  Icon:
                  <span className="sr-only">
                    Required. Select an icon for your custom location.
                  </span>
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
                      aria-haspopup="dialog"
                      aria-expanded={isIconSelectorOpen}
                      aria-controls="icon-selector-panel"
                      aria-labelledby="icon-select-label"
                      aria-describedby="icon-select-desc"
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
                    <span id="icon-select-desc" className="sr-only">
                      Click to open the icon selection dialog and choose an icon
                      for your custom location.
                    </span>
                  </div>
                </div>
                {isIconSelectorOpen && (
                  <div
                    id="icon-selector-panel"
                    className="mt-2 max-h-64 overflow-auto border border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Icon selection dialog"
                    aria-describedby="icon-selector-desc"
                  >
                    <span id="icon-selector-desc" className="sr-only">
                      Select an icon from the list for your custom navigation
                      point.
                    </span>
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
                  <span className="sr-only">
                    Required. Select a color for your marker.
                  </span>
                </label>
                <div
                  className="flex gap-2 flex-wrap"
                  role="group"
                  aria-labelledby="color-group-label"
                  aria-describedby="color-group-desc"
                >
                  <span id="color-group-desc" className="sr-only">
                    Choose a color for your custom location marker. The selected
                    color will be used to display your marker on the map.
                  </span>
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
                      type="button"
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
                    <span className="sr-only">
                      Pick a custom color for your marker using the color
                      picker.
                    </span>
                  </label>
                  <input
                    id="custom-color-input"
                    type="color"
                    value={markerColor}
                    onChange={(e) => setMarkerColor(e.target.value)}
                    className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer p-1 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800"
                    aria-label="Select custom marker color"
                    aria-describedby="custom-color-desc"
                  />
                  <span id="custom-color-desc" className="sr-only">
                    Use the color picker to select any custom color for your
                    marker.
                  </span>
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
                type="submit"
                aria-describedby="add-custom-nav-desc"
              >
                Add Custom Navigation
              </button>
              <span id="add-custom-nav-desc" className="sr-only">
                Submit the form to add your custom navigation point to the map.
              </span>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCustomNavigationButton;
