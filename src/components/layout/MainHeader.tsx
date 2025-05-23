import { AccessibilitySettings } from "@/styles/types";
import { getSettings } from "@/utils/accessibility/accessibilityStyles";
import React from "react";

/**
 * MainHeader component displays the title and subtitle for the Campus Navigator application.
 *
 * @component
 * @param {Object} props - The component props
 * @param {AccessibilitySettings} props.settings - Accessibility settings that affect the component's styling
 * @returns {JSX.Element} A header containing the application title and subtitle
 */
export const MainHeader: React.FC<{ settings: AccessibilitySettings }> = ({
  settings,
}) => {
  const localSettings = `mb-6 ${getSettings(settings)}`;
  return (
    <header
      className={localSettings}
      aria-label="Campus Navigator header"
      aria-describedby="main-header-desc"
    >
      {/* Description for screen readers */}
      <div id="main-header-desc" className="sr-only">
        This is the main header for the Campus Navigator application, providing
        the title and subtitle.
      </div>
      <h1 className={`font-bold text-gray-100`}>Campus Navigator</h1>
      <p className="text-gray-400">Accessible Wayfinding System</p>
    </header>
  );
};
