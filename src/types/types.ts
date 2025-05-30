import { floor1Data } from "@/data/floor1Data";
import { floor2Data } from "@/data/floor2Data";
import { floor3Data } from "@/data/floor3Data";
import { floor4Data } from "@/data/floor4Data";
import { TileType } from "@/data/tileData";

/**  Building Entities
 *Coordinate: Represents a point on the floor plan with x and y coordinates.
 *Room: Represents a room with a number, start and end coordinates, and optional entry points.
 *Elevator: Represents an elevator with start, end, and entry coordinates.
 *Bathroom: Represents a bathroom with a type (Male, Female, Neutral) and start, end, and entry coordinates.
 *FireEquipment: Represents fire safety equipment with a location coordinate.
 *UtilityRoom: Represents a utility room with a name, start and end coordinates, and entry points.
 *Stair: Represents a stairway with start, end, and entry coordinates.
 *Path: Represents a path with start and end coordinates.
 *Exit: Represents an exit point with coordinates and a description.
 */
export interface Coordinate {
  x: number;
  y: number;
}
export interface Room {
  number: string;
  start: Coordinate;
  end: Coordinate;
  entry?: Coordinate[] | Coordinate;
}
export interface Elevator {
  start: Coordinate;
  end: Coordinate;
  entry: Coordinate;
}
export interface Bathroom {
  type: "Male" | "Female";
  start: Coordinate;
  end: Coordinate;
  entry: Coordinate;
}
export interface FireEquipment {
  location: Coordinate;
}
export interface UtilityRoom {
  name: string;
  start: Coordinate;
  end: Coordinate;
  entry: Coordinate;
}
export interface Stair {
  start: Coordinate;
  end: Coordinate;
  entry: Coordinate;
}
export interface Path {
  start: Coordinate;
  end: Coordinate;
}
export interface Exit {
  type: "main" | "standard";
  coordinates: Coordinate;
  description: string;
}

/** Accessibility Settings
 *FontAccessibilityOptions: Props for the font size component.
 *AccessibilitySettings: Represents the accessibility settings for the application, including font size, contrast, preferred bathroom, and walking speed.
 *AccessibilitySettingsProps: Props for the accessibility settings component.
 *AccessibilityFontSizeProps: Props for the font size component.
 */
export interface FontAccessibilityOptions {
  fontSize: "normal" | "large" | "xlarge";
  contrast: "normal" | "high";
}
export interface AccessibilitySettings {
  fontSize: FontAccessibilityOptions["fontSize"];
  contrast: FontAccessibilityOptions["contrast"];
  preferredBathroom?: PreferredBathroom;
  walkingSpeedMPS?: number;
}
export interface AccessibilitySettingsProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

/** Left Sidebar Props
  *LeftSidebarProps: Props for the left sidebar component, including accessibility settings, wheelchair mode, and floor management.
  *FloorManagementProps: Props for the floor management component, including current floor and floor change handler.
  *AccessibilityButtonProps: Props for the accessibility button component, including label, active state, click handler, icon, and description.
  *NavigationItem: Represents a navigation item with name, coordinates, icon, and optional color.
  *AddLocationButtonProps: Props for the add location button component, including add handler.
 */
export interface LeftSidebarProps {
  settings: AccessibilitySettings;
  isWheelchair: boolean;
  setIsWheelchair: (isWheelchair: boolean) => void;
  onUpdateSettings: (
    settings: Partial<AccessibilitySettings & { isWheelchair: boolean }>
  ) => void;
  currentFloor: number;
  onFloorChange: (floor: number) => void;
  onSelectLocation?: (location: LocationSearchResult) => void;
}
export interface FloorManagementProps {
  currentFloor: number;
  onFloorChange: (floor: number) => void;
}
export interface AccessibilityButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  description: string;
}
export interface NavigationItem {
  name: string;
  coordinates: { x: number; y: number };
  icon: React.ReactNode;
  iconName: string;
  color?: string;
}
export interface AddLocationButtonProps {
  onAdd: (item: NavigationItem) => void;
}

/** Right Sidebar Props
  *RightSidebarProps: Props for the right sidebar component, including accessibility settings, current floor, wheelchair mode, path segments, estimated time, distance, and update settings function.
  *IconSelectorProps: Props for the icon selector component, including selected icon, onIconSelect function, and optional className.
  *TextToSpeechOptions: Options for text-to-speech functionality, including language, pitch, rate, volume, and event handlers.
  *TTSControlButtonProps: Props for the text-to-speech control button, including route, optional className, and accessibility settings.
  *SpeechSettings: Settings for speech synthesis, including volume and rate.
  *Section: Represents a section with a title and content.
  */
export interface RightSidebarProps {
  settings: AccessibilitySettings;
  currentFloor: number;
  isWheelchair?: boolean;
  pathSegments?: PathSegment[];
  estimatedTime?: string;
  distance?: string;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}
export interface IconSelectorProps {
  selectedIcon: React.ReactNode;
  onIconSelect: (icon: React.ReactNode, iconName: string) => void;
  className?: string;
}
export interface TextToSpeechOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (event: SpeechSynthesisErrorEvent) => void;
}
export interface TTSControlButtonProps {
  route: Route;
  className?: string;
  settings: AccessibilitySettings;
}
export interface SpeechSettings {
  volume: number;
  rate: number;
}
export interface Section {
  title: string;
  content: string;
}

