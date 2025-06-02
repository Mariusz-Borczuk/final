import {
  LocationSearchResult,
  QuickNavigationProps,
  getSettings,
} from "@/styles/types";
import React, { useCallback, useMemo } from "react";
import * as Icons from "@/utils/icons/icons";

export const QuickNavigation: React.FC<QuickNavigationProps> = ({
  settings,
  onSelectLocation,
  savedLocations = [],
}) => {
  const predefinedSearches = useMemo(() => {
    const locations: LocationSearchResult[] = [
      {
        type: 'exit',
        name: 'Main Exit',
        floor: 1,
        location: { x: 55, y: 13 },
        description: 'Main Exit',
      },
      {
        type: 'bathroom',
        name: 'Male Bathroom',
        floor: 1,
        location: { x: 10, y: 17 },
        description: 'Male Bathroom on floor 1',
      },
      {
        type: 'elevator',
        name: 'Elevator',
        floor: 1,
        location: { x: 10, y: 32 },
        description: 'Elevator on floor 1',
      }
    ];
    
    return locations;
  }, []);

  const handleStartLocationSelect = useCallback((location: LocationSearchResult) => {
    console.log("QuickNavigation: Start button clicked for location:", location);
    if (onSelectLocation) {
      onSelectLocation(location, true);
    }
  }, [onSelectLocation]);

  const handleEndLocationSelect = useCallback((location: LocationSearchResult) => {
    console.log("QuickNavigation: End button clicked for location:", location);
    if (onSelectLocation) {
      onSelectLocation(location, false);
    }
  }, [onSelectLocation]);

  return (
    <section
      className="mb-4 bg-gray-700 text-white my-4 p-4 flex flex-col rounded-2xl"
      role="region"
      aria-label="Building accessibility features"
      aria-describedby="building-features-desc"
    >
      <div id="building-features-desc" className="sr-only">
        This section lists accessibility features available in the building,
        such as automatic doors and elevators.
      </div>
      <h3
        className={`font-semibold text-lg mb-2 ${getSettings(settings)}`}
        id="building-features-heading"
      >
        Quick path to building features
      </h3>
      
      {/* Predefined Searches */}
      <div className="mb-4">
        <h4 className={`text-sm font-medium mb-2 ${getSettings(settings)}`}>
          Common Locations
        </h4>
        <ul
          className={`${getSettings(settings)} space-y-2`}
          role="list"
        >
          {predefinedSearches.map((search, index: number) => (
            <li
              key={`${search.type}-${index}`}
              role="listitem"
              className={`flex items-center justify-between bg-gray-600 p-2 rounded-lg ${getSettings(settings)}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="truncate">{search.name}</span>
                <span className="text-xs text-gray-400" title={`Floor ${search.floor} • (${search.location.x}, ${search.location.y})`}>
                  ({search.location.x}, {search.location.y})
                </span>
              </div>
              <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                <button
                  className="p-1.5 bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center gap-1 border-r border-gray-600"
                  aria-label={`Set ${search.name} as start point`}
                  onClick={() => handleStartLocationSelect(search)}
                >
                  <Icons.FaPlay className="text-xs" />
                </button>
                <button
                  className="p-1.5 bg-green-600 text-white hover:bg-green-500 transition-colors flex items-center gap-1"
                  aria-label={`Set ${search.name} as end point`}
                  onClick={() => handleEndLocationSelect(search)}
                >
                  <Icons.FaMapMarkerAlt className="text-xs" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Saved Locations */}
      {savedLocations.length > 0 && (
        <div>
          <h4 className={`text-sm font-medium mb-2 ${getSettings(settings)}`}>
            Saved Locations
          </h4>
          <ul
            className={`${getSettings(settings)} space-y-2`}
            role="list"
          >
            {savedLocations.map((location, index: number) => (
              <li
                key={`${location.name}-${index}`}
                role="listitem"
                className={`flex items-center justify-between bg-gray-600 p-2 rounded-lg ${getSettings(settings)}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="truncate">{location.name}</span>
                  <span className="text-xs text-gray-400" title={`Floor ${location.floor} • (${location.location.x}, ${location.location.y})`}>
                    ({location.location.x}, {location.location.y})
                  </span>
                </div>
                <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                  <button
                    className="p-1.5 bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center gap-1 border-r border-gray-600"
                    aria-label={`Set ${location.name} as start point`}
                    onClick={() => handleStartLocationSelect(location)}
                  >
                    <Icons.FaPlay className="text-xs" />
                  </button>
                  <button
                    className="p-1.5 bg-green-600 text-white hover:bg-green-500 transition-colors flex items-center gap-1 border-r border-gray-600"
                    aria-label={`Set ${location.name} as end point`}
                    onClick={() => handleEndLocationSelect(location)}
                  >
                    <Icons.FaMapMarkerAlt className="text-xs" />
                  </button>
                  <button
                    className="p-1.5 bg-red-600 text-white hover:bg-red-500 transition-colors flex items-center gap-1"
                    aria-label={`Delete ${location.name} from saved locations`}
                    onClick={() => {/* Add delete handler */}}
                  >
                    <Icons.FaTrashAlt className="text-xs" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
