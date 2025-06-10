import {
  Coordinate,
  Elevator,
  FloorData,
  PathSegment,
  RouteFinderProps,
  Stair,
  TransitPoint,
  allFloorData,
} from "@/styles/types";

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
}: RouteFinderProps) => {
  /**
   * Find all elevators and stairs entry points on a floor
   */
  const findEntryPoints = (
    floorData: FloorData,
    type: "elevator" | "stair"
  ): Coordinate[] => {
    if (type === "elevator") {
      return floorData.elevators.map((elevator: Elevator) => elevator.entry);
    } else {
      return floorData.stairs.map((stair: Stair) => stair.entry);
    }
  };

  // Basic coordinate check helper function
  const isWithinBounds = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < 60 && y < 60;

  const matchesPoint = (point: Coordinate, x: number, y: number): boolean =>
    point.x === x && point.y === y;

  /**
   * Check if a tile is a valid path tile or an entry point of any room type
   */
  const isValidPathTile = (
    floorData: FloorData,
    x: number,
    y: number,
    preferredBathroom?: string
  ): boolean => {
    if (!isWithinBounds(x, y)) return false;

    // Check all entry points in a single pass
    return (
      floorData.paths.some(
        (path) =>
          x >= Math.min(path.start.x, path.end.x) &&
          x <= Math.max(path.start.x, path.end.x) &&
          y >= Math.min(path.start.y, path.end.y) &&
          y <= Math.max(path.start.y, path.end.y)
      ) ||
      floorData.classrooms.some((room) =>
        Array.isArray(room.entry)
          ? room.entry.some((entry) => matchesPoint(entry, x, y))
          : room.entry && matchesPoint(room.entry, x, y)
      ) ||
      floorData.bathrooms.some(
        (bathroom) =>
          matchesPoint(bathroom.entry, x, y) &&
          (!preferredBathroom ||
            bathroom.type === preferredBathroom ||
            preferredBathroom === "Any")
      ) ||
      floorData.elevators.some((elevator) =>
        matchesPoint(elevator.entry, x, y)
      ) ||
      floorData.stairs.some((stair) => matchesPoint(stair.entry, x, y)) ||
      floorData.utilityRooms.some((room) => matchesPoint(room.entry, x, y))
    );
  };

  /**
   * Determine if a point is an elevator or stair entry
   */
  const isTransitEntry = (
    floorData: FloorData,
    x: number,
    y: number,
    type: "elevator" | "stair"
  ): boolean => {
    if (type === "elevator") {
      return floorData.elevators.some(
        (elevator) => elevator.entry.x === x && elevator.entry.y === y
      );
    } else {
      return floorData.stairs.some(
        (stair) => stair.entry.x === x && stair.entry.y === y
      );
    }
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

    return null;
  };

    /**
   * Find the nearest transit point for multi-floor navigation
   */
  const findNearestTransitPoint = (
    floorData: FloorData,
    startX: number,
    startY: number,
    targetFloor?: number
  ): TransitPoint | null | undefined => {
    const transitPoints: TransitPoint[] = [];
    const elevatorEntries = findEntryPoints(floorData, "elevator");
    elevatorEntries.forEach((entry) => {
      transitPoints.push({ coord: entry, isElevator: true });
    });

    if (!isWheelchair) {
      const stairEntries = findEntryPoints(floorData, "stair");
      stairEntries.forEach((entry) => {
        transitPoints.push({ coord: entry, isElevator: false });
      });
    }

    if (transitPoints.length === 0) return undefined;

    // If we have a target floor, find the matching transit point
    if (targetFloor !== undefined) {
      const targetFloorData = allFloorData[targetFloor - 1];
      if (targetFloorData) {
        // Find matching transit points between floors
        const targetTransitPoints = isWheelchair 
          ? findEntryPoints(targetFloorData, "elevator").map(entry => ({ coord: entry, isElevator: true }))
          : [...findEntryPoints(targetFloorData, "elevator").map(entry => ({ coord: entry, isElevator: true })),
            ...findEntryPoints(targetFloorData, "stair").map(entry => ({ coord: entry, isElevator: false }))];

        // Find the closest matching transit point pair
        let bestPair: { start: TransitPoint; end: TransitPoint } | null = null;
        let minDistance = Infinity;

        for (const startPoint of transitPoints) {
          for (const endPoint of targetTransitPoints) {
            if (startPoint.isElevator === endPoint.isElevator) {
              const startDist = Math.abs(startPoint.coord.x - startX) + Math.abs(startPoint.coord.y - startY);
              const endDist = Math.abs(endPoint.coord.x - startX) + Math.abs(endPoint.coord.y - startY);
              const totalDist = startDist + endDist;

              if (totalDist < minDistance) {
                minDistance = totalDist;
                bestPair = { start: startPoint, end: endPoint };
              }
            }
          }
        }

        return bestPair?.start || transitPoints[0];
      }
    }

    // If no target floor or no matching points found, use the original logic
    return transitPoints.reduce((nearest, current) => {
      const currentDist = Math.abs(current.coord.x - startX) + Math.abs(current.coord.y - startY);
      const nearestDist = nearest ? Math.abs(nearest.coord.x - startX) + Math.abs(nearest.coord.y - startY) : Infinity;

      const currentScore = current.isElevator ? currentDist * 1.2 : currentDist;
      const nearestScore = nearest?.isElevator ? nearestDist * 1.2 : nearestDist;

      return currentScore < nearestScore ? current : nearest;
    }, transitPoints[0]);
  };

  // Optimized directions including diagonals for more natural paths
  const directions: Coordinate[] = [
    { x: 0, y: -1 }, // up
    { x: 1, y: -1 }, // up-right
    { x: 1, y: 0 }, // right
    { x: 1, y: 1 }, // down-right
    { x: 0, y: 1 }, // down
    { x: -1, y: 1 }, // down-left
    { x: -1, y: 0 }, // left
    { x: -1, y: -1 }, // up-left
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
    const transitChecks = new Map<
      string,
      { isElevator: boolean; isStair: boolean }
    >();

    // Pre-check the start and end points for transit status
    const checkAndCacheTransit = (point: Coordinate) => {
      const key = `${point.x},${point.y}`;
      if (!transitChecks.has(key)) {
        transitChecks.set(key, {
          isElevator: isTransitEntry(floorData, point.x, point.y, "elevator"),
          isStair: isTransitEntry(floorData, point.x, point.y, "stair"),
        });
      }
    };

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

          // Cache transit checks for both points
          checkAndCacheTransit(start);
          checkAndCacheTransit(end);

          const startTransit = transitChecks.get(`${start.x},${start.y}`);
          const endTransit = transitChecks.get(`${end.x},${end.y}`);

          const isElevatorTransit =
            startTransit?.isElevator ||
            false ||
            endTransit?.isElevator ||
            false;
          const isStairTransit =
            startTransit?.isStair || false || endTransit?.isStair || false;

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

          // Precompute transit points once before the loop
          const transitChecks = new Map<
            string,
            { isElevator: boolean; isStair: boolean }
          >();

          // Check each point in the path for transit status
          finalPath.forEach((point) => {
            const key = `${point.x},${point.y}`;
            if (!transitChecks.has(key)) {
              transitChecks.set(key, {
                isElevator: isTransitEntry(
                  floorData,
                  point.x,
                  point.y,
                  "elevator"
                ),
                isStair: isTransitEntry(floorData, point.x, point.y, "stair"),
              });
            }
          });

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

            const startTransit = transitChecks.get(`${start.x},${start.y}`);
            const endTransit = transitChecks.get(`${end.x},${end.y}`);

            const isElevatorTransit =
              startTransit?.isElevator ||
              false ||
              endTransit?.isElevator ||
              false;
            const isStairTransit =
              startTransit?.isStair || false || endTransit?.isStair || false;

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
          validStartCoord.y,
          endLocation.floor
        )
      : null;

    if (!startFloorTransit) {
      onError("Cannot find a way to transition between floors");
      return null;
    }

    // Find corresponding transit point on end floor
    let endFloorTransit: TransitPoint | null = null;

    if (startFloorTransit.isElevator) {
      // If using elevator, find the matching elevator on destination floor
      const elevators = endFloorData ? findEntryPoints(endFloorData, "elevator") : [];
      if (elevators.length > 0) {
        // Find the elevator that matches the position of the start floor elevator
        const matchingElevator = elevators.find(e => 
          Math.abs(e.x - startFloorTransit.coord.x) < 2 && 
          Math.abs(e.y - startFloorTransit.coord.y) < 2
        );
        const defaultElevator = elevators[0];
        if (defaultElevator) {
          endFloorTransit = {
            coord: matchingElevator || { x: defaultElevator.x, y: defaultElevator.y },
            isElevator: true,
          };
        }
      }
    } else {
      // If using stairs, find the matching stair on destination floor
      const stairs = endFloorData ? findEntryPoints(endFloorData, "stair") : [];
      if (stairs.length > 0) {
        // Find the stair that matches the position of the start floor stair
        const matchingStair = stairs.find(s => 
          Math.abs(s.x - startFloorTransit.coord.x) < 2 && 
          Math.abs(s.y - startFloorTransit.coord.y) < 2
        );
        const defaultStair = stairs[0];
        if (defaultStair) {
          endFloorTransit = {
            coord: matchingStair || { x: defaultStair.x, y: defaultStair.y },
            isElevator: false,
          };
        }
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

    onPathFound(fullPath);
    return null;
  }
};

interface QueueItem {
  point: Coordinate;
  path: Coordinate[];
}

// Basic coordinate check helper function
const isWithinBounds = (x: number, y: number): boolean =>
  x >= 0 && y >= 0 && x < 60 && y < 60;

const matchesPoint = (point: Coordinate, x: number, y: number): boolean =>
  point.x === x && point.y === y;

// Path tile validation including all entry point checks
const isValidPathTile = (
  floorData: FloorData,
  x: number,
  y: number,
  preferredBathroom?: string
): boolean => {
  if (!isWithinBounds(x, y)) return false;

  // Check all entry points in a single pass
  return (
    floorData.paths.some(
      (path) =>
        x >= Math.min(path.start.x, path.end.x) &&
        x <= Math.max(path.start.x, path.end.x) &&
        y >= Math.min(path.start.y, path.end.y) &&
        y <= Math.max(path.start.y, path.end.y)
    ) ||
    floorData.classrooms.some((room) =>
      Array.isArray(room.entry)
        ? room.entry.some((entry) => matchesPoint(entry, x, y))
        : room.entry && matchesPoint(room.entry, x, y)
    ) ||
    floorData.bathrooms.some(
      (bathroom) =>
        matchesPoint(bathroom.entry, x, y) &&
        (!preferredBathroom ||
          bathroom.type === preferredBathroom ||
          preferredBathroom === "Any")
    ) ||
    floorData.elevators.some((elevator) =>
      matchesPoint(elevator.entry, x, y)
    ) ||
    floorData.stairs.some((stair) => matchesPoint(stair.entry, x, y)) ||
    floorData.utilityRooms.some((room) => matchesPoint(room.entry, x, y))
  );
};

export const findPath = (
  start: Coordinate,
  end: Coordinate,
  floorData: FloorData,
  preferredBathroom?: string
): Coordinate[] | null => {
  // Early validation
  if (!isWithinBounds(start.x, start.y) || !isWithinBounds(end.x, end.y)) {
    return null;
  }

  const visited = new Set<string>();
  const queue: QueueItem[] = [{ point: start, path: [start] }];
  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const { point, path } = queue.shift()!;
    const key = `${point.x},${point.y}`;

    if (matchesPoint(point, end.x, end.y)) {
      return path;
    }

    if (visited.has(key)) continue;
    visited.add(key);

    // Check all four directions
    for (const [dx, dy] of directions) {
      const newX = point.x + dx;
      const newY = point.y + dy;

      if (isValidPathTile(floorData, newX, newY, preferredBathroom)) {
        const newPoint = { x: newX, y: newY };
        queue.push({
          point: newPoint,
          path: [...path, newPoint],
        });
      }
    }
  }

  return null;
};
