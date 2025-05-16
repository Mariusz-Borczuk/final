import { getSettings } from "@/utils/accessibilityStyles";
import { FaWheelchair, FiType, IoMdEye } from "@/utils/icons";
import React from "react";
import { AccessibilityButton } from "../../mapCenter/AccessibilityButton";
import { AccessibilitySettings } from "@/types/types";

export interface AccessibilitySettingsPanelProps {
  settings: AccessibilitySettings;
  setSettings: (settings: AccessibilitySettings) => void;
  isWheelchair: boolean;
  setIsWheelchair: (isWheelchair: boolean) => void;
}

/**
 * AccessibilitySettingsPanel displays controls for text size, wheelchair mode, and high contrast mode.
 * @component
 * @param {AccessibilitySettingsPanelProps} props
 */
export const AccessibilitySettingsPanel: React.FC<
  AccessibilitySettingsPanelProps
> = ({ settings, setSettings, isWheelchair, setIsWheelchair }) => (
  <section
    className={`mb-6 bg-gray-700 p-4 rounded-lg ${getSettings(settings)}`}
    aria-label="Accessibility settings panel"
    role="region"
    aria-describedby="accessibility-settings-desc"
  >
    {/* Description for screen readers */}
    <div id="accessibility-settings-desc" className="sr-only">
      This panel allows users to adjust accessibility options such as text size,
      wheelchair mode, and high contrast mode for improved usability.
    </div>
    <h2
      className="font-semibold mb-3 text-gray-200"
      id="accessibility-settings-heading"
    >
      Visibility Settings
    </h2>
    <div
      className="space-y-3"
      aria-labelledby="accessibility-settings-heading"
      aria-describedby="accessibility-settings-desc"
    >
      <div
        className="flex flex-col gap-2"
        aria-label="Text size controls"
        aria-describedby="text-size-desc"
      >
        <label className="text-gray-300 font-medium" id="text-size-label">
          Text Size
        </label>
        {/* Description for text size controls */}
        <div id="text-size-desc" className="sr-only">
          Choose your preferred text size for better readability. Options are
          normal, large, and extra large.
        </div>
        <div
          className="flex gap-2 justify-center"
          role="group"
          aria-label="Text size options"
          aria-describedby="text-size-desc"
        >
          {(["normal", "large", "xlarge"] as const).map((size) => (
            <AccessibilityButton
              key={size}
              label={`Set text size to ${size}`}
              isActive={settings.fontSize === size}
              onClick={() => setSettings({ ...settings, fontSize: size })}
              icon={
                <FiType
                  className={`text-gray-200 ${
                    size === "normal"
                      ? "text-base"
                      : size === "large"
                      ? "text-lg"
                      : "text-xl"
                  } ${
                    settings.contrast === "high"
                      ? "text-zinc-950"
                      : "text-gray-100"
                  }`}
                />
              }
              description={`Change text size to ${size}`}
            />
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-600 my-3" />
      <div
        className="flex items-center justify-between"
        aria-label="Wheelchair mode control"
        aria-describedby="wheelchair-mode-desc"
      >
        <label className="text-gray-300" id="wheelchair-mode-label">
          Wheelchair mode
        </label>
        {/* Description for wheelchair mode */}
        <div id="wheelchair-mode-desc" className="sr-only">
          Enable or disable wheelchair accessibility mode to optimize navigation
          for wheelchair users.
        </div>
        <AccessibilityButton
          label="Toggle wheelchair accessibility"
          isActive={isWheelchair}
          onClick={() => setIsWheelchair(!isWheelchair)}
          icon={<FaWheelchair className="text-gray-200 w-6 h-6" />}
          description="Toggle wheelchair accessibility"
          aria-labelledby="wheelchair-mode-label"
          aria-describedby="wheelchair-mode-desc"
        />
      </div>

      <div
        className="flex items-center justify-between"
        aria-label="High contrast mode control"
        aria-describedby="high-contrast-desc"
      >
        <label className="text-gray-300" id="high-contrast-label">
          High Contrast
        </label>
        {/* Description for high contrast mode */}
        <div id="high-contrast-desc" className="sr-only">
          Toggle high contrast mode for improved visibility, especially for
          users with low vision.
        </div>
        <AccessibilityButton
          label="Toggle high contrast"
          isActive={settings.contrast === "high"}
          onClick={() =>
            setSettings({
              ...settings,
              contrast: settings.contrast === "high" ? "normal" : "high",
            })
          }
          icon={<IoMdEye className="w-6 h-6 text-gray-200" />}
          description="Toggle high contrast mode"
          aria-labelledby="high-contrast-label"
          aria-describedby="high-contrast-desc"
        />
      </div>
    </div>
  </section>
);
