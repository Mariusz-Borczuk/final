import { TileType } from "@/data/tileData";
import { floor1Data } from "../../data/floor1Data";
import { floor2Data } from "../../data/floor2Data";
import { floor3Data } from "../../data/floor3Data";
import { floor4Data } from "../../data/floor4Data";

/*  Building Entities
 *Coordinate: Represents a point on the floor plan with x and y coordinates.
 *Room: Represents a room with a number, start and end coordinates, and optional entry points.
 *Elevator: Represents an elevator with start, end, and entry coordinates.
 *Bathroom: Represents a bathroom with a type (Male, Female, Neutral) and start, end, and entry coordinates.
 *FireEquipment: Represents fire safety equipment with a location coordinate.
 *UtilityRoom: Represents a utility room with a name, start and end coordinates, and entry points.
 *Stair: Represents a stairway with start, end, and entry coordinates.
 *Path: Represents a path with start and end coordinates.
 *NavigationItem: Represents a navigation item with a name, coordinates, icon, and optional color.
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
export interface NavigationItem {
  name: string;
  coordinates: { x: number; y: number };
  icon: React.ReactNode;
  color?: string; // Color property for the location marker
}
export interface Exit {
  type: "main" | "standard";
  coordinates: Coordinate;
  description: string;
}
/* Floor Management
 *FloorData: Represents the data for a floor, including rooms, elevators, bathrooms, fire equipment, utility rooms, stairs, and paths.
 *FloorManagementProps: Props for managing the current floor.
 *AllfloorData: Combined floor data for all floors in the building.
 */
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
export interface FloorManagementProps {
  currentFloor: number;
  onFloorChange: (floor: number) => void;
}
export const allFloorData: FloorData[] = [
  floor1Data,
  floor2Data,
  floor3Data,
  floor4Data,
];
/*  Accessibility
 *AccessibilityFontSizeProps: Props for the font size component.
 *AccessibilitySettings: Represents the accessibility settings for the application, including font size, contrast, preferred bathroom, and walking speed.
 *AccessibilitySettingsProps: Props for the accessibility settings component.
 *AccessibilityFontSizeProps: Props for the font size component.
 */
export interface AccessibilityFontSizeProps {
  fontSize: "normal" | "large" | "xlarge";
  contrast: "normal" | "high";
}
export interface AccessibilitySettings {
  [x: string]:
    | boolean
    | "normal"
    | "large"
    | "xlarge"
    | "high"
    | PreferredBathroom
    | number
    | undefined;
  fontSize: "normal" | "large" | "xlarge";
  contrast: "normal" | "high";
  preferredBathroom?: PreferredBathroom;
  walkingSpeedMPS?: number;
}
export interface AccessibilitySettingsProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export interface PathMapProps {
  title?: string;
  onFindPath?: () => void;
  onReset?: () => void;
}
export interface GridMapProps {
  showGrid: boolean;
  currentFloor: number;
  endLocation?: LocationSearchResult | null;
  startLocation?: LocationSearchResult | null;
  settings?: AccessibilitySettings;
}
export interface Route {
  destination: string;
  estimatedTime: string;
  accessibilityNotes: string;
  navigationInstructions: string;
  distance?: string;
}
export interface RouteInformationCardProps {
  route: Route;
  settings: AccessibilitySettings;
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
export interface AccessibleTTSButtonProps {
  route: Route;
  className?: string;
  settings: AccessibilitySettings;
}
export interface Section {
  title: string;
  content: string;
}
export interface SpeechSettings {
  volume: number;
  rate: number;
}
export interface GridToggleButtonProps {
  showGrid: boolean;
  onToggle: () => void;
  settings: {
    contrast: string;
    fontSize: string;
  };
}
export interface RightSidebarProps {
  settings: AccessibilitySettings;
  currentFloor: number;
  isWheelchair?: boolean;
  pathSegments?: PathSegment[];
  estimatedTime?: string;
  distance?: string;
  // Add callbacks to update settings
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}
export interface MapViewProps {
  currentFloor: number;
  showGrid: boolean;
  settings?: any;
  endLocation?: LocationSearchResult | null;
  startLocation?: LocationSearchResult | null;
}
export interface LayoutProps {
  children: React.ReactNode;
}
export function getFloorFromRoomNumber(roomNumber: string): number {
  // Extract the first digit from the room number
  const firstDigit = parseInt(roomNumber.charAt(0));
  return firstDigit;
}
export function isRoomOnFloor(
  roomNumber: string,
  floorNumber: number
): boolean {
  return getFloorFromRoomNumber(roomNumber) === floorNumber;
}
/**
 * Represents the result of a location search.
 * @interface LocationSearchResult
 * @property {('classroom' | 'bathroom' | 'elevator' | 'stairs' | 'fireEquipment' | 'utilityRoom' | 'coordinate')} type - The type of location.
 * @property {string} name - The name of the location.
 * @property {number} floor - The floor number where the location is situated.
 * @property {Coordinate} location - The coordinates of the location.
 * @property {string} [description] - Optional description of the location.
 * @property {string} [color] - Custom color for the location marker.
 * @property {PreferredBathroom} [PreferredBathroom] - Preferred bathroom type.
 */
export interface LocationSearchResult {
  type: TileType|string;
  name: string;
  floor: number;
  location: Coordinate;
  description?: string;
  color?: string;
  PreferredBathroom?: PreferredBathroom;
}
export interface AddCustomNavigationButtonProps {
  onAdd: (item: NavigationItem) => void;
}
// Floor data arrays need to be imported at the top of the file
/**
 * Combined floor data for all floors in the building
 * Index corresponds to floor number - 1 (e.g., floor1Data is at index 0)
 */

// Define props for MapLegend
export interface MapLegendProps {
  settings?: AccessibilitySettings;
}
export interface AccessibilityButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  description: string;
}
export const coordRegex =
  /(?:x\s*:\s*(\d+)\s*y\s*:\s*(\d+))|(?:\(?(\d+)\s*,\s*(\d+)\)?)/i;

