import React, { useState, useEffect, useRef } from 'react';
import { 
  getDrawingAnimationClass, 
  getBorderDrawingClass, 
  getStaggeredAnimationClass,
  animateListItems,
  shouldEnableAnimations,
  getHoverSketchingClass,
  combineClasses
} from '@/lib/design-system';

export function AnimationDemo() {
  const [showAnimations, setShowAnimations] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimationsEnabled(shouldEnableAnimations());
  }, []);

  useEffect(() => {
    if (showAnimations && listRef.current) {
      // Animate list items with staggered delays
      animateListItems(listRef.current, '.list-demo-item', 150);
    }
  }, [showAnimations]);

  const triggerAnimations = () => {
    setShowAnimations(false);
    setTimeout(() => setShowAnimations(true), 100);
  };

  const demoItems = [
    'First item with drawing animation',
    'Second item appears after delay',
    'Third item continues the sequence',
    'Fourth item completes the stagger',
    'Fifth item finishes the demo'
  ];

  return (
    <div className="p-8 space-y-8 bg-sketchy-bg-primary">
      <div className="text-center space-y-4">
        <h1 className="heading-organic-1 text-sketchy-primary">
          Drawing Animation System Demo
        </h1>
        <p className="body-organic text-sketchy-text-secondary">
          {animationsEnabled 
            ? "Animations are enabled. Experience the hand-drawn reveal effects!"
            : "Animations are disabled due to reduced motion preference."
          }
        </p>
      </div>

      {/* Animation Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={triggerAnimations}
          className={combineClasses(
            "px-6 py-3 bg-sketchy-secondary text-sketchy-bg-primary",
            "border-organic-md border-sketchy shadow-sketchy-md",
            "transition-sketchy label-organic",
            getHoverSketchingClass(),
            getBorderDrawingClass('hover')
          )}
        >
          Trigger Animations
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className={combineClasses(
            "px-6 py-3 bg-sketchy-primary text-sketchy-bg-primary",
            "border-organic-md border-sketchy shadow-sketchy-md",
            "transition-sketchy label-organic",
            getHoverSketchingClass()
          )}
        >
          Reset Demo
        </button>
      </div>

      {/* Drawing Reveal Animations */}
      <section className="space-y-6">
        <h2 className="heading-organic-2 text-sketchy-primary">
          Drawing Reveal Animations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Animation */}
          <div className={combineClasses(
            "p-6 bg-sketchy-bg-secondary border-organic-lg border-sketchy",
            "shadow-sketchy-sm card-organic",
            showAnimations ? getDrawingAnimationClass('card') : ''
          )}>
            <h3 className="heading-organic-4 text-sketchy-primary mb-3">
              Card Animation
            </h3>
            <p className="body-organic text-sketchy-text-secondary">
              This card reveals itself with a drawing-style animation that simulates being sketched.
            </p>
          </div>

          {/* Button Animation */}
          <div className="space-y-4">
            <h3 className="heading-organic-4 text-sketchy-primary">
              Button Animation
            </h3>
            <button className={combineClasses(
              "px-6 py-3 bg-sketchy-accent-blue text-white",
              "border-organic-md border-sketchy shadow-sketchy-md",
              "transition-sketchy label-organic",
              showAnimations ? getDrawingAnimationClass('button') : '',
              getHoverSketchingClass()
            )}>
              Animated Button
            </button>
          </div>

          {/* Input Animation */}
          <div className="space-y-4">
            <h3 className="heading-organic-4 text-sketchy-primary">
              Input Animation
            </h3>
            <input
              type="text"
              placeholder="Type something..."
              className={combineClasses(
                "w-full px-4 py-2 input-organic",
                showAnimations ? getDrawingAnimationClass('input') : ''
              )}
            />
          </div>
        </div>
      </section>

      {/* Border Drawing Animations */}
      <section className="space-y-6">
        <h2 className="heading-organic-2 text-sketchy-primary">
          Border Drawing Animations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Hover Border Drawing */}
          <div className={combineClasses(
            "p-4 bg-sketchy-bg-secondary text-center",
            "border-organic-md transition-sketchy",
            getBorderDrawingClass('hover')
          )}>
            <p className="label-organic text-sketchy-primary">
              Hover for Border Animation
            </p>
          </div>

          {/* Real-time Border Drawing */}
          <div className={combineClasses(
            "p-4 bg-sketchy-bg-secondary text-center",
            "border-organic-md",
            showAnimations ? getBorderDrawingClass('realtime') : 'border-sketchy'
          )}>
            <p className="label-organic text-sketchy-primary">
              Real-time Drawing
            </p>
          </div>

          {/* Pencil Stroke Border */}
          <div className={combineClasses(
            "p-4 bg-sketchy-bg-secondary text-center",
            "border-organic-md",
            showAnimations ? getBorderDrawingClass('pencil') : 'border-sketchy'
          )}>
            <p className="label-organic text-sketchy-primary">
              Pencil Stroke Effect
            </p>
          </div>

          {/* Continuous Sketch */}
          <div className={combineClasses(
            "p-4 bg-sketchy-bg-secondary text-center",
            "border-organic-md",
            getBorderDrawingClass('continuous')
          )}>
            <p className="label-organic text-sketchy-primary">
              Continuous Sketching
            </p>
          </div>
        </div>
      </section>

      {/* Staggered List Animation */}
      <section className="space-y-6">
        <h2 className="heading-organic-2 text-sketchy-primary">
          Staggered List Animation
        </h2>
        
        <div ref={listRef} className="space-y-3">
          {demoItems.map((item, index) => (
            <div
              key={index}
              className={combineClasses(
                "p-4 bg-sketchy-bg-secondary border-organic-sm border-sketchy",
                "shadow-sketchy-sm transition-sketchy",
                "list-demo-item",
                showAnimations ? getDrawingAnimationClass('list-item') : '',
                showAnimations ? getStaggeredAnimationClass(index) : ''
              )}
            >
              <p className="body-organic text-sketchy-primary">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Text Animation */}
      <section className="space-y-6">
        <h2 className="heading-organic-2 text-sketchy-primary">
          Text Drawing Animation
        </h2>
        
        <div className="text-center">
          <p className={combineClasses(
            "text-2xl-organic text-sketchy-primary",
            showAnimations ? getDrawingAnimationClass('text') : ''
          )}>
            This text appears with a drawing-style reveal effect
          </p>
        </div>
      </section>

      {/* Focus Animation Demo */}
      <section className="space-y-6">
        <h2 className="heading-organic-2 text-sketchy-primary">
          Focus Border Animation
        </h2>
        
        <div className="flex gap-4 justify-center">
          <input
            type="text"
            placeholder="Click to focus"
            className={combineClasses(
              "px-4 py-2 input-organic",
              getBorderDrawingClass('focus')
            )}
          />
          <button className={combineClasses(
            "px-6 py-3 bg-sketchy-accent-green text-white",
            "border-organic-md transition-sketchy label-organic",
            getBorderDrawingClass('focus')
          )}>
            Focus Me
          </button>
        </div>
      </section>

      {/* Performance Note */}
      <div className="mt-12 p-6 bg-sketchy-bg-tertiary border-organic-md border-sketchy-dashed">
        <h3 className="heading-organic-4 text-sketchy-primary mb-3">
          Accessibility & Performance Notes
        </h3>
        <ul className="space-y-2 body-organic text-sketchy-text-secondary">
          <li>• All animations respect the `prefers-reduced-motion` setting</li>
          <li>• Animations are CSS-based for optimal performance</li>
          <li>• Staggered animations use efficient delay-based timing</li>
          <li>• Border animations use pseudo-elements to avoid layout shifts</li>
          <li>• Focus animations enhance accessibility without being distracting</li>
        </ul>
      </div>
    </div>
  );
}

export default AnimationDemo;