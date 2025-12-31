"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  sketchy?: boolean
}

function Label({
  className,
  sketchy = false,
  ...props
}: LabelProps) {
  const labelClasses = sketchy
    ? "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 label-organic text-sketchy-primary"
    : "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"

  return (
    <LabelPrimitive.Root
      data-slot="label"
      data-sketchy={sketchy}
      className={cn(labelClasses, className)}
      {...props}
    />
  )
}

export { Label }
