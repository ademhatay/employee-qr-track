import { Button } from '@/components/ui/button'
import { Icons } from '@/lib/icons'

export function SketchyButtonDemo() {
  return (
    <div className="p-8 space-y-8 bg-sketchy-bg-primary min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="heading-organic-1 text-sketchy-primary">
            Sketchy Button Variants
          </h1>
          <p className="body-organic text-sketchy-text-secondary">
            Hand-drawn button components with organic styling and pencil sketching animations
          </p>
        </div>

        {/* Default vs Sketchy Comparison */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Default vs Sketchy Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Default Buttons */}
            <div className="space-y-4">
              <h3 className="heading-organic-5 text-sketchy-text-secondary">Standard Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Sketchy Buttons */}
            <div className="space-y-4">
              <h3 className="heading-organic-5 text-sketchy-text-secondary">Sketchy Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="sketchy">Sketchy</Button>
                <Button variant="sketchy-outline">Sketchy Outline</Button>
                <Button variant="sketchy-secondary">Sketchy Secondary</Button>
                <Button variant="sketchy-ghost">Sketchy Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Sketchy Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="sketchy" size="sm">Small</Button>
            <Button variant="sketchy" size="default">Default</Button>
            <Button variant="sketchy" size="lg">Large</Button>
          </div>
        </div>

        {/* Buttons with Icons */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Sketchy Buttons with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="sketchy">
              <Icons.heart className="w-4 h-4" />
              Like
            </Button>
            <Button variant="sketchy-outline">
              <Icons.download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="sketchy-secondary">
              <Icons.settings className="w-4 h-4" />
              Settings
            </Button>
            <Button variant="sketchy-ghost">
              <Icons.delete className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Icon-only Buttons */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Sketchy Icon Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="sketchy" size="icon">
              <Icons.heart className="w-4 h-4" />
            </Button>
            <Button variant="sketchy-outline" size="icon">
              <Icons.download className="w-4 h-4" />
            </Button>
            <Button variant="sketchy-secondary" size="icon-sm">
              <Icons.settings className="w-4 h-4" />
            </Button>
            <Button variant="sketchy-ghost" size="icon-lg">
              <Icons.delete className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Texture Variants */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Buttons with Textures</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="sketchy" texture="paper">Paper Texture</Button>
            <Button variant="sketchy-outline" texture="canvas">Canvas Texture</Button>
            <Button variant="sketchy-secondary" texture="grain">Grain Texture</Button>
            <Button variant="sketchy-ghost" texture="pencil">Pencil Texture</Button>
          </div>
        </div>

        {/* Interactive States Demo */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Interactive States</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="sketchy">Hover me!</Button>
              <Button variant="sketchy-outline">Focus me!</Button>
              <Button variant="sketchy" disabled>Disabled</Button>
            </div>
            <p className="body-organic-small text-sketchy-text-muted">
              Try hovering and focusing the buttons to see the pencil sketching animations
            </p>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Accessibility Features</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="sketchy" aria-label="Save document">
                Save
              </Button>
              <Button variant="sketchy-outline" aria-describedby="help-text">
                Help
              </Button>
            </div>
            <p id="help-text" className="body-organic-small text-sketchy-text-muted">
              All sketchy buttons maintain full keyboard navigation and screen reader support
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}