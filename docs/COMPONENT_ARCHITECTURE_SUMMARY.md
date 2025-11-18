# Component Architecture Summary

## Overview

EventFit uses a strict 4-level component hierarchy to prevent duplication and maintain clean architecture.

---

## Component Hierarchy

```
Level 1: Base UI Components (packages/ui/src/components/)
├── Button.tsx
├── Card.tsx
├── Input.tsx
├── Avatar.tsx
├── Badge.tsx
└── Modal.tsx

Level 2: Layout Components (packages/ui/src/layouts/)
├── Navbar.tsx
├── Footer.tsx
└── BottomNavigation.tsx

Level 3: Shared Components (packages/ui/src/components/shared/)
├── DateBadge.tsx (used in 2+ features)
├── GradientOverlay.tsx (used in 2+ features)
├── FilterChip.tsx (used in 2+ features)
└── ProductCard.tsx (used in 2+ features)

Level 4: Feature Components (apps/web/src/components/[feature]/)
├── events/
│   ├── EventCard.tsx
│   ├── EventGrid.tsx
│   └── index.ts
├── outfits/
│   ├── OutfitCard.tsx
│   └── index.ts
├── profiles/
│   ├── ProfileHeader.tsx
│   └── index.ts
├── filters/
│   ├── FilterToolbar.tsx
│   └── index.ts
├── auth/
│   ├── ProtectedRoute.tsx
│   └── index.ts
└── providers/
    ├── AuthProvider.tsx
    └── index.ts
```

---

## Import Rules

### ✅ Always Import Base Components from @eventfit/ui

```tsx
import { Button, Card, Input } from '@eventfit/ui';
```

### ✅ Always Import Feature Components from Feature Index

```tsx
import { EventCard } from '@/components/events';
import { OutfitCard } from '@/components/outfits';
```

### ✅ Always Import Shared Components from Shared Folder

```tsx
import { DateBadge } from '@eventfit/ui/components/shared';
```

### ❌ Never Import Directly from Files

```tsx
// ❌ WRONG
import { EventCard } from '@/components/events/EventCard';
```

---

## Component Organization Rules

1. **One Component Per File** - Each component gets its own file
2. **Always Use Base Components** - Never duplicate Button, Card, Input, etc.
3. **Feature-Specific in Feature Folders** - Group by feature
4. **Shared Components Go to packages/ui** - If used in 2+ features
5. **Always Export from Index** - Use index.ts files for clean imports

---

## Automated Checks

### Pre-Commit Hooks

- ✅ Design token validation
- ✅ Duplicate component detection
- ✅ Linting and formatting

### Manual Checks

```bash
# Check for duplicate components
npm run check:duplicates

# Validate design tokens
npm run validate:tokens
```

---

## Component Registry

See `docs/COMPONENT_REGISTRY.md` for complete list of all components.

---

## Quick Reference

**Before creating a component:**

1. Check `docs/COMPONENT_REGISTRY.md`
2. Check base components (`packages/ui/src/components/`)
3. Check shared components (`packages/ui/src/components/shared/`)
4. Check feature components (`apps/web/src/components/[feature]/`)
5. Determine correct location
6. Create component following structure
7. Export from index file
8. Update component registry

**Import paths:**

- Base UI: `@eventfit/ui`
- Layouts: `@eventfit/ui`
- Shared: `@eventfit/ui/components/shared`
- Features: `@/components/[feature]`
- All: `@/components`

---

## Enforcement

- **Pre-commit hooks** block commits with duplicates
- **ESLint rules** prevent duplicate imports
- **Component validator** scans for duplicates
- **Code review** checks component organization
- **Component registry** tracks all components

---

## Benefits

✅ Zero duplicate components
✅ Clean, organized architecture
✅ Easy to find components
✅ Consistent imports
✅ Scalable structure
✅ Type-safe exports
