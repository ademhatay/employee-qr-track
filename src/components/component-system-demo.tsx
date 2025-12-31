import { SketchyButtonDemo } from './sketchy-button-demo'
import { SketchyCardDemo } from './sketchy-card-demo'
import { SketchyFormDemo } from './sketchy-form-demo'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useState } from 'react'

export function ComponentSystemDemo() {
  const [activeDemo, setActiveDemo] = useState<'buttons' | 'cards' | 'forms'>('buttons')

  const demos = {
    buttons: <SketchyButtonDemo />,
    cards: <SketchyCardDemo />,
    forms: <SketchyFormDemo />
  }

  return (
    <div className="min-h-screen bg-sketchy-bg-primary">
      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-sketchy-bg-secondary border-b border-sketchy-border-muted">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="heading-organic-2 text-sketchy-primary">
              Component System Demo
            </h1>
            <div className="flex gap-2">
              <Button
                variant={activeDemo === 'buttons' ? 'sketchy' : 'sketchy-ghost'}
                onClick={() => setActiveDemo('buttons')}
              >
                Buttons
              </Button>
              <Button
                variant={activeDemo === 'cards' ? 'sketchy' : 'sketchy-ghost'}
                onClick={() => setActiveDemo('cards')}
              >
                Cards
              </Button>
              <Button
                variant={activeDemo === 'forms' ? 'sketchy' : 'sketchy-ghost'}
                onClick={() => setActiveDemo('forms')}
              >
                Forms
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="transition-all duration-300">
        {demos[activeDemo]}
      </div>

      {/* Footer */}
      <div className="bg-sketchy-bg-secondary border-t border-sketchy-border-muted">
        <div className="max-w-6xl mx-auto p-8">
          <Card sketchy texture="paper">
            <CardHeader sketchy>
              <CardTitle sketchy>Component System Features</CardTitle>
              <CardDescription sketchy>
                All enhanced components maintain full compatibility with existing APIs while adding organic styling
              </CardDescription>
            </CardHeader>
            <CardContent sketchy>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="heading-organic-6 text-sketchy-primary">✨ Enhanced Styling</h4>
                  <p className="body-organic-small text-sketchy-text-secondary">
                    Organic borders, hand-drawn typography, and canvas textures
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="heading-organic-6 text-sketchy-primary">🎨 Pencil Animations</h4>
                  <p className="body-organic-small text-sketchy-text-secondary">
                    Drawing-style hover effects and reveal animations
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="heading-organic-6 text-sketchy-primary">♿ Accessibility</h4>
                  <p className="body-organic-small text-sketchy-text-secondary">
                    Full keyboard navigation and screen reader support maintained
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}