import { FindPathButtonProps } from "@/styles/types";
import { FaRoute, FaWheelchair } from "@/utils/icons/icons";
import React, { useMemo } from "react";

/**
 * FindPathButton component - Triggers pathfinding with wheelchair accessibility support
 */
export const FindPathButton: React.FC<FindPathButtonProps> = ({
  startLocation,
  endLocation,
  onFindPath,
  isLoading = false,
  settings,
  isWheelchair = false,
  onFloorChange,
}) => {
  // Determine if the button should be enabled
  const isDisabled: boolean = isLoading || !startLocation || !endLocation;

  // Handle button click with floor navigation
  const handleClick = () => {
    if (startLocation && onFloorChange) {
      onFloorChange(startLocation.floor);
    }
    onFindPath();
  };

  // Memoize button color based on props to prevent unnecessary re-renders
  const buttonColorClass: string = useMemo(() => {
    if (isLoading) return "bg-gray-500 cursor-wait";
    if (isDisabled) return "bg-gray-500 cursor-not-allowed opacity-70";

    // High contrast mode colors
    if (settings?.contrast === "high") {
      return isWheelchair
        ? "bg-blue-500 hover:bg-blue-600 text-white"
        : "bg-yellow-500 hover:bg-yellow-600 text-black";
    }

    // Standard colors
    return isWheelchair
      ? "bg-blue-500 hover:bg-blue-600 text-white"
      : "bg-orange-500 hover:bg-orange-600 text-white";
  }, [isLoading, isDisabled, settings?.contrast, isWheelchair]);

  // Memoize font size class
  const fontSizeClass: string = useMemo(() => {
    switch (settings?.fontSize) {
      case "large":
        return "text-lg";
      case "xlarge":
        return "text-xl";
      default:
        return "text-base";
    }
  }, [settings?.fontSize]);

  // Memoize aria and title attributes for accessibility
  const accessibilityProps = useMemo(
    () => ({
      "aria-label": `${
        isWheelchair ? "Wheelchair accessible path" : "Find path"
      } between selected locations`,
      "aria-disabled": isDisabled,
      title: isDisabled
        ? "Select both start and end locations first"
        : `Find ${
            isWheelchair ? "wheelchair accessible " : ""
          }path between selected locations`,
    }),
    [isDisabled, isWheelchair]
  );

  return (
    <div
      className="relative"
      aria-label="Find path button"
      aria-describedby="find-path-button-desc"
    >
      {/* Description for screen readers */}
      <div id="find-path-button-desc" className="sr-only">
        This button triggers the pathfinding process between the selected start
        and end locations. It supports wheelchair accessible routes if enabled.
      </div>
      <button
        className={`px-5 py-3 rounded-lg font-medium flex items-center justify-center 
                   shadow-md ${buttonColorClass} transition-colors ${fontSizeClass}
                   focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2`}
        onClick={handleClick}
        disabled={isDisabled}
        type="button"
        {...accessibilityProps}
      >
        {isWheelchair ? (
          <FaWheelchair className="mr-2" aria-hidden="true" />
        ) : (
          <FaRoute className="mr-2" aria-hidden="true" />
        )}
        {isLoading ? "Finding Path..." : "Find Path"}
      </button>
    </div>
  );
};
