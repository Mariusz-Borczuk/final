# Campus Navigator: Accessible Wayfinding System

Campus Navigator is a modern, accessible wayfinding application built with React, TypeScript, and Vite. The system helps users navigate complex building environments with a strong focus on accessibility and usability.

## Features

### Accessibility
- **Wheelchair Mode**: Optimized routes and time calculations for wheelchair users
- **Visual Accessibility**: High contrast mode, adjustable text size, and accessible color schemes
- **Audio Navigation**: Text-to-speech for route directions and location info
- **Keyboard & Screen Reader Support**: All interactive elements are accessible via keyboard and have ARIA labels

### Pathfinding & Navigation
- **Intelligent Routing**: Find the most efficient path between any two points
- **Multi-floor Navigation**: Seamless navigation across floors with elevator and stair options
- **Distance & Time Calculation**: Accurate distance (in meters) and time estimates based on:
  - Path length (each tile = 1 meter)
  - User-adjustable walking speed (m/s)
  - Wheelchair adjustments (1.5x time factor)
  - Floor transitions (60 seconds per floor change)
- **Custom Locations**: Add and save your own navigation points
- **Quick Navigation**: Shortcuts to commonly used destinations

### User Interface
- **Interactive Map**: Visual map with grid, start/end points, and path highlighting
- **Map Legend**: Always visible at the bottom for easy reference
- **Location Search**: Find rooms, facilities, and points of interest
- **Floor Management**: Easily switch between building floors
- **Sidebar Layout**: Left sidebar for navigation and settings, right sidebar for route details and accessibility options
- **Responsive Design**: Works on all screen sizes

### Technical Details
- Built with React 18+, TypeScript, and Vite
- Modular, component-based architecture
- Uses Tailwind CSS for styling
- Accessible by design (ARIA, keyboard navigation, color contrast)

## Getting Started

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd final

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage
1. Select your starting point and destination on the map or via search
2. Toggle wheelchair mode or adjust accessibility settings as needed
3. Click "Find Path" to generate the optimal route
4. Use the navigation instructions or audio guidance to reach your destination
5. Adjust walking speed and preferred bathroom type in the right sidebar for personalized results

## Development

This project uses React, TypeScript, and Vite. For more details, see the codebase and comments in each component. Contributions and accessibility improvements are welcome!
