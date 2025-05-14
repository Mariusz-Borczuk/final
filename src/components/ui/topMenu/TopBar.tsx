import { TopBarProps } from "@/components/types/types";
import React from "react";
import { GridToggleButton } from "./components/GridToggleButton";
import { LocationRouter } from "./components/LocationRouter";

export const TopBar: React.FC<TopBarProps> = ({
  showGrid,
  onToggleGrid,
  settings,
  currentFloor,
  setCurrentFloor,
  isWheelchair,
  onPathFound,
}) => (
  <div
    className="flex items-center justify-center space-x-3 p-4 bg-gray-800 rounded-lg w-full shadow-md"
    aria-label="Top bar navigation and pathfinding"
    aria-describedby="top-bar-desc"
  >
    {/* Description for screen readers */}
    <div id="top-bar-desc" className="sr-only">
      This top bar contains controls for toggling the map grid and finding
      navigation paths between locations.
    </div>
    <GridToggleButton
      showGrid={showGrid}
      onToggle={onToggleGrid}
      settings={{
        contrast: settings.contrast,
        fontSize: settings.fontSize,
      }}
    />
    <LocationRouter
      currentFloor={currentFloor}
      setCurrentFloor={setCurrentFloor}
      settings={settings}
      isWheelchair={isWheelchair}
      onPathFound={onPathFound}
    />
  </div>
);
