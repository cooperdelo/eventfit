# Component Import Guide

Quick reference for importing components correctly to prevent duplication.

---

## ✅ Correct Imports

### Base UI Components

```tsx
// Always import from @eventfit/ui
import { Button, Card, Input, Avatar, Badge, Modal } from '@eventfit/ui';
```

### Layout Components

```tsx
// Always import from @eventfit/ui
import { Navbar, Footer, BottomNavigation } from '@eventfit/ui';
```

### Shared Components

```tsx
// Import from shared folder
import { DateBadge, GradientOverlay } from '@eventfit/ui/components/shared';
```

### Feature Components

```tsx
// Import from feature index
import { EventCard, EventGrid } from '@/components/events';
import { OutfitCard } from '@/components/outfits';
import { FilterToolbar } from '@/components/filters';
```

### All Components (Convenience)

```tsx
// Import from main components index
import { EventCard, FilterToolbar } from '@/components';
```

---

## ❌ Wrong Imports (Will Cause Duplicates)

### Don't Import Directly from Files

```tsx
// ❌ WRONG
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/Button';

// ✅ CORRECT
import { EventCard } from '@/components/events';
import { Button } from '@eventfit/ui';
```

### Don't Create Duplicate Components

```tsx
// ❌ WRONG - Creating a new button
const MyButton = () => <button className="...">Click</button>;

// ✅ CORRECT - Use existing Button
import { Button } from '@eventfit/ui';
<Button>Click</Button>;
```

### Don't Copy Component Code

```tsx
// ❌ WRONG - Copying Card component
const MyCard = ({ children }) => (
  <div className="bg-white rounded-xl shadow-sm p-4">{children}</div>
);

// ✅ CORRECT - Use existing Card
import { Card } from '@eventfit/ui';
<Card>{children}</Card>;
```

---

## Import Path Reference

| Component Type    | Import Path                      | Example                                                       |
| ----------------- | -------------------------------- | ------------------------------------------------------------- |
| Base UI           | `@eventfit/ui`                   | `import { Button } from '@eventfit/ui';`                      |
| Layouts           | `@eventfit/ui`                   | `import { Navbar } from '@eventfit/ui';`                      |
| Shared            | `@eventfit/ui/components/shared` | `import { DateBadge } from '@eventfit/ui/components/shared';` |
| Events            | `@/components/events`            | `import { EventCard } from '@/components/events';`            |
| Outfits           | `@/components/outfits`           | `import { OutfitCard } from '@/components/outfits';`          |
| Filters           | `@/components/filters`           | `import { FilterToolbar } from '@/components/filters';`       |
| Profiles          | `@/components/profiles`          | `import { ProfileHeader } from '@/components/profiles';`      |
| Rentals           | `@/components/rentals`           | `import { RentModal } from '@/components/rentals';`           |
| Messaging         | `@/components/messaging`         | `import { MessageBubble } from '@/components/messaging';`     |
| Inspiration       | `@/components/inspiration`       | `import { InspirationGrid } from '@/components/inspiration';` |
| All (convenience) | `@/components`                   | `import { EventCard, FilterToolbar } from '@/components';`    |

---

## Quick Decision Tree

**Need a button?**
→ Use `Button` from `@eventfit/ui`

**Need a card?**
→ Use `Card` from `@eventfit/ui` OR create feature-specific card (EventCard, OutfitCard)

**Need an input?**
→ Use `Input` from `@eventfit/ui`

**Need a modal?**
→ Use `Modal` from `@eventfit/ui`

**Need a component used in 2+ features?**
→ Check `@eventfit/ui/components/shared` OR create shared component

**Need a feature-specific component?**
→ Create in `apps/web/src/components/[feature]/` and export from index

---

## Common Mistakes

### Mistake 1: Creating New Base Component

```tsx
// ❌ WRONG
// components/ui/MyButton.tsx
export const MyButton = () => { ... }

// ✅ CORRECT
// Use existing Button from @eventfit/ui
import { Button } from '@eventfit/ui';
```

### Mistake 2: Duplicating Shared Component

```tsx
// ❌ WRONG
// components/events/DateBadge.tsx
export const DateBadge = () => { ... }
// components/outfits/DateBadge.tsx
export const DateBadge = () => { ... }

// ✅ CORRECT
// packages/ui/src/components/shared/DateBadge.tsx
export const DateBadge = () => { ... }
// Import in both places
import { DateBadge } from '@eventfit/ui/components/shared';
```

### Mistake 3: Wrong Import Path

```tsx
// ❌ WRONG
import { EventCard } from '@/components/events/EventCard';

// ✅ CORRECT
import { EventCard } from '@/components/events';
```

---

## Validation

Run these commands to check for issues:

```bash
# Check for duplicate components
npm run check:duplicates

# Check for design token violations
npm run validate:tokens

# Type check
npm run type-check

# Lint
npm run lint
```

---

## Need Help?

1. Check `docs/COMPONENT_REGISTRY.md` for existing components
2. Check `docs/COMPONENT_ORGANIZATION.md` for organization rules
3. Run `npm run check:duplicates` to find duplicates
4. Review import paths in this guide
