# Component Registry

Complete registry of all components in the EventFit platform. Use this to find existing components before creating new ones.

**Last Updated:** [Auto-updated by script]

---

## Base UI Components (`packages/ui/src/components/`)

**Import:** `import { ComponentName } from '@eventfit/ui';`

| Component | File         | Purpose              | Used By          |
| --------- | ------------ | -------------------- | ---------------- |
| `Button`  | `Button.tsx` | All buttons          | Everywhere       |
| `Card`    | `Card.tsx`   | All cards            | Everywhere       |
| `Input`   | `Input.tsx`  | All form inputs      | Forms            |
| `Avatar`  | `Avatar.tsx` | All profile pictures | Profiles, Events |
| `Badge`   | `Badge.tsx`  | All tags/chips       | Filters, Tags    |
| `Modal`   | `Modal.tsx`  | All modals/dialogs   | Modals           |

---

## Layout Components (`packages/ui/src/layouts/`)

**Import:** `import { ComponentName } from '@eventfit/ui';`

| Component          | File                   | Purpose           | Used By               |
| ------------------ | ---------------------- | ----------------- | --------------------- |
| `Navbar`           | `Navbar.tsx`           | Top navigation    | All pages             |
| `Footer`           | `Footer.tsx`           | Page footer       | Landing, Public pages |
| `BottomNavigation` | `BottomNavigation.tsx` | Mobile bottom nav | Mobile views          |

---

## Shared Components (`packages/ui/src/components/shared/`)

**Import:** `import { ComponentName } from '@eventfit/ui/components/shared';`

| Component         | File                  | Purpose                | Used By                       |
| ----------------- | --------------------- | ---------------------- | ----------------------------- |
| `DateBadge`       | `DateBadge.tsx`       | Event date badge       | EventCard, EventDetailHero    |
| `GradientOverlay` | `GradientOverlay.tsx` | Image gradient overlay | EventCard, Image cards        |
| `FilterChip`      | `FilterChip.tsx`      | Filter chip button     | FilterToolbar, Filters        |
| `ProductCard`     | `ProductCard.tsx`     | Product/outfit card    | Outfits, Rentals, Inspiration |

---

## Event Components (`apps/web/src/components/events/`)

**Import:** `import { ComponentName } from '@/components/events';`

| Component              | File                       | Purpose                    | Status      |
| ---------------------- | -------------------------- | -------------------------- | ----------- |
| `EventCard`            | `EventCard.tsx`            | Event card for feed        | ✅ Complete |
| `EventGrid`            | `EventGrid.tsx`            | Masonry grid of events     | ✅ Complete |
| `EventDetailHero`      | `EventDetailHero.tsx`      | Event detail hero section  | ⏳ Pending  |
| `EventDetailLayout`    | `EventDetailLayout.tsx`    | Event detail page layout   | ⏳ Pending  |
| `SegmentedTabs`        | `SegmentedTabs.tsx`        | Tab navigation             | ⏳ Pending  |
| `RelatedItemsCarousel` | `RelatedItemsCarousel.tsx` | Horizontal scroll carousel | ⏳ Pending  |
| `CommentsSection`      | `CommentsSection.tsx`      | Comments on events         | ⏳ Pending  |

---

## Outfit Components (`apps/web/src/components/outfits/`)

**Import:** `import { ComponentName } from '@/components/outfits';`

| Component          | File                   | Purpose                | Status     |
| ------------------ | ---------------------- | ---------------------- | ---------- |
| `OutfitCard`       | `OutfitCard.tsx`       | Outfit card            | ⏳ Pending |
| `OutfitGrid`       | `OutfitGrid.tsx`       | Grid of outfits        | ⏳ Pending |
| `AddOutfitModal`   | `AddOutfitModal.tsx`   | Add outfit modal       | ⏳ Pending |
| `ImageUploader`    | `ImageUploader.tsx`    | Image upload component | ⏳ Pending |
| `EventTagSelector` | `EventTagSelector.tsx` | Event tagging          | ⏳ Pending |

---

## Profile Components (`apps/web/src/components/profiles/`)

**Import:** `import { ComponentName } from '@/components/profiles';`

| Component           | File                    | Purpose                | Status     |
| ------------------- | ----------------------- | ---------------------- | ---------- |
| `ProfileHeader`     | `ProfileHeader.tsx`     | Profile header section | ⏳ Pending |
| `ClosetGrid`        | `ClosetGrid.tsx`        | Closet items grid      | ⏳ Pending |
| `RentalHistoryList` | `RentalHistoryList.tsx` | Rental history         | ⏳ Pending |
| `SettingsForm`      | `SettingsForm.tsx`      | Profile settings form  | ⏳ Pending |

