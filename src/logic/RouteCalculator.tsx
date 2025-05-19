import {
  allFloorData,
  Coordinate,
  Elevator,
  FloorData,
  PathSegment,
  RouteFinderProps,
  Stair,
  TransitPoint,
} from "../types/types";

/**
 * Core PathFinder function that calculates paths between locations.
 * Enhanced to handle wheelchair accessibility and multi-floor navigation.
 */
export const RouteNavigator = ({
  startLocation,
  endLocation,
  isWheelchair,
  onPathFound,
  onError,
  preferredBathroom,
}: RouteFinderProps): null => {
  /**
   * Find all elevator entry points on a floor
   */
  const findElevatorEntryPoints = (floorData: FloorData): Coordinate[] => {
    return floorData.elevators.map((elevator: Elevator) => {
      if (elevator.entry) {
        return elevator.entry;
      }

      // Use center point as fallback
      const centerX = Math.floor((elevator.start.x + elevator.end.x) / 2);
      const centerY = Math.floor((elevator.start.y + elevator.end.y) / 2);
      return { x: centerX, y: centerY };
    });
  };

  /**
   * Find all stair entry points on a floor
   */
  const findStairEntryPoints = (floorData: FloorData): Coordinate[] => {
    return floorData.stairs.map((stair: Stair) => {
      // Use center point for stairs
      const centerX = Math.floor((stair.start.x + stair.end.x) / 2);
      const centerY = Math.floor((stair.start.y + stair.end.y) / 2);
      return { x: centerX, y: centerY };
    });
  };

  /**
   * Check if a tile is a valid path tile or an entry point of any room type
   */
  const isValidPathTile = (
    floorData: FloorData,
    x: number,
    y: number
  ): boolean => {
    // Check grid bounds
    if (x < 0 || y < 0 || x >= 60 || y >= 60) return false;

    // Check if the coordinate falls within any path rectangle
    const isOnPath = floorData.paths.some(
      (path) =>
        x >= Math.min(path.start.x, path.end.x) &&
        x <= Math.max(path.start.x, path.end.x) &&
        y >= Math.min(path.start.y, path.end.y) &&
        y <= Math.max(path.start.y, path.end.y)
    );

    if (isOnPath) return true;

    // Check if it's an entry point to a classroom
    const isClassroomEntry = floorData.classrooms.some((room) => {
      if (Array.isArray(room.entry)) {
        return room.entry.some((entry) => entry.x === x && entry.y === y);
      }
      return room.entry && room.entry.x === x && room.entry.y === y;
    });

    if (isClassroomEntry) return true;

    // Use the preferredBathroom prop directly
    const userPreferredBathroom = preferredBathroom;

    /**
     * Check if it's an entry point to a bathroom that matches user preferences
     */
    const isBathroomEntry = (
      currentFloorData: FloorData,
      currentX: number,
      currentY: number
    ): boolean => {
      // Check if the coordinates match any bathroom entry
      const bathroomAtLocation = currentFloorData.bathrooms.find(
        (b) => b.entry && b.entry.x === currentX && b.entry.y === currentY
      );

      if (!bathroomAtLocation) {
        return false; // Not a bathroom entry
      }

      // If preference is Male or Female, check type
      if (
        userPreferredBathroom === "Male" ||
        userPreferredBathroom === "Female"
      ) {
        return bathroomAtLocation.type === userPreferredBathroom;
      }

      // For "Any", "Neutral", or undefined preference, any bathroom entry is valid.
      // The pathfinding algorithm (BFS) will find the nearest among these.
      return true;
    };

    if (isBathroomEntry(floorData, x, y)) return true;

    // Check if it's an entry point to an elevator
    const isElevatorEntry = floorData.elevators.some(
      (elevator) =>
        elevator.entry && elevator.entry.x === x && elevator.entry.y === y
    );

    if (isElevatorEntry) return true;

    // Check stair entry points (center of stairs)
    const isStairEntry = floorData.stairs.some((stair) => {
      const centerX = Math.floor((stair.start.x + stair.end.x) / 2);
      const centerY = Math.floor((stair.start.y + stair.end.y) / 2);
      return x === centerX && y === centerY;
    });

    if (isStairEntry) return true;

    // Check utility room entry points
    const isUtilityRoomEntry = floorData.utilityRooms.some((utilityRoom) => {
      const centerX = Math.floor((utilityRoom.start.x + utilityRoom.end.x) / 2);
      const centerY = Math.floor((utilityRoom.start.y + utilityRoom.end.y) / 2);
      return x === centerX && y === centerY;
    });

    return isUtilityRoomEntry;
  };

  /**
   * Determine if a point is an elevator entry
   */
  const isElevatorEntry = (
    floorData: FloorData,
    x: number,
    y: number
  ): boolean => {
    return floorData.elevators.some((elevator) => {
      if (elevator.entry && elevator.entry.x === x && elevator.entry.y === y) {
        return true;
      }

      // Check center point as fallback
      const centerX = Math.floor((elevator.start.x + elevator.end.x) / 2);
      const centerY = Math.floor((elevator.start.y + elevator.end.y) / 2);
      return x === centerX && y === centerY;
    });
  };

  /**
   * Determine if a point is a stair entry
   */
  const isStairEntry = (
    floorData: FloorData,
    x: number,
    y: number
  ): boolean => {
    return floorData.stairs.some((stair) => {
      const centerX = Math.floor((stair.start.x + stair.end.x) / 2);
      const centerY = Math.floor((stair.start.y + stair.end.y) / 2);
      return x === centerX && y === centerY;
    });
  };

  /**
   * Find the nearest valid path tile if the current position is not on a path
   */
  const findNearestPathTile = (
    floorData: FloorData,
    x: number,
    y: number
  ): Coordinate | null => {
    // If the current position is already a valid path tile, return it
    if (isValidPathTile(floorData, x, y)) {
      return { x, y };
    }

    // Search for nearby valid path tiles in increasing radius
    for (let radius = 1; radius <= 5; radius++) {
      // Check points in a square pattern around the given position
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          // Only check points on the perimeter of the square
          if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
            const newX = x + dx;
            const newY = y + dy;

            if (isValidPathTile(floorData, newX, newY)) {
              return { x: newX, y: newY };
            }
          }
        }
      }
    }

    return null; // No valid path tile found nearby
  };

  /**
   * Calculate Euclidean distance between two points
   */
  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  /**
   * Find the nearest stair or elevator entry point depending on wheelchair mode
   */
  const findNearestTransitPoint = (
    floorData: FloorData,
    startX: number,
    startY: number
  ): TransitPoint | null | undefined => {
    const transitPoints: TransitPoint[] = [];

    if (isWheelchair) {
      // For wheelchair users, ONLY use elevators
      const elevatorEntries = findElevatorEntryPoints(floorData);
      elevatorEntries.forEach((entry) => {
        transitPoints.push({ coord: entry, isElevator: true });
      });
    } else {
      // For non-wheelchair users, ONLY use stairs
      const stairEntries = findStairEntryPoints(floorData);
      stairEntries.forEach((entry) => {
        transitPoints.push({ coord: entry, isElevator: false });
      });
    }

    if (transitPoints.length === 0) {
      return undefined;
    }

    // Find the nearest transit point using reduce
    return transitPoints.length > 0
      ? transitPoints.reduce((nearest, current) => {
          const currentDistance = calculateDistance(
            startX,
            startY,
            current.coord.x,
            current.coord.y
          );
          const nearestDistance = nearest
            ? calculateDistance(
                startX,
                startY,
                nearest.coord.x,
                nearest.coord.y
              )
            : Infinity;

          return currentDistance < nearestDistance ? current : nearest;
        }, transitPoints[0] || null)
      : undefined;
  };

  // Directions for BFS: up, right, down, left
  const directions: Coordinate[] = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 }, // right
    { x: 0, y: 1 }, // down
    { x: -1, y: 0 }, // left
  ];

  // Input validation
  if (!startLocation || !endLocation) {
    onError("Please select both start and end locations");
    return null;
  }

  /**
   * Find path between points on the same floor
   */
  const findPathBetweenPoints = (
    floorData: FloorData,
    startCoord: Coordinate,
    validStartCoord: Coordinate | null,
    endCoord: Coordinate,
    floor: number
  ): PathSegment[] | null => {
    // Safety check
    if (!validStartCoord) {
      return null;
    }

    const queue: Array<{ x: number; y: number; path: Coordinate[] }> = [];

    // Start path
    const initialPath: Coordinate[] =
      startCoord.x === validStartCoord.x && startCoord.y === validStartCoord.y
        ? [startCoord]
        : [startCoord, validStartCoord];

    queue.push({
      x: validStartCoord.x,
      y: validStartCoord.y,
      path: initialPath,
    });

    const visited = new Set<string>();
    visited.add(`${validStartCoord.x},${validStartCoord.y}`);

    // BFS Loop
    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;

      // Check if we've reached the destination
      if (x === endCoord.x && y === endCoord.y) {
        // Convert path coordinates to segments
        return path.slice(0, -1).map((start, i) => {
          const end = path[i + 1] as Coordinate;
          const isElevatorTransit =
            isElevatorEntry(floorData, start.x, start.y) ||
            isElevatorEntry(floorData, end.x, end.y);
          const isStairTransit =
            isStairEntry(floorData, start.x, start.y) ||
            isStairEntry(floorData, end.x, end.y);

          return {
            start,
            end,
            floor,
            isTransitPoint: isElevatorTransit || isStairTransit,
            transitType: isElevatorTransit
              ? "elevator"
              : isStairTransit
              ? "stairs"
              : undefined,
          };
        });
      }

      // Explore all four directions
      for (const dir of directions) {
        const newX = x + dir.x;
        const newY = y + dir.y;
        const key = `${newX},${newY}`;

        // Only move to unvisited valid path tiles
        if (!visited.has(key) && isValidPathTile(floorData, newX, newY)) {
          visited.add(key);
          const newPath = [...path, { x: newX, y: newY }];
          queue.push({ x: newX, y: newY, path: newPath });
        }
      }
    }

    // No path found
    return null;
  };

  // Check if start and end are on the same floor
  if (startLocation.floor === endLocation.floor) {
    // Same floor path finding
    const floor = startLocation.floor;
    const floorIndex = floor - 1;

    if (floorIndex < 0 || floorIndex >= allFloorData.length) {
      onError(`Invalid floor number: ${floor}`);
      return null;
    }

    const floorData = allFloorData[floorIndex];

    if (!floorData) {
      onError(`Floor data not found for floor: ${floor}`);
      return null;
    }

    // Get coordinates from the locations
    const startCoord = startLocation.location;
    const endCoord = endLocation.location;

    // Find valid path tiles near start and end points
    const validStartCoord = findNearestPathTile(
      floorData,
      startCoord.x,
      startCoord.y
    );
    const validEndCoord = findNearestPathTile(
      floorData,
      endCoord.x,
      endCoord.y
    );

    if (!validStartCoord) {
      onError(`Cannot find a valid path near the start location`);
      return null;
    }

    if (!validEndCoord) {
      onError(`Cannot find a valid path near the end location`);
      return null;
    }

    // Breadth-First Search implementation for path finding on same floor
    const findPathBFS = (): PathSegment[] | null => {
      const queue: Array<{ x: number; y: number; path: Coordinate[] }> = [];

      // Start path with original start coordinate followed by nearest valid path tile if different
      const initialPath: Coordinate[] =
        startCoord.x === validStartCoord.x && startCoord.y === validStartCoord.y
          ? [startCoord]
          : [startCoord, validStartCoord];

      queue.push({
        x: validStartCoord.x,
        y: validStartCoord.y,
        path: initialPath,
      });

      const visited = new Set<string>();
      visited.add(`${validStartCoord.x},${validStartCoord.y}`);

      // BFS Loop
      while (queue.length > 0) {
        const { x, y, path } = queue.shift()!;

        // Check if we've reached the destination
        if (x === validEndCoord.x && y === validEndCoord.y) {
          // Complete path by adding end coordinate if needed
          const finalPath: Coordinate[] =
            validEndCoord.x === endCoord.x && validEndCoord.y === endCoord.y
              ? path
              : [...path, endCoord];

          // Convert path coordinates to segments
          const segments: PathSegment[] = [];

          for (let i = 0; i < finalPath.length - 1; i++) {
            const start = finalPath[i];
            const end = finalPath[i + 1];

            if (!start || !end) {
              console.warn(
                "Skipping segment due to undefined start or end point."
              );
              continue;
            }

            const isElevatorTransit =
              isElevatorEntry(floorData, start.x, start.y) ||
              isElevatorEntry(floorData, end.x, end.y);
            const isStairTransit =
              isStairEntry(floorData, start.x, start.y) ||
              isStairEntry(floorData, end.x, end.y);

            segments.push({
              start,
              end,
              floor,
              isTransitPoint: isElevatorTransit || isStairTransit,
              transitType: isElevatorTransit
                ? "elevator"
                : isStairTransit
                ? "stairs"
                : undefined,
            });
          }

          console.log("Path found with segments:", segments.length);
          return segments;
        }

        // Explore all four directions
        for (const dir of directions) {
          const newX = x + dir.x;
          const newY = y + dir.y;
          const key = `${newX},${newY}`;

          // Only move to unvisited valid path tiles
          if (!visited.has(key) && isValidPathTile(floorData, newX, newY)) {
            visited.add(key);
            const newPath = [...path, { x: newX, y: newY }];
            queue.push({ x: newX, y: newY, path: newPath });
          }
        }
      }

      // No path found
      return null;
    };

    // Execute the BFS and return the result for same floor
    const pathResult = findPathBFS();

    if (pathResult) {
      onPathFound(pathResult);
    } else {
      onError("No valid path found between the selected locations");
    }

    return null;
  } else {
    // Multi-floor path finding
    const startFloorIndex = startLocation.floor - 1;
    const endFloorIndex = endLocation.floor - 1;

    if (
      startFloorIndex < 0 ||
      startFloorIndex >= allFloorData.length ||
      endFloorIndex < 0 ||
      endFloorIndex >= allFloorData.length
    ) {
      onError(`Invalid floor number`);
      return null;
    }

    const startFloorData = allFloorData[startFloorIndex];
    const endFloorData = allFloorData[endFloorIndex];

    // Get coordinates
    const startCoord = startLocation.location;
    const endCoord = endLocation.location;

    // Find valid path tiles
    const validStartCoord = startFloorData
      ? findNearestPathTile(startFloorData, startCoord.x, startCoord.y)
      : null;
    const validEndCoord = endFloorData
      ? findNearestPathTile(endFloorData, endCoord.x, endCoord.y)
      : null;

    if (!validStartCoord || !validEndCoord) {
      onError("Cannot find valid path tiles near the selected locations");
      return null;
    }

    // Find nearest transit point on start floor (elevator or stairs)
    const startFloorTransit = startFloorData
      ? findNearestTransitPoint(
          startFloorData,
          validStartCoord.x,
          validStartCoord.y
        )
      : null;

    if (!startFloorTransit) {
      onError("Cannot find a way to transition between floors");
      return null;
    }

    // Find corresponding transit point on end floor
    let endFloorTransit: TransitPoint | null = null;

    if (startFloorTransit.isElevator) {
      // If using elevator, find the nearest elevator on destination floor
      const elevators = endFloorData
        ? findElevatorEntryPoints(endFloorData)
        : [];

      if (elevators.length > 0) {
        // Find nearest elevator to end point
        endFloorTransit = {
          coord: elevators.reduce((nearest, current) => {
            const distCurrent = calculateDistance(
              validEndCoord.x,
              validEndCoord.y,
              current.x,
              current.y
            );
            const distNearest = calculateDistance(
              validEndCoord.x,
              validEndCoord.y,
              nearest.x,
              nearest.y
            );
            return distCurrent < distNearest ? current : nearest;
          }, elevators[0] || { x: 0, y: 0 }),
          isElevator: true,
        };
      }
    } else {
      // If using stairs, find the nearest stair on destination floor
      const stairs = endFloorData ? findStairEntryPoints(endFloorData) : [];

      if (stairs.length > 0) {
        // Find nearest stair to end point
        endFloorTransit = {
          coord: stairs.reduce((nearest, current) => {
            const distCurrent = calculateDistance(
              validEndCoord.x,
              validEndCoord.y,
              current.x,
              current.y
            );
            const distNearest = calculateDistance(
              validEndCoord.x,
              validEndCoord.y,
              nearest.x,
              nearest.y
            );
            return distCurrent < distNearest ? current : nearest;
          }, stairs[0] || { x: 0, y: 0 }),
          isElevator: false,
        };
      }
    }

    if (!endFloorTransit) {
      onError("Cannot find a matching transit point on the destination floor");
      return null;
    }

    // Find path from start location to start floor transit point
    const startFloorPath = startFloorData
      ? findPathBetweenPoints(
          startFloorData,
          startCoord,
          validStartCoord,
          startFloorTransit.coord,
          startLocation.floor
        )
      : null;

    // Find path from end floor transit point to end location
    let endFloorPath: PathSegment[] | null = null;
    if (endFloorData) {
      endFloorPath = findPathBetweenPoints(
        endFloorData,
        endFloorTransit.coord,
        findNearestPathTile(
          endFloorData,
          endFloorTransit.coord.x,
          endFloorTransit.coord.y
        ),
        endCoord,
        endLocation.floor
      );
    }

    if (!startFloorPath || !endFloorPath) {
      onError("Cannot find a complete path between floors");
      return null;
    }

    // Create the connection segment between floors
    const transitSegment: PathSegment = {
      start: startFloorTransit.coord,
      end: endFloorTransit.coord,
      floor: startFloorTransit.isElevator ? -1 : -2, // Special code to indicate vertical movement
      isTransitPoint: true,
      transitType: startFloorTransit.isElevator ? "elevator" : "stairs",
    };

    // Combine all path segments
    const fullPath = [...startFloorPath, transitSegment, ...endFloorPath];

    console.log("Multi-floor path found with segments:", fullPath.length);
    onPathFound(fullPath);
    return null;
  }
};
