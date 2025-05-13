import {
  AccessibilityFontSizeProps,
  AccessibilitySettings,
} from "../components/types/types";

export const getSettings = ({
  contrast,
  fontSize,
}: AccessibilitySettings): string => {
  return `${contrast === "high" ? "text-orange-400" : "text-slate-50"} ${
    fontSize === "large"
      ? "text-lg"
      : fontSize === "xlarge"
      ? "text-2xl"
      : fontSize === "normal"
      ? "text-base"
      : ""
  }`.trim();
};

// Function to get font size class based on settings
export const getFontSizeClass = (
  settings: AccessibilityFontSizeProps
): string => {
  return settings.fontSize === "large"
    ? "text-lg"
    : settings.fontSize === "xlarge"
    ? "text-2xl"
    : "text-base";
};

// Function to get high contrast styles for search components
/**
 * Returns tailwind CSS classes for search components based on user accessibility settings
 *
 * This function provides different styling options depending on the user's contrast preference.
 * When high contrast mode is enabled, it returns a set of classes optimized for better visibility.
 * Otherwise, it returns the default styling.
 *
 * @param settings - Optional accessibility settings object containing user preferences
 * @returns An object containing tailwind class strings for various search UI components
 *
 * @example
 * const styles = getSearchStyles(userSettings);
 * // Use the styles in your components
 * <label className={styles.labelText}>Search</label>
 */
export const getStartLocationStyles = (settings?: AccessibilitySettings) => {
  return {
    labelText:
      settings?.contrast === "high"
        ? "text-green-500 font-bold"
        : "text-green-600",
    inputBg: settings?.contrast === "high" ? "bg-gray-100" : "bg-white",
    inputText:
      settings?.contrast === "high"
        ? "text-green-800 font-bold"
        : "text-green-700",
    inputBorder:
      settings?.contrast === "high"
        ? "border-3 border-green-600"
        : "border-2 border-green-500",
    buttonBg:
      settings?.contrast === "high"
        ? "bg-green-700 hover:bg-green-800"
        : "bg-green-500 hover:bg-green-600",
    buttonText: "text-white",
    dropdownBg: settings?.contrast === "high" ? "bg-gray-900" : "bg-white",
    dropdownBorder:
      settings?.contrast === "high"
        ? "border-3 border-green-600"
        : "border-2 border-green-500",
    dropdownItemHover:
      settings?.contrast === "high" ? "hover:bg-gray-700" : "hover:bg-green-50",
    resultText:
      settings?.contrast === "high"
        ? "text-green-500 font-bold"
        : "text-green-700",
    resultDetailText:
      settings?.contrast === "high" ? "text-green-500" : "text-green-600",
    highlightBadge:
      settings?.contrast === "high"
        ? "bg-green-800 text-white font-bold"
        : "bg-green-100 text-green-800",
    iconColor: "text-white",
  };
};

export const getEndLocationStyles = (settings?: AccessibilitySettings) => {
  return {
    labelText:
      settings?.contrast === "high" ? "text-red-500 font-bold" : "text-red-600",
    inputBg: settings?.contrast === "high" ? "bg-gray-100" : "bg-white",
    inputText:
      settings?.contrast === "high" ? "text-red-800 font-bold" : "text-red-700",
    inputBorder:
      settings?.contrast === "high"
        ? "border-3 border-red-600"
        : "border-2 border-red-500",
    buttonBg:
      settings?.contrast === "high"
        ? "bg-red-700 hover:bg-red-800"
        : "bg-red-500 hover:bg-red-600",
    buttonText: "text-white",
    dropdownBg: settings?.contrast === "high" ? "bg-gray-900" : "bg-white",
    dropdownBorder:
      settings?.contrast === "high"
        ? "border-3 border-red-600"
        : "border-2 border-red-500",
    dropdownItemHover:
      settings?.contrast === "high" ? "hover:bg-gray-700" : "hover:bg-red-50",
    resultText:
      settings?.contrast === "high" ? "text-red-500 font-bold" : "text-red-700",
    resultDetailText:
      settings?.contrast === "high" ? "text-red-500" : "text-red-600",
    highlightBadge:
      settings?.contrast === "high"
        ? "bg-red-800 text-white font-bold"
        : "bg-red-100 text-red-800",
    iconColor: "text-white",
  };
};

export const getSearchStyles = (settings?: AccessibilitySettings) => {
  if (settings?.contrast === "high") {
    return {
      labelText: "text-gray-100 font-bold text-2xl",
      inputBg: "bg-gray-100",
      inputText: "text-gray-900 font-bold",
      inputBorder: "border-3 border-blue-600",
      buttonBg: "bg-blue-700",
      buttonText: "text-white font-bold",
      dropdownBg: "bg-gray-900",
      dropdownBorder: "border-3 border-blue-600",
      dropdownItemHover: "hover:bg-gray-700",
      resultText: "text-gray-200 font-bold",
      resultDetailText: "text-gray-200",
      highlightBadge: "bg-blue-700 text-white font-bold right-0",
      iconColor: "text-white",
    };
  }

  return {
    labelText: "text-gray-200",
    inputBg: "bg-white",
    inputText: "text-gray-800",
    inputBorder: "border border-gray-300",
    buttonBg: "bg-blue-600 hover:bg-blue-700",
    buttonText: "text-white",
    dropdownBg: "bg-white",
    dropdownBorder: "border border-gray-300",
    dropdownItemHover: "hover:bg-gray-100",
    resultText: "text-gray-800",
    resultDetailText: "text-gray-500",
    highlightBadge: "bg-blue-100 text-blue-800",
    iconColor: "text-white",
  };
};
