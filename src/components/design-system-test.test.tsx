/**
 * Design System Component Tests
 * 
 * These tests verify that the design system components render correctly
 * and that CSS classes are applied properly.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DesignSystemTest } from './design-system-test';

describe('DesignSystemTest Component', () => {
  it('should render without crashing', () => {
    render(<DesignSystemTest />);
    expect(screen.getByText('Hand-Drawn Design System')).toBeInTheDocument();
  });

  it('should display typography scale elements', () => {
    render(<DesignSystemTest />);
    
    // Check for typography scale elements
    expect(screen.getByText('5XL - Display Heading')).toBeInTheDocument();
    expect(screen.getByText('4XL - Large Heading')).toBeInTheDocument();
    expect(screen.getByText('3XL - Section Heading')).toBeInTheDocument();
    expect(screen.getByText('Base - Body Text')).toBeInTheDocument();
    expect(screen.getByText('XS - Caption Text')).toBeInTheDocument();
  });

  it('should display semantic typography elements', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Form Label Text')).toBeInTheDocument();
    expect(screen.getByText('Large Label Text')).toBeInTheDocument();
    expect(screen.getByText('Caption text for additional context')).toBeInTheDocument();
  });

  it('should display responsive typography elements', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('5XL Fluid - Scales with viewport')).toBeInTheDocument();
    expect(screen.getByText('Base Fluid - Body text that scales')).toBeInTheDocument();
    expect(screen.getByText('H1 Fluid - Main heading')).toBeInTheDocument();
  });

  it('should display organic variation elements', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Text with organic rotation (-0.5deg)')).toBeInTheDocument();
    expect(screen.getByText('Alternative organic rotation (0.3deg)')).toBeInTheDocument();
    expect(screen.getByText('Subtle organic rotation (-0.1deg)')).toBeInTheDocument();
    expect(screen.getByText('Emphasis organic rotation (0.8deg)')).toBeInTheDocument();
  });

  it('should display accessibility features information', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Accessibility Features')).toBeInTheDocument();
    expect(screen.getByText(/Responsive Design:/)).toBeInTheDocument();
    expect(screen.getByText(/Reduced Motion:/)).toBeInTheDocument();
    expect(screen.getByText(/Mobile Optimization:/)).toBeInTheDocument();
    expect(screen.getByText(/High DPI Support:/)).toBeInTheDocument();
  });

  it('should display interactive typography elements', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Hover me for organic animation')).toBeInTheDocument();
    expect(screen.getByText('Alternative hover animation')).toBeInTheDocument();
  });

  it('should display color palette section', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Color Palette')).toBeInTheDocument();
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Accent Blue')).toBeInTheDocument();
    expect(screen.getByText('Accent Green')).toBeInTheDocument();
  });

  it('should display borders and shadows section', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Organic Borders & Shadows')).toBeInTheDocument();
    expect(screen.getByText('Small organic border')).toBeInTheDocument();
    expect(screen.getByText('Medium organic border')).toBeInTheDocument();
    expect(screen.getByText('Large organic border')).toBeInTheDocument();
  });

  it('should display texture backgrounds section', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Texture Backgrounds')).toBeInTheDocument();
    expect(screen.getByText('Paper Texture')).toBeInTheDocument();
    expect(screen.getByText('Canvas Texture')).toBeInTheDocument();
    expect(screen.getByText('Grain Texture')).toBeInTheDocument();
  });

  it('should display drawing animation system section', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Drawing Animation System')).toBeInTheDocument();
    expect(screen.getByText('Trigger Drawing Animations')).toBeInTheDocument();
    expect(screen.getByText('Card Drawing Animation')).toBeInTheDocument();
    expect(screen.getByText('Button Drawing Animation')).toBeInTheDocument();
  });

  it('should display theme system section', () => {
    render(<DesignSystemTest />);
    
    expect(screen.getByText('Theme System')).toBeInTheDocument();
    expect(screen.getByText('Toggle Dark/Light Theme')).toBeInTheDocument();
  });

  it('should have proper CSS classes applied', () => {
    render(<DesignSystemTest />);
    
    // Check for main container classes
    const mainContainer = screen.getByText('Hand-Drawn Design System').closest('div');
    expect(mainContainer).toHaveClass('p-8', 'space-y-8', 'bg-sketchy-primary');
    
    // Check for heading classes
    const mainHeading = screen.getByText('Hand-Drawn Design System');
    expect(mainHeading).toHaveClass('heading-organic-1', 'text-sketchy-primary');
    
    // Check for typography classes
    const displayText = screen.getByText('5XL - Display Heading');
    expect(displayText).toHaveClass('text-5xl-organic', 'text-sketchy-primary');
    
    // Check for body text classes
    const bodyText = screen.getByText(/This is body text using Nunito/);
    expect(bodyText).toHaveClass('body-organic', 'text-sketchy-text-primary');
  });

  it('should have interactive elements with proper classes', () => {
    render(<DesignSystemTest />);
    
    // Check hover elements
    const hoverElement = screen.getByText('Hover me for organic animation');
    expect(hoverElement).toHaveClass('text-organic-hover', 'text-sketchy-primary', 'text-lg', 'cursor-pointer');
    
    // Check buttons
    const animationTriggerButton = screen.getByText('Trigger Drawing Animations');
    expect(animationTriggerButton).toHaveClass('px-6', 'py-3', 'bg-sketchy-secondary', 'border-organic-md', 'border-sketchy', 'shadow-sketchy-md', 'transition-sketchy', 'label-organic');
    
    const themeToggleButton = screen.getByText('Toggle Dark/Light Theme');
    expect(themeToggleButton).toHaveClass('px-6', 'py-3', 'bg-sketchy-primary', 'text-white', 'border-organic-md', 'border-sketchy', 'shadow-sketchy-md', 'hover-organic', 'transition-sketchy', 'label-organic');
  });
});