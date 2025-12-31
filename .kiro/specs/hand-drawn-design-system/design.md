# Design Document: Hand-Drawn Design System

## Overview

Employee QR Track için benzersiz bir "sketchy" hand-drawn aesthetic tasarım sistemi. Bu sistem, geleneksel kurumsal yazılım görünümünden uzaklaşarak organik, samimi ve akılda kalıcı bir kullanıcı deneyimi yaratır. Tasarım, el çizimi estetiğini modern web teknolojileriyle birleştirerek hem görsel çekicilik hem de fonksiyonellik sağlar.

**Temel Tasarım Felsefesi:** "Imperfectly Perfect" - Mükemmel olmayan ama kasıtlı organik tasarım

## Architecture

### Design Token System
```
Design Tokens
├── Typography Scale (Hand-lettered hierarchy)
├── Color Palette (Organic, earthy tones)
├── Spacing System (Irregular but consistent)
├── Border Radius (Organic, imperfect curves)
├── Shadow System (Sketchy, layered shadows)
├── Animation Timing (Drawing-like easing)
└── Texture Library (Paper, canvas, pencil effects)
```

### Component Hierarchy
```
Base Layer (CSS Custom Properties)
├── Theme Engine (Light/Dark variants)
├── Typography System (Display + Body fonts)
├── Color System (Semantic color mapping)
└── Texture System (Background patterns)

Component Layer
├── Primitive Components (Button, Input, Card)
├── Composite Components (Forms, Tables, Modals)
├── Layout Components (Grid, Flex, Container)
└── Specialized Components (QR Scanner, Dashboard widgets)

Animation Layer
├── Micro-interactions (Hover, focus states)
├── Page Transitions (Drawing reveals)
├── Loading States (Sketching animations)
└── Gesture Feedback (Touch responses)
```

## Components and Interfaces

### Typography System

**Display Typography:**
- Primary: "Kalam" (Google Fonts) - Hand-written feel, multiple weights
- Secondary: "Caveat" (Google Fonts) - Casual script for accents
- Monospace: "JetBrains Mono" - Technical content with character

**Body Typography:**
- Primary: "Nunito" - Rounded, friendly sans-serif
- Secondary: "Source Sans Pro" - Clean, readable fallback

**Typography Scale:**
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
```

### Color System

**Light Theme Palette:**
```css
/* Primary Colors - Charcoal sketches on cream paper */
--color-primary: #2D3748;        /* Deep charcoal */
--color-primary-light: #4A5568;  /* Medium charcoal */
--color-primary-dark: #1A202C;   /* Dark charcoal */

/* Secondary Colors - Warm earth tones */
--color-secondary: #D69E2E;      /* Warm amber */
--color-secondary-light: #F6E05E; /* Light amber */
--color-secondary-dark: #B7791F;  /* Deep amber */

/* Background Colors - Paper textures */
--color-bg-primary: #FFFEF7;     /* Cream paper */
--color-bg-secondary: #F7FAFC;   /* Light gray paper */
--color-bg-tertiary: #EDF2F7;    /* Medium gray paper */

/* Accent Colors - Natural highlights */
--color-accent-green: #38A169;   /* Forest green */
--color-accent-blue: #3182CE;    /* Ocean blue */
--color-accent-red: #E53E3E;     /* Warm red */
--color-accent-purple: #805AD5;  /* Muted purple */
```

**Dark Theme Palette:**
```css
/* Primary Colors - Light sketches on dark paper */
--color-primary: #F7FAFC;        /* Light cream */
--color-primary-light: #E2E8F0;  /* Medium cream */
--color-primary-dark: #CBD5E0;   /* Darker cream */

/* Background Colors - Dark paper textures */
--color-bg-primary: #1A202C;     /* Dark charcoal paper */
--color-bg-secondary: #2D3748;   /* Medium charcoal */
--color-bg-tertiary: #4A5568;    /* Light charcoal */
```

### Border and Shape System

**Organic Border Radius:**
```css
--border-radius-sm: 0.25rem 0.3rem 0.2rem 0.35rem;
--border-radius-md: 0.5rem 0.6rem 0.4rem 0.55rem;
--border-radius-lg: 0.75rem 0.8rem 0.7rem 0.85rem;
--border-radius-xl: 1rem 1.1rem 0.9rem 1.05rem;
```

**Sketchy Borders:**
```css
--border-sketchy: 2px solid var(--color-primary);
--border-sketchy-dashed: 2px dashed var(--color-primary);
--border-sketchy-thick: 3px solid var(--color-primary);
```

### Shadow System

**Layered Sketchy Shadows:**
```css
--shadow-sketchy-sm: 
  2px 2px 0px rgba(45, 55, 72, 0.1),
  1px 3px 0px rgba(45, 55, 72, 0.05);

--shadow-sketchy-md: 
  3px 4px 0px rgba(45, 55, 72, 0.15),
  1px 6px 0px rgba(45, 55, 72, 0.1),
  2px 2px 0px rgba(45, 55, 72, 0.05);

