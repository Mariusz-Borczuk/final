import { FloorData } from "@/styles/types";

/**
 * Data for the second floor layout.
 *
 * This object contains information about:
 * - Classrooms: Each classroom with its number, spatial coordinates (start/end points) and entry point
 * - Elevators: Location and entry point
 * - Bathrooms: Type (Male/Female), location and entry point
 * - Fire Equipment: Locations of fire safety equipment
 * - Utility Rooms: Empty array placeholder for future utility room data
 * - Stairs: Start and end coordinates of stairwells
 * - Paths: Walkable paths connecting different areas of the floor
 *
 * The coordinate system uses x,y coordinates where each unit represents a discrete position
 * on the floor layout grid.
 */
export const floor2Data: FloorData = {
  classrooms: [
    {
      number: "200",
      start: { x: 49, y: 43 },
      end: { x: 52, y: 44 },
      entry: { x: 49, y: 43 },
    },
    {
      number: "200a",
      start: { x: 49, y: 46 },
      end: { x: 52, y: 47 },
      entry: { x: 49, y: 46 },
    },
    {
      number: "201",
      start: { x: 49, y: 40 },
      end: { x: 52, y: 41 },
      entry: { x: 49, y: 40 },
    },
    {
      number: "202",
      start: { x: 49, y: 33 },
      end: { x: 52, y: 38 },
      entry: { x: 49, y: 35 },
    },
    {
      number: "203",
      start: { x: 49, y: 27 },
      end: { x: 52, y: 31 },
      entry: { x: 49, y: 28 },
    },
    {
      number: "204",
      start: { x: 49, y: 24 },
      end: { x: 52, y: 25 },
      entry: { x: 49, y: 24 },
    },
    {
      number: "205",
      start: { x: 49, y: 19 },
      end: { x: 52, y: 22 },
      entry: { x: 49, y: 20 },
    },
    {
      number: "206",
      start: { x: 49, y: 16 },
      end: { x: 52, y: 17 },
      entry: { x: 49, y: 16 },
    },
    {
      number: "207",
      start: { x: 49, y: 11 },
      end: { x: 52, y: 14 },
      entry: { x: 49, y: 12 },
    },
    {
      number: "208",
      start: { x: 49, y: 3 },
      end: { x: 62, y: 9 },
      entry: { x: 48, y: 5 },
    },
    {
      number: "208a",
      start: { x: 48, y: 3 },
      end: { x: 49, y: 7 },
      entry: { x: 48, y: 5 },
    },
    {
      number: "209",
      start: { x: 35, y: 4 },
      end: { x: 37, y: 7 },
      entry: { x: 36, y: 7 },
    },
    {
      number: "210",
      start: { x: 32, y: 4 },
      end: { x: 33, y: 7 },
      entry: { x: 32, y: 7 },
    },
    {
      number: "212/211",
      start: { x: 25, y: 4 },
      end: { x: 30, y: 7 },
      entry: { x: 26, y: 7 },
    },
    {
      number: "213",
      start: { x: 22, y: 4 },
      end: { x: 23, y: 7 },
      entry: { x: 23, y: 7 },
    },
    {
      number: "214",
      start: { x: 20, y: 4 },
      end: { x: 21, y: 7 },
      entry: { x: 20, y: 7 },
    },
    {
      number: "215",
      start: { x: 17, y: 4 },
      end: { x: 18, y: 7 },
      entry: { x: 17, y: 7 },
    },
    {
      number: "216",
      start: { x: 13, y: 3 },
      end: { x: 14, y: 7 },
      entry: { x: 13, y: 7 },
    },
    {
      number: "217",
      start: { x: 11, y: 3 },
      end: { x: 12, y: 7 },
      entry: { x: 11, y: 7 },
    },
    {
      number: "218",
      start: { x: 7, y: 3 },
      end: { x: 9, y: 7 },
      entry: { x: 9, y: 7 },
    },
    {
      number: "219",
      start: { x: 4, y: 5 },
      end: { x: 7, y: 13 },
      entry: { x: 7, y: 7 },
    },
    {
      number: "220",
      start: { x: 4, y: 15 },
      end: { x: 7, y: 16 },
      entry: { x: 7, y: 15 },
    },
    {
      number: "221",
      start: { x: 4, y: 18 },
      end: { x: 7, y: 20 },
      entry: { x: 7, y: 19 },
    },
    {
      number: "222",
      start: { x: 4, y: 21 },
      end: { x: 7, y: 22 },
      entry: { x: 7, y: 21 },
    },
    {
      number: "223",
      start: { x: 4, y: 26 },
      end: { x: 7, y: 27 },
      entry: { x: 7, y: 26 },
    },
    {
      number: "224",
      start: { x: 4, y: 29 },
      end: { x: 7, y: 34 },
      entry: { x: 7, y: 32 },
    },
    {
      number: "225",
      start: { x: 4, y: 36 },
      end: { x: 7, y: 40 },
      entry: { x: 7, y: 38 },
    },
    {
      number: "226",
      start: { x: 4, y: 42 },
      end: { x: 7, y: 43 },
      entry: { x: 7, y: 42 },
    },
    {
      number: "226a",
      start: { x: 4, y: 45 },
      end: { x: 7, y: 48 },
      entry: { x: 7, y: 46 },
    },
    {
      number: "227",
      start: { x: 12, y: 46 },
      end: { x: 16, y: 50 },
      entry: { x: 14, y: 46 },
    },
    {
      number: "228",
      start: { x: 18, y: 46 },
      end: { x: 31, y: 51 },
      entry: { x: 21, y: 46 },
    },
    {
      number: "231",
      start: { x: 34, y: 46 },
      end: { x: 39, y: 51 },
      entry: { x: 37, y: 46 },
    },
    {
      number: "233",
      start: { x: 41, y: 46 },
      end: { x: 45, y: 50 },
      entry: { x: 44, y: 46 },
    },
    {
      number: "234",
      start: { x: 41, y: 42 },
      end: { x: 45, y: 43 },
      entry: { x: 44, y: 43 },
    },
    {
      number: "235",
      start: { x: 37, y: 41 },
      end: { x: 40, y: 43 },
      entry: { x: 38, y: 43 },
    },
    {
      number: "236",
      start: { x: 33, y: 41 },
      end: { x: 36, y: 43 },
      entry: { x: 35, y: 43 },
    },
    {
      number: "237",
      start: { x: 29, y: 41 },
      end: { x: 31, y: 43 },
      entry: { x: 30, y: 43 },
    },
    {
      number: "238",
      start: { x: 25, y: 41 },
      end: { x: 27, y: 43 },
      entry: { x: 26, y: 43 },
    },
    {
      number: "239",
      start: { x: 21, y: 41 },
      end: { x: 23, y: 43 },
      entry: { x: 22, y: 43 },
    },
    {
      number: "240",
      start: { x: 17, y: 41 },
      end: { x: 19, y: 43 },
      entry: { x: 18, y: 43 },
    },
    {
      number: "241",
      start: { x: 12, y: 42 },
      end: { x: 15, y: 43 },
      entry: { x: 14, y: 43 },
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
    { location: { x: 9, y: 13 } },
    { location: { x: 13, y: 9 } },
    { location: { x: 27, y: 9 } },
    { location: { x: 43, y: 7 } },
    { location: { x: 47, y: 13 } },
    { location: { x: 48, y: 30 } },
    { location: { x: 48, y: 43 } },
    { location: { x: 47, y: 51 } },
    { location: { x: 9, y: 51 } },
    { location: { x: 9, y: 44 } },
    { location: { x: 9, y: 33 } },
  ],
  utilityRooms: [],
  stairs: [
    {
      start: { x: 10, y: 10 },
      end: { x: 12, y: 12 },
      entry: { x: 11, y: 10 },
    },
    {
      start: { x: 43, y: 10 },
      end: { x: 45, y: 12 },
      entry: { x: 44, y: 10 },
    },
    {
      start: { x: 2, y: 23 },
      end: { x: 7, y: 25 },
      entry: { x: 7, y: 24 },
    },
    {
      start: { x: 2, y: 49 },
      end: { x: 7, y: 51 },
      entry: { x: 7, y: 50 },
    },
    {
      start: { x: 49, y: 49 },
      end: { x: 53, y: 51 },
      entry: { x: 49, y: 50 },
    },
  ],
  paths: [
    { start: { x: 8, y: 9 }, end: { x: 9, y: 51 } },
    { start: { x: 8, y: 8 }, end: { x: 48, y: 9 } },
    { start: { x: 39, y: 3 }, end: { x: 47, y: 8 } },
    { start: { x: 46, y: 9 }, end: { x: 48, y: 51 } },
    { start: { x: 10, y: 44 }, end: { x: 47, y: 45 } },
  ],
};
