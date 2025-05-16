import {
  LocationSearchResult,
  PathFinderProps,
  PathSegment,
} from "@/types/types";
import React, { useCallback, useState } from "react";
import { RouteNavigator } from "../../../../logic/RouteCalculator";
import { FindPathButton } from "./FindPathButton";
import { NavigationButton } from "./NavigationButton";
import { EndLocationSearchField } from "./SearchFieldEndLocation";
import { StartLocationSearchField } from "./StartLocationSearchField";

/**
 * PathFinder UI component - Handles location selection and pathfinding
 * with support for wheelchair accessibility
 */
export const LocationRouter: React.FC<PathFinderProps> = ({
  currentFloor,
  setCurrentFloor,
  settings,
  onPathFound,
  isWheelchair = false,
}) => {
  // State management with proper TypeScript typing
  const [startLocation, setStartLocation] =
    useState<LocationSearchResult | null>(null);
  const [endLocation, setEndLocation] = useState<LocationSearchResult | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);
  const [nextFloors, setNextFloors] = useState<number[]>([]);
  const [currentPathIndex, setCurrentPathIndex] = useState<number>(0);
  const [pathCompleted, setPathCompleted] = useState<boolean>(false);

  // Handler for start location selection
  const handleStartLocationSearch = useCallback(
    (result: LocationSearchResult | null): void => {
      setStartLocation(result);
      setErrorMessage(null);
      setPathSegments([]);
      setNextFloors([]);
      setCurrentPathIndex(0);
      setPathCompleted(false);

      if (result && result.floor !== currentFloor) {
        setCurrentFloor(result.floor);
      }
    },
    [currentFloor, setCurrentFloor]
  );

  // Handler for end location selection
  const handleEndLocationSearch = useCallback(
    (result: LocationSearchResult | null): void => {
      setEndLocation(result);
      setErrorMessage(null);
      setPathSegments([]);
      setNextFloors([]);
      setCurrentPathIndex(0);
      setPathCompleted(false);

      if (result && result.floor !== currentFloor) {
        setCurrentFloor(result.floor);
      }
    },
    [currentFloor, setCurrentFloor]
  );

  // Error handler function
  const handleError = useCallback(
    (message: string): void => {
      setErrorMessage(message);
      setIsLoading(false);
      setPathSegments([]);
      setNextFloors([]);
      setCurrentPathIndex(0);
      setPathCompleted(false);
      // Clear existing path on error with dummy coordinates
      onPathFound([], { x: 0, y: 0 }, { x: 0, y: 0 });
    },
    [onPathFound]
  );

  // Find path using full location search results
  const findPath = useCallback((): void => {
    setErrorMessage(null);
    setIsLoading(true);
    setPathSegments([]);
    setNextFloors([]);
    setCurrentPathIndex(0);
    setPathCompleted(false);

    try {
      if (!startLocation || !endLocation) {
        handleError("Please select both start and end locations");
        return;
      }

      // Pass to the core PathFinder with proper typing
      RouteNavigator({
        startLocation, // Pass the startLocation object directly
        endLocation,
        isWheelchair,
        preferredBathroom: settings?.preferredBathroom, // Explicitly pass the bathroom preference
        onPathFound: (path: PathSegment[]): void => {
          setIsLoading(false);
          setPathSegments(path);

          if (startLocation && endLocation) {
            // Extract unique floor numbers from path segments
            const uniqueFloors = Array.from(
              new Set(path.map((segment) => segment.floor))
            ).filter((floor) => floor > 0); // Filter out special transit codes

            // Set the next floors to navigate to
            setNextFloors(uniqueFloors);

            // If path transitions between floors, log info for debugging
            if (path.length > 0) {
              const transitSegment = path.find(
                (segment) => segment.isTransitPoint
              );
              if (transitSegment) {
                console.log(
                  `Transit via ${transitSegment.transitType} detected between floors`
                );
                setPathCompleted(false);
              } else {
                setPathCompleted(uniqueFloors.length <= 1);
              }
            }

            onPathFound(path, startLocation.location, endLocation.location);
          } else {
            onPathFound([], { x: 0, y: 0 }, { x: 0, y: 0 });
          }
        },
        onError: handleError,
      });
    } catch (error) {
      console.error("Error during pathfinding:", error);
      handleError("An unexpected error occurred during pathfinding");
    }
  }, [startLocation, endLocation, onPathFound, isWheelchair, handleError]);

  // Handle clearing the path - to be passed to the NavigationButton
  const handleClearPath = useCallback((): void => {
    // Clear all path data
    setPathSegments([]);
    setNextFloors([]);
    setCurrentPathIndex(0);
    setPathCompleted(false);
    onPathFound([], { x: 0, y: 0 }, { x: 0, y: 0 });
  }, [onPathFound]);

  // Accessibility message using template literal
  const accessibilityMessage = isWheelchair
    ? "Wheelchair accessible path mode is active - Using elevators for floor transitions"
    : "Standard path mode - Using stairs or elevators for floor transitions";

  return (
    <div
      className="relative"
      aria-label="Location router panel"
      aria-describedby="location-router-desc"
    >
      {/* Description for screen readers */}
      <div id="location-router-desc" className="sr-only">
        This panel allows you to select start and end locations and find
        navigation paths, including wheelchair accessible routes.
      </div>
      <div className="flex flex-col w-full space-y-3">
        <div className="flex space-x-4 items-start">
          {/* Start location search field */}
          <div className="flex-1">
            <StartLocationSearchField
              onSearch={handleStartLocationSearch}
              currentFloor={currentFloor}
              setCurrentFloor={setCurrentFloor}
              settings={settings}
            />
          </div>

          {/* End location search field */}
          <div className="flex-1">
            <EndLocationSearchField
              onSearch={handleEndLocationSearch}
              currentFloor={currentFloor}
              setCurrentFloor={setCurrentFloor}
              settings={settings}
            />
          </div>

          {/* Find path button and Navigation Button side by side */}
          <div className="flex flex-col space-y-2 pt-5">
            <FindPathButton
              startLocation={startLocation}
              endLocation={endLocation}
              onFindPath={findPath}
              isLoading={isLoading}
              settings={settings}
              isWheelchair={isWheelchair}
            />

            {pathSegments.length > 0 && (
              <NavigationButton
                pathSegments={pathSegments}
                nextFloors={nextFloors}
                currentPathIndex={currentPathIndex}
                pathCompleted={pathCompleted}
                setCurrentFloor={setCurrentFloor}
                setCurrentPathIndex={setCurrentPathIndex}
                setPathCompleted={setPathCompleted}
                onClearPath={handleClearPath}
                settings={settings}
              />
            )}
          </div>
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mt-2"
            role="alert"
            aria-live="polite"
          >
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        {/* Accessibility message */}
        <div
          className={`text-xs ${
            isWheelchair ? "text-blue-600" : "text-gray-500"
          } px-1`}
          aria-live="polite"
        >
          {accessibilityMessage}
        </div>
      </div>
    </div>
  );
};
