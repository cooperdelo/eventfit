# Quality Assurance Guide - EventFit

## Purpose

This document ensures every component and page matches the quality standards demonstrated in the reference images (Instagram, Pinterest level quality).

---

## Quality Checklist (Per Component/Page)

### Before Starting Development

- [ ] Reviewed reference images for this component
- [ ] Understood exact visual requirements
- [ ] Identified reusable components
- [ ] Planned component structure
- [ ] Defined TypeScript interfaces

### During Development

- [ ] Matches reference image design exactly
- [ ] Uses design system tokens (colors, spacing, typography)
- [ ] Responsive on all breakpoints (mobile, tablet, desktop)
- [ ] Proper hover states and animations
- [ ] Loading/error/empty states implemented
- [ ] Accessibility attributes added
- [ ] TypeScript types defined
- [ ] No duplicate code (reuses shared components)

### Before Moving to Next Feature

- [ ] Visual match verified (screenshot comparison)
- [ ] Tested on multiple devices
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Performance optimized (images, code splitting)
- [ ] Code reviewed for quality
- [ ] No console errors or warnings

---

## Reference Image Mapping

### Dashboard/Feed → Reference 3, 7

**Key Elements to Match:**

- Masonry grid layout
- Filter chips (rounded, active state clear)
- Clean card design
- Search bar with context
- Breadcrumb navigation

**Components Needed:**

- `DashboardLayout`
- `FilterToolbar` (with chips)
- `EventCard` (masonry grid)
- `SearchBar`

### Event Detail Page → Reference 2

**Key Elements to Match:**

- Split-screen layout (desktop): Image left, details right
- Prominent "Rent" button (like Pinterest "Save")
- Horizontal scroll for related items
- Comments section with rich input
- Creator profile display

**Components Needed:**

- `EventDetailLayout`
- `EventDetailHero` (split-screen)
- `RelatedItemsCarousel` (horizontal scroll)
- `CommentsSection`
- `RentButton` (prominent, like "Save")

### Event Card → Reference 1

**Key Elements to Match:**

- Date badge (top-left, two-line format)
- Full-width event image
- Gradient overlay for text readability
- Event details on gradient overlay
- Clean typography hierarchy

**Components Needed:**

- `EventCard` (with date badge)
- `DateBadge` (reusable)
- `GradientOverlay` (reusable)

### Profile Page → Reference 5

**Key Elements to Match:**

- Sidebar navigation (desktop)
- Form fields with labels and helper text
- Character counters
- Toggle switches
- Profile picture upload

**Components Needed:**

- `ProfileLayout` (with sidebar)
- `FormField` (with helper text, char count)
- `ToggleSwitch`
- `ProfilePictureUpload`

### Messaging/Chat → Reference 4

**Key Elements to Match:**

- Two-panel layout: Sidebar + messages
- Stories/highlights row
- Message bubbles with avatars
- Rich input (text, emoji, media)
- Status indicators

**Components Needed:**

- `MessagingLayout` (two-panel)
- `StoriesRow`
- `MessageBubble`
- `MessageInput` (rich input)

### Product/Rental Cards → Reference 6

**Key Elements to Match:**

- Heart icon for favorites
- Price and size prominently displayed
- Image fills card
- Consistent card styling
- Filter chips for active filters

**Components Needed:**

- `OutfitCard` (with heart icon)
- `ProductCard` (reusable)
- `FilterChip` (reusable)

### Landing Page → Reference 7

**Key Elements to Match:**

- Clean navigation bar
- Large, bold hero headline
- Masonry grid for featured content
- CTA buttons prominent
- Minimal footer

**Components Needed:**

- `LandingLayout`
- `HeroSection`
- `FeaturedGrid` (masonry)
- `CTASection`

---

## Visual Quality Standards

### Spacing

- **Card padding**: `p-4` (16px) or `p-6` (24px)
- **Gap between cards**: `gap-4` (16px) or `gap-6` (24px)
- **Section spacing**: `mb-8` (32px) or `mb-12` (48px)
- **Form field spacing**: `mb-4` (16px) between fields

### Typography

- **Page title**: `text-3xl` or `text-4xl`, `font-bold`
- **Card title**: `text-lg` or `text-xl`, `font-semibold`
- **Body text**: `text-base` (16px), `text-gray-700`
- **Metadata**: `text-sm` (14px), `text-gray-500`
- **Helper text**: `text-xs` (12px), `text-gray-400`

### Colors

- **Primary text**: `text-gray-900` or `text-gray-800`
- **Secondary text**: `text-gray-600` or `text-gray-500`
- **Tertiary text**: `text-gray-400`
- **Primary button**: `bg-blue-600` `text-white`
- **Secondary button**: `bg-white` `border-gray-300` `text-gray-700`
- **Active filter**: `bg-teal-50` `text-teal-800` or `bg-blue-50` `text-blue-800`

