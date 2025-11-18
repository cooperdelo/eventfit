# EventFit Build Plan - Quality Standards & Implementation Guide

## Quality Standards Based on Reference Images

### Visual Design Requirements

#### Card Design

- **Border Radius**: `rounded-xl` (12px) or `rounded-2xl` (16px) for cards
- **Shadows**: `shadow-sm` or `shadow-md` - subtle, not glowing
- **Background**: White (`bg-white`) for cards, off-white (`#FAFAFA`) for page background
- **Hover States**: `hover:shadow-lg` + `hover:scale-[1.02]` with `transition-all duration-300`
- **Spacing**: Consistent padding `p-4` (16px) or `p-6` (24px) inside cards

#### Typography Hierarchy

- **Headings**: Bold, large (18-24px), dark text (`text-gray-800` or `text-gray-900`)
- **Body Text**: Regular weight, 14-16px, medium grey (`text-gray-600` or `text-gray-500`)
- **Metadata**: Small (12-14px), light grey (`text-gray-500`)
- **Fonts**: Inter for body, Poppins or Inter Bold for headings

#### Color Palette

- **Primary**: Muted navy `#2C3E50` or charcoal `#1F2937`
- **Secondary**: Soft beige `#E8E3D8` or light grey `#F5F5F5`
- **Accent**: Warm orange `#F97316` or forest green `#059669` (for CTAs)
- **Text**: Charcoal `#1F2937` (primary), `#6B7280` (secondary), `#9CA3AF` (tertiary)
- **Borders**: Light grey `#E5E5E5`
- **Background**: Off-white `#FAFAFA` or white `#FFFFFF`

#### Component-Specific Standards

**Event Cards** (Reference 1)

- Date badge: Light grey rounded rectangle, top-left corner
  - Format: Two-line ("NOV" small / "23" large bold)
  - Position: `absolute top-3 left-3`
  - Style: `bg-gray-100/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-lg`
- Event image: Full-width, `h-48` or `h-64`, `object-cover`
- Gradient overlay: Dark gradient at bottom for text readability
- Event details: White text on gradient overlay
- Organizer: Small icon + name in light grey
- Title: Large, bold, white
- Date & location: Smaller light grey with vertical bar separator

**Profile Pictures**

- Circular: `rounded-full`
- Consistent sizes: `w-10 h-10` (small), `w-12 h-12` (medium), `w-16 h-16` (large)
- Border: Optional `border-2 border-white` for overlap effect
- Action buttons: Small, blue, rounded, overlaid on bottom-right

**Filter Chips** (Reference 3, 6)

- Style: `px-3 py-1 rounded-full bg-gray-100 text-gray-700`
- Active: `bg-teal-50 text-teal-800` or `bg-blue-50 text-blue-800`
- Hover: `hover:bg-gray-200`
- Spacing: `gap-2` between chips

**Product/Rental Cards** (Reference 6)

- Image: Full-width, `aspect-square` or `aspect-[4/5]`
- Heart icon: Bottom-right of image, `absolute bottom-2 right-2`
- Price: Bold, prominent display
- Size: Smaller text below price
- Brand: Small text, grey

**Form Fields** (Reference 5)

- Label: Bold, above input
- Input: `rounded-lg border border-gray-300 p-3`
- Focus: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
- Helper text: Small, grey, below input
- Character counter: Small, grey, bottom-right of textarea
- Toggle switches: Custom styled, clear on/off states

**Buttons**

- Primary: `bg-blue-600 text-white rounded-lg px-6 py-2 font-medium`
- Secondary: `bg-white border border-gray-300 text-gray-700 rounded-lg px-6 py-2`
- Hover: `hover:bg-blue-700` (primary), `hover:bg-gray-50` (secondary)
- Disabled: `opacity-50 cursor-not-allowed`

---

## Layout Patterns

### Dashboard/Feed Layout (Reference 3, 7)

```
┌─────────────────────────────────────┐
│  Navbar (sticky)                     │
├─────────────────────────────────────┤
│  Filter Toolbar                      │
│  [All] [Friends] [Rentable]          │
├─────────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐                  │
│  │   │ │   │ │   │  Masonry Grid     │
│  │   │ │   │ │   │  (variable height)│
│  └───┘ └───┘ └───┘                  │
│  ┌───┐ ┌───┐                        │
│  │   │ │   │                         │
│  └───┘ └───┘                         │
└─────────────────────────────────────┘
```

