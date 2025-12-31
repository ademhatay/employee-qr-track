/**
 * Hand-Drawn Design System - Type Definitions and Utilities
 * 
 * This module provides TypeScript interfaces and utility functions
 * for the sketchy hand-drawn design system.
 */

// ========================================
// TYPE DEFINITIONS
// ========================================

export interface SketchyTheme {
  name: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    accent: {
      green: string;
      blue: string;
      red: string;
      purple: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: {
      primary: string;
      secondary: string;
      muted: string;
    };
  };
  typography: {
    display: FontFamily;
    body: FontFamily;
    monospace: FontFamily;
  };
  textures: {
    paper: string;
    canvas: string;
    grain: string;
  };
}

export interface FontFamily {
  name: string;
  weights: number[];
  fallback: string[];
}

export interface SketchyComponentProps {
  variant?: 'default' | 'outlined' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  organic?: boolean; // Enable organic borders
  animated?: boolean; // Enable drawing animations
  texture?: 'none' | 'paper' | 'canvas' | 'grain' | 'grain-subtle' | 'grain-medium' | 'grain-strong' | 'pencil';
  className?: string;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  stagger?: number; // For list animations
}

export interface TextureLibrary {
  paper: {
    light: string;
    dark: string;
  };
  canvas: {
    light: string;
    dark: string;
  };
  grain: {
    subtle: string;
    medium: string;
    strong: string;
    subtleDark: string;
    mediumDark: string;
    strongDark: string;
  };
  pencil: {
    light: string;
    dark: string;
  };
}

// ========================================
// DESIGN TOKENS
// ========================================

export const DESIGN_TOKENS = {
  typography: {
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
    },
    fontFamilies: {
      displayPrimary: 'var(--font-display-primary)',
      displaySecondary: 'var(--font-display-secondary)',
      bodyPrimary: 'var(--font-body-primary)',
      monospace: 'var(--font-monospace)',
    },
    organicClasses: {
      // Size-based organic classes
      xs: 'text-xs-organic',
      sm: 'text-sm-organic',
      base: 'text-base-organic',
      lg: 'text-lg-organic',
      xl: 'text-xl-organic',
      '2xl': 'text-2xl-organic',
      '3xl': 'text-3xl-organic',
      '4xl': 'text-4xl-organic',
      '5xl': 'text-5xl-organic',
      
      // Fluid/responsive classes
      xsFluid: 'text-xs-fluid',
      smFluid: 'text-sm-fluid',
      baseFluid: 'text-base-fluid',
      lgFluid: 'text-lg-fluid',
      xlFluid: 'text-xl-fluid',
      '2xlFluid': 'text-2xl-fluid',
      '3xlFluid': 'text-3xl-fluid',
      '4xlFluid': 'text-4xl-fluid',
      '5xlFluid': 'text-5xl-fluid',
      
      // Semantic heading classes
      h1: 'heading-organic-1',
      h2: 'heading-organic-2',
      h3: 'heading-organic-3',
      h4: 'heading-organic-4',
      h5: 'heading-organic-5',
      h6: 'heading-organic-6',
      
      // Fluid heading classes
      h1Fluid: 'heading-fluid-1',
      h2Fluid: 'heading-fluid-2',
      h3Fluid: 'heading-fluid-3',
      h4Fluid: 'heading-fluid-4',
      h5Fluid: 'heading-fluid-5',
      h6Fluid: 'heading-fluid-6',
      
      // Body text classes
      body: 'body-organic',
      bodySmall: 'body-organic-small',
      bodyLarge: 'body-organic-large',
      bodyFluid: 'body-fluid',
      bodyFluidSmall: 'body-fluid-small',
      bodyFluidLarge: 'body-fluid-large',
      
      // Label classes
      label: 'label-organic',
      labelLarge: 'label-organic-large',
      labelFluid: 'label-fluid',
      labelFluidLarge: 'label-fluid-large',
      
      // Caption and accent
      caption: 'caption-organic',
      accent: 'text-accent-organic',
      
      // Variation classes
      organic: 'text-organic',
      organicAlt: 'text-organic-alt',
      organicSubtle: 'text-organic-subtle',
      organicEmphasis: 'text-organic-emphasis',
      
      // Interactive classes
      organicHover: 'text-organic-hover',
      organicAltHover: 'text-organic-alt-hover',
    },
    rotations: {
      subtle: '-0.1deg',
      light: '0.2deg',
      medium: '-0.3deg',
      strong: '0.5deg',
      emphasis: '-0.8deg',
    },
  },
  borders: {
    radius: {
      sm: 'var(--border-radius-sm)',
      md: 'var(--border-radius-md)',
      lg: 'var(--border-radius-lg)',
      xl: 'var(--border-radius-xl)',
      '2xl': 'var(--border-radius-2xl)',
    },
    styles: {
      thin: 'var(--border-sketchy-thin)',
      medium: 'var(--border-sketchy-medium)',
      thick: 'var(--border-sketchy-thick)',
      dashed: 'var(--border-sketchy-dashed)',
    },
  },
  shadows: {
    sm: 'var(--shadow-sketchy-sm)',
    md: 'var(--shadow-sketchy-md)',
    lg: 'var(--shadow-sketchy-lg)',
    none: 'none',
    // Directional shadows
    top: 'shadow-sketchy-top',
    right: 'shadow-sketchy-right',
    bottom: 'shadow-sketchy-bottom',
    left: 'shadow-sketchy-left',
    // Colored shadows
    blue: 'shadow-sketchy-blue',
    green: 'shadow-sketchy-green',
    red: 'shadow-sketchy-red',
    purple: 'shadow-sketchy-purple',
    // Special effects
    inset: 'shadow-sketchy-inset',
    hover: 'shadow-sketchy-hover',
    hoverLift: 'shadow-sketchy-hover-lift',
  },
  animations: {
    timing: {
      fast: 'var(--timing-sketchy-fast)',
      normal: 'var(--timing-sketchy-normal)',
      slow: 'var(--timing-sketchy-slow)',
      draw: 'var(--timing-sketchy-draw)',
    },
  },
  colors: {
    sketchy: {
      primary: 'var(--sketchy-primary)',
      secondary: 'var(--sketchy-secondary)',
      background: {
        primary: 'var(--sketchy-bg-primary)',
        secondary: 'var(--sketchy-bg-secondary)',
        tertiary: 'var(--sketchy-bg-tertiary)',
      },
      accent: {
        green: 'var(--sketchy-accent-green)',
        blue: 'var(--sketchy-accent-blue)',
        red: 'var(--sketchy-accent-red)',
        purple: 'var(--sketchy-accent-purple)',
      },
    },
  },
} as const;

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Get CSS custom property value from the current theme
 */
