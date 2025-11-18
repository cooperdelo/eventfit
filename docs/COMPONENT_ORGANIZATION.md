# Component Organization System

## Purpose

This document defines the strict component organization system to ensure zero duplication and maintain clean architecture.

---

## Component Hierarchy

### Level 1: Base UI Components (`packages/ui/src/components/`)

**Purpose:** Reusable, design-system components used everywhere
**Location:** `packages/ui/src/components/`
**Rule:** NEVER duplicate these. Always import from `@eventfit/ui`

**Components:**

- `Button` - All buttons
- `Card` - All cards
- `Input` - All form inputs
- `Avatar` - All profile pictures
- `Badge` - All tags/chips
- `Modal` - All modals/dialogs

### Level 2: Layout Components (`packages/ui/src/layouts/`)

**Purpose:** Page-level layout components
**Location:** `packages/ui/src/layouts/`
**Rule:** NEVER duplicate these. Always import from `@eventfit/ui`

**Components:**

- `Navbar` - Top navigation
- `Footer` - Page footer
- `BottomNavigation` - Mobile bottom nav

### Level 3: Feature Components (`apps/web/src/components/`)

**Purpose:** Feature-specific components that use base components
**Location:** `apps/web/src/components/[feature]/`
**Rule:** One component per file. Group by feature.

**Structure:**

```
apps/web/src/components/
├── events/           # Event-related components
│   ├── EventCard.tsx
│   ├── EventGrid.tsx
│   ├── EventDetailHero.tsx
│   └── index.ts      # Exports all event components
├── outfits/          # Outfit-related components
│   ├── OutfitCard.tsx
│   ├── OutfitGrid.tsx
│   └── index.ts
├── profiles/         # Profile-related components
│   ├── ProfileHeader.tsx
│   ├── ClosetGrid.tsx
│   └── index.ts
├── filters/          # Filter components
│   ├── FilterToolbar.tsx
│   └── index.ts
├── auth/             # Auth components
│   ├── ProtectedRoute.tsx
│   └── index.ts
└── providers/        # Context providers
    ├── AuthProvider.tsx
    └── index.ts
```

### Level 4: Shared Feature Components (`packages/ui/src/components/shared/`)

**Purpose:** Components used across multiple features but not base UI
**Location:** `packages/ui/src/components/shared/`
**Rule:** Only if used in 2+ features

**Examples:**

- `DateBadge` - Used in EventCard AND EventDetailHero
- `GradientOverlay` - Used in EventCard AND other image overlays
- `ProductCard` - Used for outfits, rentals, AND inspiration

---

## Component Organization Rules

### Rule 1: One Component Per File

```tsx
// ✅ GOOD
// EventCard.tsx
export const EventCard = () => { ... }

// ❌ BAD
// Events.tsx
export const EventCard = () => { ... }
export const EventGrid = () => { ... }
export const EventDetail = () => { ... }
```

### Rule 2: Always Use Base Components

```tsx
// ✅ GOOD
import { Button, Card } from '@eventfit/ui';

// ❌ BAD
// Creating a new button component
const MyButton = () => <button>...</button>;
```

### Rule 3: Feature-Specific Components in Feature Folders

```tsx
// ✅ GOOD
// apps/web/src/components/events/EventCard.tsx
// apps/web/src/components/outfits/OutfitCard.tsx

// ❌ BAD
// apps/web/src/components/EventCard.tsx (which feature?)
// apps/web/src/components/OutfitCard.tsx (mixed with events)
```

### Rule 4: Shared Components Go to packages/ui

```tsx
// ✅ GOOD
// packages/ui/src/components/shared/DateBadge.tsx
// Used by: EventCard, EventDetailHero

// ❌ BAD
// apps/web/src/components/events/DateBadge.tsx (only used in events)
// apps/web/src/components/outfits/DateBadge.tsx (duplicate!)
```

### Rule 5: Always Export from Index Files

```tsx
// ✅ GOOD
// components/events/index.ts
export { EventCard } from './EventCard';
export { EventGrid } from './EventGrid';

// Import:
import { EventCard, EventGrid } from '@/components/events';

// ❌ BAD
// Direct imports from files
import { EventCard } from '@/components/events/EventCard';
```

---

## Component File Structure

### Standard Component File

```tsx
// components/[feature]/[ComponentName].tsx

'use client'; // If using hooks

import React from 'react';
// 1. Base UI components from @eventfit/ui
import { Button, Card } from '@eventfit/ui';
// 2. Shared components
import { DateBadge } from '@eventfit/ui/components/shared';
// 3. Types
import { ComponentProps } from '@eventfit/types';
// 4. Utils
import { formatDate } from '@eventfit/lib';

/**
 * ComponentName component
 * Purpose: [What this component does]
 * Reference: [Which reference image this matches]
 */
export interface ComponentNameProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructured props
}) => {
  // Component logic
  return (
    // JSX
  );
};

// Default export for convenience
export default ComponentName;
```