// Update MapViewProps interface to include pathSegments
export interface pathSegmentsProps extends MapViewProps {
  pathSegments?: PathSegment[];
}
/**
 * Props for the search field, onSearch returns full LocationSearchResult or null
 */
export interface LocationSearchFieldProps {
  onSearch: (result: LocationSearchResult | null) => void;
  currentFloor: number;
  setCurrentFloor?: (floor: number) => void;
  settings?: AccessibilitySettings;
}
export const isWheelchair: boolean = false;

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

// Define path segment interface
export interface PathSegment {
  start: Coordinate;
  end: Coordinate;
  floor: number;
  // New property to track transit points between floors (elevator or stairs)
  isTransitPoint?: boolean;
  transitType?: "elevator" | "stairs";
}

// Updated props interface to include isWheelchair option
export interface PathFinderProps2 {
  startLocation: LocationSearchResult | null;
  endLocation: LocationSearchResult | null;
  isWheelchair: boolean;
  onPathFound: (path: PathSegment[]) => void;
  onError: (message: string) => void;
}

export interface FindPathButtonProps {
  startLocation: LocationSearchResult | null;
  endLocation: LocationSearchResult | null;
  onFindPath: () => void;
  isLoading?: boolean;
  settings?: AccessibilitySettings;
  isWheelchair?: boolean; // Add wheelchair mode flag
}

// Define path segment interface
export interface PathSegment {
  start: Coordinate;
  end: Coordinate;
  floor: number;
  isTransitPoint?: boolean;
  transitType?: "elevator" | "stairs";
}

// Define clear interface for PathFinder props
export interface RouteFinderProps {
  startLocation: LocationSearchResult | null;
  endLocation: LocationSearchResult | null;
  isWheelchair: boolean;
  onPathFound: (path: PathSegment[]) => void;
  onError: (message: string) => void;
  preferredBathroom?: PreferredBathroom; // Add preferred bathroom
}

// Define transit point type
export type TransitPoint = {
  coord: Coordinate;
  isElevator: boolean;
};

export interface LeftSidebarProps {
  // Accessibility and UI settings
  settings: AccessibilitySettings;
  isWheelchair: boolean;
  setIsWheelchair: (isWheelchair: boolean) => void;
  onUpdateSettings: (
    settings: Partial<AccessibilitySettings & { isWheelchair: boolean }>
  ) => void;

  // Floor management
  currentFloor: number;
  onFloorChange: (floor: number) => void;

  // Location selection (for QuickNavigation, etc)
  onSelectLocation?: (location: LocationSearchResult) => void;
}

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
/**
 * Interface for the IconSelector component
 */
export interface IconSelectorProps {
  selectedIcon: React.ReactNode;
  onIconSelect: (icon: React.ReactNode, iconName: string) => void;
  className?: string;
}
export interface HoveredCellInfo {
  text: string;
  x: number;
  y: number;
}
export type PreferredBathroom = "Male" | "Female" | "Neutral" | "Any";