export function getCSSVariable(property: string): string {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
  }
  return '';
}

/**
 * Set CSS custom property value
 */
export function setCSSVariable(property: string, value: string): void {
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(property, value);
  }
}

/**
 * Generate organic border radius with slight variations
 */
export function generateOrganicBorderRadius(baseSize: number = 8): string {
  const variation = 0.2; // 20% variation
  const corners = Array.from({ length: 4 }, () => {
    const offset = (Math.random() - 0.5) * variation * baseSize;
    return Math.max(0, baseSize + offset);
  });
  
  return `${corners[0]}px ${corners[1]}px ${corners[2]}px ${corners[3]}px`;
}

/**
 * Apply organic rotation to elements
 */
export function getOrganicRotation(intensity: number = 1): string {
  const maxRotation = 2 * intensity; // degrees
  const rotation = (Math.random() - 0.5) * maxRotation;
  return `rotate(${rotation}deg)`;
}

/**
 * Get organic typography class based on size and type
 */
export function getOrganicTypographyClass(
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl',
  type: 'text' | 'heading' = 'text',
  responsive: boolean = false
): string {
  if (type === 'heading') {
    const headingMap = responsive ? {
      '5xl': 'heading-fluid-1',
      '4xl': 'heading-fluid-2',
      '3xl': 'heading-fluid-3',
      '2xl': 'heading-fluid-4',
      'xl': 'heading-fluid-5',
      'lg': 'heading-fluid-6',
      'base': 'heading-fluid-6',
      'sm': 'label-fluid',
      'xs': 'caption-organic',
    } : {
      '5xl': 'heading-organic-1',
      '4xl': 'heading-organic-2',
      '3xl': 'heading-organic-3',
      '2xl': 'heading-organic-4',
      'xl': 'heading-organic-5',
      'lg': 'heading-organic-6',
      'base': 'heading-organic-6',
      'sm': 'label-organic',
      'xs': 'caption-organic',
    };
    return headingMap[size];
  }
  
  if (responsive) {
    const fluidMap = {
      'xs': 'text-xs-fluid',
      'sm': 'text-sm-fluid',
      'base': 'text-base-fluid',
      'lg': 'text-lg-fluid',
      'xl': 'text-xl-fluid',
      '2xl': 'text-2xl-fluid',
      '3xl': 'text-3xl-fluid',
      '4xl': 'text-4xl-fluid',
      '5xl': 'text-5xl-fluid',
    };
    return fluidMap[size];
  }
  
  return DESIGN_TOKENS.typography.organicClasses[size];
}

/**
 * Get semantic typography class for common UI elements
 */
