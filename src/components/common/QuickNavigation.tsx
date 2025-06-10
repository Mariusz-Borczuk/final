import {
  LocationSearchResult,
  QuickNavigationProps,
  getSettings,
} from "@/styles/types";
import React, { useCallback, useMemo } from "react";

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

  const handleLocationSelect = useCallback((location: LocationSearchResult) => {
    if (onSelectLocation) {
      onSelectLocation(location);
    } 
  }, [onSelectLocation]);

  return (
    <section
      className="mb-4 bg-gray-700 text-white my-4 p-6 flex flex-col rounded-2xl"
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
          className={`${getSettings(settings)} list-disc ml-4 text-sm`}
          role="list"
        >
          {predefinedSearches.map((search, index: number) => (
            <li
              key={`${search.type}-${index}`}
              role="listitem"
              className={`flex items-center justify-between ${getSettings(settings)}`}
            >
              <span>{search.name}</span>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded-md text-lg"
                aria-label={`Show ${search.name} locations`}
                onClick={() => {
                  handleLocationSelect(search);
                }}
              >
                Show
              </button>
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
            className={`${getSettings(settings)} list-disc ml-4 text-sm`}
            role="list"
          >
            {savedLocations.map((location, index: number) => (
              <li
                key={`${location.name}-${index}`}
                role="listitem"
                className={`flex items-center justify-between ${getSettings(settings)}`}
              >
                <span>{location.name}</span>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded-md text-lg"
                  aria-label={`Go to ${location.name}`}
                  onClick={() => {
                    handleLocationSelect(location);
                  }}
                >
                  Go
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
