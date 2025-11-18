# Quick Start: Component Development

## Before You Start Coding

### 1. Check Component Registry (30 seconds)

```bash
# Open component registry
cat docs/COMPONENT_REGISTRY.md

# Or search for component
grep -i "ComponentName" docs/COMPONENT_REGISTRY.md
```

### 2. Run Duplicate Check (10 seconds)

```bash
npm run check:duplicates
```

### 3. Determine Component Location (1 minute)

**Ask yourself:**

- Is it Button, Card, Input, Avatar, Badge, or Modal? → `packages/ui/src/components/`
- Is it Navbar, Footer, or BottomNav? → `packages/ui/src/layouts/`
- Is it used in 2+ features? → `packages/ui/src/components/shared/`
- Is it feature-specific? → `apps/web/src/components/[feature]/`

---

## Creating a Component

### Step 1: Create File

```bash
# Example: Creating EventDetailHero
touch apps/web/src/components/events/EventDetailHero.tsx
```

### Step 2: Write Component

```tsx
'use client';

import React from 'react';
// Always import base components from @eventfit/ui
import { Button, Card } from '@eventfit/ui';
// Import shared components if needed
import { DateBadge } from '@eventfit/ui/components/shared';
// Import types
import { Event } from '@eventfit/types';

export interface EventDetailHeroProps {
  // Props
}

export const EventDetailHero: React.FC<EventDetailHeroProps> = ({
  // Props
}) => {
  return (
    // JSX using base components
  );
};
```

### Step 3: Export from Index

```tsx
// apps/web/src/components/events/index.ts
export { EventDetailHero } from './EventDetailHero';
```

### Step 4: Update Registry

```markdown
# docs/COMPONENT_REGISTRY.md

| EventDetailHero | EventDetailHero.tsx | Event detail hero section | ✅ Complete |
```

### Step 5: Verify

```bash
npm run check:duplicates
npm run validate:tokens
```

---

## Common Scenarios

### Scenario 1: Need a Button

```tsx
// ✅ CORRECT
import { Button } from '@eventfit/ui';
<Button variant="primary">Click</Button>;

// ❌ WRONG - Don't create new button
const MyButton = () => <button>Click</button>;
```

### Scenario 2: Need a Card for Events

```tsx
// ✅ CORRECT - Use base Card
import { Card } from '@eventfit/ui';
<Card>Event content</Card>;

// ✅ ALSO CORRECT - Create feature-specific card
// apps/web/src/components/events/EventCard.tsx
import { Card } from '@eventfit/ui';
export const EventCard = () => <Card>...</Card>;
```

### Scenario 3: Component Used in 2+ Features

```tsx
// ✅ CORRECT - Create shared component
// packages/ui/src/components/shared/DateBadge.tsx
export const DateBadge = () => { ... };

// Import in both places
import { DateBadge } from '@eventfit/ui/components/shared';
```

### Scenario 4: Feature-Specific Component

```tsx
// ✅ CORRECT - Create in feature folder
// apps/web/src/components/events/EventCard.tsx
export const EventCard = () => { ... };

// Export from index
// apps/web/src/components/events/index.ts
export { EventCard } from './EventCard';
```

---

## Import Cheat Sheet

```tsx
// Base UI Components
import { Button, Card, Input, Avatar, Badge, Modal } from '@eventfit/ui';

// Layout Components
import { Navbar, Footer, BottomNavigation } from '@eventfit/ui';

// Shared Components
import { DateBadge, GradientOverlay } from '@eventfit/ui/components/shared';

// Feature Components
import { EventCard } from '@/components/events';
import { OutfitCard } from '@/components/outfits';
import { FilterToolbar } from '@/components/filters';

// Convenience (all features)
import { EventCard, FilterToolbar } from '@/components';
```

---

## Red Flags (Stop and Fix)

🚩 **Found duplicate component name**
→ Check registry, use existing component

🚩 **Creating Button/Card/Input component**
→ Use from @eventfit/ui instead

🚩 **Importing directly from file**
→ Import from index file instead

🚩 **Component in wrong location**
→ Move to correct location

🚩 **Not exported from index**
→ Add export to index file

---

## Verification Commands

```bash
# Before committing
npm run check:duplicates      # Check for duplicates
npm run validate:tokens       # Check design tokens
npm run type-check           # Type check
npm run lint                 # Lint code

# All at once
npm run check:duplicates && npm run validate:tokens && npm run type-check && npm run lint
```

---

## Documentation Reference

- **Component Registry:** `docs/COMPONENT_REGISTRY.md`
- **Organization Rules:** `docs/COMPONENT_ORGANIZATION.md`
- **Import Guide:** `docs/COMPONENT_IMPORT_GUIDE.md`
- **Architecture:** `docs/COMPONENT_ARCHITECTURE_SUMMARY.md`
- **Structure Diagram:** `docs/COMPONENT_STRUCTURE_DIAGRAM.md`

---

## Need Help?

1. Check component registry first
2. Run duplicate checker
3. Review organization docs
4. Check import guide
5. Ask for review if unsure
