import { searchLocationsInSession } from "@/services/storage/browserLocationManager";
import {
  AccessibilitySettingsProps,
  LocationSearchResult,
  getSettings,
} from "@/styles/types";
import React from "react";

export const BuildingFeatures: React.FC<
  AccessibilitySettingsProps & {
    onSelectLocation?: (location: LocationSearchResult) => void;
  }
> = ({ settings, onSelectLocation }) => {
  const handleBathroomSelect = () => {
    const preferredBathroom = settings.preferredBathroom || "Any";
    let searchQuery = "bathroom";

    // If user has a specific preference, search for that type
    if (preferredBathroom === "Male" || preferredBathroom === "Female") {
      searchQuery = `${preferredBathroom.toLowerCase()} restroom`;
    }

    const bathrooms = searchLocationsInSession(searchQuery);
    if (bathrooms.length > 0 && onSelectLocation && bathrooms[0]) {
      onSelectLocation(bathrooms[0]); // Select the first matching bathroom
    }
  };

  return (
    <section
      className="mb-4 bg-gray-700 text-white my-4 p-6 flex flex-col rounded-2xl"
      role="region"
      aria-label="Building accessibility features"
      aria-describedby="building-features-desc"
    >
      {/* Description for screen readers */}
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
      <ul
        className={`${getSettings(settings)} list-disc ml-4 text-sm`}
        role="list"
        aria-labelledby="building-features-heading"
        aria-describedby="building-features-desc"
      >
        <li
          role="listitem"
          className={`flex items-center justify-between ${getSettings(
            settings
          )}`}
        >
          <span>Automatic doors</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded-md text-lg"
            aria-label="Show locations with automatic doors"
            aria-describedby="building-features-desc"
          >
            Show
          </button>
        </li>
        <li
          role="listitem"
          className={`flex items-center justify-between ${getSettings(
            settings
          )}`}
        >
          <span>Bathroom ({settings.preferredBathroom || "Any"})</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded-md text-lg"
            aria-label={`Navigate to nearest ${
              settings.preferredBathroom || "any"
            } bathroom`}
            aria-describedby="building-features-desc"
            onClick={handleBathroomSelect}
          >
            Show
          </button>
        </li>
        <li
          role="listitem"
          className={`flex items-center justify-between ${getSettings(
            settings
          )}`}
        >
          <span>Elevators</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded-md text-lg"
            aria-label="Show elevator locations"
            aria-describedby="building-features-desc"
          >
            Show
          </button>
        </li>
      </ul>
    </section>
  );
};
