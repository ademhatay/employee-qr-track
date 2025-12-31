import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/lib/icons'

export function SketchyFormDemo() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    birthdate: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      alert('Form submitted successfully!')
    }
  }

  return (
    <div className="p-8 space-y-8 bg-sketchy-bg-primary min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="heading-organic-1 text-sketchy-primary">
            Sketchy Form Components
          </h1>
          <p className="body-organic text-sketchy-text-secondary">
            Hand-drawn form inputs with organic focus states and validation styling
          </p>
        </div>

        {/* Input Comparison */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Input Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Inputs */}
            <div className="space-y-4">
              <h3 className="heading-organic-5 text-sketchy-text-secondary">Standard Inputs</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Enter your password" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="Enter your phone" />
                </div>
              </div>
            </div>

            {/* Sketchy Inputs */}
            <div className="space-y-4">
              <h3 className="heading-organic-5 text-sketchy-text-secondary">Sketchy Inputs</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label sketchy>Email</Label>
                  <Input sketchy type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label sketchy>Password</Label>
                  <Input sketchy type="password" placeholder="Enter your password" />
                </div>
                <div className="space-y-2">
                  <Label sketchy>Phone</Label>
                  <Input sketchy type="tel" placeholder="Enter your phone" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Registration Form */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Complete Registration Form</h2>
          
          <Card sketchy texture="paper" className="max-w-2xl mx-auto">
            <CardHeader sketchy>
              <CardTitle sketchy>Create Your Account</CardTitle>
              <CardDescription sketchy>
                Fill in your details to get started with our sketchy design system
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent sketchy className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label sketchy htmlFor="name">
                    <Icons.user className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    sketchy
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="caption-organic text-sketchy-accent-red">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label sketchy htmlFor="email">
                    <Icons.mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    sketchy
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="caption-organic text-sketchy-accent-red">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label sketchy htmlFor="password">
                    <Icons.lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      sketchy
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      aria-invalid={!!errors.password}
                    />
                    <Button
                      type="button"
                      variant="sketchy-ghost"
                      size="icon-sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Icons.eyeOff className="w-4 h-4" /> : <Icons.eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="caption-organic text-sketchy-accent-red">{errors.password}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label sketchy htmlFor="phone">
                    <Icons.phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    sketchy
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <Label sketchy htmlFor="address">
                    <Icons.mapPin className="w-4 h-4" />
                    Address
                  </Label>
                  <Input
                    sketchy
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                {/* Birthdate Field */}
                <div className="space-y-2">
                  <Label sketchy htmlFor="birthdate">
                    <Icons.calendar className="w-4 h-4" />
                    Date of Birth
                  </Label>
                  <Input
                    sketchy
                    id="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => handleInputChange('birthdate', e.target.value)}
                  />
                </div>
              </CardContent>

              <CardFooter sketchy className="flex flex-col gap-4">
                <Button type="submit" variant="sketchy" className="w-full">
                  Create Account
                </Button>
                <p className="caption-organic text-sketchy-text-muted text-center">
                  Already have an account?{' '}
                  <Button variant="sketchy-ghost" className="p-0 h-auto font-normal underline">
                    Sign in here
                  </Button>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Input States Demo */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Input States</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label sketchy>Normal State</Label>
              <Input sketchy placeholder="Type here..." />
            </div>
            
            <div className="space-y-2">
              <Label sketchy>Focused State</Label>
              <Input sketchy placeholder="Click to focus" autoFocus />
              <p className="caption-organic text-sketchy-text-muted">
                Click to see focus animation
              </p>
            </div>
            
            <div className="space-y-2">
              <Label sketchy>Error State</Label>
              <Input sketchy placeholder="Invalid input" aria-invalid="true" />
              <p className="caption-organic text-sketchy-accent-red">
                This field has an error
              </p>
            </div>
            
            <div className="space-y-2">
              <Label sketchy>Disabled State</Label>
              <Input sketchy placeholder="Disabled input" disabled />
            </div>
          </div>
        </div>

        {/* Texture Variants */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Input Texture Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label sketchy>Paper Texture</Label>
              <Input sketchy texture="paper" placeholder="Paper texture input" />
            </div>
            
            <div className="space-y-2">
              <Label sketchy>Canvas Texture</Label>
              <Input sketchy texture="canvas" placeholder="Canvas texture input" />
            </div>
            
            <div className="space-y-2">
              <Label sketchy>Grain Texture</Label>
              <Input sketchy texture="grain" placeholder="Grain texture input" />
            </div>
          </div>
        </div>

        {/* Form Features */}
        <div className="space-y-6">
          <h2 className="heading-organic-3 text-sketchy-primary">Form Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card sketchy texture="canvas">
              <CardHeader sketchy>
                <CardTitle sketchy>React Hook Form Compatible</CardTitle>
                <CardDescription sketchy>
                  All sketchy form components work seamlessly with React Hook Form
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Validation</Badge>
                  <Badge variant="secondary">Error Handling</Badge>
                  <Badge variant="secondary">Form State</Badge>
                </div>
              </CardContent>
            </Card>

            <Card sketchy texture="grain">
              <CardHeader sketchy>
                <CardTitle sketchy>Accessibility Features</CardTitle>
                <CardDescription sketchy>
                  Full keyboard navigation and screen reader support
                </CardDescription>
              </CardHeader>
              <CardContent sketchy>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">ARIA Labels</Badge>
                  <Badge variant="secondary">Focus Management</Badge>
                  <Badge variant="secondary">Error Announcements</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}