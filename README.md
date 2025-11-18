# EventFit Platform

Production-ready campus social rental platform built with Next.js 15, TypeScript, and Firebase.

## Architecture

Monorepo structure using Turborepo:

- `apps/web` - Next.js 15 web application
- `apps/mobile` - React Native Expo mobile app (future)
- `packages/ui` - Shared UI component library
- `packages/lib` - Shared utilities and helpers
- `packages/types` - Shared TypeScript types

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build all packages
npm run build

# Run linting
npm run lint

# Type check
npm run type-check
```

## Quality Standards

This project follows Instagram/Pinterest-level quality standards:

- Zero duplicate components
- Clean, organized architecture
- Production-ready code
- Full TypeScript strict mode
- Accessibility compliant
- Performance optimized

## Component Organization

EventFit uses a strict 4-level component hierarchy:

1. **Base UI Components** (`packages/ui/src/components/`) - Button, Card, Input, etc.
2. **Layout Components** (`packages/ui/src/layouts/`) - Navbar, Footer, etc.
3. **Shared Components** (`packages/ui/src/components/shared/`) - Used in 2+ features
4. **Feature Components** (`apps/web/src/components/[feature]/`) - Feature-specific

**Import Rules:**

- Base UI: `import { Button } from '@eventfit/ui';`
- Features: `import { EventCard } from '@/components/events';`
- Shared: `import { DateBadge } from '@eventfit/ui/components/shared';`

**Before creating a component:**

1. Check `docs/COMPONENT_REGISTRY.md` for existing components
2. Check base components first
3. Check shared components if used in 2+ features
4. Create in correct location
5. Export from index file

See `docs/COMPONENT_ORGANIZATION.md` for detailed rules.

## Quality Verification

```bash
# Check for duplicate components
npm run check:duplicates

# Validate design tokens
npm run validate:tokens

# Type check
npm run type-check

# Lint
npm run lint
```

See `docs/` for detailed documentation.
