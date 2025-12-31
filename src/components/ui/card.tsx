import * as React from "react"

import { cn } from "@/lib/utils"
import { getSketchyClasses, type SketchyComponentProps } from "@/lib/design-system"

interface CardProps extends React.ComponentProps<"div">, Partial<SketchyComponentProps> {
  sketchy?: boolean
}

function Card({ 
  className, 
  sketchy = false,
  organic = true,
  animated = true,
  texture = "canvas",
  ...props 
}: CardProps) {
  // Get sketchy classes if needed
  const sketchyClasses = sketchy ? getSketchyClasses({
    organic,
    animated,
    texture,
    variant: 'default',
    size: 'md',
  }) : ""

  const baseClasses = sketchy 
    ? "bg-card text-card-foreground flex flex-col gap-6 py-6 shadow-sm card-organic card-shadow-organic"
    : "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"

  return (
    <div
      data-slot="card"
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

function CardHeader({ className, sketchy = false, ...props }: React.ComponentProps<"div"> & { sketchy?: boolean }) {
  const headerClasses = sketchy
    ? "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 text-over-texture"
    : "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"

  return (
    <div
      data-slot="card-header"
      className={cn(headerClasses, className)}
      {...props}
    />
  )
}

function CardTitle({ className, sketchy = false, ...props }: React.ComponentProps<"div"> & { sketchy?: boolean }) {
  const titleClasses = sketchy
    ? "leading-none font-semibold heading-organic-5 text-sketchy-primary"
    : "leading-none font-semibold"

  return (
    <div
      data-slot="card-title"
      className={cn(titleClasses, className)}
      {...props}
    />
  )
}

function CardDescription({ className, sketchy = false, ...props }: React.ComponentProps<"div"> & { sketchy?: boolean }) {
  const descriptionClasses = sketchy
    ? "text-muted-foreground text-sm body-organic-small text-sketchy-text-secondary"
    : "text-muted-foreground text-sm"

  return (
    <div
      data-slot="card-description"
      className={cn(descriptionClasses, className)}
      {...props}
    />
  )
}

function CardAction({ className, sketchy = false, ...props }: React.ComponentProps<"div"> & { sketchy?: boolean }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, sketchy = false, ...props }: React.ComponentProps<"div"> & { sketchy?: boolean }) {
  const contentClasses = sketchy
    ? "px-6 body-organic text-sketchy-text-primary"
    : "px-6"

  return (
    <div
      data-slot="card-content"
      className={cn(contentClasses, className)}
      {...props}
    />
  )
}

function CardFooter({ className, sketchy = false, ...props }: React.ComponentProps<"div"> & { sketchy?: boolean }) {
  const footerClasses = sketchy
    ? "flex items-center px-6 [.border-t]:pt-6 text-over-texture"
    : "flex items-center px-6 [.border-t]:pt-6"

  return (
    <div
      data-slot="card-footer"
      className={cn(footerClasses, className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
