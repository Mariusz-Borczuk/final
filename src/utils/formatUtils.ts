/**
 * Formats an icon component name into a user-friendly string.
 * Removes common library prefixes (Md, Fa, Io, etc.) and converts CamelCase to Title Case.
 *
 * @param componentName - The technical name of the icon component (e.g., "MdLocationPin").
 * @returns A formatted, readable name (e.g., "Location Pin").
 */
export function formatIconName(componentName: string): string {
  // Remove common prefixes like Md, Fa, Io, etc.
  const nameWithoutPrefix = componentName.replace(
    /^(Md|SiGoogle|Si|Fa|Io|Gi|Fi|Bi|Bs|Ri|Ti|Vsc|Wi)/,
    ""
  );
  // Insert a space before capital letters (CamelCase to Title Case)
  const spacedName = nameWithoutPrefix.replace(/([A-Z])/g, " $1").trim();
  // Capitalize the first letter
  return spacedName.charAt(0).toUpperCase() + spacedName.slice(1);
}
