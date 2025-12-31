import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getOrganicBorderClass, enhanceWithOrganicBorders } from '@/lib/design-system';

/**
 * Demo component showcasing the organic border system
 * This demonstrates how organic borders are applied to various UI components
 */
export function OrganicBorderDemo() {
  return (
    <div className="p-8 space-y-8 bg-sketchy-primary">
      <div className="space-y-4">
        <h2 className="heading-organic-2 text-sketchy-primary">Organic Border System Demo</h2>
        <p className="body-organic text-sketchy-text-secondary">
          Showcasing imperfect, hand-drawn style borders across different components.
        </p>
      </div>

      {/* Button Examples */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Buttons with Organic Borders</h3>
        <div className="flex flex-wrap gap-4">
          <Button className={getOrganicBorderClass('button')}>
            Organic Button
          </Button>
          <Button 
            variant="outline" 
            className={enhanceWithOrganicBorders('', 'button')}
          >
            Enhanced Outline
          </Button>
          <Button 
            variant="secondary"
            className="btn-organic"
          >
            Secondary Organic
          </Button>
        </div>
      </div>

      {/* Card Examples */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Cards with Organic Borders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="card-organic bg-sketchy-secondary">
            <CardHeader>
              <CardTitle className="heading-organic-5">Organic Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-organic-small">
                This card uses organic border-radius and sketchy shadows for a hand-drawn feel.
              </p>
            </CardContent>
          </Card>
          
          <Card className={getOrganicBorderClass('card')}>
            <CardHeader>
              <CardTitle className="heading-organic-5">Enhanced Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-organic-small">
                This card demonstrates the utility function approach to organic styling.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Input Examples */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Inputs with Organic Borders</h3>
        <div className="space-y-3 max-w-md">
          <Input 
            placeholder="Standard organic input"
            className="input-organic"
          />
          <Input 
            placeholder="Enhanced input"
            className={getOrganicBorderClass('input')}
          />
        </div>
      </div>

      {/* Badge Examples */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Badges with Organic Borders</h3>
        <div className="flex flex-wrap gap-2">
          <Badge className="badge-organic">Organic Badge</Badge>
          <Badge variant="secondary" className={getOrganicBorderClass('badge')}>
            Enhanced Badge
          </Badge>
          <Badge variant="outline" className="border-organic-sm-sketchy">
            Outlined Organic
          </Badge>
        </div>
      </div>

      {/* Border Size Variations */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Border Size Variations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-organic-sm-sketchy p-4 bg-sketchy-secondary">
            <p className="body-organic-small">Small</p>
          </div>
          <div className="border-organic-md-sketchy p-4 bg-sketchy-secondary">
            <p className="body-organic-small">Medium</p>
          </div>
          <div className="border-organic-lg-sketchy p-4 bg-sketchy-secondary">
            <p className="body-organic-small">Large</p>
          </div>
          <div className="border-organic-xl-sketchy p-4 bg-sketchy-secondary">
            <p className="body-organic-small">Extra Large</p>
          </div>
        </div>
      </div>

      {/* Border Only (No Fill) */}
      <div className="space-y-4">
        <h3 className="heading-organic-4 text-sketchy-primary">Border Only Variations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-organic-sm p-4 border-sketchy">
            <p className="body-organic-small">Small Radius</p>
          </div>
          <div className="border-organic-md p-4 border-sketchy">
            <p className="body-organic-small">Medium Radius</p>
          </div>
          <div className="border-organic-lg p-4 border-sketchy">
            <p className="body-organic-small">Large Radius</p>
          </div>
          <div className="border-organic-xl p-4 border-sketchy">
            <p className="body-organic-small">XL Radius</p>
          </div>
        </div>
      </div>
    </div>
  );
}