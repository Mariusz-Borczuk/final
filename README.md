# Campus Navigator: Accessible Wayfinding System

Campus Navigator is a modern, accessible wayfinding application built with React, TypeScript, and Vite. The system helps users navigate complex building environments with a strong focus on accessibility and usability.

## Features

### Accessibility
- **Wheelchair Mode**: Optimized routes and time calculations for wheelchair users
- **Visual Accessibility**: High contrast mode, adjustable text size, and accessible color schemes
- **Audio Navigation**: Text-to-speech for route directions with adjustable speech settings
- **Keyboard & Screen Reader Support**: Comprehensive ARIA labels and keyboard navigation
- **Customizable Preferences**: User-specific settings for bathrooms and walking speed

### Pathfinding & Navigation
- **Intelligent Routing**: Advanced pathfinding with multiple routing options
- **Multi-floor Navigation**: Seamless transitions between floors using elevators or stairs
- **Smart Distance & Time Calculation**:
  - Precise distance measurements (1 tile = 1 meter)
  - Customizable walking speed (meters per second)
  - Wheelchair-specific timing adjustments
  - Floor transition time estimates
  - Real-time path updates
- **Location Management**:
  - Session-based location saving
  - Custom navigation points with icons and colors
  - Quick access to frequently used destinations
  - Search functionality for rooms and facilities

### User Interface
- **Interactive Grid Map**: 
  - Color-coded areas and entry points
  - Dynamic path highlighting
  - Visual indicators for start/end points
- **Enhanced Map Legend**: 
  - Split view showing room colors and entry points
  - Comprehensive facility type indicators
  - Hover descriptions for each element
- **Dual Sidebar Layout**:
  - Left: Navigation controls and custom locations
  - Right: Route details and accessibility settings
- **Responsive Design**: Optimized for all screen sizes and devices

### Technical Architecture
- **Modern Stack**: React 18+, TypeScript, Vite
- **Modular Structure**:
  - Feature-based organization
  - Reusable component library
  - Separate service layer
  - Clear type definitions
- **State Management**: React hooks and context
- **Styling**: Tailwind CSS with accessibility considerations
- **Storage**: Session-based data persistence

## Project Structure

```
src/
  assets/              # Static assets and global styles
  components/          # Reusable UI components
    common/           # Common elements (buttons, inputs)
    layout/           # Layout components
    map/             # Map-related components
  data/               # Application data
    floors/          # Floor-specific data
    tiles/           # Tile definitions
  features/           # Core features
    navigation/      # Navigation functionality
    accessibility/   # Accessibility features
  services/           # Business logic and data management
  utils/              # Utility functions and helpers
```

## Getting Started

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd campus-navigator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage
1. **Initial Setup**:
   - Configure accessibility preferences
   - Set your preferred walking speed
   - Choose bathroom preferences if needed

2. **Navigation**:
   - Use search fields or map clicks to set start/end points
   - Toggle wheelchair mode if required
   - Click "Find Path" to generate route

3. **Customization**:
   - Save frequently used locations
   - Create custom navigation points
   - Adjust audio settings for navigation

4. **Following Routes**:
   - Follow highlighted path on the map
   - Use audio guidance if needed
   - Switch floors when indicated
   - Check estimated time and distance

## Development

### Prerequisites
- Node.js 16+
- npm or yarn
- Understanding of React and TypeScript

### Key Files
- `src/features/navigation/` - Core navigation logic
- `src/components/map/` - Map rendering and interaction
- `src/services/storage/` - Data persistence layer
- `src/utils/accessibility/` - Accessibility utilities

### Best Practices
- Follow TypeScript type definitions
- Maintain ARIA labels and accessibility features
- Use provided utility functions
- Follow the established component structure