export function getSemanticTypographyClass(
  semantic: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'label' | 'caption' | 'accent',
  responsive: boolean = false
): string {
  const semanticMap = responsive ? {
    h1: 'heading-fluid-1',
    h2: 'heading-fluid-2',
    h3: 'heading-fluid-3',
    h4: 'heading-fluid-4',
    h5: 'heading-fluid-5',
    h6: 'heading-fluid-6',
    body: 'body-fluid',
    label: 'label-fluid',
    caption: 'caption-organic',
    accent: 'text-accent-organic',
  } : {
    h1: 'heading-organic-1',
    h2: 'heading-organic-2',
    h3: 'heading-organic-3',
    h4: 'heading-organic-4',
    h5: 'heading-organic-5',
    h6: 'heading-organic-6',
    body: 'body-organic',
    label: 'label-organic',
    caption: 'caption-organic',
    accent: 'text-accent-organic',
  };
  
  return semanticMap[semantic];
}

/**
 * Get responsive typography class based on screen size
 */
export function getResponsiveTypographyClass(
  baseClass: string,
  breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop'
): string {
  // For mobile, prefer non-rotated versions for better readability
  if (breakpoint === 'mobile') {
    const mobileMap: Record<string, string> = {
      'text-organic': 'text-base-fluid',
      'text-organic-alt': 'text-base-fluid',
      'heading-organic-1': 'heading-fluid-1',
      'heading-organic-2': 'heading-fluid-2',
      'heading-organic-3': 'heading-fluid-3',
    };
    return mobileMap[baseClass] || baseClass;
  }
  
  return baseClass;
}

/**
 * Check if current viewport supports organic rotations
 */
export function supportsOrganicRotations(): boolean {
  if (typeof window === 'undefined') return true;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;
  
  // Check viewport width (disable rotations on very small screens)
  const isMobile = window.innerWidth < 640;
  return !isMobile;
}

/**
 * Get appropriate typography class based on viewport and preferences
 */
export function getAdaptiveTypographyClass(
  baseClass: string,
  options: {
    respectMotionPreference?: boolean;
    mobileOptimized?: boolean;
  } = {}
): string {
  const { respectMotionPreference = true, mobileOptimized = true } = options;
  
  if (typeof window === 'undefined') return baseClass;
  
  // Check for reduced motion preference
  if (respectMotionPreference && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Return non-rotated version
    const nonRotatedMap: Record<string, string> = {
      'text-organic': 'text-base-fluid',
      'text-organic-alt': 'text-base-fluid',
      'text-organic-hover': 'text-base-fluid',
      'heading-organic-1': 'heading-fluid-1',
      'heading-organic-2': 'heading-fluid-2',
    };
    return nonRotatedMap[baseClass] || baseClass;
  }
  
  // Check for mobile optimization
  if (mobileOptimized && window.innerWidth < 640) {
    return getResponsiveTypographyClass(baseClass, 'mobile');
  }
  
  return baseClass;
}

/**
 * Generate random organic text variation class
 */
export function getRandomOrganicVariation(): string {
  const variations = [
    'text-organic',
    'text-organic-alt',
    'text-organic-subtle',
  ];
  
  return variations[Math.floor(Math.random() * variations.length)];
}

/**
 * Apply organic letter spacing based on font family
 */
export function getOrganicLetterSpacing(fontFamily: 'display' | 'body' | 'accent'): string {
  const spacingMap = {
    display: 'var(--letter-spacing-wide)',
    body: 'var(--letter-spacing-normal)',
    accent: 'var(--letter-spacing-wider)',
  };
  
  return spacingMap[fontFamily];
}

/**
 * Get theme-appropriate texture pattern
 */
export function getTexturePattern(
  type: 'paper' | 'canvas' | 'grain' | 'grain-subtle' | 'grain-medium' | 'grain-strong' | 'pencil', 
  theme: 'light' | 'dark' = 'light'
): string {
  const patterns = {
    paper: theme === 'light' ? 'var(--texture-paper-light)' : 'var(--texture-paper-dark)',
    canvas: theme === 'light' ? 'var(--texture-canvas-light)' : 'var(--texture-canvas-dark)',
    grain: theme === 'light' ? 'var(--texture-grain-subtle)' : 'var(--texture-grain-subtle-dark)',
    'grain-subtle': theme === 'light' ? 'var(--texture-grain-subtle)' : 'var(--texture-grain-subtle-dark)',
    'grain-medium': theme === 'light' ? 'var(--texture-grain-medium)' : 'var(--texture-grain-medium-dark)',
    'grain-strong': theme === 'light' ? 'var(--texture-grain-strong)' : 'var(--texture-grain-strong-dark)',
    pencil: theme === 'light' ? 'var(--texture-pencil-light)' : 'var(--texture-pencil-dark)',
  };
  
  return patterns[type];
}

