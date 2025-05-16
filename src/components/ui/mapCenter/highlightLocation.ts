// Utility function to create a startLocation object for GridMap
// Usage: setStartLocation({ x: 10, y: 20 }, 1, "Start Point")
import { TileType } from "@/data/tileData";
import type { Coordinate, LocationSearchResult } from "@/types/types";

/**
 * Returns a LocationSearchResult object to be used as startLocation for GridMap.
 * @param coords - The coordinates (x, y) for the start location
 * @param floor - The floor number
 * @param name - Optional name for the location
 * @param description - Optional description
 * @param color - Optional marker color (default green)
 */
export function highlightLocation(
  type: TileType | string,
  location: Coordinate,
  floor: number,
  name?: string,
  description?: string,
  color?: string
): LocationSearchResult {
  return {
    type: type,
    name: name || `Start at (${location.x}, ${location.y})`,
    floor,
    location: { ...location },
    description: description || "",
    color: color || "#4CAF50",
  };
}
