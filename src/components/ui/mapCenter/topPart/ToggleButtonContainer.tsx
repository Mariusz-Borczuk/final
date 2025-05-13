import React from "react";

/**
 * A reusable container component for toggle buttons and labels with fixed sizing
 * to ensure consistent layout regardless of content size.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.label - The label content to display above the button
 * @param {React.ReactNode} props.button - The button element
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 * @param {string} [props.labelClassName] - Additional CSS classes to apply to the label
 * @param {string} [props.size='medium'] - Size variant ('small', 'medium', 'large')
 * @returns {JSX.Element} A fixed-size container with label and button
 */
export const ToggleButtonContainer: React.FC<{
  label: React.ReactNode;
  button: React.ReactNode;
  className?: string;
  labelClassName?: string;
  size?: "small" | "medium" | "large";
}> = ({
  label,
  button,
  className = "",
  labelClassName = "",
  size = "medium",
}) => {
  // Set dimensions based on size prop
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          container: "w-20",
          labelContainer: "h-5 mb-1",
        };
      case "large":
        return {
          container: "w-32",
          labelContainer: "h-10 mb-2",
        };
      case "medium":
      default:
        return {
          container: "w-24",
          labelContainer: "h-7 mb-1.5",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div
      className={`flex flex-col items-center justify-center ${sizeClasses.container} ${className}`}
    >
      <div
        className={`w-full flex items-center justify-center ${sizeClasses.labelContainer} ${labelClassName}`}
      >
        {label}
      </div>
      {button}
    </div>
  );
};
