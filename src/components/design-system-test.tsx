/**
 * Design System Test Component
 * 
 * This component demonstrates the hand-drawn design system foundation
 * and can be used to verify that all design tokens are working correctly.
 */

import React, { useState } from 'react';
import { 
  getDrawingAnimationClass, 
  getBorderDrawingClass, 
  getStaggeredAnimationClass,
  getHoverSketchingClass,
  combineClasses
} from '@/lib/design-system';

export function DesignSystemTest() {
  const [showAnimations, setShowAnimations] = useState(false);

  const triggerAnimations = () => {
    setShowAnimations(false);
    setTimeout(() => setShowAnimations(true), 100);
  };
  return (
    <div className="p-8 space-y-8 bg-sketchy-primary">
      {/* Organic Typography Scale Test */}
      <section className="space-y-6">
        <h1 className="heading-organic-1 text-sketchy-primary">
          Hand-Drawn Design System
        </h1>
        <h2 className="heading-organic-2 text-sketchy-secondary">
          Organic Typography Showcase
        </h2>
        
        {/* Typography Scale Demonstration */}
        <div className="space-y-3">
          <h3 className="heading-organic-3 text-sketchy-primary">Typography Scale</h3>
          <div className="text-5xl-organic text-sketchy-primary">5XL - Display Heading</div>
          <div className="text-4xl-organic text-sketchy-primary">4XL - Large Heading</div>
          <div className="text-3xl-organic text-sketchy-primary">3XL - Section Heading</div>
          <div className="text-2xl-organic text-sketchy-primary">2XL - Subsection</div>
          <div className="text-xl-organic text-sketchy-primary">XL - Large Text</div>
          <div className="text-lg-organic text-sketchy-primary">LG - Prominent Text</div>
          <div className="text-base-organic text-sketchy-primary">Base - Body Text</div>
          <div className="text-sm-organic text-sketchy-primary">SM - Small Text</div>
          <div className="text-xs-organic text-sketchy-primary">XS - Caption Text</div>
        </div>

        {/* Semantic Typography */}
        <div className="space-y-3">
          <h3 className="heading-organic-3 text-sketchy-primary">Semantic Typography</h3>
          <div className="body-organic text-sketchy-text-primary">
            This is body text using Nunito with organic letter spacing. It maintains readability 
            while adding character through subtle spacing adjustments.
          </div>
          <div className="body-organic-large text-sketchy-text-primary">
            Large body text for emphasis and better readability in key sections.
          </div>
          <div className="body-organic-small text-sketchy-text-secondary">
            Small body text for secondary information and captions.
          </div>
          <div className="label-organic text-sketchy-primary">Form Label Text</div>
          <div className="label-organic-large text-sketchy-primary">Large Label Text</div>
          <div className="caption-organic text-sketchy-text-muted">Caption text for additional context</div>
          <div className="text-accent-organic text-sketchy-secondary">Accent text using Caveat font</div>
        </div>

        {/* Responsive Typography */}
        <div className="space-y-3">
          <h3 className="heading-organic-3 text-sketchy-primary">Responsive Typography (Fluid Scaling)</h3>
          <div className="text-5xl-fluid text-sketchy-primary">5XL Fluid - Scales with viewport</div>
          <div className="text-4xl-fluid text-sketchy-primary">4XL Fluid - Responsive heading</div>
          <div className="text-3xl-fluid text-sketchy-primary">3XL Fluid - Adaptive size</div>
          <div className="text-2xl-fluid text-sketchy-primary">2XL Fluid - Viewport aware</div>
          <div className="text-xl-fluid text-sketchy-primary">XL Fluid - Scales smoothly</div>
          <div className="text-lg-fluid text-sketchy-primary">LG Fluid - Responsive text</div>
          <div className="text-base-fluid text-sketchy-primary">Base Fluid - Body text that scales</div>
          <div className="text-sm-fluid text-sketchy-primary">SM Fluid - Small responsive text</div>
          <div className="text-xs-fluid text-sketchy-primary">XS Fluid - Tiny responsive text</div>
        </div>

        {/* Responsive Headings */}
        <div className="space-y-3">
          <h3 className="heading-organic-3 text-sketchy-primary">Responsive Headings</h3>
          <div className="heading-fluid-1 text-sketchy-primary">H1 Fluid - Main heading</div>
          <div className="heading-fluid-2 text-sketchy-primary">H2 Fluid - Section heading</div>
          <div className="heading-fluid-3 text-sketchy-primary">H3 Fluid - Subsection heading</div>
          <div className="heading-fluid-4 text-sketchy-primary">H4 Fluid - Minor heading</div>
          <div className="heading-fluid-5 text-sketchy-primary">H5 Fluid - Small heading</div>
          <div className="heading-fluid-6 text-sketchy-primary">H6 Fluid - Smallest heading</div>
        </div>

        {/* Responsive Body Text */}
        <div className="space-y-3">
          <h3 className="heading-organic-3 text-sketchy-primary">Responsive Body Text</h3>
          <div className="body-fluid text-sketchy-text-primary">
            This is responsive body text that scales fluidly with the viewport. It maintains 
            readability across all screen sizes while preserving the organic character.
          </div>
          <div className="body-fluid-large text-sketchy-text-primary">
            Large responsive body text for emphasis and better readability on larger screens.
          </div>
          <div className="body-fluid-small text-sketchy-text-secondary">
            Small responsive body text for secondary information that adapts to screen size.
          </div>
          <div className="label-fluid text-sketchy-primary">Responsive Form Label</div>
          <div className="label-fluid-large text-sketchy-primary">Large Responsive Label</div>
        </div>

        {/* Organic Variations */}
        <div className="space-y-3">
          <h3 className="heading-organic-3 text-sketchy-primary">Organic Variations</h3>
          <div className="text-organic text-sketchy-primary text-lg">Text with organic rotation (-0.5deg)</div>
          <div className="text-organic-alt text-sketchy-primary text-lg">Alternative organic rotation (0.3deg)</div>
          <div className="text-organic-subtle text-sketchy-primary text-lg">Subtle organic rotation (-0.1deg)</div>
          <div className="text-organic-emphasis text-sketchy-primary text-lg">Emphasis organic rotation (0.8deg)</div>
        </div>

        {/* Accessibility Note */}
        <div className="space-y-3">
          <h3 className="heading-organic-3 text-sketchy-primary">Accessibility Features</h3>
          <div className="body-organic text-sketchy-text-primary">
            <strong>Responsive Design:</strong> Typography scales fluidly across all screen sizes.
          </div>
          <div className="body-organic text-sketchy-text-primary">
            <strong>Reduced Motion:</strong> Rotations are disabled for users who prefer reduced motion.
          </div>
          <div className="body-organic text-sketchy-text-primary">
            <strong>Mobile Optimization:</strong> Rotations are reduced on mobile devices for better readability.
          </div>
          <div className="body-organic text-sketchy-text-primary">
            <strong>High DPI Support:</strong> Font rendering is optimized for high-resolution displays.
          </div>
        </div>

        {/* Interactive Typography */}
        <div className="space-y-3">
          <h3 className="heading-organic-3 text-sketchy-primary">Interactive Typography</h3>
          <div className="text-organic-hover text-sketchy-primary text-lg cursor-pointer">
            Hover me for organic animation
          </div>
          <div className="text-organic-alt-hover text-sketchy-secondary text-lg cursor-pointer">
            Alternative hover animation
          </div>
        </div>

        <code className="font-mono text-sm bg-sketchy-bg-secondary p-2 border-organic-sm block">
          console.log('Monospace text for code examples');
        </code>
      </section>

      {/* Color Palette Test */}
      <section className="space-y-4">
        <h3 className="heading-organic-3 text-sketchy-primary">
          Color Palette
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-sketchy-bg-primary border-organic-md border-sketchy text-center">
            <div className="w-full h-16 bg-sketchy-primary border-organic-sm mb-2"></div>
            <span className="label-organic">Primary</span>
          </div>
          <div className="p-4 bg-sketchy-bg-secondary border-organic-md border-sketchy text-center">
            <div className="w-full h-16 bg-sketchy-secondary border-organic-sm mb-2"></div>
            <span className="label-organic">Secondary</span>
          </div>
          <div className="p-4 bg-sketchy-bg-tertiary border-organic-md border-sketchy text-center">
            <div className="w-full h-16 bg-sketchy-accent-blue border-organic-sm mb-2"></div>
            <span className="label-organic">Accent Blue</span>
          </div>
          <div className="p-4 bg-sketchy-bg-primary border-organic-md border-sketchy text-center">
            <div className="w-full h-16 bg-sketchy-accent-green border-organic-sm mb-2"></div>
            <span className="label-organic">Accent Green</span>
          </div>
        </div>
      </section>

      {/* Border and Shadow Test */}
      <section className="space-y-4">
        <h3 className="heading-organic-3 text-sketchy-primary">
          Organic Borders & Shadows
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-sketchy-bg-secondary border-organic-sm border-sketchy shadow-sketchy-sm">
            <span className="body-organic">Small organic border</span>
          </div>
          <div className="p-4 bg-sketchy-bg-secondary border-organic-md border-sketchy shadow-sketchy-md">
            <span className="body-organic">Medium organic border</span>
          </div>
          <div className="p-4 bg-sketchy-bg-secondary border-organic-lg border-sketchy shadow-sketchy-lg">
            <span className="body-organic">Large organic border</span>
          </div>
        </div>
      </section>

      {/* Texture Test */}
      <section className="space-y-4">
        <h3 className="heading-organic-3 text-sketchy-primary">
          Texture Backgrounds
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-texture-paper border-organic-md border-sketchy">
            <span className="body-organic">Paper Texture</span>
          </div>
          <div className="p-6 bg-texture-canvas border-organic-md border-sketchy">
            <span className="body-organic">Canvas Texture</span>
          </div>
          <div className="p-6 bg-texture-grain border-organic-md border-sketchy">
            <span className="body-organic">Grain Texture</span>
          </div>
        </div>
      </section>

      {/* Animation Test */}
      <section className="space-y-4">
        <h3 className="heading-organic-3 text-sketchy-primary">
          Drawing Animation System
        </h3>
        
        {/* Animation Controls */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={triggerAnimations}
            className={combineClasses(
              "px-6 py-3 bg-sketchy-secondary border-organic-md border-sketchy shadow-sketchy-md",
              "transition-sketchy label-organic",
              getHoverSketchingClass(),
              getBorderDrawingClass('hover')
            )}
          >
            Trigger Drawing Animations
          </button>
        </div>

        {/* Drawing Animation Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={combineClasses(
            "p-4 bg-sketchy-bg-secondary border-organic-md border-sketchy shadow-sketchy-sm",
            showAnimations ? getDrawingAnimationClass('card') : ''
          )}>
            <span className="body-organic">Card Drawing Animation</span>
          </div>
          
          <button className={combineClasses(
            "p-4 bg-sketchy-accent-blue text-white border-organic-md border-sketchy shadow-sketchy-sm",
            "transition-sketchy label-organic",
            showAnimations ? getDrawingAnimationClass('button') : ''
          )}>
            Button Drawing Animation
          </button>
          
          <input 
            type="text" 
            placeholder="Input animation..."
            className={combineClasses(
              "p-4 input-organic",
              showAnimations ? getDrawingAnimationClass('input') : ''
            )}
          />
        </div>

        {/* Border Drawing Examples */}
        <div className="mt-6 space-y-4">
          <h4 className="heading-organic-4 text-sketchy-primary">Border Drawing Effects</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={combineClasses(
              "p-4 bg-sketchy-bg-secondary text-center border-organic-md",
              getBorderDrawingClass('hover')
            )}>
              <span className="label-organic">Hover Border</span>
            </div>
            
            <div className={combineClasses(
              "p-4 bg-sketchy-bg-secondary text-center border-organic-md",
              showAnimations ? getBorderDrawingClass('realtime') : 'border-sketchy'
            )}>
              <span className="label-organic">Real-time Drawing</span>
            </div>
            
            <div className={combineClasses(
              "p-4 bg-sketchy-bg-secondary text-center border-organic-md",
              showAnimations ? getBorderDrawingClass('pencil') : 'border-sketchy'
            )}>
              <span className="label-organic">Pencil Stroke</span>
            </div>
            
            <div className={combineClasses(
              "p-4 bg-sketchy-bg-secondary text-center border-organic-md",
              getBorderDrawingClass('continuous')
            )}>
              <span className="label-organic">Continuous Sketch</span>
            </div>
          </div>
        </div>

        {/* Staggered List Animation */}
        <div className="mt-6 space-y-4">
          <h4 className="heading-organic-4 text-sketchy-primary">Staggered List Animation</h4>
          <div className="space-y-2">
            {['First item', 'Second item', 'Third item', 'Fourth item'].map((item, index) => (
              <div
                key={index}
                className={combineClasses(
                  "p-3 bg-sketchy-bg-secondary border-organic-sm border-sketchy shadow-sketchy-sm",
                  showAnimations ? getDrawingAnimationClass('list-item') : '',
                  showAnimations ? getStaggeredAnimationClass(index) : ''
                )}
              >
                <span className="body-organic">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hover Sketching Effects */}
        <div className="mt-6 space-y-4">
          <h4 className="heading-organic-4 text-sketchy-primary">Hover Sketching Effects</h4>
          <div className="flex gap-4 flex-wrap">
            <button className={combineClasses(
              "px-6 py-3 bg-sketchy-secondary border-organic-md border-sketchy shadow-sketchy-md",
              "transition-sketchy label-organic",
              getHoverSketchingClass()
            )}>
              Hover for Sketching Effect
            </button>
            <button className="px-6 py-3 bg-sketchy-accent-blue text-white border-organic-md border-sketchy shadow-sketchy-md hover-organic-alt transition-sketchy label-organic">
              Alternative hover effect
            </button>
          </div>
        </div>
      </section>

      {/* Theme Toggle Test */}
      <section className="space-y-4">
        <h3 className="heading-organic-3 text-sketchy-primary">
          Theme System
        </h3>
        <button 
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="px-6 py-3 bg-sketchy-primary text-white border-organic-md border-sketchy shadow-sketchy-md hover-organic transition-sketchy label-organic"
        >
          Toggle Dark/Light Theme
        </button>
      </section>
    </div>
  );
}

export default DesignSystemTest;