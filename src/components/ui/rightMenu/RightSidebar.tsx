import { getSettings } from "@/utils/accessibilityStyles";
import { FaRestroom, FaWheelchair, MdFemale, MdMale } from "@/utils/icons";
import React, { useEffect, useState } from "react";
import { PreferredBathroom, RightSidebarProps, Route } from "../../types/types";
import { AccessibleTTSButton } from "./SpeechOutput";

/**
 * Right sidebar component that displays details about the current location and accessibility features
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.settings - User interface settings for accessibility
 * @param {string} props.settings.contrast - Contrast setting (e.g., "high", "normal")
 * @param {number} props.currentFloor - The current floor number being displayed
 * @param {boolean} props.isWheelchair - Whether wheelchair mode is enabled
 * @param {string} props.estimatedTime - The estimated time for the route
 * @param {string} props.distance - The distance for the route
 * @param {Array} props.pathSegments - Path segments for the calculated route
 * @param {Function} props.onUpdateSettings - Callback to update accessibility settings
 *
 * @returns {React.ReactElement} A sidebar component with location information, accessibility features,
 * and audio navigation options
 */
export const RightSidebar: React.FC<RightSidebarProps> = ({
  settings,
  currentFloor,
  isWheelchair = false,
  estimatedTime,
  distance,
  pathSegments = [],
  onUpdateSettings,
}) => {
  // Default walking speed if not set (e.g., 1.4 meters per second)
  const walkingSpeed = settings.walkingSpeedMPS ?? 1.4; // Use m/s, default 1.4
  const preferredBathroom = settings.preferredBathroom ?? "Any";

  // State to track UI feedback for settings changes
  const [showSaveIndicator, setShowSaveIndicator] = useState<string | null>(
    null
  );

  // Add state to track the current slider value for immediate feedback
  const [currentSpeed, setCurrentSpeed] = useState<number>(walkingSpeed);
  // State for the locally calculated time
  const [localEstimatedTime, setLocalEstimatedTime] = useState<string>("");

  // Update currentSpeed when walkingSpeed from settings changes
  useEffect(() => {
    setCurrentSpeed(walkingSpeed);
  }, [walkingSpeed]);

  // Human-readable speed descriptions
  const getSpeedDescription = (speed: number): string => {
    if (speed < 0.8) return "Very slow";
    if (speed < 1.2) return "Slow";
    if (speed < 1.6) return "Average";
    if (speed < 2.0) return "Fast";
    return "Very fast";
  };

  // Calculate estimated time based on path segments and walking speed
  const calculateEstimatedTime = (speed: number = walkingSpeed) => {
    if (pathSegments.length === 0 || speed <= 0) return "N/A"; // Avoid division by zero/negative
    const totalDistanceMeters = pathSegments.length; // Each segment is 1 tile = 1 meter
    const timeSeconds = totalDistanceMeters / speed; // Direct division: distance / speed
    const wheelchairFactor = isWheelchair ? 1.5 : 1.0; // Slower factor for wheelchair
    const adjustedTimeSeconds = timeSeconds * wheelchairFactor; // Apply wheelchair factor
    const minutes = Math.floor(adjustedTimeSeconds / 60);
    const seconds = Math.round(adjustedTimeSeconds % 60);
    return `${minutes} min ${seconds} sec`;
  };

  // Recalculate estimated time whenever current speed or path segments change
  useEffect(() => {
    if (pathSegments.length > 0) {
      setLocalEstimatedTime(calculateEstimatedTime(currentSpeed));
    }
  }, [currentSpeed, pathSegments, isWheelchair]);

  // Use local time when slider is active, otherwise use prop
  const calculatedTime =
    localEstimatedTime || estimatedTime || calculateEstimatedTime();
  const calculatedDistance =
    distance ||
    (pathSegments.length > 0 ? `${pathSegments.length} meters` : "N/A");

  // Route object with dynamic information
  const route: Route = {
    destination: `Building A, Floor ${currentFloor}`,
    estimatedTime: calculatedTime,
    accessibilityNotes: `${
      isWheelchair ? "Wheelchair accessible route" : "Standard route"
    }. Preferred Bathroom: ${preferredBathroom}. Walking speed: ${currentSpeed.toFixed(
      1
    )} m/s (${getSpeedDescription(currentSpeed)}).`,
    navigationInstructions: `Follow the highlighted path to Floor ${currentFloor}.`,
    distance: calculatedDistance,
  };

  const handleBathroomChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onUpdateSettings({
      preferredBathroom: event.target.value as PreferredBathroom,
    });
    // Show save indicator
    setShowSaveIndicator("bathroom");
    setTimeout(() => setShowSaveIndicator(null), 1500);
  };

  // Modified speed change handler to update local state immediately
  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(event.target.value);

    // Update local state for immediate UI feedback
    setCurrentSpeed(newSpeed);

    // Also update app state (but less frequently to avoid too many re-renders)
    onUpdateSettings({
      walkingSpeedMPS: newSpeed,
    });

    // Show save indicator
    setShowSaveIndicator("speed");
    setTimeout(() => setShowSaveIndicator(null), 1500);
  };

  // Add handler for when the user is actively sliding (for live preview)
  const handleSliderInput = (event: React.FormEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat((event.target as HTMLInputElement).value);
    setCurrentSpeed(newSpeed);
  };

  // Return specific bathroom icon based on type
  const getBathroomIcon = (type: PreferredBathroom) => {
    switch (type) {
      case "Male":
        return <MdMale className="text-blue-400" />;
      case "Female":
        return <MdFemale className="text-pink-400" />;
      case "Neutral":
        return <FaWheelchair className="text-purple-400" />; // Using accessible icon for neutral/accessible bathrooms
      default:
        return <FaRestroom className="text-green-400" />; // Changed color to green for better visibility
    }
  };

  return (
    <div
      className={`w-72 ${
        settings.contrast === "high" ? "bg-gray-800" : "bg-gray-800"
      } shadow-lg p-4 flex flex-col h-full`}
      role="region"
      aria-label="Location Information and Settings"
    >
      <h2 className={`text-xl font-semibold mb-4 ${getSettings(settings)}`}>
        Location & Route
      </h2>

      <div className="space-y-4 flex-grow overflow-y-auto">
        {/* Current Location Section */}
        <div
          className={`p-3 ${
            settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
          } rounded-lg`}
          role="group"
          aria-label="Current Location Details"
        >
          <h3 className={`font-medium ${getSettings(settings)}`}>
            Current Location
          </h3>
          <p className={`${getSettings(settings)}`}>
            Building A, Floor {currentFloor}
          </p>
          {pathSegments.length > 0 ? (
            <>
              <p className={`mt-2 ${getSettings(settings)}`}>
                <span className="font-medium">Distance:</span> {route.distance}
              </p>
              <p className={`${getSettings(settings)}`}>
                <span className="font-medium">Est. Time:</span>{" "}
                <span
                  className={
                    currentSpeed !== walkingSpeed ? "text-blue-400" : ""
                  }
                >
                  {route.estimatedTime}
                </span>
                {isWheelchair && (
                  <span className="block text-xs opacity-70 mt-1">
                    (Includes wheelchair pace adjustment)
                  </span>
                )}
              </p>

              <p className={`mt-1 ${getSettings(settings)} text-xs opacity-70`}>
                {`Based on ${currentSpeed.toFixed(1)} meters per second`}
                {isWheelchair ? " with 1.5x factor" : ""}
              </p>
            </>
          ) : (
            <p className={`mt-2 ${getSettings(settings)} text-sm opacity-80`}>
              Find a path to see route details.
            </p>
          )}
        </div>

        {/* Accessibility Settings Section */}
        <div
          className={`p-3 ${
            settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
          } rounded-lg`}
          role="group"
          aria-label="Accessibility Settings"
        >
          <h3 className={`font-medium mb-3 ${getSettings(settings)}`}>
            Accessibility Settings
          </h3>
          {/* Wheelchair Mode Info */}
          <p className={`${getSettings(settings)} mb-3 text-sm`}>
            Wheelchair Mode:{" "}
            {isWheelchair ? (
              <span className="font-semibold text-green-400">ON</span>
            ) : (
              <span className="font-semibold text-red-400">OFF</span>
            )}
            <span className="block text-xs opacity-70">
              (Toggle in main settings)
            </span>
          </p>

          {/* Preferred Bathroom Selector */}
          <div className="mb-4">
            <label
              htmlFor="bathroom-pref"
              className={`block text-sm font-medium mb-1 ${getSettings(
                settings
              )}`}
            >
              Preferred Bathroom:
            </label>
            <div className="relative">
              <div className="flex items-center">
                <div className="absolute left-2 text-lg z-10">
                  {getBathroomIcon(preferredBathroom as PreferredBathroom)}
                </div>
                <select
                  id="bathroom-pref"
                  value={preferredBathroom}
                  onChange={handleBathroomChange}
                  className={`w-full pl-9 pr-2 py-2 border border-gray-600 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${getSettings(
                    settings
                  )}`}
                  aria-describedby="bathroom-feedback"
                >
                  <option value="Any">Any Bathroom</option>
                  <option value="Male">Male Only</option>
                  <option value="Female">Female Only</option>
                  <option value="Neutral">All-Gender/Neutral</option>
                </select>
              </div>
              <div
                id="bathroom-feedback"
                className={`text-xs text-green-400 ${
                  showSaveIndicator === "bathroom"
                    ? "animate-pulse"
                    : "invisible"
                }`}
              >
                Preference saved
              </div>
            </div>
          </div>

          {/* Walking Speed Slider */}
          <div className="mb-2">
            <label
              htmlFor="walking-speed"
              className={`block text-sm font-medium mb-1 ${getSettings(
                settings
              )}`}
            >
              Walking Speed:{" "}
              <span className="font-semibold">
                {currentSpeed.toFixed(1)} m/s
              </span>
              <span className="ml-2 text-xs">
                ({getSpeedDescription(currentSpeed)})
              </span>
            </label>
            {/* Combined Slider Container */}
            <div className="mt-3 relative h-6 flex items-center">
              {/* Background Track */}
              <div className="absolute top-1/2 left-1 right-1 h-2 bg-gray-600 rounded-lg transform -translate-y-1/2 pointer-events-none"></div>

              {/* Filled Track - Modified to start from left edge with proper margin */}
              <div
                className="absolute top-1/2 left-1 h-2 bg-blue-500 rounded-lg pointer-events-none transform -translate-y-1/2"
                style={{
                  width: `${((currentSpeed - 0.5) / 2) * (100 - 8)}%`, // Adjusted to account for margins
                  maxWidth: "calc(100% - 8px)", // Account for left and right margin
                }}
              ></div>

              {/* Visible Thumb/Knob */}
              <div
                className="absolute w-5 h-5 bg-blue-500 rounded-full shadow-lg transform -translate-x-1/2 cursor-grab hover:scale-110 transition-transform z-10 ring-2 ring-blue-300 ring-opacity-50 flex items-center justify-center"
                style={{
                  left: `calc(${
                    ((currentSpeed - 0.5) / 2) * (100 - 8)
                  }% + 20px)`, // Adjusted position calculation
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Line indicators for better grip visual */}
                <div className="w-2 h-0.5 bg-white rounded-full"></div>
              </div>

              {/* Invisible Input Range - positioned over the visual elements */}
              <input
                type="range"
                id="walking-speed"
                min="0.5"
                max="2.5"
                step="0.1"
                value={currentSpeed}
                onChange={handleSpeedChange}
                onInput={handleSliderInput}
                className="absolute inset-x-1 inset-y-0 w-[calc(100%-8px)] h-full opacity-0 cursor-grab z-20" // Adjusted to match visible track
                aria-label={`Walking speed slider, currently ${currentSpeed.toFixed(
                  1
                )} meters per second (${getSpeedDescription(currentSpeed)})`}
                aria-describedby="speed-feedback"
              />
            </div>

            {/* Speed indicators */}
            <div className="flex justify-between text-xs mt-3 px-1">
              <span className={`${getSettings(settings)} text-xs opacity-70`}>
                0.5 m/s
                <br />
                Very Slow
              </span>
              <span className={`${getSettings(settings)} text-xs opacity-70`}>
                1.4 m/s
                <br />
                Average
              </span>
              <span className={`${getSettings(settings)} text-xs opacity-70`}>
                2.5 m/s
                <br />
                Very Fast
              </span>
            </div>

            {/* Feedback messages */}
            <div
              id="speed-feedback"
              className={`text-xs text-green-400 mt-1 ${
                showSaveIndicator === "speed" ? "animate-pulse" : "invisible"
              }`}
            >
              Speed setting saved
            </div>
            {currentSpeed !== walkingSpeed && pathSegments.length > 0 && (
              <div className="text-xs text-blue-400 mt-1">
                Est. arrival: {localEstimatedTime}
              </div>
            )}

            <p className={`mt-2 text-xs ${getSettings(settings)} opacity-70`}>
              {isWheelchair
                ? "Note: Wheelchair mode applies a 1.5× time factor to account for accessibility needs."
                : "Adjust based on your typical walking pace."}
            </p>
          </div>
        </div>

        {/* Other Accessibility Features (Example) */}
        <div
          className={`p-3 ${
            settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
          } rounded-lg`}
          role="group"
          aria-label="Building Accessibility Features"
        >
          <h3 className={`font-medium ${getSettings(settings)}`}>
            Building Features
          </h3>
          <ul
            className={`${getSettings(settings)} list-disc ml-4 text-sm`}
            role="list"
          >
            <li role="listitem">Automatic doors available</li>
            <li role="listitem">Elevators access all floors</li>
          </ul>
        </div>
      </div>

      {/* Audio Navigation Section (Fixed at bottom) */}
      <div
        className={`mt-4 p-3 ${
          settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
        } rounded-lg`}
        role="group"
        aria-label="Audio Navigation"
      >
        <h3 className={`font-medium ${getSettings(settings)}`}>
          Audio Navigation
        </h3>
        <div className="mt-2">
          <AccessibleTTSButton
            route={route}
            settings={settings}
            className={`w-full ${getSettings(settings)}`}
          />
        </div>
      </div>
    </div>
  );
};