/**
 * Generate staggered animation delays for list items
 */
export function generateStaggeredDelay(index: number, baseDelay: number = 100): string {
  return `${index * baseDelay}ms`;
}

/**
 * Get staggered animation class for list items
 */
export function getStaggeredAnimationClass(index: number, maxStagger: number = 10): string {
  const staggerIndex = Math.min(index + 1, maxStagger);
  return `animate-draw-stagger animate-draw-stagger-${staggerIndex}`;
}

/**
 * Get drawing animation class based on component type
 */
export function getDrawingAnimationClass(
  component: 'card' | 'button' | 'input' | 'text' | 'list-item' | 'modal' | 'page' | 'generic' = 'generic'
): string {
  const animationMap = {
    card: 'animate-draw-card',
    button: 'animate-draw-button',
    input: 'animate-draw-input',
    text: 'animate-draw-text',
    'list-item': 'animate-draw-list-item',
    modal: 'animate-draw-modal',
    page: 'animate-draw-page',
    generic: 'animate-draw-reveal',
  };
  
  return animationMap[component];
}

/**
 * Get border drawing animation class
 */
export function getBorderDrawingClass(
  type: 'basic' | 'hover' | 'realtime' | 'pencil' | 'focus' | 'continuous' = 'basic'
): string {
  const borderAnimationMap = {
    basic: 'animate-border-draw',
    hover: 'border-draw-hover',
    realtime: 'border-draw-realtime',
    pencil: 'border-pencil-stroke',
    focus: 'border-draw-focus',
    continuous: 'border-continuous-sketch',
  };
  
  return borderAnimationMap[type];
}

/**
 * Check if animations should be enabled based on user preferences
 */
export function shouldEnableAnimations(): boolean {
  if (typeof window === 'undefined') return true;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return !prefersReducedMotion;
}

/**
 * Get animation-aware classes that respect user preferences
 */
export function getAnimationAwareClasses(
  baseClasses: string,
  animationClasses: string
): string {
  if (!shouldEnableAnimations()) {
    return baseClasses;
  }
  
  return combineClasses(baseClasses, animationClasses);
}

/**
 * Apply drawing animation to element with stagger support
 */
export function applyDrawingAnimation(
  element: HTMLElement,
  component: 'card' | 'button' | 'input' | 'text' | 'list-item' | 'modal' | 'page' | 'generic' = 'generic',
  staggerIndex?: number
): void {
  if (!shouldEnableAnimations()) return;
  
  const animationClass = getDrawingAnimationClass(component);
  element.classList.add(animationClass);
  
  if (staggerIndex !== undefined) {
    const staggerClass = `animate-draw-stagger-${Math.min(staggerIndex + 1, 10)}`;
    element.classList.add('animate-draw-stagger', staggerClass);
  }
}

/**
 * Apply border drawing animation to element
 */
export function applyBorderDrawingAnimation(
  element: HTMLElement,
  type: 'basic' | 'hover' | 'realtime' | 'pencil' | 'focus' | 'continuous' = 'basic'
): void {
  if (!shouldEnableAnimations()) return;
  
  const borderClass = getBorderDrawingClass(type);
  element.classList.add(borderClass);
}

/**
 * Create staggered list animation observer
 */
export function createStaggeredListObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !shouldEnableAnimations()) return null;
  
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Animate list items with staggered delays
 */
export function animateListItems(
  container: HTMLElement,
  itemSelector: string = '.animate-draw-list-item',
  baseDelay: number = 100
): void {
  if (!shouldEnableAnimations()) return;
  
  const items = container.querySelectorAll(itemSelector);
  
  items.forEach((item, index) => {
    const htmlItem = item as HTMLElement;
    const delay = generateStaggeredDelay(index, baseDelay);
    htmlItem.style.animationDelay = delay;
    
    // Add stagger class if not already present
    if (!htmlItem.classList.contains('animate-draw-stagger')) {
      htmlItem.classList.add('animate-draw-stagger');
    }
  });
}

/**
 * Get hover sketching effect class
 */
export function getHoverSketchingClass(): string {
  return shouldEnableAnimations() ? 'hover-sketch' : '';
}

/**
 * Enhanced sketchy classes with animation support
 */
