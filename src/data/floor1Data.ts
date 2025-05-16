import { FloorData } from "../components/types/types";

/**
 * Data representation of the first floor layout.
 *
 * Contains detailed spatial information about classrooms, elevators, bathrooms,
 * fire equipment, utility rooms, stairs, and walkable paths.
 *
 * Each classroom is defined by:
 * - number: The classroom identifier
 * - start: The top-left coordinate of the room {x, y}
 * - end: The bottom-right coordinate of the room {x, y}
 * - entry: The entry point coordinate of the room {x, y}
 *
 * Elevators and bathrooms follow similar structure to classrooms.
 * Bathrooms additionally have a 'type' field indicating gender.
 *
 * Fire equipment is represented by single point locations.
 *
 * Utility rooms have:
 * - name: Descriptive name of the utility room
 * - start: Top-left coordinate
 * - end: Bottom-right coordinate
 *
 * Stairs and paths are defined by start and end coordinates, representing
 * the bounding box for stairs and line segments for paths.
 */
export const floor1Data: FloorData = {
  classrooms: [
    {
      number: "101",
      start: { x: 49, y: 38 },
      end: { x: 53, y: 47 },
      entry: { x: 49, y: 42 },
    },
    {
      number: "102",
      start: { x: 49, y: 35 },
      end: { x: 53, y: 36 },
      entry: { x: 49, y: 35 },
    },
    {
      number: "103",
      start: { x: 49, y: 31 },
      end: { x: 53, y: 33 },
      entry: { x: 49, y: 32 },
    },
    {
      number: "104",
      start: { x: 49, y: 28 },
      end: { x: 53, y: 29 },
      entry: { x: 49, y: 28 },
    },
    {
      number: "105",
      start: { x: 49, y: 25 },
      end: { x: 53, y: 26 },
      entry: { x: 49, y: 25 },
    },
    {
      number: "106",
      start: { x: 49, y: 21 },
      end: { x: 53, y: 23 },
      entry: { x: 49, y: 22 },
    },
    {
      number: "107",
      start: { x: 49, y: 18 },
      end: { x: 53, y: 19 },
      entry: { x: 49, y: 18 },
    },
    {
      number: "112",
      start: { x: 36, y: 2 },
      end: { x: 37, y: 6 },
      entry: { x: 36, y: 6 },
    },
    {
      number: "112a",
      start: { x: 26, y: 2 },
      end: { x: 34, y: 6 },
      entry: { x: 28, y: 6 },
    },
    {
      number: "113",
      start: { x: 15, y: 2 },
      end: { x: 24, y: 6 },
      entry: { x: 16, y: 6 },
    },
    {
      number: "114",
      start: { x: 12, y: 2 },
      end: { x: 13, y: 6 },
      entry: { x: 12, y: 6 },
    },
    {
      number: "115",
      start: { x: 2, y: 2 },
      end: { x: 6, y: 9 },
      entry: { x: 6, y: 7 },
    },
    {
      number: "116",
      start: { x: 2, y: 11 },
      end: { x: 6, y: 13 },
      entry: { x: 6, y: 12 },
    },
    {
      number: "117",
      start: { x: 2, y: 14 },
      end: { x: 6, y: 16 },
      entry: { x: 6, y: 15 },
    },
    {
      number: "118",
      start: { x: 2, y: 18 },
      end: { x: 6, y: 19 },
      entry: { x: 6, y: 19 },
    },
    {
      number: "118a",
      start: { x: 2, y: 21 },
      end: { x: 6, y: 22 },
      entry: { x: 6, y: 22 },
    },
    {
      number: "119",
      start: { x: 2, y: 24 },
      end: { x: 6, y: 26 },
      entry: { x: 6, y: 26 },
    },
    {
      number: "119a",
      start: { x: 2, y: 28 },
      end: { x: 6, y: 31 },
      entry: { x: 6, y: 29 },
    },
    {
      number: "119b",
      start: { x: 2, y: 33 },
      end: { x: 6, y: 34 },
      entry: { x: 6, y: 34 },
    },
    {
      number: "120",
      start: { x: 2, y: 36 },
      end: { x: 6, y: 37 },
      entry: { x: 6, y: 37 },
    },
    {
      number: "121",
      start: { x: 2, y: 39 },
      end: { x: 6, y: 45 },
      entry: { x: 6, y: 42 },
    },
    {
      number: "122",
      start: { x: 2, y: 46 },
      end: { x: 6, y: 47 },
      entry: { x: 6, y: 47 },
    },
    {
      number: "124",
      start: { x: 10, y: 46 },
      end: { x: 14, y: 50 },
      entry: { x: 10, y: 47 },
    },
    {
      number: "125",
      start: { x: 10, y: 40 },
      end: { x: 14, y: 44 },
      entry: { x: 10, y: 42 },
    },
    {
      number: "134",
      start: { x: 40, y: 40 },
      end: { x: 44, y: 42 },
      entry: { x: 42, y: 42 },
    },
    {
      number: "135",
      start: { x: 36, y: 40 },
      end: { x: 38, y: 42 },
      entry: { x: 37, y: 42 },
    },
    {
      number: "136",
      start: { x: 32, y: 40 },
      end: { x: 34, y: 42 },
      entry: { x: 33, y: 42 },
    },
    {
      number: "137",
      start: { x: 28, y: 40 },
      end: { x: 30, y: 42 },
      entry: { x: 29, y: 42 },
    },
    {
      number: "138",
      start: { x: 24, y: 40 },
      end: { x: 26, y: 42 },
      entry: { x: 25, y: 42 },
    },
    {
      number: "139",
      start: { x: 20, y: 40 },
      end: { x: 22, y: 42 },
      entry: { x: 21, y: 42 },
    },
    {
      number: "141",
      start: { x: 20, y: 45 },
      end: { x: 22, y: 50 },
      entry: { x: 21, y: 45 },
    },
    {
      number: "142",
      start: { x: 24, y: 45 },
      end: { x: 27, y: 50 },
      entry: { x: 25, y: 45 },
    },
    {
      number: "143",
      start: { x: 29, y: 45 },
      end: { x: 34, y: 50 },
      entry: { x: 32, y: 45 },
    },
    {
      number: "144",
      start: { x: 36, y: 45 },
      end: { x: 38, y: 50 },
      entry: { x: 37, y: 45 },
    },
    {
      number: "145",
      start: { x: 40, y: 45 },
      end: { x: 44, y: 50 },
      entry: { x: 43, y: 45 },
    },
  ],
  elevators: [
    { start: { x: 10, y: 31 }, end: { x: 13, y: 33 }, entry: { x: 10, y: 32 } },
  ],
  bathrooms: [
    {
      type: "Male",
      start: { x: 10, y: 16 },
      end: { x: 15, y: 19 },
      entry: { x: 10, y: 17 },
    },
    {
      type: "Female",
      start: { x: 39, y: 16 },
      end: { x: 45, y: 19 },
      entry: { x: 45, y: 17 },
    },
  ],
  fireEquipment: [
    { location: { x: 7, y: 46 } },
    { location: { x: 7, y: 28 } },
    { location: { x: 7, y: 8 } },
    { location: { x: 13, y: 9 } },
    { location: { x: 27, y: 7 } },
    { location: { x: 46, y: 6 } },
    { location: { x: 46, y: 13 } },
    { location: { x: 46, y: 20 } },
    { location: { x: 48, y: 44 } },
    { location: { x: 35, y: 44 } },
    { location: { x: 22, y: 44 } },
  ],
  utilityRooms: [
    {
      name: "GYM",
      start: { x: 16, y: 25 },
      end: { x: 38, y: 14 },
      entry: { x: 16, y: 21 },
    },
    {
      name: "Changing room",
      start: { x: 16, y: 10 },
      end: { x: 38, y: 13 },
      entry: { x: 27, y: 10 },
    },
  ],
  stairs: [
    {
      start: { x: 10, y: 10 },
      end: { x: 12, y: 12 },
      entry: { x: 11, y: 10 },
    },
    {
      start: { x: 43, y: 9 },
      end: { x: 45, y: 11 },
      entry: { x: 44, y: 9 },
    },
    {
      start: { x: 2, y: 48 },
      end: { x: 6, y: 50 },
      entry: { x: 6, y: 49 },
    },
    {
      start: { x: 49, y: 48 },
      end: { x: 53, y: 50 },
      entry: { x: 49, y: 49 },
    },
  ],
  paths: [
    { start: { x: 7, y: 2 }, end: { x: 9, y: 50 } },
    { start: { x: 8, y: 2 }, end: { x: 11, y: 9 } },
    { start: { x: 10, y: 21 }, end: { x: 15, y: 22 } },
    { start: { x: 12, y: 7 }, end: { x: 41, y: 9 } },
    { start: { x: 20, y: 43 }, end: { x: 45, y: 44 } },
    { start: { x: 41, y: 10 }, end: { x: 41, y: 11 } },
    { start: { x: 39, y: 8 }, end: { x: 46, y: 3 } },
    { start: { x: 46, y: 8 }, end: { x: 54, y: 11 } },
    { start: { x: 46, y: 12 }, end: { x: 48, y: 50 } },
    { start: { x: 55, y: 14 }, end: { x: 53, y: 12 } },
  ],
  exits: [
    { coordinates: { x: 55, y: 13 }, type: "main", description: "Main Exit" },
    { coordinates: { x: 47, y: 50 }, type: "standard", description: "Parking exit" },
    { coordinates: { x: 8, y: 50 }, type: "standard", description: "CNTI exit" },
  ],
};