**Implementation**:

- Use CSS columns or masonry library for grid
- Cards: `break-inside-avoid` to prevent splitting
- Responsive: 1 column (mobile), 2-3 columns (tablet), 3-4 columns (desktop)

### Event Detail Page (Reference 2)

**Desktop**:

```
┌──────────────┬──────────────────────┐
│              │  Title               │
│   Hero       │  Date & Location     │
│   Image      │  [Rent Button]      │
│   (Left)     │                      │
│              │  Description         │
│              │                      │
│              │  Related Items →     │
│              │  (horizontal scroll)│
│              │                      │
│              │  Comments            │
└──────────────┴──────────────────────┘
```

**Mobile**: Stack vertically, image full-width on top

### Profile Page (Reference 5)

**Desktop**:

```
┌──────────┬──────────────────────────┐
│          │  Profile Header          │
│ Sidebar  │  [Edit Button]           │
│          ├──────────────────────────┤
│ Settings │  Tabs: [Closet] [History]│
│          ├──────────────────────────┤
│ - Edit   │  Grid of Items           │
│ - Privacy│  ┌───┐ ┌───┐ ┌───┐     │
│ - Notif  │  │   │ │   │ │   │     │
│          │  └───┘ └───┘ └───┘     │
└──────────┴──────────────────────────┘
```

**Mobile**: Sidebar becomes bottom navigation, content full-width

### Messaging/Chat (Reference 4)

```
┌──────────┬──────────────────────────┐
│          │  Chat Header            │
│ Contacts │  [Name] [Actions]       │
│          ├──────────────────────────┤
│ - User1  │  Messages Feed          │
│ - User2  │  ┌──────────────────┐   │
│ - User3  │  │ Message 1        │   │
│          │  └──────────────────┘   │
│ Stories  │  ┌──────────────────┐   │
│ [●][●]   │  │ Message 2        │   │
│          │  └──────────────────┘   │
│          │  [Input Field]          │
└──────────┴──────────────────────────┘
```

---

## Component Specifications

### EventCard Component

```tsx
interface EventCardProps {
  id: string;
  imageUrl: string;
  title: string;
  date: string; // ISO date string
  location: string;
  distanceMiles?: number;
  tags?: string[];
  hasRentals?: boolean;
  organizer?: {
    name: string;
    avatar?: string;
  };
}

// Visual Requirements:
// - Date badge: top-left, light grey rounded rectangle
// - Image: full-width, h-48 or h-64, object-cover
// - Gradient overlay: bottom 40% of image
// - Title: large, bold, white on gradient
// - Location: smaller, light grey
// - Tags: rounded pills below content
// - Hover: shadow-lg + scale-[1.02]
```

### OutfitCard Component

```tsx
interface OutfitCardProps {
  id: string;
  images: string[]; // Array of image URLs
  title: string;
  price?: number;
  size?: string;
  brand?: string;
  isRentable: boolean;
  isLiked?: boolean;
  likesCount?: number;
  owner: {
    name: string;
    avatar: string;
  };
}

// Visual Requirements:
// - Image: aspect-square or aspect-[4/5], full-width
// - Heart icon: absolute bottom-2 right-2
// - Price: bold, prominent if rentable
// - Size & brand: smaller text below
// - Owner avatar: small, circular, top-left overlay
// - Hover: scale-[1.02] + shadow-lg
```

### FilterToolbar Component

```tsx
interface FilterToolbarProps {
  filters: Filter[];
  activeFilters: string[];
  onFilterChange: (filterId: string) => void;
  onClearAll: () => void;
}

// Visual Requirements:
// - Chips: rounded-full, grey background
// - Active: teal/blue background with darker text
// - Spacing: gap-2 between chips
// - Clear all: button on right side
// - Sticky: top-14 z-40 on scroll
```

### ProfilePicture Component

```tsx
interface ProfilePictureProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeContent?: React.ReactNode;
  onClick?: () => void;
}

// Sizes:
// - sm: w-8 h-8 (32px)
// - md: w-10 h-10 (40px)
// - lg: w-12 h-12 (48px)
// - xl: w-16 h-16 (64px)
// - Always: rounded-full, object-cover
```

---

## Animation & Interaction Standards

### Hover Effects

