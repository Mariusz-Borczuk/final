import { AccessibilitySettingsProps } from "@/assets/styles/types";
import { getSettings } from "@/utils/accessibility/accessibilityStyles";
import React from "react";

export const BuildingFeatures: React.FC<AccessibilitySettingsProps> = ({
  settings,
}) => (
  <section
    className="mb-4 bg-gray-700 text-white my-4 p-6 flex flex-col rounded-2xl"
    role="region"
    aria-label="Building accessibility features"
    aria-describedby="building-features-desc"
  >
    {/* Description for screen readers */}
    <div id="building-features-desc" className="sr-only">
      This section lists accessibility features available in the building, such
      as automatic doors and elevators.
    </div>
    <h3
      className={`font-semibold text-lg mb-2 ${getSettings(settings)}`}
      id="building-features-heading"
    >
      Building Features
    </h3>
    <ul
      className={`${getSettings(settings)} list-disc ml-4 text-sm`}
      role="list"
      aria-labelledby="building-features-heading"
      aria-describedby="building-features-desc"
    >
      <li
        role="listitem"
        className={`flex items-center space-x-2 ${getSettings(settings)}`}
      >
        <span>Automatic doors available</span>
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
        className={`flex items-center space-x-2 ${getSettings(settings)}`}
      >
        <span>Elevators access all floors</span>
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
