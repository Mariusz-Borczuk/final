import { AccessibilitySettings } from "@/assets/styles/types";

/**
 * Generates a string of CSS classes based on accessibility settings.
 *
 * @param {AccessibilitySettings} settings - The accessibility settings.
 * @param {string} settings.contrast - The contrast setting, either "high" or undefined.
 * @param {string} settings.fontSize - The font size setting, either "small", "normal", or "large".
 * @returns {string} A string of CSS classes based on the provided accessibility settings.
 */
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

/**
 * Generates styles for the start location input based on accessibility settings.
 *
 * @param {AccessibilitySettings} [settings] - Optional accessibility settings.
 * @returns {object} An object containing style definitions for various elements of the start location input.
 * @returns {object} An object containing style definitions for various elements of the start location input.
 * @property {string} labelText - Styles for the label text.
 * @property {string} inputBg - Background color style for the input.
 * @property {string} inputText - Text color style for the input.
 * @property {string} inputBorder - Border style for the input.
 * @property {string} buttonBg - Background color style for the button.
 * @property {string} buttonText - Text color style for the button.
 * @property {string} dropdownBg - Background color style for the dropdown.
 * @property {string} dropdownBorder - Border style for the dropdown.
 * @property {string} dropdownItemHover - Hover style for dropdown items.
 * @property {string} resultText - Style for the result text.
 * @property {string} resultDetailText - Style for the result detail text.
 * @property {string} highlightBadge - Style for the highlight badge.
 * @property {string} iconColor - Color style for icons.
 */
export const getStartLocationStyles = (settings?: AccessibilitySettings) => {
  const highContrast = settings?.contrast === "high";
  const textColor = highContrast ? "text-green-500" : "text-green-600";
  const inputBorderWidth = highContrast ? "3" : "2";

  return {
    labelText: `${textColor} font-bold`,
    inputBg: highContrast ? "bg-gray-100" : "bg-white",
    inputText: highContrast ? "text-green-800 font-bold" : "text-green-700",
    inputBorder: `border-${inputBorderWidth} border-${
      highContrast ? "green-600" : "green-500"
    }`,
    buttonBg: highContrast
      ? "bg-green-700 hover:bg-green-800"
      : "bg-green-500 hover:bg-green-600",
    buttonText: "text-white",
    dropdownBg: highContrast ? "bg-gray-900" : "bg-white",
    dropdownBorder: `border-${inputBorderWidth} border-${
      highContrast ? "green-600" : "green-500"
    }`,
    dropdownItemHover: highContrast ? "hover:bg-gray-700" : "hover:bg-green-50",
    resultText: `${textColor} font-bold`,
    resultDetailText: textColor,
    highlightBadge: highContrast
      ? "bg-green-800 text-white font-bold"
      : "bg-green-100 text-green-800",
    iconColor: "text-white",
  };
};

/// Function to get styles for the end location input based on accessibility settings
export const getEndLocationStyles = (settings?: AccessibilitySettings) => {
  const highContrast = settings?.contrast === "high";
  const textColor = highContrast ? "text-red-500" : "text-red-600";
  const inputBorderWidth = highContrast ? "3" : "2";

  return {
    labelText: `${textColor} font-bold`,
    inputBg: highContrast ? "bg-gray-100" : "bg-white",
    inputText: highContrast ? "text-red-800 font-bold" : "text-red-700",
    inputBorder: `border-${inputBorderWidth} border-${
      highContrast ? "red-600" : "red-500"
    }`,
    buttonBg: highContrast
      ? "bg-red-700 hover:bg-red-800"
      : "bg-red-500 hover:bg-red-600",
    buttonText: "text-white",
    dropdownBg: highContrast ? "bg-gray-900" : "bg-white",
    dropdownBorder: `border-${inputBorderWidth} border-${
      highContrast ? "red-600" : "red-500"
    }`,
    dropdownItemHover: highContrast ? "hover:bg-gray-700" : "hover:bg-red-50",
    resultText: `${textColor} font-bold`,
    resultDetailText: textColor,
    highlightBadge: highContrast
      ? "bg-red-800 text-white font-bold"
      : "bg-red-100 text-red-800",
    iconColor: "text-white",
  };
};

/// Function to get styles for the search component based on accessibility settings
export const getSearchStyles = (settings?: AccessibilitySettings) => {
  const highContrast = settings?.contrast === "high";

  return {
    labelText: highContrast
      ? "text-gray-100 font-bold text-2xl"
      : "text-gray-200",
    inputBg: highContrast ? "bg-gray-100" : "bg-white",
    inputText: highContrast ? "text-gray-900 font-bold" : "text-gray-800",
    inputBorder: highContrast
      ? "border-3 border-blue-600"
      : "border border-gray-300",
    buttonBg: highContrast ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700",
    buttonText: "text-white" + (highContrast ? " font-bold" : ""),
    dropdownBg: highContrast ? "bg-gray-900" : "bg-white",
    dropdownBorder: highContrast
      ? "border-3 border-blue-600"
      : "border border-gray-300",
    dropdownItemHover: highContrast ? "hover:bg-gray-700" : "hover:bg-gray-100",
    resultText: highContrast ? "text-gray-200 font-bold" : "text-gray-800",
    resultDetailText: highContrast ? "text-gray-200" : "text-gray-500",
    highlightBadge: highContrast
      ? "bg-blue-700 text-white font-bold right-0"
      : "bg-blue-100 text-blue-800",
    iconColor: "text-white",
  };
};