/** Top Bar Props
  *TopBarProps: Props for the top bar component, including grid toggle, settings, current floor, and pathfinding.
  *TransitPoint: Represents a transit point with coordinates and elevator status.
  *FindPathButtonProps: Props for the find path button, including start and end locations, loading state, and wheelchair mode.
  *GridToggleButtonProps: Props for the grid toggle button, including show grid state and onToggle function.
  *PathFinderProps: Props for the path finder component, including current floor, settings, and pathfinding.
  *LocationSearchResult: Represents a location search result with type, name, floor, coordinates, description, color, preferred bathroom, and icon.
 */
export interface TopBarProps {
  showGrid: boolean;
  onToggleGrid: () => void;
  settings: AccessibilitySettings;
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  isWheelchair: boolean;
  onPathFound: (
    path: PathSegment[],
    startCoord: { x: number; y: number },
    endCoord: { x: number; y: number }
  ) => void;
}
export type TransitPoint = {
  coord: Coordinate;
  isElevator: boolean;
};
export interface FindPathButtonProps {
  startLocation: LocationSearchResult | null;
  endLocation: LocationSearchResult | null;
  onFindPath: () => void;
  isLoading?: boolean;
  settings?: AccessibilitySettings;
  isWheelchair?: boolean; // Add wheelchair mode flag
}
export interface GridToggleButtonProps {
  showGrid: boolean;
  onToggle: () => void;
  settings: AccessibilitySettings;
}
export interface PathFinderProps {
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  settings?: AccessibilitySettings;
  onPathFound: (
    path: PathSegment[],
    startCoord: Coordinate,
    endCoord: Coordinate
  ) => void;
  isWheelchair?: boolean;
}
export interface LocationSearchResult {
  type: TileType | string;
  name: string;
  floor: number;
  location: Coordinate;
  description?: string;
  color?: string;
  PreferredBathroom?: PreferredBathroom;
  icon?: string;
}

/** Map props
 *
 */
export interface PathSegment {
  start: Coordinate;
  end: Coordinate;
  floor: number;
  isTransitPoint?: boolean;
  transitType?: "elevator" | "stairs";
}
export interface MapLegendProps {
  settings?: AccessibilitySettings;
}
export interface HighlightedCellDetails {
  text: string;
  x: number;
  y: number;
}
export interface Route {
  destination: string;
  estimatedTime: string;
  accessibilityNotes: string;
  navigationInstructions: string;
  distance?: string;
}
export interface PathSegmentsProps extends MapViewProps {
  pathSegments?: PathSegment[];
}
export interface MapViewProps {
  currentFloor: number;
  showGrid: boolean;
  settings?: any;
  endLocation?: LocationSearchResult | null;
  startLocation?: LocationSearchResult | null;
}

/** Logic and Data Props
  *RouteFinderProps: Props for the route finder component, including start and end locations, wheelchair mode, and pathfinding callbacks.
  *LocationSearchResult: Represents a location search result with type, name, floor, coordinates, description, color, preferred bathroom, and icon.
  *PathSegment: Represents a segment of the path with start and end coordinates, floor number, and optional transit point information.
  *LocationSearchProps: Props for the location search component, including search callback, current floor, and optional floor change handler.
  *isWheelchair: Boolean flag indicating if wheelchair mode is enabled.
  *coordRegex: Regular expression for matching coordinates in the format "x: 123 y: 456" or "(123, 456)".
  *FloorData: Represents data for a specific floor, including rooms, elevators, bathrooms, fire equipment, utility rooms, stairs, paths, and exits.
  *allFloorData: Array of all floor data objects.
  *LayoutProps: Props for the layout component, including children elements.
 */
export interface RouteFinderProps {
  startLocation: LocationSearchResult | null;
  endLocation: LocationSearchResult | null;
  isWheelchair: boolean;
  onPathFound: (path: PathSegment[]) => void;
  onError: (message: string) => void;
  preferredBathroom?: PreferredBathroom;
}
export type PreferredBathroom = "Male" | "Female" | "Neutral" | "Any";
export interface PathSegment {
  start: Coordinate;
  end: Coordinate;
  floor: number;
  isTransitPoint?: boolean;
  transitType?: "elevator" | "stairs";
}
export interface LocationSearchProps {
  onSearch: (result: LocationSearchResult | null) => void;
  currentFloor: number;
  setCurrentFloor?: (floor: number) => void;
  settings?: AccessibilitySettings;
}
export const isWheelchair: boolean = false;
export const coordRegex =
  /(?:x\s*:\s*(\d+)\s*y\s*:\s*(\d+))|(?:\(?(\d+)\s*,\s*(\d+)\)?)/i;
export interface FloorData {
  classrooms: Room[];
  elevators: Elevator[];
  bathrooms: Bathroom[];
  fireEquipment: FireEquipment[];
  utilityRooms: UtilityRoom[];
  stairs: Stair[];
  paths: Path[];
  exits: Exit[];
}
export const allFloorData: FloorData[] = [
  floor1Data,
  floor2Data,
  floor3Data,
  floor4Data,
];
export interface LayoutProps {
  children: React.ReactNode;
}

/** Functions
  *getFloorFromRoomNumber: Extracts the floor number from a room number string.
  *isRoomOnFloor: Checks if a room is on a specific floor based on its number.
  *highlightLocation: Creates a LocationSearchResult object for highlighting a location on the map.
  *formatIconName: Formats an icon component name into a user-friendly string.
 */
export function getFloorFromRoomNumber(roomNumber: string): number {
  const firstDigit = parseInt(roomNumber.charAt(0));
  return firstDigit;
}
export function isRoomOnFloor(
  roomNumber: string,
  floorNumber: number
): boolean {
  return getFloorFromRoomNumber(roomNumber) === floorNumber;
}
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