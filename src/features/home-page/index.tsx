import { useState } from 'react'
import { Icons } from '@/lib/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Import all demo components
import { OrganicBorderDemo } from '@/components/organic-border-demo'
import DesignSystemTest from '@/components/design-system-test'
import { SketchyShadowDemo } from '@/components/sketchy-shadow-demo'
import { TextureDemo } from '@/components/texture-demo'
import { ComponentSystemDemo } from '@/components/component-system-demo'
import AnimationDemo from '@/components/animation-demo'
import { SketchyButtonDemo } from '@/components/sketchy-button-demo'
import { SketchyCardDemo } from '@/components/sketchy-card-demo'
import { SketchyFormDemo } from '@/components/sketchy-form-demo'

export function LandingPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const demoComponents = [
    {
      id: 'buttons',
      title: 'Sketchy Buttons',
      description: 'Hand-drawn button variants with organic styling',
      icon: Icons.circle,
      component: <SketchyButtonDemo />
    },
    {
      id: 'cards',
      title: 'Sketchy Cards',
      description: 'Organic card components with canvas textures',
      icon: Icons.grid,
      component: <SketchyCardDemo />
    },
    {
      id: 'forms',
      title: 'Sketchy Forms',
      description: 'Form inputs with hand-drawn focus states',
      icon: Icons.text,
      component: <SketchyFormDemo />
    },
    {
      id: 'borders',
      title: 'Organic Borders',
      description: 'Imperfect, hand-drawn style borders',
      icon: Icons.circle,
      component: <OrganicBorderDemo />
    },
    {
      id: 'shadows',
      title: 'Sketchy Shadows',
      description: 'Layered, imperfect shadows for organic depth',
      icon: Icons.grid,
      component: <SketchyShadowDemo />
    },
    {
      id: 'textures',
      title: 'Canvas Textures',
      description: 'Theme-adaptive texture patterns',
      icon: Icons.image,
      component: <TextureDemo />
    },
    {
      id: 'animations',
      title: 'Drawing Animations',
      description: 'Pencil sketching and reveal effects',
      icon: Icons.spinner,
      component: <AnimationDemo />
    },
    {
      id: 'system',
      title: 'Complete System',
      description: 'Full component system showcase',
      icon: Icons.grid,
      component: <ComponentSystemDemo />
    },
    {
      id: 'foundation',
      title: 'Design Foundation',
      description: 'Typography, colors, and design tokens',
      icon: Icons.building,
      component: <DesignSystemTest />
    }
  ]

  return (
    <div className="min-h-screen bg-sketchy-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-sketchy-bg-secondary/95 backdrop-blur-sm border-b border-sketchy-border-muted">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sketchy-accent-blue border-organic-sm">
              <Icons.building className="w-5 h-5 text-white" />
            </div>
            <span className="heading-organic-5 text-sketchy-primary">Hand-Drawn Design System</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="sketchy-ghost" onClick={() => window.location.href = '/dashboard'}>
              Dashboard
            </Button>
            <Button variant="sketchy" onClick={() => window.location.href = '/auth/login'}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="border-organic-sm">
              <Icons.heart className="w-4 h-4 mr-2" />
              Interactive Design System Demo
            </Badge>
            
            <h1 className="heading-organic-1 text-sketchy-primary">
              Hand-Drawn Design System
            </h1>
            
            <p className="text-xl-organic text-sketchy-text-secondary max-w-2xl mx-auto">
              Experience organic, imperfect design elements that bring warmth and personality 
              to digital interfaces. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="sketchy" 
              size="lg"
              onClick={() => setActiveTab('system')}
            >
              <Icons.spinner className="w-5 h-5 mr-2" />
              Explore Components
            </Button>
            <Button 
              variant="sketchy-outline" 
              size="lg"
              onClick={() => setActiveTab('foundation')}
            >
              <Icons.info className="w-5 h-5 mr-2" />
              View Foundation
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card sketchy texture="paper">
              <CardHeader sketchy>
                <Icons.image className="w-8 h-8 text-sketchy-accent-blue mb-2" />
                <CardTitle sketchy>Organic Styling</CardTitle>
                <CardDescription sketchy>
                  Hand-drawn borders, imperfect shadows, and canvas textures
                </CardDescription>
              </CardHeader>
            </Card>

            <Card sketchy texture="canvas">
              <CardHeader sketchy>
                <Icons.trending className="w-8 h-8 text-sketchy-accent-green mb-2" />
                <CardTitle sketchy>Pencil Animations</CardTitle>
                <CardDescription sketchy>
                  Drawing-style reveals and sketching hover effects
                </CardDescription>
              </CardHeader>
            </Card>

            <Card sketchy texture="grain">
              <CardHeader sketchy>
                <Icons.checkCircle className="w-8 h-8 text-sketchy-accent-purple mb-2" />
                <CardTitle sketchy>Fully Accessible</CardTitle>
                <CardDescription sketchy>
                  Maintains keyboard navigation and screen reader support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2 bg-sketchy-bg-secondary border-organic-md p-2">
                <TabsTrigger value="overview" className="data-[state=active]:bg-sketchy-accent-blue data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="components" className="data-[state=active]:bg-sketchy-accent-blue data-[state=active]:text-white">
                  Components
                </TabsTrigger>
                <TabsTrigger value="system" className="data-[state=active]:bg-sketchy-accent-blue data-[state=active]:text-white">
                  System
                </TabsTrigger>
                <TabsTrigger value="foundation" className="data-[state=active]:bg-sketchy-accent-blue data-[state=active]:text-white">
                  Foundation
                </TabsTrigger>
                <TabsTrigger value="animations" className="data-[state=active]:bg-sketchy-accent-blue data-[state=active]:text-white">
                  Animations
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="heading-organic-2 text-sketchy-primary">
                  Component Gallery
                </h2>
                <p className="body-organic text-sketchy-text-secondary">
                  Click on any component to see it in action
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoComponents.map((demo) => (
                  <Card 
                    key={demo.id} 
                    sketchy 
                    texture="paper"
                    className="cursor-pointer hover:shadow-sketchy-lg transition-all duration-300"
                    onClick={() => setActiveTab(demo.id)}
                  >
                    <CardHeader sketchy>
                      <demo.icon className="w-8 h-8 text-sketchy-accent-blue mb-2" />
                      <CardTitle sketchy>{demo.title}</CardTitle>
                      <CardDescription sketchy>
                        {demo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent sketchy>
                      <Button variant="sketchy-ghost" className="w-full">
                        <Icons.arrowRight className="w-4 h-4 mr-2" />
                        View Demo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Individual Component Tabs */}
            {demoComponents.map((demo) => (
              <TabsContent key={demo.id} value={demo.id}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="sketchy-ghost" 
                        size="icon"
                        onClick={() => setActiveTab('overview')}
                      >
                        <Icons.arrowLeft className="w-4 h-4" />
                      </Button>
                      <div>
                        <h2 className="heading-organic-3 text-sketchy-primary">{demo.title}</h2>
                        <p className="body-organic-small text-sketchy-text-secondary">{demo.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-organic-lg border-sketchy-dashed bg-sketchy-bg-secondary/50 rounded-lg overflow-hidden">
                    {demo.component}
                  </div>
                </div>
              </TabsContent>
            ))}

            {/* Components Tab - Quick Access */}
            <TabsContent value="components" className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="heading-organic-2 text-sketchy-primary">
                  Quick Component Access
                </h2>
                <p className="body-organic text-sketchy-text-secondary">
                  Jump directly to specific component demos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="heading-organic-4 text-sketchy-primary">UI Components</h3>
                  <div className="space-y-2">
                    {['buttons', 'cards', 'forms'].map((id) => {
                      const demo = demoComponents.find(d => d.id === id)!
                      return (
                        <Button
                          key={id}
                          variant="sketchy-ghost"
                          className="w-full justify-start"
                          onClick={() => setActiveTab(id)}
                        >
                          <demo.icon className="w-4 h-4 mr-3" />
                          {demo.title}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="heading-organic-4 text-sketchy-primary">Design Elements</h3>
                  <div className="space-y-2">
                    {['borders', 'shadows', 'textures', 'animations'].map((id) => {
                      const demo = demoComponents.find(d => d.id === id)!
                      return (
                        <Button
                          key={id}
                          variant="sketchy-ghost"
                          className="w-full justify-start"
                          onClick={() => setActiveTab(id)}
                        >
                          <demo.icon className="w-4 h-4 mr-3" />
                          {demo.title}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sketchy-border-muted bg-sketchy-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sketchy-accent-blue border-organic-sm">
                  <Icons.building className="w-5 h-5 text-white" />
                </div>
                <span className="heading-organic-5 text-sketchy-primary">Hand-Drawn Design</span>
              </div>
              <p className="body-organic-small text-sketchy-text-secondary">
                A comprehensive design system that brings warmth and personality to digital interfaces 
                through organic, hand-drawn elements.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="heading-organic-6 text-sketchy-primary">Features</h4>
              <ul className="space-y-2 body-organic-small text-sketchy-text-secondary">
                <li>• Organic borders and shadows</li>
                <li>• Canvas texture backgrounds</li>
                <li>• Pencil drawing animations</li>
                <li>• Fully accessible components</li>
                <li>• Theme-adaptive styling</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="heading-organic-6 text-sketchy-primary">Built With</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="border-organic-sm">React 19</Badge>
                <Badge variant="secondary" className="border-organic-sm">TypeScript</Badge>
                <Badge variant="secondary" className="border-organic-sm">Tailwind CSS</Badge>
                <Badge variant="secondary" className="border-organic-sm">Vite</Badge>
                <Badge variant="secondary" className="border-organic-sm">shadcn/ui</Badge>
              </div>
            </div>
          </div>

          <div className="border-t border-sketchy-border-muted mt-8 pt-8 text-center">
            <p className="body-organic-small text-sketchy-text-muted">
              © 2024 Hand-Drawn Design System. Built with ❤️ for creative developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}