---

## Filter Components (`apps/web/src/components/filters/`)

**Import:** `import { ComponentName } from '@/components/filters';`

| Component       | File                | Purpose                   | Status      |
| --------------- | ------------------- | ------------------------- | ----------- |
| `FilterToolbar` | `FilterToolbar.tsx` | Filter toolbar with chips | ✅ Complete |

---

## Auth Components (`apps/web/src/components/auth/`)

**Import:** `import { ComponentName } from '@/components/auth';`

| Component        | File                 | Purpose                  | Status      |
| ---------------- | -------------------- | ------------------------ | ----------- |
| `ProtectedRoute` | `ProtectedRoute.tsx` | Route protection wrapper | ✅ Complete |

---

## Provider Components (`apps/web/src/components/providers/`)

**Import:** `import { ComponentName } from '@/components/providers';`

| Component      | File               | Purpose               | Status      |
| -------------- | ------------------ | --------------------- | ----------- |
| `AuthProvider` | `AuthProvider.tsx` | Auth context provider | ✅ Complete |

---

## Rental Components (`apps/web/src/components/rentals/`)

**Import:** `import { ComponentName } from '@/components/rentals';`

| Component             | File                      | Purpose               | Status     |
| --------------------- | ------------------------- | --------------------- | ---------- |
| `RentModal`           | `RentModal.tsx`           | Rental checkout modal | ⏳ Pending |
| `DatePicker`          | `DatePicker.tsx`          | Rental date picker    | ⏳ Pending |
| `PriceBreakdown`      | `PriceBreakdown.tsx`      | Price calculation     | ⏳ Pending |
| `RentalStatusTracker` | `RentalStatusTracker.tsx` | Rental status display | ⏳ Pending |

---

## Messaging Components (`apps/web/src/components/messaging/`)

**Import:** `import { ComponentName } from '@/components/messaging';`

| Component         | File                  | Purpose                | Status     |
| ----------------- | --------------------- | ---------------------- | ---------- |
| `MessagingLayout` | `MessagingLayout.tsx` | Two-panel layout       | ⏳ Pending |
| `StoriesRow`      | `StoriesRow.tsx`      | Stories/highlights row | ⏳ Pending |
| `MessageBubble`   | `MessageBubble.tsx`   | Message bubble         | ⏳ Pending |
| `MessageInput`    | `MessageInput.tsx`    | Rich message input     | ⏳ Pending |

---

## Inspiration Components (`apps/web/src/components/inspiration/`)

**Import:** `import { ComponentName } from '@/components/inspiration';`

| Component              | File                       | Purpose                  | Status     |
| ---------------------- | -------------------------- | ------------------------ | ---------- |
| `InspirationGrid`      | `InspirationGrid.tsx`      | Masonry inspiration grid | ⏳ Pending |
| `InspirationItemModal` | `InspirationItemModal.tsx` | Inspiration item detail  | ⏳ Pending |

---

## How to Use This Registry

### Before Creating a Component

1. **Search this registry** for similar components
2. **Check the "Used By" column** to see if component exists
3. **Check the "Status"** to see if it's complete or pending
4. **If found:** Use existing component or extend it
5. **If not found:** Create new component following organization rules

### Adding a New Component

1. Create component file in correct location
2. Add entry to this registry
3. Export from index file
4. Update component organization docs if needed

---

## Component Status Legend

- ✅ **Complete** - Component is fully implemented and matches reference
- ⏳ **Pending** - Component is planned but not yet implemented
- 🔄 **In Progress** - Component is currently being built
- ⚠️ **Needs Review** - Component exists but needs design review

---

## Quick Reference: Import Paths

```tsx
// Base UI Components
import { Button, Card, Input } from '@eventfit/ui';

// Layout Components
import { Navbar, Footer } from '@eventfit/ui';

// Shared Components
import { DateBadge } from '@eventfit/ui/components/shared';

// Feature Components
import { EventCard } from '@/components/events';
import { OutfitCard } from '@/components/outfits';
import { FilterToolbar } from '@/components/filters';
```

---

## Duplicate Prevention

**If you find a component that seems duplicate:**

1. Check this registry first
2. Compare implementations
3. Identify canonical version
4. Update all imports
5. Remove duplicate
6. Update registry
