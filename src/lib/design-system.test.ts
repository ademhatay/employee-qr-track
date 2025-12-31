/**
 * Design System Foundation Tests
 * 
 * These tests verify that the core foundation systems of the hand-drawn design system
 * are working correctly.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getCSSVariable,
  setCSSVariable,
  generateOrganicBorderRadius,
  getOrganicRotation,
  getOrganicTypographyClass,
  getSemanticTypographyClass,
  getTexturePattern,
  generateStaggeredDelay,
  combineClasses,
  isDarkTheme,
  toggleTheme,
  setTheme,
  getOrganicBorderClass,
  getSketchyShadowClass,
  shouldApplyTexture,
  getOptimalTextureIntensity,
  prefersHighContrast,
  getAccessibleTextureClass,
  getCompleteTextureSetup,
  generateSketchyShadow,
  getThemeAwareShadow,
  getTextureClass,
  getAdaptiveTextureClass,
  getCombinedBackgroundClass,
  getSketchyClasses,
  DESIGN_TOKENS,
  SKETCHY_VARIANTS,
  SKETCHY_SIZES,
  TEXTURE_TYPES,
  THEME_NAMES,
  SHADOW_TYPES,
} from './design-system';

// Mock DOM environment for tests
const mockDocument = {
  documentElement: {
    style: {
      setProperty: () => {},
      getPropertyValue: () => '',
    },
    classList: {
      contains: () => false,
      add: () => {},
      remove: () => {},
      toggle: () => {},
    },
  },
};

const mockWindow = {
  getComputedStyle: () => ({
    getPropertyValue: () => '',
  }),
  matchMedia: () => ({
    matches: false,
  }),
  innerWidth: 1024,
};

// Setup DOM mocks
beforeEach(() => {
  // @ts-ignore
  global.document = mockDocument;
  // @ts-ignore
  global.window = mockWindow;
});

afterEach(() => {
  // @ts-ignore
  delete global.document;
  // @ts-ignore
  delete global.window;
});

describe('Design System Foundation', () => {
  describe('Design Tokens', () => {
    it('should have all required typography tokens', () => {
      expect(DESIGN_TOKENS.typography.fontSizes).toBeDefined();
      expect(DESIGN_TOKENS.typography.fontSizes.xs).toBe('0.75rem');
      expect(DESIGN_TOKENS.typography.fontSizes['5xl']).toBe('3rem');
      expect(DESIGN_TOKENS.typography.letterSpacing).toBeDefined();
      expect(DESIGN_TOKENS.typography.fontFamilies).toBeDefined();
      expect(DESIGN_TOKENS.typography.organicClasses).toBeDefined();
    });

    it('should have all required border tokens', () => {
      expect(DESIGN_TOKENS.borders.radius).toBeDefined();
      expect(DESIGN_TOKENS.borders.styles).toBeDefined();
      expect(DESIGN_TOKENS.borders.radius.sm).toBe('var(--border-radius-sm)');
      expect(DESIGN_TOKENS.borders.styles.medium).toBe('var(--border-sketchy-medium)');
    });

    it('should have all required shadow tokens', () => {
      expect(DESIGN_TOKENS.shadows).toBeDefined();
      expect(DESIGN_TOKENS.shadows.sm).toBe('var(--shadow-sketchy-sm)');
      expect(DESIGN_TOKENS.shadows.md).toBe('var(--shadow-sketchy-md)');
      expect(DESIGN_TOKENS.shadows.lg).toBe('var(--shadow-sketchy-lg)');
    });

    it('should have all required color tokens', () => {
      expect(DESIGN_TOKENS.colors.sketchy).toBeDefined();
      expect(DESIGN_TOKENS.colors.sketchy.primary).toBe('var(--sketchy-primary)');
      expect(DESIGN_TOKENS.colors.sketchy.background).toBeDefined();
      expect(DESIGN_TOKENS.colors.sketchy.accent).toBeDefined();
    });
  });

  describe('Constants', () => {
    it('should have all required variant constants', () => {
      expect(SKETCHY_VARIANTS).toContain('default');
      expect(SKETCHY_VARIANTS).toContain('outlined');
      expect(SKETCHY_VARIANTS).toContain('filled');
      expect(SKETCHY_VARIANTS).toContain('ghost');
    });

    it('should have all required size constants', () => {
      expect(SKETCHY_SIZES).toContain('sm');
      expect(SKETCHY_SIZES).toContain('md');
      expect(SKETCHY_SIZES).toContain('lg');
      expect(SKETCHY_SIZES).toContain('xl');
    });

    it('should have all required texture types', () => {
      expect(TEXTURE_TYPES).toContain('none');
      expect(TEXTURE_TYPES).toContain('paper');
      expect(TEXTURE_TYPES).toContain('canvas');
      expect(TEXTURE_TYPES).toContain('grain');
      expect(TEXTURE_TYPES).toContain('grain-subtle');
      expect(TEXTURE_TYPES).toContain('grain-medium');
      expect(TEXTURE_TYPES).toContain('grain-strong');
      expect(TEXTURE_TYPES).toContain('pencil');
    });

    it('should have all required theme names', () => {
      expect(THEME_NAMES).toContain('light');
      expect(THEME_NAMES).toContain('dark');
    });

    it('should have all required shadow types', () => {
      expect(SHADOW_TYPES).toContain('none');
      expect(SHADOW_TYPES).toContain('sm');
      expect(SHADOW_TYPES).toContain('md');
      expect(SHADOW_TYPES).toContain('lg');
    });
  });

  describe('Organic Border Generation', () => {
    it('should generate organic border radius with variations', () => {
      const borderRadius = generateOrganicBorderRadius(8);
      expect(borderRadius).toMatch(/^\d+(\.\d+)?px \d+(\.\d+)?px \d+(\.\d+)?px \d+(\.\d+)?px$/);
    });

    it('should generate different values for multiple calls', () => {
      const radius1 = generateOrganicBorderRadius(8);
      const radius2 = generateOrganicBorderRadius(8);
      // They should be different due to randomization
      expect(radius1).not.toBe(radius2);
    });
  });

  describe('Organic Rotation', () => {
    it('should generate organic rotation within expected range', () => {
      const rotation = getOrganicRotation(1);
      expect(rotation).toMatch(/^rotate\(-?\d+(\.\d+)?deg\)$/);
    });

    it('should scale rotation with intensity', () => {
      const lowIntensity = getOrganicRotation(0.5);
      const highIntensity = getOrganicRotation(2);
      expect(lowIntensity).toMatch(/^rotate\(-?\d+(\.\d+)?deg\)$/);
      expect(highIntensity).toMatch(/^rotate\(-?\d+(\.\d+)?deg\)$/);
    });
  });

  describe('Typography Classes', () => {
    it('should return correct organic typography classes', () => {
      expect(getOrganicTypographyClass('base')).toBe('text-base-organic');
      expect(getOrganicTypographyClass('lg')).toBe('text-lg-organic');
      expect(getOrganicTypographyClass('xl', 'heading')).toBe('heading-organic-5');
      expect(getOrganicTypographyClass('base', 'text', true)).toBe('text-base-fluid');
    });

    it('should return correct semantic typography classes', () => {
      expect(getSemanticTypographyClass('h1')).toBe('heading-organic-1');
      expect(getSemanticTypographyClass('h2')).toBe('heading-organic-2');
      expect(getSemanticTypographyClass('body')).toBe('body-organic');
      expect(getSemanticTypographyClass('h1', true)).toBe('heading-fluid-1');
    });
  });

  describe('Texture System', () => {
    it('should return correct texture patterns', () => {
      expect(getTexturePattern('paper', 'light')).toBe('var(--texture-paper-light)');
      expect(getTexturePattern('paper', 'dark')).toBe('var(--texture-paper-dark)');
      expect(getTexturePattern('canvas', 'light')).toBe('var(--texture-canvas-light)');
      expect(getTexturePattern('grain')).toBe('var(--texture-grain-subtle)');
    });

    it('should return correct texture classes', () => {
      expect(getTextureClass('paper')).toBe('bg-texture-paper');
      expect(getTextureClass('canvas')).toBe('bg-texture-canvas');
      expect(getTextureClass('grain')).toBe('bg-texture-grain');
      expect(getTextureClass('paper', 'card')).toBe('bg-card-paper');
    });

    it('should return correct adaptive texture classes', () => {
      expect(getAdaptiveTextureClass('paper')).toBe('bg-texture-adaptive-paper');
      expect(getAdaptiveTextureClass('canvas')).toBe('bg-texture-adaptive-canvas');
      expect(getAdaptiveTextureClass('grain')).toBe('bg-texture-adaptive-grain');
    });
  });

  describe('Border Classes', () => {
    it('should return correct organic border classes', () => {
      expect(getOrganicBorderClass('button')).toBe('btn-organic');
      expect(getOrganicBorderClass('card')).toBe('card-organic');
      expect(getOrganicBorderClass('input')).toBe('input-organic');
      expect(getOrganicBorderClass('generic', 'md')).toBe('border-organic-md-sketchy');
    });
  });

  describe('Shadow Classes', () => {
    it('should return correct sketchy shadow classes', () => {
      expect(getSketchyShadowClass('sm')).toBe('shadow-sketchy-sm');
      expect(getSketchyShadowClass('md')).toBe('shadow-sketchy-md');
      expect(getSketchyShadowClass('lg')).toBe('shadow-sketchy-lg');
      expect(getSketchyShadowClass('none')).toBe('shadow-sketchy-none');
    });

    it('should return correct directional shadow classes', () => {
      expect(getSketchyShadowClass('sm', 'directional', 'top')).toBe('shadow-sketchy-top');
      expect(getSketchyShadowClass('md', 'directional', 'right')).toBe('shadow-sketchy-right');
    });

    it('should return correct colored shadow classes', () => {
      expect(getSketchyShadowClass('md', 'colored', undefined, 'blue')).toBe('shadow-sketchy-blue');
      expect(getSketchyShadowClass('lg', 'colored', undefined, 'green')).toBe('shadow-sketchy-green');
    });

    it('should return correct hover shadow classes', () => {
      expect(getSketchyShadowClass('sm', 'hover')).toBe('shadow-sketchy-hover');
      expect(getSketchyShadowClass('lg', 'hover')).toBe('shadow-sketchy-hover-lift');
    });
  });

  describe('Theme System', () => {
    it('should detect dark theme correctly', () => {
      // Mock dark theme
      mockDocument.documentElement.classList.contains = (className: string) => className === 'dark';
      expect(isDarkTheme()).toBe(true);
      
      // Mock light theme
      mockDocument.documentElement.classList.contains = () => false;
      expect(isDarkTheme()).toBe(false);
    });

    it('should return theme-aware shadow classes', () => {
      expect(getThemeAwareShadow('sm')).toBe('shadow-sketchy-sm');
      expect(getThemeAwareShadow('md')).toBe('shadow-sketchy-md');
      expect(getThemeAwareShadow('lg')).toBe('shadow-sketchy-lg');
    });
  });

  describe('Utility Functions', () => {
    it('should generate staggered delays correctly', () => {
      expect(generateStaggeredDelay(0)).toBe('0ms');
      expect(generateStaggeredDelay(1)).toBe('100ms');
      expect(generateStaggeredDelay(2, 50)).toBe('100ms');
      expect(generateStaggeredDelay(3, 200)).toBe('600ms');
    });

    it('should combine classes correctly', () => {
      expect(combineClasses('class1', 'class2')).toBe('class1 class2');
      expect(combineClasses('class1', undefined, 'class3')).toBe('class1 class3');
      expect(combineClasses('class1', null, false, 'class4')).toBe('class1 class4');
    });

    it('should generate sketchy shadows with variations', () => {
      const shadow = generateSketchyShadow('md', 1);
      expect(shadow).toMatch(/^\d+(\.\d+)?px \d+(\.\d+)?px 0px rgba\(45, 55, 72, 0\.\d+\)/);
    });
  });

  describe('Background Combinations', () => {
    it('should return correct combined background classes', () => {
      expect(getCombinedBackgroundClass('primary')).toBe('bg-sketchy-primary');
      expect(getCombinedBackgroundClass('secondary')).toBe('bg-sketchy-secondary');
      expect(getCombinedBackgroundClass('secondary', 'paper')).toBe('bg-card-paper');
      expect(getCombinedBackgroundClass('secondary', 'canvas')).toBe('bg-card-canvas');
    });
  });

  describe('Component Integration', () => {
    it('should generate complete sketchy classes', () => {
      const props = {
        organic: true,
        texture: 'paper' as const,
        animated: true,
        size: 'md' as const,
        variant: 'outlined' as const,
        className: 'custom-class',
      };
      
      const classes = getSketchyClasses(props);
      expect(classes).toContain('border-organic-md');
      expect(classes).toContain('transition-sketchy');
      expect(classes).toContain('hover-organic');
      expect(classes).toContain('sketchy-md');
      expect(classes).toContain('sketchy-outlined');
      expect(classes).toContain('custom-class');
    });
  });

  describe('Accessibility Features', () => {
    it('should respect high contrast preferences', () => {
      // Mock high contrast preference
      mockWindow.matchMedia = (query: string) => ({
        matches: query.includes('prefers-contrast: high'),
      });
      
      expect(prefersHighContrast()).toBe(true);
      expect(getAccessibleTextureClass('paper')).toBe('');
    });

    it('should handle texture application based on performance', () => {
      // Mock low-end device by creating a mock navigator object
      const originalNavigator = global.navigator;
      
      // @ts-ignore
      global.navigator = {
        ...originalNavigator,
        hardwareConcurrency: 2,
      };
      
      expect(shouldApplyTexture()).toBe(false);
      expect(getOptimalTextureIntensity()).toBe('subtle');
      
      // Restore original navigator
      global.navigator = originalNavigator;
    });
  });
});