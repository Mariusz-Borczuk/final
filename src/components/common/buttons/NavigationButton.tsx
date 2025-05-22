import { AccessibilitySettings, PathSegment } from "@/assets/styles/types";
import { FaArrowRight, FaCheck } from "@/utils/icons/icons";
import React, { useMemo } from "react";

export interface NavigationButtonProps {
  pathSegments: PathSegment[];
  nextFloors: number[];
  currentPathIndex: number;
  pathCompleted: boolean;
  setCurrentFloor: (floor: number) => void;
  setCurrentPathIndex: (index: number) => void;
  setPathCompleted: (completed: boolean) => void;
  onClearPath: () => void;
  settings?: AccessibilitySettings;
}

/**
 * Navigation button for moving between floors in a multi-floor path,
 * or clearing the path when navigation is completed.
 */
export const NavigationButton: React.FC<NavigationButtonProps> = ({
  pathSegments,
  nextFloors,
  currentPathIndex,
  pathCompleted,
  setCurrentFloor,
  setCurrentPathIndex,
  setPathCompleted,
  onClearPath,
  settings,
}) => {
  // Only show the button when there's an active path
  if (pathSegments.length === 0) {
    return null;
  }

  // Handle next floor navigation
  const handleNextFloor = (): void => {
    if (nextFloors.length > 0) {
      const nextIndex = currentPathIndex + 1;
      if (nextIndex < nextFloors.length) {
        setCurrentFloor(nextFloors[nextIndex]!);
        setCurrentPathIndex(nextIndex);

        // Check if we've reached the final floor
        if (nextIndex === nextFloors.length - 1) {
          setPathCompleted(true);
        }
      } else {
        setPathCompleted(true);
      }
    }
  };

  // Handle finishing and clearing the path
  const handleFinish = (): void => {
    onClearPath();
  };

  // Memoize button color based on props to prevent unnecessary re-renders
  const buttonColorClass: string = useMemo(() => {
    // High contrast mode colors
    if (settings?.contrast === "high") {
      return pathCompleted
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white";
    }

    // Standard colors
    return pathCompleted
      ? "bg-green-500 hover:bg-green-600 text-white"
      : "bg-blue-500 hover:bg-blue-600 text-white";
  }, [pathCompleted, settings?.contrast]);

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
      "aria-label": pathCompleted
        ? "Finish navigation and clear path"
        : `Go to floor ${nextFloors[currentPathIndex + 1]}`,
      title: pathCompleted
        ? "Clear path and finish navigation"
        : `Navigate to floor ${nextFloors[currentPathIndex + 1]}`,
    }),
    [pathCompleted, nextFloors, currentPathIndex]
  );

  return (
    <div
      className="relative"
      aria-label="Navigation button panel"
      aria-describedby="navigation-button-desc"
    >
      {/* Description for screen readers */}
      <div id="navigation-button-desc" className="sr-only">
        Use these buttons to move between floors during navigation or to clear
        the current path when navigation is complete.
      </div>
      <button
        className={`px-5 py-3 rounded-lg font-medium flex items-center justify-center 
                   shadow-md ${buttonColorClass} transition-colors ${fontSizeClass}
                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2`}
        onClick={pathCompleted ? handleFinish : handleNextFloor}
        type="button"
        {...accessibilityProps}
      >
        {pathCompleted ? (
          <FaCheck className="mr-4" aria-hidden="true" />
        ) : (
          <FaArrowRight className="mr-4" aria-hidden="true" />
        )}
        {pathCompleted
          ? "Finish"
          : nextFloors.length > 0 && currentPathIndex < nextFloors.length - 1
          ? `Floor ${nextFloors[currentPathIndex + 1]}`
          : "Next Step"}
      </button>
    </div>
  );
};