- **Cards**: `hover:shadow-lg hover:scale-[1.02] transition-all duration-300`
- **Buttons**: `hover:bg-blue-700` (primary), `hover:bg-gray-50` (secondary)
- **Links**: `hover:text-blue-600` with underline on hover

### Page Transitions

- **Route changes**: Fade in/out (200-300ms)
- **Modal open/close**: Scale + fade (200ms)
- **Tab switching**: Smooth slide (200ms)

### Loading States

- **Skeleton screens**: Match content layout
- **Shimmer effect**: `animate-pulse` with gradient
- **Spinner**: Centered, size appropriate to context

### Micro-interactions

- **Like button**: Heart fills with color, slight scale bounce
- **Save button**: Checkmark appears, slight scale
- **Follow button**: Text changes, icon updates
- **Filter chip**: Background color change, smooth transition

---

## Responsive Breakpoints

```tsx
// Tailwind breakpoints
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large

// Component behavior:
// - Mobile (< 768px): Single column, bottom nav, full-width cards
// - Tablet (768-1024px): 2 columns, sidebar nav, medium cards
// - Desktop (> 1024px): 3-4 columns, top nav, larger cards
```

---

## Accessibility Requirements

### Keyboard Navigation

- All interactive elements focusable
- Tab order logical
- Enter/Space activate buttons
- Arrow keys navigate lists/grids
- Escape closes modals

### Screen Readers

- Semantic HTML (`<article>`, `<nav>`, `<main>`)
- ARIA labels for icons
- Alt text for all images
- Role attributes where needed
- Live regions for dynamic content

### Color Contrast

- Text: Minimum WCAG AA (4.5:1)
- Large text: Minimum WCAG AA (3:1)
- Interactive elements: Clear focus indicators

---

## Performance Standards

### Image Optimization

- Use Next.js `Image` component
- Lazy loading for below-fold content
- WebP format with fallbacks
- Responsive sizes (srcset)
- Blur placeholder for loading

### Code Splitting

- Route-based code splitting (automatic with Next.js)
- Component lazy loading for heavy components
- Dynamic imports for modals/dialogs

### Bundle Size

- Initial load: < 200KB (gzipped)
- Total bundle: < 500KB (gzipped)
- Code splitting for non-critical features

---

## Testing Requirements

### Visual Regression

- Screenshot testing for key components
- Compare against reference images
- Test on multiple screen sizes

### Component Testing

- Unit tests for all components
- Snapshot tests for UI consistency
- Interaction tests for user flows

### E2E Testing

- Critical user journeys
- Cross-browser testing
- Mobile device testing

---

## Implementation Checklist

### Phase 1: Foundation

- [ ] Set up design tokens (colors, spacing, typography)
- [ ] Create base UI components (Button, Card, Input)
- [ ] Implement EventCard matching Reference 1
- [ ] Implement OutfitCard matching Reference 6
- [ ] Create ProfilePicture component
- [ ] Set up responsive grid system

### Phase 2: Layouts

- [ ] Dashboard masonry grid (Reference 3, 7)
- [ ] Event detail split-screen layout (Reference 2)
- [ ] Profile page with sidebar (Reference 5)
- [ ] Messaging two-panel layout (Reference 4)
- [ ] Responsive navigation (mobile bottom nav)

### Phase 3: Interactions

- [ ] Filter toolbar with chips (Reference 3, 6)
- [ ] Horizontal scroll for related items (Reference 2)
- [ ] Form fields with helpers (Reference 5)
- [ ] Message input with rich options (Reference 4)
- [ ] Hover states and animations
- [ ] Loading and empty states

### Phase 4: Polish

- [ ] Smooth page transitions
- [ ] Micro-interactions (like, save, follow)
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Cross-browser testing

---

## Quality Gates

Before moving to next feature:

1. ✅ Matches reference image design exactly
2. ✅ Responsive on all breakpoints
3. ✅ Accessible (keyboard nav, screen readers)
4. ✅ Performance optimized (images, code splitting)
5. ✅ No duplicate components
6. ✅ Clean, organized code structure
7. ✅ Proper TypeScript types
8. ✅ Loading/error/empty states implemented

---

## Next Steps

1. Review this document with team
2. Create Figma mockups matching references
3. Build component library
4. Implement features one at a time
5. Review against quality gates
6. Iterate until perfect