export function getEnhancedSketchyClasses(
  props: SketchyComponentProps & {
    component?: 'card' | 'button' | 'input' | 'text' | 'list-item' | 'modal' | 'page' | 'generic';
    staggerIndex?: number;
    borderAnimation?: 'basic' | 'hover' | 'realtime' | 'pencil' | 'focus' | 'continuous';
    hoverSketching?: boolean;
  }
): string {
  const classes: string[] = [];
  
  // Get base sketchy classes
  const baseClasses = getSketchyClasses(props);
  classes.push(baseClasses);
  
  // Add drawing animation if enabled
  if (props.animated && props.component) {
    const animationClass = getDrawingAnimationClass(props.component);
    classes.push(getAnimationAwareClasses('', animationClass));
    
    // Add stagger if specified
    if (props.staggerIndex !== undefined) {
      const staggerClass = getStaggeredAnimationClass(props.staggerIndex);
      classes.push(getAnimationAwareClasses('', staggerClass));
    }
  }
  
  // Add border animation if specified
  if (props.borderAnimation) {
    const borderClass = getBorderDrawingClass(props.borderAnimation);
    classes.push(getAnimationAwareClasses('', borderClass));
  }
  
  // Add hover sketching if enabled
  if (props.hoverSketching) {
    const hoverClass = getHoverSketchingClass();
    classes.push(hoverClass);
  }
  
  return combineClasses(...classes);
}

/**
 * Combine multiple CSS classes with proper handling
 */
export function combineClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ========================================
// THEME UTILITIES
// ========================================

const THEME_STORAGE_KEY = 'employee-qr-theme';

/**
 * Check if dark theme is currently active
 */
export function isDarkTheme(): boolean {
  if (typeof window !== 'undefined') {
    // Check localStorage first
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme !== null) {
      const isDark = storedTheme === 'dark';
      // Sync the DOM class with localStorage
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return isDark;
    }
    // Fall back to checking the class
    return document.documentElement.classList.contains('dark');
  }
  return false;
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): void {
  if (typeof window !== 'undefined') {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }
}

/**
 * Set specific theme
 */
