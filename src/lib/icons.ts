/**
 * Icon System - Phosphor Icons Integration
 * 
 * This module provides a centralized icon system using Phosphor Icons
 * to maintain the hand-drawn aesthetic throughout the application.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.5
 */

import {
  // Navigation & UI
  House,
  QrCode,
  ClockCounterClockwise,
  Plus,
  X,
  Check,
  CaretDown,
  CaretUp,
  CaretRight,
  CaretLeft,
  DotsThree,
  MagnifyingGlass,
  TrendUp,
  Star,
  Rocket,
  ArrowCircleRight,
  ArrowCircleLeft,

  // User & Profile
  User,
  UserPlus,
  Users,
  UserCheck,
  Heart,
  
  // Communication
  Envelope,
  Phone,
  ChatCircle,
  Share,
  
  // Actions & Controls
  Download,
  Upload,
  Gear,
  Trash,
  Copy,
  Eye,
  EyeSlash,
  Lock,
  Minus,
  
  // Time & Calendar
  Clock,
  Calendar,
  
  // Location & Map
  MapPin,
  
  // Status & Feedback
  CheckCircle,
  XCircle,
  Info,
  Warning,
  WarningOctagon,
  
  // Media & Content
  Camera,
  Image,
  
  // Business & Finance
  Buildings,
  CreditCard,
  
  // Arrows & Directions
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  
  // Loading & Progress
  CircleNotch,
  Circle,
  
  // Layout & Structure
  Sidebar,
  List,
  GridFour,
  DotsSixVertical,
  
  // Form & Input
  TextAa,
  NumberSquareOne,
  At,
  
} from '@phosphor-icons/react'

/**
 * Centralized icon exports with semantic naming
 * Maps common UI patterns to appropriate Phosphor icons
 */
export const Icons = {
  // Navigation
  home: House,
  qrCode: QrCode,
  history: ClockCounterClockwise,
  menu: List,
  sidebar: Sidebar,
  
  // Actions
  add: Plus,
  close: X,
  check: Check,
  download: Download,
  upload: Upload,
  settings: Gear,
  delete: Trash,
  copy: Copy,
  share: Share,
  
  // Chevrons & Arrows
  chevronDown: CaretDown,
  chevronUp: CaretUp,
  chevronRight: CaretRight,
  chevronLeft: CaretLeft,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  caretDown: CaretDown,
  caretUp: CaretUp,
  caretRight: CaretRight,
  caretLeft: CaretLeft,
  
  // User & People
  user: User,
  userPlus: UserPlus,
  users: Users,
  userCheck: UserCheck,
  
  // Communication
  mail: Envelope,
  phone: Phone,
  message: ChatCircle,
  
  // Time & Date
  clock: Clock,
  calendar: Calendar,
  trending: TrendUp,
  
  // Auth & Access
  signIn: ArrowCircleRight,
  signOut: ArrowCircleLeft,
  
  // Ratings & Favorites
  star: Star,
  
  // Misc
  rocket: Rocket,
  
  // Location
  mapPin: MapPin,
  
  // Status
  checkCircle: CheckCircle,
  xCircle: XCircle,
  info: Info,
  warning: Warning,
  warningOctagon: WarningOctagon,
  
  // Visibility
  eye: Eye,
  eyeOff: EyeSlash,
  
  // Security
  lock: Lock,
  
  // Math
  minus: Minus,
  
  // Media
  camera: Camera,
  image: Image,
  
  // Business
  building: Buildings,
  creditCard: CreditCard,
  
  // UI Elements
  more: DotsThree,
  search: MagnifyingGlass,
  heart: Heart,
  
  // Loading
  spinner: CircleNotch,
  circle: Circle,
  
  // Layout
  grid: GridFour,
  gripVertical: DotsSixVertical,
  
  // Form
  text: TextAa,
  number: NumberSquareOne,
  at: At,
} as const

/**
 * Icon component props interface
 */
export interface IconProps {
  size?: number | string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  color?: string
  className?: string
}

/**
 * Default icon props for consistent styling
 */
export const defaultIconProps: IconProps = {
  size: 20,
  weight: 'regular',
}

/**
 * Sketchy icon props for hand-drawn aesthetic
 */
export const sketchyIconProps: IconProps = {
  size: 20,
  weight: 'light', // Lighter weight for more organic feel
}

/**
 * Large icon props for prominent display
 */
export const largeIconProps: IconProps = {
  size: 24,
  weight: 'regular',
}

/**
 * Small icon props for compact spaces
 */
export const smallIconProps: IconProps = {
  size: 16,
  weight: 'regular',
}