---

## Import Guidelines

### Always Import Base Components from @eventfit/ui

```tsx
// ✅ CORRECT
import { Button, Card, Input, Avatar, Badge, Modal } from '@eventfit/ui';

// ❌ WRONG
import Button from '@/components/ui/Button';
import { Button } from '@/components/Button';
```

### Import Feature Components from Feature Index

```tsx
// ✅ CORRECT
import { EventCard, EventGrid } from '@/components/events';
import { OutfitCard } from '@/components/outfits';

// ❌ WRONG
import { EventCard } from '@/components/events/EventCard';
```

### Import Shared Components from @eventfit/ui

```tsx
// ✅ CORRECT
import { DateBadge, GradientOverlay } from '@eventfit/ui/components/shared';

// ❌ WRONG
import { DateBadge } from '@/components/shared/DateBadge';
```

---

## Component Naming Conventions

### Base UI Components

- PascalCase
- Single word or compound: `Button`, `Input`, `Modal`
- Examples: `Button`, `Card`, `Input`, `Avatar`, `Badge`

### Feature Components

- PascalCase
- Feature prefix: `EventCard`, `OutfitCard`, `ProfileHeader`
- Examples: `EventCard`, `EventGrid`, `OutfitCard`, `ClosetGrid`

### Shared Components

- PascalCase
- Descriptive name: `DateBadge`, `GradientOverlay`, `ProductCard`
- Examples: `DateBadge`, `GradientOverlay`, `FilterChip`

---

## Component Discovery

### Before Creating a New Component

1. **Check Base Components** (`packages/ui/src/components/`)
   - Does a base component exist?
   - Can I extend a base component?

2. **Check Shared Components** (`packages/ui/src/components/shared/`)
   - Is there a similar component?
   - Can I reuse it?

3. **Check Feature Components** (`apps/web/src/components/[feature]/`)
   - Is there a similar component in another feature?
   - Should it be moved to shared?

4. **Check Component Registry** (`docs/COMPONENT_REGISTRY.md`)
   - Is this component already documented?
   - What's the intended location?

---

## Component Registry

See `docs/COMPONENT_REGISTRY.md` for the complete list of all components and their locations.

---

## Duplicate Prevention

### Automated Checks

- ESLint rule: Prevent duplicate component names
- Pre-commit hook: Check for duplicate exports
- Component validator: Scan for similar components

### Manual Checks

- Before creating: Check component registry
- Code review: Verify no duplicates
- Weekly audit: Review component structure

---

## Migration Guide

### If You Find a Duplicate Component

1. **Identify the canonical version**
   - Which one matches design system?
   - Which one is more complete?
   - Which one is in the correct location?

2. **Update all imports**
   - Find all usages
   - Update to use canonical version
   - Remove duplicate

3. **Update component registry**
   - Remove duplicate entry
   - Update documentation

---

## Examples

### ✅ Good Component Organization

```tsx
// packages/ui/src/components/Button.tsx (Base)
export const Button = () => { ... }

// packages/ui/src/components/shared/DateBadge.tsx (Shared)
export const DateBadge = () => { ... }

// apps/web/src/components/events/EventCard.tsx (Feature)
import { Button, Card } from '@eventfit/ui';
import { DateBadge } from '@eventfit/ui/components/shared';

export const EventCard = () => {
  return (
    <Card>
      <DateBadge />
      <Button>Action</Button>
    </Card>
  );
};
```

### ❌ Bad Component Organization

```tsx
// ❌ Duplicate Button
// apps/web/src/components/events/MyButton.tsx
export const MyButton = () => { ... }

// ❌ Duplicate DateBadge
// apps/web/src/components/events/DateBadge.tsx
export const DateBadge = () => { ... }
// apps/web/src/components/outfits/DateBadge.tsx
export const DateBadge = () => { ... }

// ❌ Wrong location
// apps/web/src/components/Button.tsx (should be in packages/ui)
export const Button = () => { ... }
```

---

## Checklist: Before Creating a Component

- [ ] Checked base components (`packages/ui/src/components/`)
- [ ] Checked shared components (`packages/ui/src/components/shared/`)
- [ ] Checked feature components (`apps/web/src/components/[feature]/`)
- [ ] Checked component registry
- [ ] Determined correct location
- [ ] Component name follows naming convention
- [ ] Will export from index file
- [ ] Will use base components (not duplicate)

---

## Enforcement

### Pre-Commit Hook

- Validates component structure
- Checks for duplicates
- Ensures proper imports

### Code Review

- Verify component location
- Check for duplicates
- Ensure proper imports

### Weekly Audit

- Review component structure
- Identify potential duplicates
- Update component registry
