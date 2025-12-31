# Project Structure & Organization

## Root Directory Structure

```
employee-qr-track/
├── .kiro/                    # Kiro IDE configuration
├── .vscode/                  # VS Code settings
├── public/                   # Static assets
├── src/                      # Source code
├── node_modules/             # Dependencies
├── package.json              # Project configuration
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Source Code Organization (`src/`)

### Feature-Based Architecture
```
src/
├── components/              # Shared UI components
│   └── ui/                 # shadcn/ui component library (47 components)
├── features/               # Feature modules (business logic)
│   ├── auth/              # Authentication
│   ├── dashboard/         # Main dashboard
│   ├── employee-management/ # Employee CRUD operations
│   ├── employee-app/      # Employee mobile interface
│   ├── kiosk/            # Kiosk terminal interface
│   ├── reports/          # Analytics and reporting
│   ├── settings/         # Application settings
│   └── onboarding/       # User onboarding flow
├── routes/                # TanStack Router file-based routing
├── hooks/                 # Global custom hooks
├── lib/                   # Utility functions and configurations
├── integrations/          # Third-party service integrations
├── main.tsx              # Application entry point
├── types.ts              # Global TypeScript definitions
└── styles.css            # Global CSS styles
```

## Feature Module Structure

Each feature follows a consistent internal organization:

```
features/[feature-name]/
├── index.tsx             # Main component export
├── components/           # Feature-specific components
│   ├── FeatureForm.tsx
│   ├── FeatureTable.tsx
│   └── FeatureCard.tsx
├── api/                  # Data fetching logic
│   ├── queries.ts        # TanStack Query queries
│   └── mutations.ts      # TanStack Query mutations
├── hooks/                # Feature-specific custom hooks
│   └── useFeature.ts
├── types.ts              # Feature-specific TypeScript types
└── styles.css            # Feature-specific styles (if needed)
```

## Component Library (`src/components/ui/`)

47 pre-built shadcn/ui components organized by category:

### Layout Components
- `card.tsx` - Content containers
- `separator.tsx` - Visual dividers
- `tabs.tsx` - Tabbed interfaces
- `accordion.tsx` - Collapsible content
- `sidebar.tsx` - Navigation sidebar
- `resizable.tsx` - Resizable panels

### Form Components
- `input.tsx` - Text inputs
- `textarea.tsx` - Multi-line text
- `select.tsx` - Dropdown selection
- `checkbox.tsx` - Boolean inputs
- `radio-group.tsx` - Single selection
- `switch.tsx` - Toggle switches
- `calendar.tsx` - Date picker
- `form.tsx` - Form wrapper with validation

### Data Display
- `table.tsx` - Data tables
- `badge.tsx` - Status indicators
- `avatar.tsx` - User profile images
- `progress.tsx` - Progress indicators
- `chart.tsx` - Data visualization
- `skeleton.tsx` - Loading placeholders

### Feedback Components
- `alert.tsx` - Notifications
- `dialog.tsx` - Modal dialogs
- `toast.tsx` - Toast notifications
- `tooltip.tsx` - Contextual help
- `spinner.tsx` - Loading indicators

### Navigation
- `button.tsx` - Interactive buttons
- `dropdown-menu.tsx` - Context menus
- `breadcrumb.tsx` - Navigation breadcrumbs
- `pagination.tsx` - Page navigation

## Routing Structure (`src/routes/`)

File-based routing with TanStack Router:

```
routes/
├── __root.tsx            # Root layout component
├── index.tsx             # Landing page (/)
├── dashboard/            # Dashboard routes (/dashboard/*)
│   ├── index.tsx         # Dashboard home
│   ├── employees.tsx     # Employee management
│   ├── reports.tsx       # Reports and analytics
│   └── settings.tsx      # Application settings
├── auth/                 # Authentication routes (/auth/*)
│   ├── login.tsx         # Login page
│   └── register.tsx      # Registration page
├── employee/             # Employee app routes (/employee/*)
│   ├── index.tsx         # Employee dashboard
│   ├── attendance.tsx    # Attendance history
│   └── scanner.tsx       # QR code scanner
└── kiosk/               # Kiosk routes (/kiosk/*)
    ├── index.tsx         # Kiosk login
    └── display.tsx       # Kiosk check-in interface
```

## Key Architectural Principles

### 1. Feature Isolation
- Each feature is self-contained with its own components, hooks, and API logic
- Features can be developed and tested independently
- Minimal cross-feature dependencies

### 2. Component Composition
- Small, single-responsibility components
- Compose complex UIs from simple building blocks
- Reuse shadcn/ui components instead of creating custom ones

### 3. Type Safety
- Strict TypeScript configuration
- Shared types in `src/types.ts`
- Feature-specific types in feature modules
- Generated route types from TanStack Router

### 4. Consistent Naming Conventions
- **PascalCase** for React components: `EmployeeCard.tsx`
- **camelCase** for functions and variables: `useEmployees.ts`
- **kebab-case** for file/folder names: `employee-management/`
- **UPPER_CASE** for constants: `API_BASE_URL`

### 5. Import Aliases
Configured path aliases for clean imports:
- `@/components` → `src/components`
- `@/features` → `src/features`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

### 6. State Management Strategy
- **Server State**: TanStack Query for API data
- **Client State**: Zustand for global app state
- **Form State**: React Hook Form for form management
- **URL State**: TanStack Router for navigation state

## File Organization Rules

### Do's ✅
- Keep components under 200 lines
- Use feature-based organization
- Export main component from `index.tsx`
- Group related functionality together
- Use consistent file naming

### Don'ts ❌
- Don't create deeply nested folder structures
- Don't mix business logic with UI components
- Don't create generic "utils" folders without clear purpose
- Don't duplicate component functionality
- Don't ignore the established patterns