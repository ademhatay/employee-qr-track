# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (runs on port 3000)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run tests
bun run test

# Lint and format
bun run lint
bun run format
bun run check  # Run both prettier and eslint
```

## Installing shadcn Components

Use the latest version when adding new shadcn components:

```bash
pnpm dlx shadcn@latest add button
```

## Architecture Overview

This is an **employee QR tracking system** with four main interfaces: admin dashboard, employee app, kiosk mode, and authentication.

### Technology Stack

- **React 19.2.0** with TypeScript and Vite
- **TanStack Router** - File-based routing in `src/routes/`
- **TanStack Query** - Data fetching and caching with LocalStorage persistence
- **Zustand** - State management (auth, data, kiosk stores)
- **Tailwind CSS v4** - Styling with custom hand-drawn design system
- **Shadcn/ui** - 47+ pre-built UI components (always check before creating custom components)
- **React Hook Form + Zod** - Form validation
- **html5-qrcode** - QR code scanning

### Directory Structure

```
src/
├── components/ui/        # shadcn/ui components (47 components - USE THESE!)
├── features/             # Feature-based organization
│   ├── home-page/       # Landing page
│   ├── dashboard/       # Admin dashboard
│   ├── employee-app/    # Mobile employee app (QR scanner, history)
│   ├── employee-management/  # Employee CRUD operations
│   ├── kiosk/           # Kiosk mode for physical scanners
│   ├── reports/         # Analytics and charts
│   ├── settings/        # System configuration
│   └── auth/            # Authentication flows
├── routes/              # TanStack Router file-based routing
├── lib/                 # Utilities, including design system
├── hooks/               # Global custom hooks
├── integrations/        # TanStack Query setup
└── stores/              # Zustand stores with LocalStorage persistence
```

### Feature-Based Architecture

Each feature folder is self-contained:
```typescript
features/employee-management/
  index.tsx              # Main component export
  EmployeeList.tsx       # List view
  EmployeeForm.tsx       # Form component
  components/            # Feature-specific components
  hooks/                 # Feature-specific hooks
  api/                   # TanStack Query queries & mutations
  types.ts               # TypeScript interfaces
```

**Important:** Routes in `src/routes/` should only contain routing logic - business logic belongs in features.

```typescript
// ✅ Correct: src/routes/dashboard/employees.tsx
import { createFileRoute } from '@tanstack/react-router'
import { EmployeeManagement } from '@/features/employee-management'

export const Route = createFileRoute('/dashboard/employees')({
  component: EmployeeManagement,
})
```

## Design System

This project uses a **hand-drawn sketchy aesthetic** with organic borders, textures, and custom typography.

### CSS Variables (src/styles.css)

The design system uses CSS custom properties that adapt to light/dark themes:
- `--sketchy-primary` - Primary color (dark charcoal in light mode)
- `--sketchy-bg-primary` - Background color (cream in light mode)
- `--sketchy-accent-blue/green/red/purple` - Accent colors
- Texture overlays: paper, canvas, grain

### Organic/Styling Classes

- **Borders**: `border-organic-sm/md/lg` for hand-drawn borders
- **Buttons**: `btn-organic button-shadow-organic`
- **Shadows**: `shadow-sketchy-sm/md/lg`
- **Typography**: Custom font families (Kalam, Caveat, Nunito) via `font-display-primary`, `font-body-primary`

### Button Variants

```typescript
// Available button variants:
<Button variant="sketchy">          // Dark bg, black text
<Button variant="sketchy-outline">  // Light bg, primary text
<Button variant="sketchy-secondary"> // With grain texture, black text
<Button variant="sketchy-ghost">    // Ghost style
```

**Important:** When working with sketchy buttons, ensure text visibility by using proper color variants.

## Data Management

### Zustand Stores (src/stores/)

Three main stores with LocalStorage persistence:
- `useAuthStore` - User authentication and company data
- `useDataStore` - Employees, attendances, kiosk accounts
- `useKioskStore` - Kiosk mode functionality

### TanStack Query Pattern

```typescript
// Define queries with queryOptions
export const employeeQueries = {
  all: () => ['employees'] as const,
  lists: () => [...employeeQueries.all(), 'list'] as const,
  list: (filters: EmployeeFilters) =>
    queryOptions({
      queryKey: [...employeeQueries.lists(), filters],
      queryFn: () => fetchEmployees(filters),
    }),
}