### Shadows

- **Card default**: `shadow-sm`
- **Card hover**: `shadow-lg`
- **Modal**: `shadow-xl` or `shadow-2xl`

### Border Radius

- **Cards**: `rounded-xl` (12px) or `rounded-2xl` (16px)
- **Buttons**: `rounded-lg` (8px) or `rounded-xl` (12px)
- **Inputs**: `rounded-lg` (8px)
- **Badges/Chips**: `rounded-full`

---

## Animation Standards

### Hover Effects

```tsx
// Cards
className = 'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]';

// Buttons
className = 'transition-colors duration-200 hover:bg-blue-700';

// Links
className = 'transition-colors duration-200 hover:text-blue-600';
```

### Page Transitions

- **Duration**: 200-300ms
- **Easing**: `ease-in-out`
- **Properties**: `opacity` and `transform` (GPU accelerated)

### Micro-interactions

- **Like button**: Scale bounce (1.0 → 1.2 → 1.0) in 200ms
- **Save button**: Checkmark fade-in + scale
- **Filter chip**: Background color transition (200ms)

---

## Component Reusability Rules

### Must Reuse

- `Button` - All buttons use this component
- `Card` - All cards use this base component
- `Input` - All form inputs use this component
- `Avatar` - All profile pictures use this component
- `Badge` - All tags/chips use this component

### Should Reuse

- `DateBadge` - Used in EventCard and EventDetailHero
- `GradientOverlay` - Used in EventCard and other image overlays
- `FilterChip` - Used in FilterToolbar and other filter sections
- `ProductCard` - Used for outfits, rentals, and inspiration items

### Never Duplicate

- ❌ Don't create a new button component
- ❌ Don't create a new card component
- ❌ Don't create a new input component
- ❌ Don't duplicate styling logic

---

## Code Quality Standards

### TypeScript

- ✅ All components have proper interfaces
- ✅ No `any` types (use `unknown` if needed)
- ✅ Props are typed correctly
- ✅ Return types are explicit

### Component Structure

```tsx
// 1. Imports
import React from 'react';
import { Button } from '@/components/ui/Button';

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({ ... }) => {
  // 4. Hooks
  // 5. Handlers
  // 6. Render
  return (
    // JSX
  );
};

// 7. Exports
export default Component;
```

### File Organization

```
components/
├── ui/              # Base components (Button, Card, Input, etc.)
├── events/          # Event-related components
├── outfits/         # Outfit-related components
├── profiles/        # Profile-related components
├── messaging/       # Messaging components
└── layouts/         # Layout components
```

---

## Testing Requirements

### Visual Regression

- Screenshot test against reference images
- Test on multiple screen sizes
- Test different states (hover, active, disabled)

### Accessibility

- Keyboard navigation works
- Screen reader tested
- Color contrast meets WCAG AA
- Focus indicators visible

### Performance

- Images optimized (Next.js Image component)
- Code splitting implemented
- Lazy loading for below-fold content
- Bundle size within limits

---

## Review Process

### Self-Review Checklist

Before submitting for review:

1. ✅ Matches reference image exactly
2. ✅ Responsive on all breakpoints
3. ✅ No console errors
4. ✅ Accessibility tested
5. ✅ Performance optimized
6. ✅ Code is clean and organized
7. ✅ No duplicate components

### Peer Review

- Visual comparison with reference images
- Code review for quality and organization
- Test on multiple devices
- Accessibility audit
- Performance check

### Approval Criteria

- ✅ Matches reference design exactly
- ✅ Meets all quality standards
- ✅ No duplicate code
- ✅ Properly organized
- ✅ Ready for production

---

## Common Mistakes to Avoid

### Visual

- ❌ Inconsistent spacing
- ❌ Wrong colors (not using design tokens)
- ❌ Missing hover states
- ❌ Poor typography hierarchy
- ❌ Inconsistent border radius

### Code

- ❌ Duplicate components
- ❌ Inline styles (use Tailwind classes)
- ❌ Missing TypeScript types
- ❌ Poor component organization
- ❌ Not reusing base components

### Performance

- ❌ Not optimizing images
- ❌ Not lazy loading content
- ❌ Large bundle sizes
- ❌ Not using code splitting

### Accessibility

- ❌ Missing ARIA labels
- ❌ Not keyboard navigable
- ❌ Poor color contrast
- ❌ Missing focus indicators

---

## Getting Help

If unsure about implementation:

1. Review reference images again
2. Check component specifications document
3. Look at existing similar components
4. Ask for clarification before implementing

---

## Success Metrics

A component/page is successful when:

- ✅ Visually matches reference images exactly
- ✅ Works perfectly on all devices
- ✅ Accessible to all users
- ✅ Performs well (fast load, smooth animations)
- ✅ Code is clean and maintainable
- ✅ No duplicate code exists
