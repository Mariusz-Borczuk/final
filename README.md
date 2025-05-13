# Campus Navigator: Accessible Wayfinding System

Campus Navigator is a modern, accessible wayfinding application built with React, TypeScript, and Vite. The system helps users navigate through complex building environments with special attention to accessibility needs.

## Features

### Accessible Navigation

- **Wheelchair Mode**: Optimized routes for wheelchair users with adjusted time calculations
- **Visual Accessibility**: High contrast mode and adjustable text size
- **Audio Navigation**: Text-to-speech functionality for route directions

### Pathfinding

- **Intelligent Routing**: Find the most efficient path between any two points
- **Multi-floor Navigation**: Seamless navigation across different floors with elevator and stair options
- **Distance & Time Calculation**: Accurate distance (in meters) and time estimates based on:
  - Path length (each tile = 0.5 meter)
  - Standard moving speed (determined by the user /m)
  - Wheelchair adjustments (1.5x time factor when in wheelchair mode)
  - Floor transitions (60 seconds per floor change)

### User Interface

- **Interactive Map**: Visual representation of the path with start and end points
- **Location Search**: Easily find rooms, facilities, and points of interest
- **Quick Navigation**: Shortcuts to commonly used destinations
- **Custom Locations**: Add and save your own navigation points
- **Floor Management**: Easily switch between different building floors

### Technical Details

- Built with React 18+ and TypeScript
- Uses Vite for fast development and optimized builds
- Component-based architecture for maintainability
- Responsive design that works on various screen sizes

## Getting Started

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd pathFinder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

1. Select your starting point and destination
2. Toggle wheelchair mode if needed
3. Adjust accessibility settings according to your preferences
4. Click "Find Path" to generate the optimal route
5. Use the provided navigation instructions or audio guidance to reach your destination

## Development

This project is built with React + TypeScript + Vite. To learn more about working with this stack, check the sections below.
