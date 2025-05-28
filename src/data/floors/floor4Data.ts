import { FloorData } from "@/styles/types";

/**
 * Data representation for the 4th floor layout.
 *
 * Contains information about:
 * - Classrooms (room numbers, physical boundaries, and entry points)
 * - Elevators (locations and entry points)
 * - Bathrooms (type, locations and entry points)
 * - Fire equipment locations
 * - Utility rooms
 * - Stairwells
 * - Walking paths connecting different areas
 *
 * Each location is defined using x,y coordinates, with most spaces having:
 * - start: Top-left corner coordinates
 * - end: Bottom-right corner coordinates
 * - entry: Point(s) where the space can be entered
 */
export const floor4Data: FloorData = {
  classrooms: [
    {
      number: "400",
      start: { x: 49, y: 41 },
      end: { x: 52, y: 47 },
      entry: { x: 49, y: 44 },
    },
    {
      number: "401",
      start: { x: 49, y: 36 },
      end: { x: 52, y: 39 },
      entry: { x: 49, y: 38 },
    },
    {
      number: "402",
      start: { x: 49, y: 31 },
      end: { x: 52, y: 34 },
      entry: { x: 49, y: 32 },
    },
    {
      number: "403",
      start: { x: 49, y: 26 },
      end: { x: 52, y: 29 },
      entry: { x: 49, y: 28 },
    },
    {
      number: "404",
      start: { x: 49, y: 20 },
      end: { x: 52, y: 24 },
      entry: { x: 49, y: 22 },
    },
    {
      number: "405",
      start: { x: 49, y: 15 },
      end: { x: 52, y: 18 },
      entry: { x: 49, y: 17 },
    },
    {
      number: "407",
      start: { x: 49, y: 9 },
      end: { x: 52, y: 13 },
      entry: { x: 49, y: 9 },
    },
    {
      number: "409",
      start: { x: 46, y: 4 },
      end: { x: 49, y: 7 },
      entry: { x: 48, y: 7 },
    },
    {
      number: "410",
      start: { x: 43, y: 4 },
      end: { x: 45, y: 7 },
      entry: { x: 45, y: 7 },
    },
    {
      number: "411",
      start: { x: 35, y: 4 },
      end: { x: 42, y: 7 },
      entry: { x: 38, y: 7 },
    },
    {
      number: "412",
      start: { x: 16, y: 3 },
      end: { x: 33, y: 7 },
      entry: { x: 25, y: 7 },
    },
    {
      number: "415",
      start: { x: 12, y: 7 },
      end: { x: 14, y: 3 },
      entry: { x: 13, y: 7 },
    },
    {
      number: "416",
      start: { x: 9, y: 7 },
      end: { x: 11, y: 3 },
      entry: { x: 10, y: 7 },
    },
    {
      number: "417",
      start: { x: 3, y: 3 },
      end: { x: 8, y: 7 },
      entry: { x: 8, y: 7 },
    },
    {
      number: "418",
      start: { x: 3, y: 9 },
      end: { x: 7, y: 18 },
      entry: { x: 7, y: 15 },
    },
    {
      number: "420",
      start: { x: 3, y: 19 },
      end: { x: 7, y: 20 },
      entry: { x: 7, y: 19 },
    },
    {
      number: "421",
      start: { x: 3, y: 22 },
      end: { x: 7, y: 23 },
      entry: { x: 7, y: 22 },
    },
    {
      number: "422",
      start: { x: 3, y: 24 },
      end: { x: 7, y: 28 },
      entry: { x: 7, y: 26 },
    },
    {
      number: "423",
      start: { x: 3, y: 30 },
      end: { x: 7, y: 33 },
      entry: { x: 7, y: 31 },
    },
    {
      number: "424",
      start: { x: 3, y: 35 },
      end: { x: 7, y: 36 },
      entry: { x: 7, y: 35 },
    },
    {
      number: "425",
      start: { x: 3, y: 37 },
      end: { x: 7, y: 38 },
      entry: { x: 7, y: 37 },
    },
    {
      number: "426",
      start: { x: 3, y: 40 },
      end: { x: 7, y: 47 },
      entry: { x: 7, y: 44 },
    },
    {
      number: "434",
      start: { x: 41, y: 42 },
      end: { x: 45, y: 49 },
      entry: { x: 45, y: 45 },
    },
    {
      number: "AULA A",
      start: { x: 17, y: 40 },
      end: { x: 39, y: 52 },
      entry: [
        { x: 17, y: 44 },
        { x: 39, y: 50 },
      ],
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
    { location: { x: 43, y: 8 } },
    { location: { x: 48, y: 13 } },
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
    { start: { x: 46, y: 9 }, end: { x: 48, y: 51 } },
    { start: { x: 10, y: 44 }, end: { x: 17, y: 51 } },
    { start: { x: 40, y: 51 }, end: { x: 47, y: 50 } },
  ],
};
