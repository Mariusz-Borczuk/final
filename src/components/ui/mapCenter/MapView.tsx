import { PathSegmentsProps } from "@/types/types";
import React, { useRef } from "react";
import { GridMap } from "./GridMap";
import { MapLegend } from "./MapLegend";

/**
 * A component that renders a map view of the current floor.
 *
 * The map can display a grid and highlight specific locations based on the provided props.
 * It includes both the main map content and a legend to help users interpret the map.
 * All content is centered vertically for better visual balance.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.currentFloor - The current floor to display in the map
 * @param {boolean} props.showGrid - Whether to display the grid on the map
 * @param {Object|null} props.endLocation - The destination location to highlight on the map, if any
 * @param {Object|null} props.startLocation - The starting location to highlight on the map, if any
 * @param {Object} props.settings - Application settings that affect map display
 * @param {PathSegment[]} props.pathSegments - Path segments to display on the map
 * @returns {JSX.Element} The rendered map view component
 */
export const MapView: React.FC<PathSegmentsProps> = ({
  currentFloor,
  showGrid,
  endLocation,
  startLocation,
  settings,
  pathSegments = [],
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between"
      aria-label="Map view container"
      aria-describedby="map-view-desc"
    >
      {/* Description for screen readers */}
      <div id="map-view-desc" className="sr-only">
        This area displays the interactive campus map and its legend. Use the
        controls to explore different floors and view navigation paths.
      </div>
      <div
        ref={mapRef}
        className="bg-gray-700 rounded-2xl flex items-center justify-center max-h-[100%] overflow-auto"
        role="region"
        aria-label="Interactive campus map"
        aria-describedby="map-view-desc"
      >
        <GridMap
          showGrid={showGrid}
          currentFloor={currentFloor}
          endLocation={endLocation}
          startLocation={startLocation}
          settings={settings}
          pathSegments={pathSegments}
        />
      </div>
      <div
        className="w-full flex justify-center"
        aria-label="Map legend container"
        aria-describedby="map-legend-desc"
      >
        {/* Description for screen readers */}
        <div id="map-legend-desc" className="sr-only">
          The map legend explains the meaning of colors and symbols used on the
          map.
        </div>
        <MapLegend settings={settings} />
      </div>
    </div>
  );
};
