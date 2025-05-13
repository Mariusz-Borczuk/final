import React from 'react';
import { FloorManagementProps } from '@/components/types/types';

/**
 * A component for managing floor selection in a multi-floor building interface.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {number} props.currentFloor - The currently selected floor number
 * @param {function} props.onFloorChange - Callback function that fires when a floor is selected,
 *                                        receives the floor number as an argument
 * @returns {JSX.Element} A floor selection interface with buttons for each available floor
 * 
 * @example
 * // Example usage
 * <FloorManagement 
 *   currentFloor={2}
 *   onFloorChange={(floor) => setCurrentFloor(floor)}
 * />
 */
export const FloorManagement: React.FC<FloorManagementProps> = ({ currentFloor, onFloorChange }) => {
    const floors = [1, 2, 3, 4];

    return (
        <div className="mb-6">
            <h2 className="font-semibold mb-2 text-gray-200">Floor Level</h2>
            <div className="grid grid-cols-2 gap-2 w-full">
                {floors.map((floor) => {
                    const isSelected = currentFloor === floor;
                    return (
                        <button
                            key={floor}
                            type="button"
                            onClick={() => onFloorChange(floor)}
                            className={`p-2 rounded transition-colors duration-200 ${
                                isSelected
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {floor}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FloorManagement;