export function setTheme(theme: 'light' | 'dark'): void {
  if (typeof window !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Persist to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

// ========================================
// COMPONENT UTILITIES
// ========================================

/**
 * Get organic border class based on component type and size
 */
export function getOrganicBorderClass(
  component: 'button' | 'card' | 'input' | 'dialog' | 'badge' | 'generic',
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md',
  withBorder: boolean = true
): string {
  // Component-specific organic classes
  const componentMap = {
    button: 'btn-organic',
    card: 'card-organic',
    input: 'input-organic',
    dialog: 'dialog-organic',
    badge: 'badge-organic',
    generic: withBorder ? `border-organic-${size}-sketchy` : `border-organic-${size}`,
  };
  
  return componentMap[component];
}

/**
 * Apply organic styling to existing component classes
 */
export function enhanceWithOrganicBorders(
  baseClasses: string,
  component: 'button' | 'card' | 'input' | 'dialog' | 'badge' | 'generic' = 'generic',
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): string {
  // Remove existing border-radius classes
  const cleanedClasses = baseClasses
    .replace(/rounded-\w+/g, '')
    .replace(/border-\w+/g, '')
    .trim();
  
  const organicBorderClass = getOrganicBorderClass(component, size);
  
  return combineClasses(cleanedClasses, organicBorderClass);
}

/**
 * Get sketchy shadow class based on size and type
 */
export function getSketchyShadowClass(
  size: 'none' | 'sm' | 'md' | 'lg' = 'sm',
  type: 'default' | 'directional' | 'colored' | 'hover' = 'default',
  direction?: 'top' | 'right' | 'bottom' | 'left',
  color?: 'blue' | 'green' | 'red' | 'purple'
): string {
  if (size === 'none') return 'shadow-sketchy-none';
  
  if (type === 'directional' && direction) {
    return `shadow-sketchy-${direction}`;
  }
  
  if (type === 'colored' && color) {
    return `shadow-sketchy-${color}`;
  }
  
  if (type === 'hover') {
    return size === 'lg' ? 'shadow-sketchy-hover-lift' : 'shadow-sketchy-hover';
  }
  
  return `shadow-sketchy-${size}`;
}

/**
 * Check if texture should be applied based on performance and user preferences
 */
export function shouldApplyTexture(): boolean {
  if (typeof window === 'undefined') return true;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;
  
  // Check for low-end device indicators
  const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  if (isLowEndDevice) return false;
  
  // Check connection quality
  const connection = (navigator as any).connection;
  if (connection && connection.effectiveType && connection.effectiveType.includes('2g')) {
    return false;
  }
  
  return true;
}

/**
 * Get texture intensity based on device capabilities
 */
export function getOptimalTextureIntensity(): 'subtle' | 'medium' | 'strong' {
  if (typeof window === 'undefined') return 'medium';
  
  // Check device capabilities
  const isHighEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 8;
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  
  if (isHighEnd) return 'strong';
  if (isLowEnd) return 'subtle';
  
  return 'medium';
}

/**
 * Get component-specific shadow class
 */
export function getComponentShadowClass(
  component: 'card' | 'button' | 'dialog' | 'dropdown'
): string {
  const shadowMap = {
    card: 'card-shadow-organic',
    button: 'button-shadow-organic',
    dialog: 'dialog-shadow-organic',
    dropdown: 'dropdown-shadow-organic',
  };
  
  return shadowMap[component];
}

/**
 * Get readability class based on texture intensity
 */
export function getReadabilityClass(
  textureIntensity: 'subtle' | 'medium' | 'strong' = 'medium'
): string {
  const readabilityMap = {
    subtle: 'readable-over-subtle',
    medium: 'readable-over-medium',
    strong: 'readable-over-strong',
  };
  
  return readabilityMap[textureIntensity];
}

/**
 * Get text shadow class for texture backgrounds
 */
export function getTextOverTextureClass(
  intensity: 'normal' | 'strong' = 'normal'
): string {
  return intensity === 'strong' ? 'text-over-texture-strong' : 'text-over-texture';
}

/**
 * Get adaptive texture class with readability enhancements
 */
export function getAdaptiveTextureWithReadability(
  type: 'paper' | 'canvas' | 'grain',
  textIntensity: 'normal' | 'strong' = 'normal'
): string {
  const textureClass = getAdaptiveTextureClass(type);
  const readabilityClass = getTextOverTextureClass(textIntensity);
  
  return combineClasses(textureClass, 'texture-adaptive-intensity', readabilityClass);
}

/**
 * Get texture overlay class for layered effects
 */
export function getTextureOverlayClass(
  type: 'paper' | 'canvas' | 'grain'
): string {
  const overlayMap = {
    paper: 'texture-overlay texture-overlay-paper',
    canvas: 'texture-overlay texture-overlay-canvas',
    grain: 'texture-overlay texture-overlay-grain',
  };
  
  return overlayMap[type];
}

/**
 * Check if high contrast mode is preferred
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Get texture class with accessibility considerations
 */
export function getAccessibleTextureClass(
  type: 'paper' | 'canvas' | 'grain' | 'grain-subtle' | 'grain-medium' | 'grain-strong' | 'pencil',
  component?: 'card' | 'input' | 'button' | 'modal' | 'overlay'
): string {
  // Check for high contrast preference
  if (prefersHighContrast()) {
    return ''; // No texture in high contrast mode
  }
  
  // Check if textures should be applied
  if (!shouldApplyTexture()) {
    return '';
  }
  
  return getTextureClass(type, component);
}

/**
 * Get theme-adaptive texture intensity
 */
export function getThemeAdaptiveIntensity(
  baseIntensity: 'subtle' | 'medium' | 'strong' = 'medium'
): 'subtle' | 'medium' | 'strong' {
  const isDark = isDarkTheme();
  
  // In dark theme, slightly reduce intensity for better readability
  if (isDark) {
    const intensityMap = {
      subtle: 'subtle' as const,
      medium: 'subtle' as const,
      strong: 'medium' as const,
    };
    return intensityMap[baseIntensity];
  }
  
  return baseIntensity;
}

/**
 * Get complete texture setup with theme adaptation and readability
 */
export function getCompleteTextureSetup(
  type: 'paper' | 'canvas' | 'grain',
  options: {
    component?: 'card' | 'input' | 'button' | 'modal' | 'overlay';
    intensity?: 'subtle' | 'medium' | 'strong';
    textReadability?: 'normal' | 'strong';
    adaptive?: boolean;
  } = {}
): string {
  const {
    component,
    intensity = 'medium',
    textReadability = 'normal',
    adaptive = true,
  } = options;
  
  const classes: string[] = [];
  
  // Get base texture class
  const textureType = intensity === 'subtle' ? type : 
                     intensity === 'medium' ? type : 
                     `${type}-${intensity}` as any;
  
  const textureClass = getAccessibleTextureClass(textureType, component);
  if (textureClass) {
    classes.push(textureClass);
  }
  
  // Add adaptive intensity if requested
  if (adaptive) {
    classes.push('texture-adaptive-intensity');
  }
  
  // Add readability enhancements
  const readabilityClass = getReadabilityClass(
    getThemeAdaptiveIntensity(intensity)
  );
  classes.push(readabilityClass);
  
  // Add text over texture class
  const textOverTextureClass = getTextOverTextureClass(textReadability);
  classes.push(textOverTextureClass);
  
  return combineClasses(...classes);
}

/**
 * Generate random sketchy shadow variation
 */
export function generateSketchyShadow(
  baseSize: 'sm' | 'md' | 'lg' = 'md',
  intensity: number = 1
): string {
  const shadows = {
    sm: [2, 2, 1, 3],
    md: [3, 4, 1, 6, 2, 2],
    lg: [4, 6, 2, 8, 3, 3],
  };
  
  const [x1, y1, x2, y2, x3, y3] = shadows[baseSize];
  const variation = 0.3 * intensity;
  
  // Add random variation to shadow offsets
  const randomX1 = x1 + (Math.random() - 0.5) * variation * x1;
  const randomY1 = y1 + (Math.random() - 0.5) * variation * y1;
  const randomX2 = x2 + (Math.random() - 0.5) * variation * x2;
  const randomY2 = y2 + (Math.random() - 0.5) * variation * y2;
  
  if (baseSize === 'sm') {
    return `${randomX1}px ${randomY1}px 0px rgba(45, 55, 72, 0.1), ${randomX2}px ${randomY2}px 0px rgba(45, 55, 72, 0.05)`;
  }
  
  const randomX3 = x3 + (Math.random() - 0.5) * variation * x3;
  const randomY3 = y3 + (Math.random() - 0.5) * variation * y3;
  
  return `${randomX1}px ${randomY1}px 0px rgba(45, 55, 72, 0.15), ${randomX2}px ${randomY2}px 0px rgba(45, 55, 72, 0.1), ${randomX3}px ${randomY3}px 0px rgba(45, 55, 72, 0.05)`;
}

/**
 * Apply sketchy shadow with theme awareness
 */
export function getThemeAwareShadow(
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  const baseClass = `shadow-sketchy-${size}`;
  
  // In dark theme, shadows are already handled by CSS custom properties
  // This function can be extended for additional theme-specific logic
  return baseClass;
}
/**
 * Get texture CSS class based on component type and intensity
 */
export function getTextureClass(
  type: 'paper' | 'canvas' | 'grain' | 'grain-subtle' | 'grain-medium' | 'grain-strong' | 'pencil',
  component?: 'card' | 'input' | 'button' | 'modal' | 'overlay'
): string {
  if (component) {
    const componentTextureMap = {
      card: {
        paper: 'bg-card-paper',
        canvas: 'bg-card-canvas',
        grain: 'bg-card-grain',
        'grain-subtle': 'bg-card-grain',
        'grain-medium': 'bg-overlay-grain-medium',
        'grain-strong': 'bg-overlay-grain-strong',
        pencil: 'bg-texture-pencil',
      },
      input: {
        paper: 'bg-input-paper',
        canvas: 'bg-input-canvas',
        grain: 'bg-texture-grain-subtle',
        'grain-subtle': 'bg-texture-grain-subtle',
        'grain-medium': 'bg-texture-grain-medium',
        'grain-strong': 'bg-texture-grain-strong',
        pencil: 'bg-texture-pencil',
      },
      button: {
        paper: 'bg-button-paper',
        canvas: 'bg-button-canvas',
        grain: 'bg-texture-grain-subtle',
        'grain-subtle': 'bg-texture-grain-subtle',
        'grain-medium': 'bg-texture-grain-medium',
        'grain-strong': 'bg-texture-grain-strong',
        pencil: 'bg-texture-pencil',
      },
      modal: {
        paper: 'bg-modal-paper',
        canvas: 'bg-modal-canvas',
        grain: 'bg-texture-grain-subtle',
        'grain-subtle': 'bg-texture-grain-subtle',
        'grain-medium': 'bg-texture-grain-medium',
        'grain-strong': 'bg-texture-grain-strong',
        pencil: 'bg-texture-pencil',
      },
      overlay: {
        paper: 'bg-texture-paper',
        canvas: 'bg-texture-canvas',
        grain: 'bg-overlay-grain-subtle',
        'grain-subtle': 'bg-overlay-grain-subtle',
        'grain-medium': 'bg-overlay-grain-medium',
        'grain-strong': 'bg-overlay-grain-strong',
        pencil: 'bg-texture-pencil',
      },
    };
    
    return componentTextureMap[component][type];
  }
  
  // Default texture classes
  const textureMap = {
    paper: 'bg-texture-paper',
    canvas: 'bg-texture-canvas',
    grain: 'bg-texture-grain',
    'grain-subtle': 'bg-texture-grain-subtle',
    'grain-medium': 'bg-texture-grain-medium',
    'grain-strong': 'bg-texture-grain-strong',
    pencil: 'bg-texture-pencil',
  };
  
  return textureMap[type];
}

/**
 * Get adaptive texture class that responds to theme
 */
export function getAdaptiveTextureClass(
  type: 'paper' | 'canvas' | 'grain'
): string {
  const adaptiveMap = {
    paper: 'bg-texture-adaptive-paper',
    canvas: 'bg-texture-adaptive-canvas',
    grain: 'bg-texture-adaptive-grain',
  };
  
  return adaptiveMap[type];
}

/**
 * Combine background color with texture
 */
export function getCombinedBackgroundClass(
  backgroundColor: 'primary' | 'secondary' | 'tertiary',
  texture?: 'paper' | 'canvas' | 'grain' | 'grain-subtle' | 'grain-medium' | 'grain-strong' | 'pencil'
): string {
  if (!texture) {
    const bgMap = {
      primary: 'bg-sketchy-primary',
      secondary: 'bg-sketchy-secondary',
      tertiary: 'bg-sketchy-tertiary',
    };
    return bgMap[backgroundColor];
  }
  
  // Use predefined combined classes for common combinations
  const combinedMap = {
    primary: {
      paper: 'bg-sketchy-primary',
      canvas: 'bg-sketchy-secondary',
      grain: 'bg-sketchy-tertiary',
    },
    secondary: {
      paper: 'bg-card-paper',
      canvas: 'bg-card-canvas',
      grain: 'bg-card-grain',
    },
    tertiary: {
      paper: 'bg-sketchy-tertiary bg-texture-paper',
      canvas: 'bg-sketchy-tertiary bg-texture-canvas',
      grain: 'bg-sketchy-tertiary bg-texture-grain',
    },
  };
  
  if (combinedMap[backgroundColor][texture as keyof typeof combinedMap.primary]) {
    return combinedMap[backgroundColor][texture as keyof typeof combinedMap.primary];
  }
  
  // Fallback to separate classes
  const bgClass = backgroundColor === 'primary' ? 'bg-sketchy-primary' : 
                  backgroundColor === 'secondary' ? 'bg-sketchy-secondary' : 'bg-sketchy-tertiary';
  const textureClass = getTextureClass(texture);
  
  return combineClasses(bgClass, textureClass);
}

/**
 * Get enhanced sketchy classes with texture support
 */
export function getSketchyClasses(props: SketchyComponentProps): string {
  const classes: string[] = [];
  
  // Add organic border if enabled
  if (props.organic !== false) {
    classes.push('border-organic-md');
  }
  
  // Add texture background with enhanced support
  if (props.texture && props.texture !== 'none') {
    // Check if texture should be applied based on performance
    if (shouldApplyTexture()) {
      const textureClass = getTextureClass(props.texture);
      classes.push(textureClass);
    }
  }
  
  // Add animation classes
  if (props.animated) {
    classes.push('transition-sketchy', 'hover-organic');
  }
  
  // Add size-specific classes
  if (props.size) {
    classes.push(`sketchy-${props.size}`);
  }
  
  // Add variant-specific classes
  if (props.variant && props.variant !== 'default') {
    classes.push(`sketchy-${props.variant}`);
  }
  
  return combineClasses(...classes, props.className);
}

/**
 * Get texture classes for specific component types
 */
export function getComponentTextureClasses(
  component: 'card' | 'input' | 'button' | 'modal' | 'overlay',
  texture: 'paper' | 'canvas' | 'grain' | 'grain-subtle' | 'grain-medium' | 'grain-strong' | 'pencil' = 'paper'
): string {
  if (!shouldApplyTexture()) {
    return '';
  }
  
  return getTextureClass(texture, component);
}

/**
 * Animation configuration presets
 */
export const ANIMATION_PRESETS: Record<string, AnimationConfig> = {
  draw: {
    duration: 800,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  bounce: {
    duration: 300,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  smooth: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  stagger: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    stagger: 100,
  },
};

// ========================================
// CONSTANTS
// ========================================

export const SKETCHY_VARIANTS = ['default', 'outlined', 'filled', 'ghost'] as const;
export const SKETCHY_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
export const TEXTURE_TYPES = ['none', 'paper', 'canvas', 'grain', 'grain-subtle', 'grain-medium', 'grain-strong', 'pencil'] as const;
export const THEME_NAMES = ['light', 'dark'] as const;
export const SHADOW_TYPES = ['none', 'sm', 'md', 'lg'] as const;
export const SHADOW_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export const SHADOW_COLORS = ['blue', 'green', 'red', 'purple'] as const;

export type SketchyVariant = typeof SKETCHY_VARIANTS[number];
export type SketchySize = typeof SKETCHY_SIZES[number];
export type TextureType = typeof TEXTURE_TYPES[number];
export type ThemeName = typeof THEME_NAMES[number];
export type ShadowType = typeof SHADOW_TYPES[number];
export type ShadowDirection = typeof SHADOW_DIRECTIONS[number];
export type ShadowColor = typeof SHADOW_COLORS[number];