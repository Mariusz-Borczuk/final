import { LocationSearchResult } from "@/styles/types";
import { defaultLocations } from "./browserLocationManager";


export function addBuildingFeatureLocation(location: LocationSearchResult) {
  defaultLocations.push(location);
}