--shadow-sketchy-lg: 
  4px 6px 0px rgba(45, 55, 72, 0.2),
  2px 8px 0px rgba(45, 55, 72, 0.15),
  3px 3px 0px rgba(45, 55, 72, 0.1);
```

## Data Models

### Theme Configuration
```typescript
interface SketchyTheme {
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

interface FontFamily {
  name: string;
  weights: number[];
  fallback: string[];
}
```

### Component Variants
```typescript
interface SketchyComponentProps {
  variant?: 'default' | 'outlined' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  organic?: boolean; // Enable organic borders
  animated?: boolean; // Enable drawing animations
  texture?: 'none' | 'paper' | 'canvas' | 'grain';
}

interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  stagger?: number; // For list animations
}
```

### Texture System
```typescript
interface TextureLibrary {
  paper: {
    light: string; // CSS background pattern
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
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Organic Border Consistency
*For any* UI component in the design system, all borders should use organic border-radius values from the design token system rather than perfect geometric shapes
**Validates: Requirements 1.1**

### Property 2: Hand-Drawn Typography Enforcement
*For any* text element, display text should use Kalam or Caveat fonts while body text uses Nunito, avoiding generic fonts like Inter, Roboto, or system fonts
**Validates: Requirements 2.1, 2.2, 2.4**

### Property 3: Texture Background Implementation
*For any* background element, textures should be implemented using CSS patterns (paper, canvas, grain) rather than solid colors
**Validates: Requirements 1.3, 6.1, 6.2**

### Property 4: Theme Color Consistency
*For any* theme (light or dark), all color values should be defined as CSS custom properties and match the specified organic palette
**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 5: Component Variant Coverage
*For any* existing shadcn/ui component, there should be a corresponding sketchy variant that maintains the same API while adding organic styling
**Validates: Requirements 3.1, 3.5**

### Property 6: Accessibility Compliance Preservation
*For any* styled component, WCAG contrast ratios should be maintained and keyboard navigation should remain functional despite visual enhancements
**Validates: Requirements 3.4, 5.5**

### Property 7: Animation Drawing Style
*For any* component with animations, reveal animations should simulate drawing effects and list items should use staggered timing
**Validates: Requirements 4.1, 4.2, 4.3**

### Property 8: Icon System Consistency
*For any* icon element, it should use SVG format with sketchy styling and consistent stroke weights while maintaining semantic meaning
**Validates: Requirements 7.1, 7.3, 7.4, 7.5**

### Property 9: Responsive Organic Scaling
*For any* screen size, components should maintain organic proportions and sketchy aesthetic while ensuring touch targets meet accessibility requirements on mobile
**Validates: Requirements 8.1, 8.2, 8.3**

### Property 10: Framework Integration Compatibility
*For any* existing React component, the sketchy design system should integrate seamlessly with TanStack Router, Zustand state management, and React Hook Form without breaking existing functionality
**Validates: Requirements 10.1, 10.2, 10.3, 10.4**

## Error Handling

### Theme Loading Failures
- Graceful fallback to default light theme if custom theme fails to load
- CSS custom property fallbacks for unsupported browsers
- Progressive enhancement for advanced visual effects

### Font Loading Strategies
- Font display: swap for immediate text rendering
- System font fallbacks for each font family
- Loading states during font download

### Animation Performance
- Respect `prefers-reduced-motion` for accessibility
- Disable complex animations on low-performance devices
- Fallback to CSS transitions if JavaScript animations fail

### Texture Loading
- CSS-only texture patterns as primary implementation
- Graceful degradation to solid colors if patterns fail
- Lazy loading for complex background textures

## Testing Strategy

### Dual Testing Approach
The design system requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests:**
- Specific component rendering with correct styles
- Theme switching functionality
- Accessibility compliance verification
- Integration with existing React components

**Property-Based Tests:**
- Universal properties across all components (organic borders, typography, colors)
- Theme consistency across component variants
- Animation behavior verification
- Responsive design validation

### Property-Based Testing Configuration
- **Framework:** fast-check for TypeScript/React property testing
- **Iterations:** Minimum 100 iterations per property test
- **Test Tags:** Each property test references its design document property
- **Coverage:** All correctness properties must have corresponding property-based tests

### Testing Tools and Setup
- **Component Testing:** React Testing Library for component behavior
- **Visual Regression:** Chromatic or similar for visual consistency
- **Accessibility Testing:** axe-core for WCAG compliance
- **Performance Testing:** Lighthouse CI for animation performance
- **Cross-browser Testing:** Playwright for compatibility verification

### Test Organization
```
tests/
├── unit/
│   ├── components/         # Individual component tests
│   ├── themes/            # Theme switching tests
│   └── integration/       # Framework integration tests
├── property/
│   ├── typography.test.ts # Typography property tests
│   ├── colors.test.ts     # Color system property tests
│   ├── borders.test.ts    # Organic border property tests
│   └── animations.test.ts # Animation property tests
└── visual/
    ├── components/        # Visual regression tests
    └── themes/           # Theme visual tests
```

Each property-based test must include the tag format:
**Feature: hand-drawn-design-system, Property {number}: {property_text}**