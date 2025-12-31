# Technology Stack & Build System

## Core Technologies

### Frontend Framework
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5.7.2** - Strict type checking enabled
- **Vite 7.1.7** - Fast build tool and dev server

### Routing & State Management
- **TanStack Router 1.132.0** - File-based routing with type safety
- **TanStack Query 5.66.5** - Server state management and caching
- **Zustand 5.0.9** - Lightweight client state management

### UI & Styling
- **Tailwind CSS 4.0.6** - Utility-first CSS framework
- **shadcn/ui** - 47 pre-built accessible components
- **Radix UI** - Headless UI primitives for complex components
- **Lucide React** - Icon library
- **next-themes** - Dark/light mode support

### Forms & Validation
- **React Hook Form 7.69.0** - Performant forms with minimal re-renders
- **Zod 4.2.1** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration between RHF and Zod

### Data Display
- **TanStack Table 8.21.2** - Headless table library
- **Recharts 2.15.4** - Chart library for analytics
- **date-fns 4.1.0** - Date manipulation utilities

### Development Tools
- **ESLint** - Code linting with TanStack config
- **Prettier** - Code formatting
- **Vitest 3.0.5** - Unit testing framework
- **@testing-library/react** - Component testing utilities

## Build Commands

### Development
```bash
# Install dependencies
bun install

# Start development server (port 3000)
bun run dev

# Alternative with bun runtime
bun --bun run start
```

### Production
```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

### Code Quality
```bash
# Run linting
bun run lint

# Format code
bun run format

# Run both linting and formatting
bun run check

# Run tests
bun run test
```

## Package Manager
- **Bun** - Fast JavaScript runtime and package manager
- Lock file: `bun.lock`

## Configuration Files
- `vite.config.ts` - Vite configuration with React, TanStack Router, and Tailwind
- `tsconfig.json` - TypeScript configuration with strict mode
- `eslint.config.js` - ESLint with TanStack configuration
- `prettier.config.js` - Prettier formatting rules
- `components.json` - shadcn/ui configuration
- `tailwind.config.js` - Tailwind CSS configuration (auto-generated)

## Key Dependencies

### Runtime Dependencies
- QR Code libraries: `html5-qrcode`, `qrcode.react`
- UI utilities: `class-variance-authority`, `clsx`, `tailwind-merge`
- Animation: `tw-animate-css`
- Notifications: `sonner`
- Mock data: `@faker-js/faker`

### Development Dependencies
- Build tools: `@vitejs/plugin-react`, `@tanstack/router-plugin`
- Testing: `jsdom`, `@testing-library/dom`
- Type definitions: `@types/node`, `@types/react`

## Architecture Patterns
- **Feature-based folder structure** - Each feature is self-contained
- **Component composition** - Small, reusable components
- **Custom hooks** - Encapsulated logic and state management
- **Type-safe routing** - Generated route types with TanStack Router
- **Server state caching** - Optimistic updates with TanStack Query