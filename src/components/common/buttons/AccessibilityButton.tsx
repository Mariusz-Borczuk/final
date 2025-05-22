import { AccessibilityButtonProps } from "@/assets/styles/types";
import React from "react";

/**
 * AccessibilityButton is a React component that creates an accessible button with a tooltip.
 *
 * The button can display an active or inactive state, shows an icon, and reveals a description tooltip on hover.
 * The component is designed with accessibility in mind, including appropriate ARIA attributes.
 *
 * @component
 * @param {AccessibilityButtonProps} props - The properties for the AccessibilityButton component
 * @param {string} props.label - Accessible label for the button (used for aria-label)
 * @param {boolean} props.isActive - Determines if button is in active state (green) or inactive state (gray)
 * @param {() => void} props.onClick - Click handler function for the button
 * @param {React.ReactNode} props.icon - Icon to display inside the button
 * @param {string} props.description - Text to show in the tooltip when hovering over the button
 *
 * @returns {JSX.Element} A button element with a tooltip that shows on hover
 */
export const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({
  label,
  isActive,
  onClick,
  icon,
  description,
}) => (
  <div
    className="relative group"
    aria-label="Accessibility button"
    aria-describedby="accessibility-button-desc"
  >
    {/* Description for screen readers */}
    <div id="accessibility-button-desc" className="sr-only">
      This button toggles an accessibility feature such as text size, high
      contrast, or wheelchair mode. The button displays a tooltip with a
      description on hover.
    </div>
    <button
      onClick={onClick}
      className={`p-2 rounded ${
        isActive ? "bg-green-400" : "bg-gray-600"
      } text-black hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-green-800 focus:outline-none border-2 rounded px-4 py-2`}
      aria-label={label}
      aria-describedby="accessibility-button-desc"
    >
      {icon}
    </button>
    <div className="z-50 absolute left-1/2 transform -translate-x-1/2 mt-2 hidden border-green-400 border-2 group-hover:block bg-gray-800 text-gray-100 px-3 py-2 rounded text-sm">
      {description}
    </div>
  </div>
);
