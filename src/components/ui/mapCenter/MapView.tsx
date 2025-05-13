import MapLegend from './MapLegend';
import React, { useRef } from 'react';
import { pathSegmentsProps } from '../../types/types';
import { FloorGrid } from './FloorGrid';

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
export const MapView: React.FC<pathSegmentsProps> = ({ 
    currentFloor, 
    showGrid, 
    endLocation, 
    startLocation, 
    settings,
    pathSegments = [] 
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">            
            <div
                ref={mapRef}
                className="bg-gray-700 rounded-2xl flex items-center justify-center max-h-[90%] overflow-auto"
                role="region"   
                aria-label="Interactive campus map"
            >
                <FloorGrid 
                    showGrid={showGrid} 
                    currentFloor={currentFloor} 
                    endLocation={endLocation}
                    startLocation={startLocation}
                    settings={settings}
                    pathSegments={pathSegments}
                />
            </div>
            <MapLegend settings={settings} />
        </div>
    );
};
