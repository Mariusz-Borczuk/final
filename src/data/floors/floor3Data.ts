import { FloorData } from "@/styles/types";

/**
 * Data representation for the third floor layout.
 *
 * @interface FloorData
 * @property {Classroom[]} classrooms - Array of classrooms on the third floor with their coordinates and entry points
 * @property {Elevator[]} elevators - Array of elevators on the third floor
 * @property {Bathroom[]} bathrooms - Array of bathrooms on the third floor, specifying type (Male/Female)
 * @property {FireEquipment[]} fireEquipment - Array of fire equipment locations on the third floor
 * @property {UtilityRoom[]} utilityRooms - Array of utility rooms on the third floor (currently empty)
 * @property {Stair[]} stairs - Array of staircases on the third floor
 * @property {Path[]} paths - Array of walkable paths on the third floor
 *
 * Each room/element contains:
 * - For rooms: start and end coordinates defining a rectangular area
 * - For paths: start and end coordinates defining a line segment
 * - Most rooms include an entry point coordinate
 * - Coordinates use a grid system where x increases eastward and y increases southward
 */
export const floor3Data: FloorData = {
  classrooms: [
    {
      number: "300",
      start: { x: 49, y: 41 },
      end: { x: 53, y: 46 },
      entry: { x: 49, y: 43 },
    },
    {
      number: "301",
      start: { x: 49, y: 34 },
      end: { x: 53, y: 39 },
      entry: { x: 49, y: 36 },
    },
    {
      number: "302",
      start: { x: 49, y: 31 },
      end: { x: 53, y: 32 },
      entry: { x: 49, y: 31 },
    },
    {
      number: "303",
      start: { x: 49, y: 20 },
      end: { x: 53, y: 30 },
      entry: { x: 49, y: 25 },
    },
    {
      number: "304",
      start: { x: 49, y: 17 },
      end: { x: 53, y: 18 },
      entry: { x: 49, y: 17 },
    },
    {
      number: "305",
      start: { x: 49, y: 12 },
      end: { x: 53, y: 16 },
      entry: { x: 49, y: 14 },
    },
    {
      number: "306",
      start: { x: 49, y: 7 },
      end: { x: 60, y: 8 },
      entry: { x: 49, y: 8 },
    },
    { number: "306a", start: { x: 48, y: 2 }, end: { x: 60, y: 6 } },
    {
      number: "307",
      start: { x: 43, y: 2 },
      end: { x: 46, y: 6 },
      entry: { x: 44, y: 6 },
    },
    {
      number: "310",
      start: { x: 40, y: 2 },
      end: { x: 41, y: 6 },
      entry: { x: 40, y: 6 },
    },
    {
      number: "311",
      start: { x: 34, y: 3 },
      end: { x: 38, y: 6 },
      entry: { x: 36, y: 6 },
    },
    {
      number: "313",
      start: { x: 31, y: 3 },
      end: { x: 32, y: 6 },
      entry: { x: 31, y: 6 },
    },
    {
      number: "314",
      start: { x: 29, y: 3 },
      end: { x: 30, y: 6 },
      entry: { x: 29, y: 6 },
    },
    {
      number: "315",
      start: { x: 24, y: 3 },
      end: { x: 27, y: 6 },
      entry: { x: 25, y: 6 },
    },
    {
      number: "316",
      start: { x: 16, y: 3 },
      end: { x: 22, y: 6 },
      entry: { x: 19, y: 6 },
    },
    {
      number: "317",
      start: { x: 13, y: 2 },
      end: { x: 14, y: 6 },
      entry: { x: 13, y: 6 },
    },
    {
      number: "318",
      start: { x: 10, y: 2 },
      end: { x: 11, y: 6 },
      entry: { x: 10, y: 6 },
    },
    {
      number: "319",
      start: { x: 7, y: 2 },
      end: { x: 8, y: 6 },
      entry: { x: 8, y: 6 },
    },
    {
      number: "320/3211/322",
      start: { x: 0, y: 2 },
      end: { x: 6, y: 10 },
      entry: { x: 6, y: 7 },
    },
    {
      number: "323",
      start: { x: 0, y: 12 },
      end: { x: 6, y: 13 },
      entry: { x: 6, y: 12 },
    },
    {
      number: "324",
      start: { x: 0, y: 15 },
      end: { x: 6, y: 16 },
      entry: { x: 6, y: 15 },
    },
    {
      number: "325",
      start: { x: 0, y: 18 },
      end: { x: 6, y: 19 },
      entry: { x: 6, y: 18 },
    },
    {
      number: "326",
      start: { x: 0, y: 20 },
      end: { x: 6, y: 21 },
      entry: { x: 6, y: 20 },
    },
    {
      number: "327",
      start: { x: 0, y: 23 },
      end: { x: 6, y: 24 },
      entry: { x: 6, y: 23 },
    },
    {
      number: "328",
      start: { x: 0, y: 25 },
      end: { x: 6, y: 26 },
      entry: { x: 6, y: 25 },
    },
    {
      number: "329a",
      start: { x: 0, y: 28 },
      end: { x: 6, y: 29 },
      entry: { x: 6, y: 28 },
    },
    {
      number: "329b",
      start: { x: 0, y: 30 },
      end: { x: 6, y: 31 },
      entry: { x: 6, y: 30 },
    },
    {
      number: "329c",
      start: { x: 0, y: 32 },
      end: { x: 6, y: 33 },
      entry: { x: 6, y: 32 },
    },
    {
      number: "330",
      start: { x: 0, y: 35 },
      end: { x: 6, y: 47 },
      entry: { x: 6, y: 41 },
    },
    {
      number: "332",
      start: { x: 11, y: 46 },
      end: { x: 15, y: 50 },
      entry: { x: 13, y: 46 },
    },
    {
      number: "333",
      start: { x: 17, y: 46 },
      end: { x: 27, y: 51 },
      entry: { x: 22, y: 46 },
    },
    {
      number: "335",
      start: { x: 29, y: 46 },
      end: { x: 38, y: 51 },
      entry: { x: 33, y: 46 },
    },
    {
      number: "337",
      start: { x: 40, y: 46 },
      end: { x: 44, y: 50 },
      entry: { x: 42, y: 46 },
    },
    {
      number: "339",
      start: { x: 42, y: 42 },
      end: { x: 45, y: 43 },
      entry: { x: 43, y: 43 },
    },
    {
      number: "340",
      start: { x: 37, y: 41 },
      end: { x: 40, y: 43 },
      entry: { x: 38, y: 43 },
    },
    {
      number: "341",
      start: { x: 33, y: 41 },
      end: { x: 35, y: 43 },
      entry: { x: 34, y: 43 },
    },
    {
      number: "342",
      start: { x: 29, y: 41 },
      end: { x: 31, y: 43 },
      entry: { x: 30, y: 43 },
    },
    {
      number: "343",
      start: { x: 24, y: 41 },
      end: { x: 27, y: 43 },
      entry: { x: 25, y: 43 },
    },
    {
      number: "344",
      start: { x: 20, y: 41 },
      end: { x: 22, y: 43 },
      entry: { x: 21, y: 43 },
    },
    {
      number: "345",
      start: { x: 15, y: 41 },
      end: { x: 18, y: 43 },
      entry: { x: 16, y: 43 },
    },
    {
      number: "346",
      start: { x: 10, y: 42 },
      end: { x: 13, y: 43 },
      entry: { x: 11, y: 43 },
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
      start: { x: 2, y: 49 },
      end: { x: 6, y: 51 },
      entry: { x: 6, y: 50 },
    },
    {
      start: { x: 49, y: 49 },
      end: { x: 53, y: 51 },
      entry: { x: 49, y: 50 },
    },
  ],
  paths: [
    { start: { x: 7, y: 9 }, end: { x: 9, y: 51 } },
    { start: { x: 7, y: 7 }, end: { x: 48, y: 9 } },
    { start: { x: 46, y: 7 }, end: { x: 48, y: 51 } },
    { start: { x: 10, y: 44 }, end: { x: 47, y: 45 } },
  ],
};
