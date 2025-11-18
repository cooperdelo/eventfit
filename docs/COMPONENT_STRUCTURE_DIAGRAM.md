# Component Structure Diagram

## Visual Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    EVENTFIT PLATFORM                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  LEVEL 1: Base UI Components                                 │
│  Location: packages/ui/src/components/                       │
│  Import: @eventfit/ui                                        │
├─────────────────────────────────────────────────────────────┤
│  Button │ Card │ Input │ Avatar │ Badge │ Modal            │
│  ─────────────────────────────────────────────────────────  │
│  ✅ NEVER DUPLICATE - Use these everywhere                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ used by
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 2: Layout Components                                 │
│  Location: packages/ui/src/layouts/                         │
│  Import: @eventfit/ui                                        │
├─────────────────────────────────────────────────────────────┤
│  Navbar │ Footer │ BottomNavigation                         │
│  ─────────────────────────────────────────────────────────  │
│  ✅ NEVER DUPLICATE - Use these for layouts                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ used by
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 3: Shared Components                                 │
│  Location: packages/ui/src/components/shared/                │
│  Import: @eventfit/ui/components/shared                      │
├─────────────────────────────────────────────────────────────┤
│  DateBadge │ GradientOverlay │ FilterChip │ ProductCard     │
│  ─────────────────────────────────────────────────────────  │
│  ✅ Used in 2+ features - Check before creating              │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ used by
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 4: Feature Components                                │
│  Location: apps/web/src/components/[feature]/                │
│  Import: @/components/[feature]                             │
├─────────────────────────────────────────────────────────────┤
│  events/          │  outfits/        │  profiles/            │
│  ├─ EventCard     │  ├─ OutfitCard  │  ├─ ProfileHeader     │
│  ├─ EventGrid     │  ├─ OutfitGrid  │  ├─ ClosetGrid       │
│  └─ index.ts      │  └─ index.ts    │  └─ index.ts          │
│                                                   │          │
│  filters/         │  rentals/        │  messaging/            │
│  ├─ FilterToolbar │  ├─ RentModal   │  ├─ MessageBubble     │
│  └─ index.ts      │  └─ index.ts    │  └─ index.ts          │
│  ─────────────────────────────────────────────────────────  │
│  ✅ Feature-specific - One component per file                │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Flow Example

### EventCard Component

```
EventCard (Feature Component)
├── Uses: Card (Base UI) ──────────────┐
├── Uses: DateBadge (Shared) ──────────┤
├── Uses: Badge (Base UI) ──────────────┤
└── Uses: Avatar (Base UI) ────────────┤
                                       │
                    All imported from: │
                    @eventfit/ui       │
```

### Import Example

```tsx
// apps/web/src/components/events/EventCard.tsx

// ✅ CORRECT - Import base components
import { Card, Badge, Avatar } from '@eventfit/ui';

// ✅ CORRECT - Import shared components
import { DateBadge } from '@eventfit/ui/components/shared';

// ✅ CORRECT - Import types
import { EventCardProps } from '@eventfit/types';

// ✅ CORRECT - Import utilities
import { formatEventDateBadge } from '@eventfit/lib';

export const EventCard: React.FC<EventCardProps> = ({ ... }) => {
  return (
    <Card>
      <DateBadge />
      <Avatar />
      <Badge>Tag</Badge>
    </Card>
  );
};
```

---

## File Structure

```
packages/ui/src/
├── components/
│   ├── Button.tsx          # Base UI
│   ├── Card.tsx            # Base UI
│   ├── Input.tsx           # Base UI
│   ├── Avatar.tsx          # Base UI
│   ├── Badge.tsx           # Base UI
│   ├── Modal.tsx           # Base UI
│   ├── shared/             # Shared components
│   │   ├── DateBadge.tsx
│   │   ├── GradientOverlay.tsx
│   │   └── index.ts
│   └── index.ts            # Export all base UI
├── layouts/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── BottomNavigation.tsx
│   └── index.ts
└── index.ts                # Main export

apps/web/src/components/
├── events/
│   ├── EventCard.tsx
│   ├── EventGrid.tsx
│   └── index.ts            # Export events
├── outfits/
│   ├── OutfitCard.tsx
│   └── index.ts            # Export outfits
├── filters/
│   ├── FilterToolbar.tsx
│   └── index.ts            # Export filters
└── index.ts                # Export all features
```

---

## Decision Tree: Where Should My Component Go?

```
Need a component?
│
├─ Is it a button, card, input, avatar, badge, or modal?
│  └─ YES → Use from @eventfit/ui (Level 1)
│
├─ Is it a navbar, footer, or bottom nav?
│  └─ YES → Use from @eventfit/ui (Level 2)
│
├─ Is it used in 2+ different features?
│  └─ YES → Create in packages/ui/src/components/shared/ (Level 3)
│
└─ Is it feature-specific?
   └─ YES → Create in apps/web/src/components/[feature]/ (Level 4)
```

---

## Component Creation Checklist

Before creating ANY component:

- [ ] Checked `docs/COMPONENT_REGISTRY.md` for existing component
- [ ] Checked base components (`packages/ui/src/components/`)
- [ ] Checked shared components (`packages/ui/src/components/shared/`)
- [ ] Checked feature components (`apps/web/src/components/[feature]/`)
- [ ] Determined correct level (1, 2, 3, or 4)
- [ ] Determined correct location
- [ ] Component name follows naming convention
- [ ] Will export from index file
- [ ] Will use base components (not duplicate)
- [ ] Will update component registry after creation

---

## Import Path Quick Reference

```tsx
// Level 1: Base UI
import { Button, Card, Input } from '@eventfit/ui';

// Level 2: Layouts
import { Navbar, Footer } from '@eventfit/ui';

// Level 3: Shared
import { DateBadge } from '@eventfit/ui/components/shared';

// Level 4: Features
import { EventCard } from '@/components/events';
import { OutfitCard } from '@/components/outfits';

// Convenience: All features
import { EventCard, FilterToolbar } from '@/components';
```

---

## Anti-Patterns

### ❌ Don't Do This

```tsx
// ❌ Creating duplicate Button
// apps/web/src/components/events/MyButton.tsx
export const MyButton = () => <button>...</button>;

// ❌ Duplicating shared component
// apps/web/src/components/events/DateBadge.tsx
export const DateBadge = () => { ... };
// apps/web/src/components/outfits/DateBadge.tsx
export const DateBadge = () => { ... };

// ❌ Wrong location
// apps/web/src/components/Button.tsx (should be in packages/ui)

// ❌ Direct file imports
import { EventCard } from '@/components/events/EventCard';
```

### ✅ Do This Instead

```tsx
// ✅ Use existing Button
import { Button } from '@eventfit/ui';

// ✅ Create shared component once
// packages/ui/src/components/shared/DateBadge.tsx
export const DateBadge = () => { ... };
// Import in both places
import { DateBadge } from '@eventfit/ui/components/shared';

// ✅ Correct location
// packages/ui/src/components/Button.tsx

// ✅ Import from index
import { EventCard } from '@/components/events';
```
