import { floor1Data } from "../../data/floor1Data";
import { floor2Data } from "../../data/floor2Data";
import { floor3Data } from "../../data/floor3Data";
import { floor4Data } from "../../data/floor4Data";

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
export interface FloorManagementProps {
  currentFloor: number;
  onFloorChange: (floor: number) => void;
}

export interface HoveredCellInfo {
  text: string;
  x: number;
  y: number;
}
export interface NavigationItem {
  name: string;
  coordinates: { x: number; y: number };
  icon: React.ReactNode;
  color?: string; // Color property for the location marker
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
export interface FloorData {
  classrooms: Room[];
  elevators: Elevator[];
  bathrooms: Bathroom[];
  fireEquipment: FireEquipment[];
  utilityRooms: UtilityRoom[];
  stairs: Stair[];
  paths: Path[];
}
export type PreferredBathroom = "Male" | "Female" | "Neutral" | "Any";

export interface AccessibilitySettings {
  fontSize: "normal" | "large" | "xlarge";
  contrast: "normal" | "high";
  preferredBathroom?: PreferredBathroom; // Add preferred bathroom
  walkingSpeedMPS?: number; // Changed from secondsPer5m to metersPerSecond
}
export interface AccessibilityFontSizeProps {
  fontSize: "normal" | "large" | "xlarge";
}
export interface PathMapProps {
  title?: string;
  onFindPath?: () => void;
  onReset?: () => void;
}
export interface FloorGridProps {
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
  distance?: string; // Added distance property
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
  type:
    | "classroom"
    | "bathroom"
    | "elevator"
    | "stairs"
    | "fireEquipment"
    | "utilityRoom"
    | "coordinate"
    | "path";
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
export const allFloorData: FloorData[] = [
  floor1Data,
  floor2Data,
  floor3Data,
  floor4Data,
];
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