// Create hooks
export function useEmployees(filters: EmployeeFilters) {
  return useQuery(employeeQueries.list(filters))
}
```

### Mutations with Cache Invalidation

```typescript
export function useCreateEmployee() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (employee: CreateEmployeeInput) => createEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeQueries.lists() })
    },
  })
}
```

## UI Component Guidelines

### Always Use Existing shadcn Components

Before creating custom components, check `src/components/ui/` which includes:
- **Layout**: Card, Tabs, Accordion, Separator, Resizable, Sidebar
- **Form**: Input, Select, Checkbox, Radio Group, Switch, Calendar, Form
- **Data Display**: Table, Badge, Avatar, Skeleton, Progress
- **Feedback**: Alert, Dialog, Drawer, Toast (Sonner), Tooltip
- **Navigation**: Breadcrumb, Navigation Menu, Menubar, Dropdown Menu, Pagination
- **Buttons**: Button, Button Group, Toggle

```typescript
// ✅ Use existing components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
```

### Component Patterns

1. **Always provide loading states** using `<Spinner />` or `<Skeleton />`
2. **Handle errors** with `<Alert variant="destructive">`
3. **Show empty states** with guidance and next actions
4. **Use toast notifications** via `import { toast } from 'sonner'`
5. **Mobile-first responsive design** - test on mobile viewport

### Form Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { name: '', email: '' },
})
```

## Styling Rules

1. **Use Tailwind utility classes** - no inline styles
2. **Mobile-first approach** - use responsive prefixes (`md:`, `lg:`)
3. **Consistent spacing** - use Tailwind's scale (1, 2, 3, 4, 6, 8)
4. **Conditional classes** with `cn()` utility from `@/lib/utils`
5. **No custom CSS** unless absolutely necessary

```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  "flex items-center gap-4",
  isActive && "bg-primary text-primary-foreground"
)}>
```

## Routing

TanStack Router file-based routing:
- `src/routes/__root.tsx` - Root layout with `<Outlet />`
- `src/routes/index.tsx` - Landing page (/)
- `src/routes/dashboard/` - Admin routes
- `src/routes/auth/` - Authentication routes
- `src/routes/app/` - Employee app routes

Use `<Link />` from `@tanstack/react-router` for navigation:

```typescript
import { Link } from '@tanstack/react-router'

<Link to="/dashboard/employees">Employees</Link>
```

## Role-Based Access Control

User roles: `owner`, `admin`, `manager`, `employee`, `kiosk`

Different views and permissions based on role - check auth store before exposing functionality.

## Business Logic

### Attendance Tracking
- Employees scan QR codes to check in/out
- Attendance records track: check-in time, check-out time, location, status
- Pairs of check-in/check-out create complete attendance records

### Multi-Tenant
- Supports multiple companies with separate data
- Company ID scoping in all data operations

### Kiosk Mode
- Dedicated interface for physical QR scanners
- No authentication required - uses kiosk account credentials
- Simplified UI for quick check-in/out

## TypeScript Best Practices

1. **Define types** in feature-specific `types.ts` files
2. **Use `interface` for component props** and object shapes
3. **Use `type` for unions and derived types**
4. **Never use `any`** - use proper typing or `unknown`
5. **Leverage utility types**: `Omit`, `Partial`, `Pick`

```typescript
interface Employee {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'employee'
  status: 'active' | 'inactive'
  createdAt: Date
}

type CreateEmployeeInput = Omit<Employee, 'id' | 'createdAt'>

interface EmployeeCardProps {
  employee: Employee
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}
```

## Key Integration Notes

- **html5-qrcode**: QR scanner in employee app - requires camera permissions
- **Recharts**: Chart library for dashboard analytics
- **Sonner**: Toast notification system (import `{ toast } from 'sonner'`)
- **Phosphor Icons**: Icon library (import from `@/lib/icons.ts`)

## Important Constraints

- **Mock Data System**: All data persists to LocalStorage - no real backend yet
- **Code Splitting**: Enabled for optimal performance
- **Accessibility**: Responsive design with ARIA support required
- **Component Size**: Keep components under 200 lines - split if larger

## Quick Reference

### Import Paths
- `@/components/ui/*` - shadcn components
- `@/features/*` - Feature modules
- `@/lib/utils` - Utility functions (cn, etc.)
- `@/lib/icons` - Phosphor icon components
- `@/stores/*` - Zustand stores

### Common Patterns

```typescript
// Data fetching with loading/error states
const { data, isLoading, error } = useEmployees()
if (isLoading) return <Spinner />
if (error) return <Alert variant="destructive">{error.message}</Alert>

// Mutation with toast
const createEmployee = useCreateEmployee()
const handleSubmit = async (data: FormData) => {
  try {
    await createEmployee.mutateAsync(data)
    toast.success('Employee created successfully')
  } catch (error) {
    toast.error('Failed to create employee', { description: error.message })
  }
}
```
