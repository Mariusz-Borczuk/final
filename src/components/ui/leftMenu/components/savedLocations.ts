import { LocationSearchResult } from "@/components/types/types";


// Initial building features
export const savedLocations: LocationSearchResult[] = [
  {
    type: "exit",
    location: { x: 10, y: 5 },
    floor: 1,
    name: "Exit",
    description: "Location with exit",
    color: "#2196F3",
  },
  {
    type: "elevator",
    location: { x: 12, y: 32 },
    floor: 1,
    name: "Elevator",
    description: "Elevator location",
    color: "#673AB7",
  },
//   {
//     type: "escapeRoute",
//     location: { x: 6, y: 52 },
//     floor: 1,
//     name: "Escape Route",
//     description: "Escape route location",
//     color: "#FF5722",
//   },
];

export function addBuildingFeatureLocation(location: LocationSearchResult) {
  savedLocations.push(location);
}
