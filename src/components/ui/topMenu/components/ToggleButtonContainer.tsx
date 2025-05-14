import React from "react";

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
  const sizes = {
    small: { container: "w-20", labelContainer: "h-5 mb-1" },
    medium: { container: "w-24", labelContainer: "h-7 mb-1.5" },
    large: { container: "w-32", labelContainer: "h-10 mb-2" },
  };

  const { container, labelContainer } = sizes[size] || sizes.medium;

  return (
    <div
      className={`flex flex-col items-center justify-center ${container} ${className}`}
      aria-label="Toggle button container"
      aria-describedby="toggle-button-container-desc"
    >
      {/* Description for screen readers */}
      <div id="toggle-button-container-desc" className="sr-only">
        This container groups a label and a toggle button for accessibility and
        layout consistency.
      </div>
      <div
        className={`w-full flex items-center justify-center ${labelContainer} ${labelClassName}`}
      >
        {label}
      </div>
      {button}
    </div>
  );
};
