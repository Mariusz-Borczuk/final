import { getSettings } from "@/utils/accessibilityStyles";
import { FaWheelchair, FiType, IoMdEye } from "@/utils/icons";
import React, { useState } from "react";
import {
  AccessibilitySettings,
  Coordinate,
  LayoutProps,
  LocationSearchResult,
  PathSegment,
} from "../../types/types";
import FloorManagement from "../leftMenu/FloorManagement";
import { MainHeader } from "../leftMenu/MainHeader";
import { QuickNavigation } from "../leftMenu/QuickNavigation";
import { AccessibilityButton } from "../mapCenter/AccessibilityButton";
import { MapView } from "../mapCenter/MapView";
import { GridToggleButton } from "../mapCenter/topPart/GridToggleButton";
import { PathFinder } from "../mapCenter/topPart/PathFinder";
import { RightSidebar } from "../rightMenu/RightSidebar";

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
const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    contrast: "normal",
  });
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
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
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
    <div className="flex h-full w-full bg-gray-900" role="application">
      {/* Left Sidebar */}
      <aside
        className={`w-80 bg-gray-800 shadow-lg p-4 flex flex-col ${getSettings(
          settings
        )}`}
        role="complementary"
      >
        <MainHeader settings={settings} />

        <div
          className={`mb-6 bg-gray-700 p-4 rounded-lg ${getSettings(settings)}`}
          aria-label="Accessibility settings"
        >
          <h2 className="font-semibold mb-3 text-gray-200">
            Visibility Settings
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Text Size</label>
              <div className="flex gap-2">
                {(["normal", "large", "xlarge"] as const).map((size) => (
                  <AccessibilityButton
                    key={size}
                    label={`Set text size to ${size}`}
                    isActive={settings.fontSize === size}
                    onClick={() => setSettings({ ...settings, fontSize: size })}
                    icon={
                      <FiType
                        className={`text-gray-200 ${
                          settings.contrast === "high"
                            ? " text-zinc-950"
                            : "text-gray-100"
                        }`}
                      />
                    }
                    description={`Change text size to ${size}`}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-600 my-3" />

            <div className="flex items-center justify-between">
              <label className="text-gray-300">Wheelchair mode</label>
              <AccessibilityButton
                label="Toggle wheelchair accessibility"
                isActive={isWheelchair}
                onClick={() => setIsWheelchair(!isWheelchair)}
                icon={<FaWheelchair className="text-gray-200 w-6 h-6" />}
                description="Toggle wheelchair accessibility"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-300">High Contrast</label>
              <AccessibilityButton
                label="Toggle high contrast"
                isActive={settings.contrast === "high"}
                onClick={() =>
                  setSettings({
                    ...settings,
                    contrast: settings.contrast === "high" ? "normal" : "high",
                  })
                }
                icon={<IoMdEye className="w-6 h-6 text-gray-200" />}
                description="Toggle high contrast mode"
              />
            </div>
          </div>
        </div>

        <QuickNavigation
          settings={settings}
          currentFloor={currentFloor}
          onUpdateSettings={handleUpdateSettings}
        />
        <FloorManagement
          currentFloor={currentFloor}
          onFloorChange={setCurrentFloor}
        />
      </aside>

      <div className="flex-1 p-4 flex flex-col justify-center">
        {/* Top control bar with centered PathFinder */}
        <div className="flex items-center justify-center space-x-3 py-4 px-3 mb-4 bg-gray-800 rounded-lg w-full shadow-md">
          <GridToggleButton
            showGrid={showGrid}
            onToggle={() => setShowGrid(!showGrid)}
            settings={{
              contrast: settings.contrast,
              fontSize: settings.fontSize,
            }}
          />

          <PathFinder
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            settings={settings}
            isWheelchair={isWheelchair} // Pass isWheelchair state to PathFinder
            onPathFound={handlePathFound}
          />
        </div>

        {/* Map View with centered content */}
        <div className="flex-1 overflow-hidden flex items-center justify-center">
          <MapView
            settings={settings}
            currentFloor={currentFloor}
            showGrid={showGrid}
            endLocation={pathEndLocation}
            startLocation={pathStartLocation}
            pathSegments={pathSegments}
          />
        </div>
      </div>
      <RightSidebar
        settings={settings}
        currentFloor={currentFloor}
        isWheelchair={isWheelchair}
        pathSegments={pathSegments}
        estimatedTime={calculateEstimatedTime()}
        distance={calculateDistance()}
        onUpdateSettings={handleUpdateSettings}
      />
      {children}
    </div>
  );
};

export default MainLayout;
