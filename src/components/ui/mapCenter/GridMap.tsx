import * as types from "@/types/types";
import { getSettings } from "@/utils/accessibilityStyles";
import React, { useState } from "react";
import type { CellType } from "../../../data/tileData";
import { tileData } from "../../../data/tileData";

/**
 * GridMap component renders a visual representation of a floor map with various room types.
 *
 * This component takes floor data and renders a grid-based visualization showing classrooms,
 * bathrooms, elevators, utility rooms, stairs, fire equipment, and paths. It handles:
 * - Generating an interactive grid with proper borders between different space types
 * - Displaying tooltips on hover with cell coordinates and labels
 * - Highlighting a specific location if provided
 * - Validating floor data and showing appropriate error messages
 * - Dynamic resizing based on user settings
 * - Displaying path segments between start and end locations
 *
 * @component
 * @param {Object} props - Component properties
 * @param {boolean} props.showGrid - Whether to display grid lines
 * @param {number} props.currentFloor - The floor number to display (1-based index)
 * @param {types.HighlightedLocation} [props.startLocation] - Optional starting location to highlight on the map
 * @param {Object} [props.settings] - Optional display settings including font size preferences
 * @param {PathSegment[]} [props.pathSegments] - Optional array of path segments to display
 *
 * @returns {React.ReactElement} The rendered floor grid component
 */
