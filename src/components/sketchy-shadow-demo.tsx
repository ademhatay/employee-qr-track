import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSketchyShadowClass, getComponentShadowClass } from '@/lib/design-system';

/**
 * Demo component showcasing the sketchy shadow system
 * This demonstrates layered, imperfect shadows for organic depth
 */
export function SketchyShadowDemo() {
  return (
    <div className="p-8 space-y-8 bg-sketchy-primary min-h-screen">
      <div className="space-y-4">
        <h2 className="heading-organic-2 text-sketchy-primary">Sketchy Shadow System Demo</h2>
        <p className="body-organic text-sketchy-text-secondary">
          Showcasing layered, imperfect shadows that create organic depth and hand-drawn feel.
        </p>
      </div>

      {/* Basic Shadow Sizes */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Shadow Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="shadow-sketchy-none p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">No Shadow</p>
          </div>
          <div className="shadow-sketchy-sm p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">Small Shadow</p>
          </div>
          <div className="shadow-sketchy-md p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">Medium Shadow</p>
          </div>
          <div className="shadow-sketchy-lg p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">Large Shadow</p>
          </div>
        </div>
      </div>

      {/* Directional Shadows */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Directional Shadows</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="shadow-sketchy-top p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">Top Shadow</p>
          </div>
          <div className="shadow-sketchy-right p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">Right Shadow</p>
          </div>
          <div className="shadow-sketchy-bottom p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">Bottom Shadow</p>
          </div>
          <div className="shadow-sketchy-left p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">Left Shadow</p>
          </div>
        </div>
      </div>

      {/* Colored Shadows */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Colored Shadows</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="shadow-sketchy-blue p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small text-sketchy-accent-blue">Blue Shadow</p>
          </div>
          <div className="shadow-sketchy-green p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small text-sketchy-accent-green">Green Shadow</p>
          </div>
          <div className="shadow-sketchy-red p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small text-sketchy-accent-red">Red Shadow</p>
          </div>
          <div className="shadow-sketchy-purple p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small text-sketchy-accent-purple">Purple Shadow</p>
          </div>
        </div>
      </div>

      {/* Interactive Shadows */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Interactive Shadows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="shadow-sketchy-hover p-6 bg-sketchy-secondary border-organic-md cursor-pointer">
            <p className="body-organic-small">Hover for Shadow Change</p>
            <p className="caption-organic text-sketchy-text-muted">Hover me!</p>
          </div>
          <div className="shadow-sketchy-hover-lift p-6 bg-sketchy-secondary border-organic-md cursor-pointer">
            <p className="body-organic-small">Hover for Lift Effect</p>
            <p className="caption-organic text-sketchy-text-muted">Hover me!</p>
          </div>
        </div>
      </div>

      {/* Component-Specific Shadows */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Component Shadows</h3>
        
        {/* Button Shadows */}
        <div className="space-y-3">
          <h4 className="heading-organic-6 text-sketchy-primary">Button Shadows</h4>
          <div className="flex flex-wrap gap-4">
            <Button className={getComponentShadowClass('button')}>
              Button with Organic Shadow
            </Button>
            <Button 
              variant="outline" 
              className="button-shadow-organic"
            >
              Outline with Shadow
            </Button>
            <Button 
              variant="secondary"
              className={getSketchyShadowClass('md', 'hover')}
            >
              Hover Shadow Effect
            </Button>
          </div>
        </div>

        {/* Card Shadows */}
        <div className="space-y-3">
          <h4 className="heading-organic-6 text-sketchy-primary">Card Shadows</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="card-shadow-organic border-organic-lg">
              <CardHeader>
                <CardTitle className="heading-organic-5">Card with Organic Shadow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="body-organic-small">
                  This card has a subtle shadow that intensifies on hover.
                </p>
              </CardContent>
            </Card>
            
            <Card className={`${getComponentShadowClass('card')} border-organic-lg`}>
              <CardHeader>
                <CardTitle className="heading-organic-5">Enhanced Card Shadow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="body-organic-small">
                  This card uses the utility function for consistent shadow application.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Badge Shadows */}
        <div className="space-y-3">
          <h4 className="heading-organic-6 text-sketchy-primary">Badge Shadows</h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="shadow-sketchy-sm border-organic-sm">Small Shadow</Badge>
            <Badge variant="secondary" className="shadow-sketchy-md border-organic-sm">
              Medium Shadow
            </Badge>
            <Badge variant="outline" className="shadow-sketchy-blue border-organic-sm">
              Blue Shadow
            </Badge>
            <Badge className="shadow-sketchy-hover border-organic-sm">
              Hover Shadow
            </Badge>
          </div>
        </div>
      </div>

      {/* Inset Shadow */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Inset Shadows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="shadow-sketchy-inset p-6 bg-sketchy-secondary border-organic-md">
            <p className="body-organic-small">Inset Shadow</p>
            <p className="caption-organic text-sketchy-text-muted">Creates a pressed/recessed effect</p>
          </div>
          <div className="shadow-sketchy-inset p-6 bg-sketchy-tertiary border-organic-md">
            <p className="body-organic-small">Inset on Tertiary Background</p>
            <p className="caption-organic text-sketchy-text-muted">Different background color</p>
          </div>
        </div>
      </div>

      {/* Utility Function Examples */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Utility Function Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${getSketchyShadowClass('sm')} p-4 bg-sketchy-secondary border-organic-md`}>
            <p className="body-organic-small">getSketchyShadowClass('sm')</p>
          </div>
          <div className={`${getSketchyShadowClass('md', 'colored', undefined, 'green')} p-4 bg-sketchy-secondary border-organic-md`}>
            <p className="body-organic-small">Colored Green Shadow</p>
          </div>
          <div className={`${getSketchyShadowClass('lg', 'directional', 'right')} p-4 bg-sketchy-secondary border-organic-md`}>
            <p className="body-organic-small">Directional Right Shadow</p>
          </div>
        </div>
      </div>
    </div>
  );
}