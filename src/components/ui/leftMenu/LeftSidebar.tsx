import { LeftSidebarProps } from "@/components/types/types";
import React from "react";
import { AccessibilitySettingsPanel } from "./components/AccessibilitySettings";
import { BuildingFeatures } from "./components/BuildingFeatures";
import { FloorManagement } from "./components/FloorManagement";
import { MainHeader } from "./components/MainHeader";
import { QuickNavigation } from "./components/QuickNavigation";

/**
 * LeftSidebar component that houses the main navigation elements.
 * @param {LeftSidebarProps} props - Properties passed to the component.
 * @returns {JSX.Element} - The rendered sidebar.
 */
export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  settings,
  isWheelchair,
  setIsWheelchair,
  currentFloor,
  onFloorChange,
  onSelectLocation,
  onUpdateSettings,
}) => {
  return (
    <aside
      className="bg-gray-800 text-white w-72 h-full p-4 flex flex-col"
      role="complementary"
      aria-label="Main navigation sidebar"
      aria-describedby="left-sidebar-desc"
    >
      {/* Description for screen readers */}
      <div id="left-sidebar-desc" className="sr-only">
        This sidebar contains navigation, accessibility settings, floor
        management, quick navigation, and building features for the campus
        wayfinding application.
      </div>
      <MainHeader settings={settings} />
      <FloorManagement
        currentFloor={currentFloor}
        onFloorChange={onFloorChange}
      />
      <AccessibilitySettingsPanel
        settings={settings}
        setSettings={onUpdateSettings}
        isWheelchair={isWheelchair}
        setIsWheelchair={setIsWheelchair}
      />
      <QuickNavigation
        settings={settings}
        currentFloor={currentFloor}
        onSelectLocation={onSelectLocation}
        onUpdateSettings={onUpdateSettings}
      />
      <BuildingFeatures
        settings={settings}
        onUpdateSettings={onUpdateSettings}
      />
    </aside>
  );
};