export const GridMap: React.FC<types.PathSegmentsProps> = ({
  showGrid,
  currentFloor,
  endLocation: highlightedCell,
  startLocation,
  settings,
  pathSegments = [],
}) => {
  const gridSize = 60;
  const [hoveredCell, setHoveredCell] =
    useState<types.HighlightedCellDetails | null>(null);

  // Get specifically the font size class for elements that need independent scaling
  const fontSizeClass = settings
    ? getSettings(settings as types.AccessibilitySettings)
    : "";

  // Validate currentFloor and get floor data
  const floorIndex = currentFloor - 1;

  if (floorIndex < 0 || floorIndex >= types.allFloorData.length) {
    console.error(
      `Invalid floor number: ${currentFloor}. Available floors: 1-${types.allFloorData.length}`
    );
    return (
      <div className="p-4 text-red-500">
        Invalid floor number. Please select a floor between 1 and{" "}
        {types.allFloorData.length}.
      </div>
    );
  }

  // We've validated the index, so the floor data must exist
  const currentFloorData = types.allFloorData[floorIndex]!;

  // Create initial grid with empty cells
  const initialGrid: CellType[][] = Array.from({ length: gridSize }, (_, row) =>
    Array.from({ length: gridSize }, (_, col) => ({
      row,
      col,
      type: "empty",
      color: "#ffffff",
      label: "",
    }))
  );

  // Safe method to update grid cells
  const updateGridCell = (
    grid: CellType[][],
    row: number,
    col: number,
    cell: CellType
  ): CellType[][] => {
    const newGrid = grid.map((row) => [...row]);
    const targetRow = newGrid[row];
    if (
      row >= 0 &&
      row < newGrid.length &&
      col >= 0 &&
      targetRow &&
      col < targetRow.length
    ) {
      targetRow[col] = { ...cell };
    }
    return newGrid;
  };

  // Add classroom entries (supporting both single entry and array of entries)
  const gridWithClassrooms = currentFloorData.classrooms.reduce(
    (grid: CellType[][], classroom: types.Room) => {
      let updatedGrid = grid;

      // Fill classroom area
      for (
        let row = Math.min(classroom.start.y, classroom.end.y);
        row <= Math.max(classroom.start.y, classroom.end.y);
        row++
      ) {
        for (
          let col = Math.min(classroom.start.x, classroom.end.x);
          col <= Math.max(classroom.start.x, classroom.end.x);
          col++
        ) {
          updatedGrid = updateGridCell(updatedGrid, row, col, {
            row,
            col,
            type: "classroom",
            color: tileData.classroom.color,
            label: classroom.number,
          });
        }
      }

      // Skip adding entry points if no entry is defined
      if (!classroom.entry) {
        return updatedGrid;
      }

      // Handle entry points based on type
      if (Array.isArray(classroom.entry)) {
        // Handle multiple entries
        classroom.entry.forEach((entry, index) => {
          updatedGrid = updateGridCell(updatedGrid, entry.y, entry.x, {
            row: entry.y,
            col: entry.x,
            type: "entry",
            color: tileData.classroomEntry.color,
            label: `${classroom.number}-E${index + 1}`,
          });
        });
      } else {
        // Handle single entry
        updatedGrid = updateGridCell(
          updatedGrid,
          classroom.entry.y,
          classroom.entry.x,
          {
            row: classroom.entry.y,
            col: classroom.entry.x,
            type: "entry",
            color: tileData.classroomEntry.color,
            label: `${classroom.number}-E`,
          }
        );
      }

      return updatedGrid;
    },
    initialGrid
  );

  // Add bathroom entries with darker color
  const gridWithBathrooms = currentFloorData.bathrooms.reduce(
    (grid: CellType[][], bathroom: types.Bathroom) => {
      let updatedGrid = grid;

      // Fill bathroom area with regular bathroom color
      for (
        let row = Math.min(bathroom.start.y, bathroom.end.y);
        row <= Math.max(bathroom.start.y, bathroom.end.y);
        row++
      ) {
        for (
          let col = Math.min(bathroom.start.x, bathroom.end.x);
          col <= Math.max(bathroom.start.x, bathroom.end.x);
          col++
        ) {
          updatedGrid = updateGridCell(updatedGrid, row, col, {
            row,
            col,
            type: "bathroom",
            color: tileData.bathroom.color,
            label: `${bathroom.type} Bathroom`,
          });
        }
      }

      // If there's an entry point, use the darker bathroomEntry color
      if (bathroom.entry) {
        updatedGrid = updateGridCell(
          updatedGrid,
          bathroom.entry.y,
          bathroom.entry.x,
          {
            row: bathroom.entry.y,
            col: bathroom.entry.x,
            type: "bathroomEntry",
            color: tileData.bathroomEntry.color,
            label: `${bathroom.type} Bathroom Entry`,
          }
        );
      }

      return updatedGrid;
    },
    gridWithClassrooms
  );

  // Add elevators with darker color for entry
  const gridWithElevators = currentFloorData.elevators.reduce(
    (grid: CellType[][], elevator: types.Elevator) => {
      let updatedGrid = grid;

      // Fill elevator area with regular elevator color
      for (
        let row = Math.min(elevator.start.y, elevator.end.y);
        row <= Math.max(elevator.start.y, elevator.end.y);
        row++
      ) {
        for (
          let col = Math.min(elevator.start.x, elevator.end.x);
          col <= Math.max(elevator.start.x, elevator.end.x);
          col++
        ) {
          updatedGrid = updateGridCell(updatedGrid, row, col, {
            row,
            col,
            type: "elevator",
            color: tileData.elevator.color,
            label: "Elevator",
          });
        }
      }

      // If there's an entry point, use the darker elevatorEntry color
      if (elevator.entry) {
        updatedGrid = updateGridCell(
          updatedGrid,
          elevator.entry.y,
          elevator.entry.x,
          {
            row: elevator.entry.y,
            col: elevator.entry.x,
            type: "elevatorEntry",
            color: tileData.elevatorEntry.color,
            label: "Elevator Entry",
          }
        );
      }

      return updatedGrid;
    },
    gridWithBathrooms
  );

  // Add utility rooms with darker color for entry
  const gridWithUtility = currentFloorData.utilityRooms.reduce(
    (grid: CellType[][], room: types.UtilityRoom) => {
      let updatedGrid = grid;

      // Fill utility room area with regular color
      for (
        let row = Math.min(room.start.y, room.end.y);
        row <= Math.max(room.start.y, room.end.y);
        row++
      ) {
        for (
          let col = Math.min(room.start.x, room.end.x);
          col <= Math.max(room.start.x, room.end.x);
          col++
        ) {
          updatedGrid = updateGridCell(updatedGrid, row, col, {
            row,
            col,
            type: "utility",
            color: tileData.utilityRoom.color,
            label: room.name,
          });
        }
      }

      // Add a centered entry point with darker color if not explicitly defined
      // Add entry point with darker color if defined, otherwise use the center
      updatedGrid = updateGridCell(updatedGrid, room.entry.y, room.entry.x, {
        row: room.entry.y,
        col: room.entry.x,
        type: "utilityEntry",
        color: tileData.utilityEntry.color,
        label: `${room.name} Entry`,
      });

      return updatedGrid;
    },
    gridWithElevators
  );

  // Add stairs with darker color for entry points
  const gridWithStairs = currentFloorData.stairs.reduce(
    (grid: CellType[][], stair: types.Stair) => {
      let updatedGrid = grid;

      // Fill stair area with regular stairs color
      for (
        let row = Math.min(stair.start.y, stair.end.y);
        row <= Math.max(stair.start.y, stair.end.y);
        row++
      ) {
        for (
          let col = Math.min(stair.start.x, stair.end.x);
          col <= Math.max(stair.start.x, stair.end.x);
          col++
        ) {
          updatedGrid = updateGridCell(updatedGrid, row, col, {
            row,
            col,
            type: "stairs",
            color: tileData.stairs.color,
            label: "Stairs",
          });
        }
      }

      // Add a centered entry point with darker color
      // Add entry point with darker color if defined, otherwise use the center
      updatedGrid = updateGridCell(updatedGrid, stair.entry.y, stair.entry.x, {
        row: stair.entry.y,
        col: stair.entry.x,
        type: "stairsEntry",
        color: tileData.stairsEntry.color,
        label: "Stairs Entry",
      });

      return updatedGrid;
    },
    gridWithUtility
  );

  // Add fire equipment
  const gridWithFire = currentFloorData.fireEquipment.reduce(
    (grid: CellType[][], equipment: types.FireEquipment) => {
      return updateGridCell(grid, equipment.location.y, equipment.location.x, {
        row: equipment.location.y,
        col: equipment.location.x,
        type: "fireEquipment",
        color: tileData.fireEquipment.color,
        label: "Fire Equipment",
      });
    },
    gridWithStairs
  );

  // Add exits (emergency exits, etc.)
  const gridWithExits = (currentFloorData.exits || []).reduce(
    (grid: CellType[][], exit: types.Exit) => {
      return updateGridCell(grid, exit.coordinates.y, exit.coordinates.x, {
        row: exit.coordinates.y,
        col: exit.coordinates.x,
        type: "exit",
        color: "#00FF00", // Main: dark green, Standard: lighter dark green
        label:
          exit.description || (exit.type === "main" ? "Main Exit" : "Exit"),
      });
    },
    gridWithFire
  );

  // Add paths last to not override other elements
  const gridWithBasicPaths = currentFloorData.paths.reduce(
    (grid: CellType[][], path: types.Path) => {
      let updatedGrid = grid;

      for (
        let row = Math.min(path.start.y, path.end.y);
        row <= Math.max(path.start.y, path.end.y);
        row++
      ) {
        for (
          let col = Math.min(path.start.x, path.end.x);
          col <= Math.max(path.start.x, path.end.x);
          col++
        ) {
          const currentCell = updatedGrid[row]?.[col];
          if (currentCell && currentCell.type === "empty") {
            updatedGrid = updateGridCell(updatedGrid, row, col, {
              row,
              col,
              type: "path",
              color: tileData.path.color,
              label: "path",
            });
          }
        }
      }

      return updatedGrid;
    },
    gridWithExits
  );

  // Add the calculated path segments in purple
  const finalGrid = pathSegments.reduce(
    (grid: CellType[][], segment: types.PathSegment) => {
      // Only process path segments for the current floor
      if (segment.floor !== currentFloor) {
        return grid;
      }

      let updatedGrid = grid;
      const start = segment.start;
      const end = segment.end;

      // Determine the range of cells to color for this segment
      const minRow = Math.min(start.y, end.y);
      const maxRow = Math.max(start.y, end.y);
      const minCol = Math.min(start.x, end.x);
      const maxCol = Math.max(start.x, end.x);

      // Color all cells in the path segment purple
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const currentCell = updatedGrid[row]?.[col];
          // Only update path cells
          if (
            currentCell &&
            (currentCell.type === "path" || currentCell.type === "entry")
          ) {
            updatedGrid = updateGridCell(updatedGrid, row, col, {
              ...currentCell,
              type: "calculated-path",
              color: "#800080", // Purple color for the path
              label: currentCell.label,
            });
          }
        }
      }

      return updatedGrid;
    },
    gridWithBasicPaths
  );

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between"
      aria-label="Floor grid container"
      aria-describedby="floor-grid-desc"
    >
      {/* Description for screen readers */}
      <div id="floor-grid-desc" className="sr-only">
        This grid visually represents the current floor layout, including rooms,
        paths, and accessibility features. Use the map to explore or select
        locations.
      </div>
      <div className="p-12 relative">
        <div
          className={`inline-block ${
            showGrid ? "border-2 border-gray-400" : "border border-gray-200"
          } bg-white relative`}
        >
          <div
            className="grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gap: "0px",
              backgroundColor: "transparent",
            }}
          >
            {finalGrid.map((row: CellType[], rowIndex: number) =>
              row.map((cell: CellType, colIndex: number) => {
                // Check if the cell needs a border by checking adjacent cells
                const topCell = finalGrid[rowIndex - 1]?.[colIndex];
                const bottomCell = finalGrid[rowIndex + 1]?.[colIndex];
                const leftCell = finalGrid[rowIndex]?.[colIndex - 1];
                const rightCell = finalGrid[rowIndex]?.[colIndex + 1];

                // Add borders between different types OR between cells of the same type but different labels (e.g., different classrooms)
                const needsTopBorder =
                  rowIndex > 0 &&
                  topCell &&
                  (topCell.type !== cell.type ||
                    (topCell.type === "classroom" &&
                      cell.type === "classroom" &&
                      topCell.label !== cell.label));
                const needsBottomBorder =
                  rowIndex < gridSize - 1 &&
                  bottomCell &&
                  (bottomCell.type !== cell.type ||
                    (bottomCell.type === "classroom" &&
                      cell.type === "classroom" &&
                      bottomCell.label !== cell.label));
                const needsLeftBorder =
                  colIndex > 0 &&
                  leftCell &&
                  (leftCell.type !== cell.type ||
                    (leftCell.type === "classroom" &&
                      cell.type === "classroom" &&
                      leftCell.label !== cell.label));
                const needsRightBorder =
                  colIndex < gridSize - 1 &&
                  rightCell &&
                  (rightCell.type !== cell.type ||
                    (rightCell.type === "classroom" &&
                      cell.type === "classroom" &&
                      rightCell.label !== cell.label));

                // Only show borders where needed
                const borderTop = needsTopBorder ? "1px solid #333" : "none";
                const borderBottom = needsBottomBorder
                  ? "1px solid #333"
                  : "none";
                const borderLeft = needsLeftBorder ? "1px solid #333" : "none";
                const borderRight = needsRightBorder
                  ? "1px solid #333"
                  : "none";

                // Check if this cell should be highlighted as destination
                const isHighlighted =
                  highlightedCell &&
                  highlightedCell.floor === currentFloor &&
                  highlightedCell.location.y === rowIndex &&
                  highlightedCell.location.x === colIndex;

                // Check if this cell should be highlighted as starting point
                const isStartPoint =
                  startLocation &&
                  startLocation.floor === currentFloor &&
                  startLocation.location.y === rowIndex &&
                  startLocation.location.x === colIndex;

                const cellTitle = cell.label
                  ? `${cell.label} (${colIndex}, ${rowIndex})`
                  : `(${colIndex}, ${rowIndex})`;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-3 h-3 relative ${fontSizeClass}`}
                    style={{
                      backgroundColor: cell.color,
                      borderTop: showGrid ? "1px solid #ddd" : borderTop,
                      borderBottom: showGrid ? "1px solid #ddd" : borderBottom,
                      borderLeft: showGrid ? "1px solid #ddd" : borderLeft,
                      borderRight: showGrid ? "1px solid #ddd" : borderRight,
                      boxSizing: "border-box",
                    }}
                    onMouseEnter={(e) => {
                      const rect = (
                        e.target as HTMLElement
                      ).getBoundingClientRect();
                      const containerRect = (e.target as HTMLElement)
                        .closest(".inline-block")
                        ?.getBoundingClientRect();
                      if (containerRect) {
                        setHoveredCell({
                          text: cellTitle,
                          x: rect.left - containerRect.left + rect.width / 2,
                          y: rect.top - containerRect.top,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredCell(null);
                    }}
                  >
                    {isHighlighted && (
                      <div
                        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                        title={
                          highlightedCell.description || highlightedCell.name
                        }
                      >
                        <div
                          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg"
                          style={{
                            backgroundColor: highlightedCell.color || "#F44336",
                          }} // Use custom color or default red
                        >
                          <div
                            className="absolute inset-0 rounded-full animate-ping opacity-60"
                            style={{
                              backgroundColor:
                                highlightedCell.color || "#F44336",
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {isStartPoint && (
                      <div
                        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                        title={startLocation.description || startLocation.name}
                      >
                        <div
                          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg"
                          style={{
                            backgroundColor: startLocation.color || "#4CAF50",
                          }} // Use custom color or default green
                        >
                          <div
                            className="absolute inset-0 rounded-full animate-ping opacity-60"
                            style={{
                              backgroundColor: startLocation.color || "#4CAF50",
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {hoveredCell && (
            <div
              className={`absolute z-20 p-2 rounded shadow-lg pointer-events-none bg-gray-400 font-bold ${fontSizeClass}`}
              style={{
                left: `${hoveredCell.x}px`,
                top: `${hoveredCell.y}px`,
                transform: "translate(-50%, -110%)",
                whiteSpace: "nowrap",
              }}
            >
              {hoveredCell.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
