import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  getTextureClass, 
  getCompleteTextureSetup,
  getTextureOverlayClass,
  getReadabilityClass,
  getTextOverTextureClass,
  prefersHighContrast,
  getThemeAdaptiveIntensity,
  toggleTheme,
  isDarkTheme,
  getOptimalTextureIntensity,
  shouldApplyTexture
} from '@/lib/design-system';

export function TextureDemo() {
  const [darkMode, setDarkMode] = useState(isDarkTheme());
  const textureIntensity = getOptimalTextureIntensity();
  const canApplyTexture = shouldApplyTexture();
  const highContrast = prefersHighContrast();
  const adaptiveIntensity = getThemeAdaptiveIntensity('medium');

  const handleThemeToggle = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-8 space-y-8 bg-sketchy-primary">
      <div className="text-center space-y-4">
        <h1 className="heading-organic-1">Theme-Adaptive Texture System</h1>
        <p className="body-organic text-sketchy-text-secondary">
          CSS-only texture patterns with theme adaptation and readability optimization
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-sketchy-text-muted">
          <span>Device capability: {textureIntensity}</span>
          <span>Textures enabled: {canApplyTexture ? 'Yes' : 'No'}</span>
          <span>High contrast: {highContrast ? 'Yes' : 'No'}</span>
          <span>Adaptive intensity: {adaptiveIntensity}</span>
        </div>
        
        {/* Theme Toggle */}
        <div className="flex items-center justify-center gap-2">
          <Label className="label-organic">Light</Label>
          <Switch checked={darkMode} onCheckedChange={handleThemeToggle} />
          <Label className="label-organic">Dark</Label>
        </div>
      </div>

      {/* Theme-Adaptive Textures */}
      <section className="space-y-4">
        <h2 className="heading-organic-2">Theme-Adaptive Textures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['paper', 'canvas', 'grain'].map((texture) => (
            <Card key={texture} className="card-organic">
              <CardHeader>
                <CardTitle className="label-organic capitalize">{texture} Texture</CardTitle>
                <CardDescription className="body-organic-small">
                  Adapts intensity based on theme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`h-24 border-organic-md-sketchy ${getCompleteTextureSetup(texture as any, { adaptive: true, intensity: 'medium' })}`}>
                  <div className="p-4 h-full flex items-center justify-center">
                    <span className={getTextOverTextureClass('normal')}>
                      Adaptive {texture}
                    </span>
                  </div>
                </div>
                <p className="caption-organic">
                  Auto-adjusts for {darkMode ? 'dark' : 'light'} theme
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Text Readability Over Textures */}
      <section className="space-y-4">
        <h2 className="heading-organic-2">Text Readability Enhancement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Normal Text Readability */}
          <Card className="card-organic">
            <CardHeader>
              <CardTitle className="label-organic">Normal Text Enhancement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 border-organic-sm-sketchy ${getTextureClass('grain-medium')}`}>
                <p className={`body-organic ${getTextOverTextureClass('normal')}`}>
                  This text has normal readability enhancement over medium grain texture.
                </p>
              </div>
              <div className={`p-4 border-organic-sm-sketchy ${getTextureClass('paper')}`}>
                <p className={`body-organic ${getReadabilityClass('subtle')}`}>
                  This text uses subtle readability class over paper texture.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Strong Text Readability */}
          <Card className="card-organic">
            <CardHeader>
              <CardTitle className="label-organic">Strong Text Enhancement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 border-organic-sm-sketchy ${getTextureClass('grain-strong')}`}>
                <p className={`body-organic ${getTextOverTextureClass('strong')}`}>
                  This text has strong readability enhancement over strong grain texture.
                </p>
              </div>
              <div className={`p-4 border-organic-sm-sketchy ${getTextureClass('pencil')}`}>
                <p className={`body-organic ${getReadabilityClass('strong')}`}>
                  This text uses strong readability class over pencil texture.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Texture Overlay System */}
      <section className="space-y-4">
        <h2 className="heading-organic-2">Texture Overlay System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['paper', 'canvas', 'grain'].map((texture) => (
            <div key={texture} className={`p-6 border-organic-md-sketchy bg-sketchy-secondary ${getTextureOverlayClass(texture as any)}`}>
              <h3 className="label-organic capitalize">{texture} Overlay</h3>
              <p className="body-organic-small">
                Layered texture effect with proper z-index management
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Texture Setup Examples */}
      <section className="space-y-4">
        <h2 className="heading-organic-2">Complete Texture Setup</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Component Setup */}
          <Card className="card-organic">
            <CardHeader>
              <CardTitle className="label-organic">Card Component Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 border-organic-sm-sketchy ${getCompleteTextureSetup('paper', { 
                component: 'card', 
                intensity: 'medium', 
                textReadability: 'normal',
                adaptive: true 
              })}`}>
                <h4 className="label-organic">Paper Card</h4>
                <p className="body-organic-small">
                  Complete setup with theme adaptation and readability
                </p>
              </div>
              <div className={`p-4 border-organic-sm-sketchy ${getCompleteTextureSetup('canvas', { 
                component: 'card', 
                intensity: 'strong', 
                textReadability: 'strong',
                adaptive: true 
              })}`}>
                <h4 className="label-organic">Canvas Card</h4>
                <p className="body-organic-small">
                  Strong texture with enhanced text readability
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Input Component Setup */}
          <Card className="card-organic">
            <CardHeader>
              <CardTitle className="label-organic">Input Component Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="label-organic">Adaptive Paper Input</Label>
                <Input 
                  placeholder="Type here..." 
                  className={`input-organic ${getCompleteTextureSetup('paper', { 
                    component: 'input', 
                    intensity: 'subtle', 
                    adaptive: true 
                  })}`}
                />
              </div>
              <div className="space-y-2">
                <Label className="label-organic">Canvas Input</Label>
                <Input 
                  placeholder="Type here..." 
                  className={`input-organic ${getCompleteTextureSetup('canvas', { 
                    component: 'input', 
                    intensity: 'medium', 
                    adaptive: true 
                  })}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility & Performance Information */}
      <section className="space-y-4">
        <h2 className="heading-organic-2">Accessibility & Performance Features</h2>
        <Card className="card-organic bg-card-paper">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="label-organic">Accessibility Features</h3>
                <ul className="body-organic-small space-y-1 mt-2">
                  <li>• High contrast mode support: <strong>{highContrast ? 'Active' : 'Inactive'}</strong></li>
                  <li>• Reduced motion preference respected</li>
                  <li>• Text readability optimization</li>
                  <li>• Print-friendly texture removal</li>
                  <li>• Screen reader compatible</li>
                </ul>
              </div>
              <div>
                <h3 className="label-organic">Performance Optimizations</h3>
                <ul className="body-organic-small space-y-1 mt-2">
                  <li>• Device capability detection</li>
                  <li>• Connection quality awareness</li>
                  <li>• Mobile texture intensity reduction</li>
                  <li>• CSS-only implementation</li>
                  <li>• Theme-adaptive intensity</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-organic-sm-sketchy bg-sketchy-tertiary">
              <h4 className="label-organic">Current Settings</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                <div>
                  <strong>Theme:</strong> {darkMode ? 'Dark' : 'Light'}
                </div>
                <div>
                  <strong>Intensity:</strong> {adaptiveIntensity}
                </div>
                <div>
                  <strong>Textures:</strong> {canApplyTexture ? 'Enabled' : 'Disabled'}
                </div>
                <div>
                  <strong>Contrast:</strong> {highContrast ? 'High' : 'Normal'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}