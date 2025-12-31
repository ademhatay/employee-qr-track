import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { getSketchyClasses, type SketchyComponentProps } from "@/lib/design-system"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-md",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
        // New sketchy variants
        sketchy: "bg-sketchy-primary text-black hover:bg-sketchy-primary-light btn-organic button-shadow-organic font-display-primary",
        "sketchy-outline": "border-sketchy border-sketchy-primary bg-sketchy-bg-primary text-sketchy-primary hover:bg-sketchy-bg-secondary btn-organic button-shadow-organic font-display-primary",
        "sketchy-secondary": "bg-sketchy-secondary text-black hover:bg-sketchy-secondary-light btn-organic button-shadow-organic font-display-primary bg-texture-grain",
        "sketchy-ghost": "text-sketchy-primary hover:bg-sketchy-bg-secondary hover-organic btn-organic font-display-primary",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  organic = true,
  animated = true,
  texture = "none",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & 
  Omit<SketchyComponentProps, 'variant' | 'size'> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  // Determine if we should use sketchy styling
  const isSketchyVariant = variant?.includes('sketchy')
  
  // Get sketchy classes if needed
  const sketchyClasses = isSketchyVariant ? getSketchyClasses({
    organic,
    animated,
    texture,
    variant: 'default',
    size: size as any,
  }) : ""

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-sketchy={isSketchyVariant}
      className={cn(
        buttonVariants({ variant, size }),
        sketchyClasses,
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
