import React, { useState } from "react";
import {
  AccessibilitySettings,
  Coordinate,
  LayoutProps,
  LocationSearchResult,
  PathSegment,
} from "../../types/types";
import { LeftSidebar } from "../leftMenu/LeftSidebar";
import { MapView } from "../mapCenter/MapView";
import { RightSidebar } from "../rightMenu/RightSidebar";
import { TopBar } from "../topMenu/TopBar";

/**
 * WayfindingApp3 component represents the main layout for the wayfinding application.
 * It manages the state for accessibility settings, current floor, grid visibility, highlighted locations, and pathfinding.
 *
 * The layout consists of:
 * - Left sidebar with accessibility settings, search functionality, quick navigation and floor management
 * - Main content area with map view, pathfinding controls, and location search
 * - Right sidebar with additional information
 *
 * @component
 * @param {LayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 *
 * @example
 * ```tsx
 * <WayfindingApp3>
 *   <AdditionalContent />
 * </WayfindingApp3>
 * ```
 */
export const MainLayout: React.FC<LayoutProps> = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    contrast: "normal",
  } as AccessibilitySettings);
  const [isWheelchair, setIsWheelchair] = useState<boolean>(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);
  const [pathStartLocation, setPathStartLocation] =
    useState<LocationSearchResult | null>(null);
  const [pathEndLocation, setPathEndLocation] =
    useState<LocationSearchResult | null>(null);

  // Function to update accessibility settings
  const handleUpdateSettings = (
    newSettings: Partial<AccessibilitySettings>
  ) => {
    setSettings((prevSettings) => {
      const { fontSize, contrast, preferredBathroom, walkingSpeedMPS } =
        newSettings;
      return {
        ...prevSettings,
        ...(fontSize !== undefined ? { fontSize } : {}),
        ...(contrast !== undefined ? { contrast } : {}),
        ...(preferredBathroom !== undefined ? { preferredBathroom } : {}),
        ...(walkingSpeedMPS !== undefined ? { walkingSpeedMPS } : {}),
      };
    });
  };

  // Updated handler to receive path segments and coordinates
  const handlePathFound = (
    path: PathSegment[],
    startCoord: Coordinate,
    endCoord: Coordinate
  ) => {
    setPathSegments(path);

    // Create minimal LocationSearchResult objects for the start and end coordinates
    // These will be used to highlight the start and end points on the map
    if (path.length > 0) {
      setPathStartLocation({
        type: "path",
        name: "Path Start",
        floor: path[0]?.floor ?? currentFloor,
        location: startCoord,
        description: "Starting point of the path",
      });

      setPathEndLocation({
        type: "path",
        name: "Path End",
        floor: path[0]?.floor ?? currentFloor,
        location: endCoord,
        description: "Destination point of the path",
      });
    } else {
      // Clear path points if no path is found
      setPathStartLocation(null);
      setPathEndLocation(null);
    }
  };

  // Calculate estimated time and distance based on path segments
  const calculateEstimatedTime = (): string => {
    if (pathSegments.length === 0) return "";

    // Fixed time per tile (20 seconds)
    const secondsPerTile = 2;

    // Calculate tile count
    const tileCount = pathSegments.length * 0.5;

    // Calculate base time (in seconds)
    const baseSeconds = tileCount * secondsPerTile;

    // Apply floor transition time
    const floorTransitions =
      new Set(pathSegments.map((segment) => segment.floor)).size - 1;
    const transitionSeconds = floorTransitions * 60; // 1 minute per floor transition

    // Apply wheelchair speed adjustment (slower in wheelchair mode)
    const wheelchairFactor = isWheelchair ? 1.5 : 1.0; // 50% slower in wheelchair mode

    // Calculate total time (in seconds)
    const totalSeconds = (baseSeconds + transitionSeconds) * wheelchairFactor;

    // Convert to minutes and seconds
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = Math.round(totalSeconds % 60);

    // Format the result
    if (totalMinutes === 0) {
      return `${remainingSeconds} seconds`;
    } else if (remainingSeconds === 0) {
      return `${totalMinutes} minute${totalMinutes !== 1 ? "s" : ""}`;
    } else {
      return `${totalMinutes} minute${
        totalMinutes !== 1 ? "s" : ""
      } and ${remainingSeconds} seconds`;
    }
  };

  const calculateDistance = (): string => {
    if (pathSegments.length === 0) return "";

    // Calculate actual distance by summing the length of each path segment
    let totalDistance = 0;

    pathSegments.forEach((segment) => {
      const dx = segment.end.x - segment.start.x;
      const dy = segment.end.y - segment.start.y;
      // Calculate segment length using Pythagorean theorem
      const segmentLength = Math.sqrt(dx * dx + dy * dy);
      totalDistance += segmentLength;
    });

    // Convert to meters (assuming each grid unit is 1 meter)
    const distanceInMeters = Math.round(totalDistance);

    return `${distanceInMeters} meters`;
  };

  return (
    <main
      className="flex flex-row min-h-screen bg-gray-900"
      aria-label="Main application layout"
      aria-describedby="main-layout-desc"
    >
      {/* Description for screen readers */}
      <div id="main-layout-desc" className="sr-only">
        This is the main layout of the application, containing the left sidebar,
        map view, and right sidebar.
      </div>
      <div
        className="flex w-full bg-gray-900"
        role="application"
        aria-label="Campus Navigator Main Layout"
      >
        {/* Left Sidebar */}
        <div
          className="w-80 flex h-full flex-col"
          role="complementary"
          aria-label="Main navigation and settings sidebar"
        >
          <LeftSidebar
            settings={settings}
            currentFloor={currentFloor}
            isWheelchair={isWheelchair}
            setIsWheelchair={setIsWheelchair}
            onUpdateSettings={handleUpdateSettings}
            onFloorChange={function (floor: number): void {
              setCurrentFloor(floor);
            }}
          />
        </div>
        {/* Main Content Area */}
        <main
          className="flex-1 flex flex-col mr-8"
          role="main"
          aria-label="Map and pathfinding area"
        >
          {/* Top Bar */}
          <TopBar
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid(!showGrid)}
            settings={settings}
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            isWheelchair={isWheelchair}
            onPathFound={handlePathFound}
          />
          {/* Map View */}
          <div className="flex-1 overflow-hidden flex items-center justify-center p-4">
            <MapView
              settings={settings}
              currentFloor={currentFloor}
              showGrid={showGrid}
              endLocation={pathEndLocation}
              startLocation={pathStartLocation}
              pathSegments={pathSegments}
            />
          </div>
        </main>
        {/* Right Sidebar */}
         <div
          className="w-72 flex flex-col"
          role="complementary"
          aria-label="Main navigation and settings sidebar"
        >
          <RightSidebar
            settings={settings}
            currentFloor={currentFloor}
            isWheelchair={isWheelchair}
            pathSegments={pathSegments}
            estimatedTime={calculateEstimatedTime()}
            distance={calculateDistance()}
            onUpdateSettings={handleUpdateSettings}
          />
        </div>
      </div>
    </main>
  );
};

