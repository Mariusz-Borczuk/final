/**
 * Defines different tile types used in the path finding system.
 * Each tile has specific properties:
 * - color: Hex color code for visual representation
 * - label: Display name for the tile
 * - type: Identifier string for the tile type
 * - row: Default row position (initialized to 0)
 * - col: Default column position (initialized to 0)
 * 
 * Available tile types include:
 * - path: Regular walkable path
 * - classroom: Educational rooms
 * - stairs: Vertical connections between floors
 * - stairsEntry: Entry points for stairs
 * - bathroom: Restroom facilities
 * - bathroomEntry: Entry points for bathrooms
 * - fireEquipment: Fire safety equipment locations
 * - elevator: Accessible vertical transportation
 * - elevatorEntry: Entry points for elevators
 * - utilityRoom: Maintenance/utility spaces
 * - utilityEntry: Entry points for utility rooms
 * - start: Starting location for path finding
 * - end: Destination location for path finding
 * - entry: Building entrance/exit points
 */
export type CellType = {
    row: number;
    col: number;
    type: string;
    color: string;
    label: string;
  };
 export type contrastSettings ={
          settings: {
          contrast: "high" | "low";
      };
  }
export const tileData = {
    path: { color: "#e0e0e0", label: "Path", type: "path", row: 0, col: 0 },
    classroom: { color: "#F9A800", label: "Classroom", type: "classroom", row: 0, col: 0 },
    stairs: { color: "#247F52", label: "Stairs", type: "stairs", row: 0, col: 0},
    stairsEntry: { color: "#18573A", label: "Stairs Entry", type: "stairsEntry", row: 0, col: 0 }, // Darker green
    bathroom: { color: "#1E2460", label: "Bathroom", type: "bathrooms", row: 0, col: 0 },
    bathroomEntry: { color: "#141841", label: "Bathroom Entry", type: "bathroomEntry", row: 0, col: 0 }, // Darker blue
    fireEquipment: { color: "#9B2423", label: "Fire Equipment", type: "fireEquipment", row: 0, col: 0 },
    elevator: { color: "#82209E", label: "Elevator", type: "elevator", row: 0, col: 0 },
    elevatorEntry: { color: "#5B176F", label: "Elevator Entry", type: "elevatorEntry", row: 0, col: 0 }, // Darker purple
    utilityRoom: { color: "#6A8CA3", label: "Utility Room", type: "utility", row: 0, col: 0 },
    utilityEntry: { color: "#4B6272", label: "Utility Entry", type: "utilityEntry", row: 0, col: 0 }, // Darker gray-blue
    start: { color: "#34C759", label: "Start", type: "start", row: 0, col: 0 },
    end: { color: "#FF3737", label: "End", type: "end", row: 0, col: 0 },
    classroomEntry:{color:"#C78600",label:"entry",type:"entry", row: 0, col: 0 }
};
export type TileType = typeof tileData[keyof typeof tileData];
export interface CellProps {
  type: keyof typeof tileData;
}
export const tileDataArray = Object.values(tileData);
export const tileDataMap = new Map<string, typeof tileData[keyof typeof tileData]>(Object.entries(tileData));