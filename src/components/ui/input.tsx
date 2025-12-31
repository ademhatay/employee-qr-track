import * as React from "react"

import { cn } from "@/lib/utils"
import { getSketchyClasses, type SketchyComponentProps } from "@/lib/design-system"

interface InputProps extends Omit<React.ComponentProps<"input">, 'size'>, Omit<SketchyComponentProps, 'variant'> {
  sketchy?: boolean
}

function Input({ 
  className, 
  type, 
  sketchy = false,
  organic = true,
  animated = true,
  texture = "paper",
  size = "md",
  ...props 
}: InputProps) {
  // Get sketchy classes if needed
  const sketchyClasses = sketchy ? getSketchyClasses({
    organic,
    animated,
    texture,
    variant: 'default',
    size,
  }) : ""

  const baseClasses = sketchy
    ? "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm input-organic font-body-primary"
    : "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"

  return (
    <input
      type={type}
      data-slot="input"
      data-sketchy={sketchy}
      className={cn(
        baseClasses,
        sketchyClasses,
        className
      )}
      {...props}
    />
  )
}

export { Input }
