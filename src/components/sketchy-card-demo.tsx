import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/lib/icons'

export function SketchyCardDemo() {
  return (
    <div className="p-8 space-y-8 bg-sketchy-bg-primary min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="heading-organic-1 text-sketchy-primary">
            Sketchy Card Variants
          </h1>
          <p className="body-organic text-sketchy-text-secondary">
            Hand-drawn card components with organic borders, canvas textures, and drawing-style reveal animations
          </p>
        </div>

        {/* Default vs Sketchy Comparison */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Default vs Sketchy Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Default Card */}
            <div className="space-y-4">
              <h3 className="heading-organic-5 text-sketchy-text-secondary">Standard Card</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Standard Card</CardTitle>
                  <CardDescription>
                    This is a regular shadcn/ui card with standard styling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Standard card content with regular typography and styling.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default">Action</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Sketchy Card */}
            <div className="space-y-4">
              <h3 className="heading-organic-5 text-sketchy-text-secondary">Sketchy Card</h3>
              <Card sketchy>
                <CardHeader sketchy>
                  <CardTitle sketchy>Sketchy Card</CardTitle>
                  <CardDescription sketchy>
                    This is a hand-drawn card with organic borders and canvas texture
                  </CardDescription>
                </CardHeader>
                <CardContent sketchy>
                  <p>Sketchy card content with organic typography and hand-drawn styling.</p>
                </CardContent>
                <CardFooter sketchy>
                  <Button variant="sketchy">Action</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Different Texture Variants */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Card Texture Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card sketchy texture="paper">
              <CardHeader sketchy>
                <CardTitle sketchy>Paper Texture</CardTitle>
                <CardDescription sketchy>
                  Card with paper grain texture background
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <p>This card uses a subtle paper texture that simulates real paper grain.</p>
              </CardContent>
            </Card>

            <Card sketchy texture="canvas">
              <CardHeader sketchy>
                <CardTitle sketchy>Canvas Texture</CardTitle>
                <CardDescription sketchy>
                  Card with canvas weave texture background
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <p>This card uses a canvas texture that mimics fabric weave patterns.</p>
              </CardContent>
            </Card>

            <Card sketchy texture="grain">
              <CardHeader sketchy>
                <CardTitle sketchy>Grain Texture</CardTitle>
                <CardDescription sketchy>
                  Card with noise grain texture background
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <p>This card uses a grain texture for a subtle organic feel.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Complex Card Examples */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Complex Card Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Post Card */}
            <Card sketchy texture="paper">
              <CardHeader sketchy>
                <CardAction sketchy>
                  <Button variant="sketchy-ghost" size="icon">
                    <Icons.more className="w-4 h-4" />
                  </Button>
                </CardAction>
                <CardTitle sketchy>The Art of Hand-Drawn Design</CardTitle>
                <CardDescription sketchy>
                  Exploring the beauty of imperfection in digital interfaces
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <p>Discover how organic, hand-drawn elements can make digital experiences feel more human and approachable...</p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">Design</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                </div>
              </CardContent>
              <CardFooter sketchy>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <Button variant="sketchy-ghost" size="sm">
                      <Icons.heart className="w-4 h-4" />
                      24
                    </Button>
                    <Button variant="sketchy-ghost" size="sm">
                      <Icons.message className="w-4 h-4" />
                      8
                    </Button>
                    <Button variant="sketchy-ghost" size="sm">
                      <Icons.share className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="caption-organic text-sketchy-text-muted">2 min read</span>
                </div>
              </CardFooter>
            </Card>

            {/* Event Card */}
            <Card sketchy texture="canvas">
              <CardHeader sketchy>
                <CardTitle sketchy>Design Workshop</CardTitle>
                <CardDescription sketchy>
                  Learn the fundamentals of sketchy design systems
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icons.calendar className="w-4 h-4 text-sketchy-accent-blue" />
                    <span className="body-organic-small">March 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.mapPin className="w-4 h-4 text-sketchy-accent-green" />
                    <span className="body-organic-small">Design Studio, Downtown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.users className="w-4 h-4 text-sketchy-accent-purple" />
                    <span className="body-organic-small">12 / 20 attendees</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter sketchy>
                <Button variant="sketchy" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            {/* Stats Card */}
            <Card sketchy texture="grain">
              <CardHeader sketchy>
                <CardTitle sketchy>Project Statistics</CardTitle>
                <CardDescription sketchy>
                  Current month performance overview
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="body-organic-small text-sketchy-text-secondary">Tasks Completed</span>
                    <span className="heading-organic-5 text-sketchy-accent-green">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="body-organic-small text-sketchy-text-secondary">Active Projects</span>
                    <span className="heading-organic-5 text-sketchy-accent-blue">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="body-organic-small text-sketchy-text-secondary">Team Members</span>
                    <span className="heading-organic-5 text-sketchy-accent-purple">12</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter sketchy>
                <Button variant="sketchy-outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Animation Demo */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Drawing Animation Demo</h2>
          <p className="body-organic text-sketchy-text-secondary">
            Refresh the page to see the drawing-style reveal animations in action
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card sketchy texture="paper">
              <CardHeader sketchy>
                <CardTitle sketchy>Animated Card 1</CardTitle>
                <CardDescription sketchy>
                  This card animates in with a drawing effect
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <p>Watch how the card appears to be drawn onto the page with organic timing and movement.</p>
              </CardContent>
            </Card>

            <Card sketchy texture="canvas">
              <CardHeader sketchy>
                <CardTitle sketchy>Animated Card 2</CardTitle>
                <CardDescription sketchy>
                  Another card with drawing-style animation
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <p>The border appears to be sketched in real-time, creating a delightful user experience.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}