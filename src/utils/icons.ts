
// Export all icons as named exports
/**
 * Exports various icons from different icon libraries for use in the application.
 * 
 * Includes icons for:
 * - UI elements (eye, search, dark mode, etc.)
 * - Navigation (location, directions, home, etc.)
 * - Facilities (restroom, water, elevator, stairs, etc.)
 * - Gender indicators (male, female)
 * - Other utilities (fire extinguisher, wrench, etc.)
 * 
 * @module icons
 */

import React from "react";
import { IoMdEye, IoMdGrid, IoMdArrowDropdown } from "react-icons/io";
import { FaRestroom, FaFireExtinguisher, FaWrench, FaTrashAlt, FaMapMarkerAlt, FaPlay, FaRoute, FaWheelchair, FaArrowRight, FaCheck, FaClock, FaRuler, FaWalking } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import {
  MdDarkMode,
  MdFemale,
  MdHome,
  MdLocationOn,
  MdMale,
  MdSearch,
  MdSportsTennis,
  MdWater,
  MdStairs,
  MdLocationPin,
} from "react-icons/md";
import { FiType } from "react-icons/fi";
import { FaElevator } from "react-icons/fa6";

export {
  IoMdEye, MdDarkMode, MdFemale, MdHome, SiGoogleclassroom, MdLocationOn, MdMale, MdSearch, MdSportsTennis, MdWater, MdStairs, FaRestroom, FaFireExtinguisher, FaWrench, MdLocationPin, FaMapMarkerAlt, FaPlay, FaRoute, FaWheelchair, FaArrowRight, FaCheck, FaClock, FaRuler, FaWalking, FiType, IoMdGrid, FaElevator, IoMdArrowDropdown, FaTrashAlt
};
// Export icon types for type safety
export type IconType = React.ReactNode;
