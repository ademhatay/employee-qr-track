import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { 
  getDrawingAnimationClass, 
  getBorderDrawingClass, 
  getStaggeredAnimationClass,
  shouldEnableAnimations,
  getHoverSketchingClass,
  getAnimationAwareClasses
} from '@/lib/design-system';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Animation System Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDrawingAnimationClass', () => {
    it('should return correct animation class for different components', () => {
      expect(getDrawingAnimationClass('card')).toBe('animate-draw-card');
      expect(getDrawingAnimationClass('button')).toBe('animate-draw-button');
      expect(getDrawingAnimationClass('input')).toBe('animate-draw-input');
      expect(getDrawingAnimationClass('text')).toBe('animate-draw-text');
      expect(getDrawingAnimationClass('list-item')).toBe('animate-draw-list-item');
      expect(getDrawingAnimationClass('modal')).toBe('animate-draw-modal');
      expect(getDrawingAnimationClass('page')).toBe('animate-draw-page');
      expect(getDrawingAnimationClass('generic')).toBe('animate-draw-reveal');
      expect(getDrawingAnimationClass()).toBe('animate-draw-reveal');
    });
  });

  describe('getBorderDrawingClass', () => {
    it('should return correct border animation class for different types', () => {
      expect(getBorderDrawingClass('basic')).toBe('animate-border-draw');
      expect(getBorderDrawingClass('hover')).toBe('border-draw-hover');
      expect(getBorderDrawingClass('realtime')).toBe('border-draw-realtime');
      expect(getBorderDrawingClass('pencil')).toBe('border-pencil-stroke');
      expect(getBorderDrawingClass('focus')).toBe('border-draw-focus');
      expect(getBorderDrawingClass('continuous')).toBe('border-continuous-sketch');
      expect(getBorderDrawingClass()).toBe('animate-border-draw');
    });
  });

  describe('getStaggeredAnimationClass', () => {
    it('should return correct staggered animation class with index', () => {
      expect(getStaggeredAnimationClass(0)).toBe('animate-draw-stagger animate-draw-stagger-1');
      expect(getStaggeredAnimationClass(1)).toBe('animate-draw-stagger animate-draw-stagger-2');
      expect(getStaggeredAnimationClass(5)).toBe('animate-draw-stagger animate-draw-stagger-6');
      expect(getStaggeredAnimationClass(15)).toBe('animate-draw-stagger animate-draw-stagger-10'); // max 10
    });
  });

  describe('shouldEnableAnimations', () => {
    it('should return true when reduced motion is not preferred', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? false : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(shouldEnableAnimations()).toBe(true);
    });

    it('should return false when reduced motion is preferred', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? true : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(shouldEnableAnimations()).toBe(false);
    });
  });

  describe('getHoverSketchingClass', () => {
    it('should return hover-sketch class when animations are enabled', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(getHoverSketchingClass()).toBe('hover-sketch');
    });

    it('should return empty string when animations are disabled', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? true : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(getHoverSketchingClass()).toBe('');
    });
  });

  describe('getAnimationAwareClasses', () => {
    it('should include animation classes when animations are enabled', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const result = getAnimationAwareClasses('base-class', 'animation-class');
      expect(result).toBe('base-class animation-class');
    });

    it('should exclude animation classes when animations are disabled', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? true : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const result = getAnimationAwareClasses('base-class', 'animation-class');
      expect(result).toBe('base-class');
    });
  });
});

// Test component to verify animations work in React
function TestAnimationComponent() {
  return (
    <div>
      <div className={getDrawingAnimationClass('card')}>Card Animation</div>
      <div className={getBorderDrawingClass('hover')}>Border Animation</div>
      <div className={getStaggeredAnimationClass(0)}>Staggered Item</div>
      <div className={getHoverSketchingClass()}>Hover Sketching</div>
    </div>
  );
}

describe('Animation Component Integration', () => {
  it('should render component with animation classes', () => {
    render(<TestAnimationComponent />);
    
    expect(screen.getByText('Card Animation')).toHaveClass('animate-draw-card');
    expect(screen.getByText('Border Animation')).toHaveClass('border-draw-hover');
    expect(screen.getByText('Staggered Item')).toHaveClass('animate-draw-stagger', 'animate-draw-stagger-1');
  });
});