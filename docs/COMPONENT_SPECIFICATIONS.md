# Component Specifications - EventFit

## Base Components (Must Build First)

### 1. Button Component

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Variants:
// - primary: bg-blue-600 text-white hover:bg-blue-700
// - secondary: bg-white border border-gray-300 text-gray-700 hover:bg-gray-50
// - outline: border-2 border-blue-600 text-blue-600 hover:bg-blue-50
// - ghost: text-gray-700 hover:bg-gray-100

// Sizes:
// - sm: px-3 py-1.5 text-sm
// - md: px-6 py-2 text-base
// - lg: px-8 py-3 text-lg
```

### 2. Card Component

```tsx
// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

// Base styles:
// - bg-white rounded-xl shadow-sm
// - hover: shadow-lg scale-[1.02] transition-all duration-300 (if hover prop)
// - p-4 or p-6 padding
```

### 3. Input Component

```tsx
// components/ui/Input.tsx
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

// Styles:
// - Label: font-medium text-gray-700 mb-1
// - Input: rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500
// - Error: border-red-500 text-red-600
// - Helper text: text-sm text-gray-500 mt-1
// - Char count: text-xs text-gray-400 absolute bottom-2 right-2
```

### 4. Avatar/ProfilePicture Component

```tsx
// components/ui/Avatar.tsx
interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeContent?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Sizes:
// - sm: w-8 h-8 (32px)
// - md: w-10 h-10 (40px)
// - lg: w-12 h-12 (48px)
// - xl: w-16 h-16 (64px)
// - Always: rounded-full object-cover
```

### 5. Badge/Tag Component

```tsx
// components/ui/Badge.tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  rounded?: boolean;
}

// Variants:
// - default: bg-gray-100 text-gray-700
// - primary: bg-blue-50 text-blue-800
// - success: bg-green-50 text-green-800
// - warning: bg-yellow-50 text-yellow-800
// - error: bg-red-50 text-red-800

// Sizes:
// - sm: px-2 py-0.5 text-xs
// - md: px-3 py-1 text-sm
```

---

## Feature Components

### EventCard Component

```tsx
// components/events/EventCard.tsx
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
  onClick?: () => void;
}

// Layout:
// ┌─────────────────────────┐
// │ [NOV]                   │ ← Date badge (absolute top-left)
// │   23                    │
// │                         │
// │   Event Image           │ ← Full-width, h-48 or h-64
// │   (with gradient        │
// │    overlay bottom)      │
// │                         │
// │ ┌─────────────────────┐ │ ← Gradient overlay
// │ │ Golden Records      │ │ ← Organizer
// │ │ THE TUNNEL          │ │ ← Title (large, bold, white)
// │ │ Nov 22nd | Location │ │ ← Date & location
// │ └─────────────────────┘ │
// │ [Tag] [Tag]            │ ← Tags below
// └─────────────────────────┘

// Key styles:
// - Card: bg-white rounded-xl shadow-md overflow-hidden
// - Date badge: absolute top-3 left-3 bg-gray-100/80 backdrop-blur-sm px-3 py-1 rounded-lg
// - Image: w-full h-48 object-cover
// - Gradient: absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent
// - Title: text-white text-xl font-bold
// - Location: text-gray-300 text-sm
// - Tags: flex gap-2 mt-2
```

### OutfitCard Component

```tsx
// components/outfits/OutfitCard.tsx
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
  onClick?: () => void;
  onLike?: () => void;
}

// Layout:
// ┌─────────────────┐
// │ [Avatar]    [♥] │ ← Owner avatar (top-left), Heart (top-right)
// │                 │
// │   Outfit Image  │ ← Full-width, aspect-square or aspect-[4/5]
// │                 │
// │ Title           │ ← Bold text
// │ $25 • Size M   │ ← Price and size
// │ Brand Name      │ ← Smaller, grey
// └─────────────────┘

// Key styles:
// - Card: bg-white rounded-xl shadow-sm overflow-hidden relative
// - Image: w-full aspect-square object-cover
// - Avatar: absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-white
// - Heart: absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full p-1.5
// - Title: font-semibold text-gray-900 mt-2
// - Price: font-bold text-lg text-gray-900
// - Size: text-sm text-gray-600
```

### FilterToolbar Component

```tsx
// components/filters/FilterToolbar.tsx
interface FilterToolbarProps {
  filters: Filter[];
  activeFilters: string[];
  onFilterChange: (filterId: string) => void;
  onClearAll: () => void;
  className?: string;
}

interface Filter {
  id: string;
  label: string;
  count?: number;
}

// Layout:
// ┌─────────────────────────────────────────────┐
// │ [All] [Friends] [Rentable] [Clear All]     │
// └─────────────────────────────────────────────┘

// Key styles:
// - Container: flex items-center gap-2 p-3 bg-white sticky top-14 z-40 border-b
// - Chip: px-3 py-1 rounded-full text-sm font-medium transition-colors
// - Default: bg-gray-100 text-gray-700 hover:bg-gray-200
// - Active: bg-teal-50 text-teal-800
// - Clear button: ml-auto text-blue-600 hover:text-blue-700
```

### EventDetailHero Component

```tsx
// components/events/EventDetailHero.tsx
interface EventDetailHeroProps {
  images: string[]; // Array of image URLs (DoorList images first)
  title: string;
  date: string;
  location: string;
  organizer: {
    name: string;
    avatar?: string;
  };
  onRent?: () => void;
}

// Desktop Layout (split-screen):
// ┌──────────────┬──────────────────────┐
// │              │  [Avatar] Organizer   │
// │   Hero       │  Title (large)       │
// │   Image      │  Date | Location     │
// │   Carousel   │  [Rent Button]       │
// │   (Left)     │                      │
// │              │  Description         │
// └──────────────┴──────────────────────┘

// Mobile Layout (stacked):
// ┌──────────────────────┐
// │   Hero Image         │
// │   Carousel           │
// ├──────────────────────┤
// │   Title              │
// │   Date | Location    │
// │   [Rent Button]      │
// └──────────────────────┘

// Key styles:
// - Desktop: grid grid-cols-2 gap-6
// - Mobile: flex flex-col
// - Image: w-full h-96 object-cover rounded-xl
// - Rent button: bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold
```

### RelatedItemsCarousel Component

```tsx
// components/outfits/RelatedItemsCarousel.tsx
interface RelatedItemsCarouselProps {
  items: OutfitCardProps[];
  title?: string;
}

// Layout:
// ┌─────────────────────────────────────────────┐
// │ Related Outfits                    [→]      │ ← Title + scroll indicator
// ├─────────────────────────────────────────────┤
// │ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐            │
// │ │   │ │   │ │   │ │   │ │   │ →          │ ← Horizontal scroll
// │ └───┘ └───┘ └───┘ └───┘ └───┘            │
// └─────────────────────────────────────────────┘

// Key styles:
// - Container: overflow-x-auto scrollbar-hide
// - Inner: flex gap-4 pb-4
// - Card: flex-shrink-0 w-64 (fixed width for carousel)
// - Scroll: smooth scrolling, snap points
```

### MessageBubble Component

```tsx
// components/messaging/MessageBubble.tsx
interface MessageBubbleProps {
  message: string;
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  isOwn?: boolean;
  attachments?: Array<{
    type: 'image' | 'video';
    url: string;
  }>;
}

// Layout:
// ┌─────────────────────────────────────┐
// │ [Avatar] Name              Time     │
// │         Message text                │
// │         [Image attachment]          │
// └─────────────────────────────────────┘

// Key styles:
// - Container: flex gap-3 p-3
// - Avatar: w-8 h-8 rounded-full
// - Bubble: bg-white rounded-lg p-3 shadow-sm
// - Own message: bg-blue-50 (different background)
// - Timestamp: text-xs text-gray-500 mt-1
```

### FormField Component

```tsx
// components/forms/FormField.tsx
interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  options?: Array<{ value: string; label: string }>; // For select
}

// Layout:
// ┌─────────────────────────────────────┐
// │ Label *                    (if req) │
// │ ┌───────────────────────────────┐  │
// │ │ Input field                   │  │
// │ └───────────────────────────────┘  │
// │ Helper text or error message       │
// │                         9 / 150    │ ← Char count (if enabled)
// └─────────────────────────────────────┘

// Key styles:
// - Label: font-medium text-gray-700 mb-1
// - Input: rounded-lg border border-gray-300 p-3 w-full
// - Error: border-red-500 text-red-600
// - Helper: text-sm text-gray-500 mt-1
// - Char count: text-xs text-gray-400 absolute bottom-2 right-2
```

---

## Layout Components

### DashboardLayout

```tsx
// components/layouts/DashboardLayout.tsx
interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Structure:
// ┌─────────────────────────────────────┐
// │ Navbar (sticky top)                 │
// ├─────────────────────────────────────┤
// │ Filter Toolbar (sticky below nav)  │
// ├─────────────────────────────────────┤
// │                                     │
// │   Main Content (masonry grid)      │
// │                                     │
// ├─────────────────────────────────────┤
// │ Bottom Nav (mobile only)            │
// └─────────────────────────────────────┘
```

### EventDetailLayout

```tsx
// components/layouts/EventDetailLayout.tsx
interface EventDetailLayoutProps {
  hero: React.ReactNode;
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  sidebar?: React.ReactNode; // Desktop only
}

// Desktop:
// ┌──────────────┬──────────────────────┐
// │ Hero         │  Sidebar (optional)   │
// ├──────────────┼──────────────────────┤
// │ Tabs         │                      │
// ├──────────────┼──────────────────────┤
// │ Tab Content  │                      │
// └──────────────┴──────────────────────┘

// Mobile:
// ┌──────────────────────┐
// │ Hero                 │
// ├──────────────────────┤
// │ Tabs                 │
// ├──────────────────────┤
// │ Tab Content          │
// └──────────────────────┘
```

### ProfileLayout

```tsx
// components/layouts/ProfileLayout.tsx
interface ProfileLayoutProps {
  header: React.ReactNode;
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  sidebar?: React.ReactNode; // Desktop only
}

// Similar structure to EventDetailLayout
```

---

## Animation Specifications

### Card Hover

```css
/* Tailwind classes */
transition-all duration-300
hover:shadow-lg hover:scale-[1.02]
```

### Button Press

```css
/* Tailwind classes */
active: scale-[0.98] transition-transform duration-150;
```

### Modal Open/Close

```tsx
// Framer Motion
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
```

### Page Transition

```tsx
// Framer Motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
```

---

## Responsive Behavior

### EventCard

- Mobile: Full-width, single column
- Tablet: 2 columns
- Desktop: 3-4 columns (masonry grid)

### EventDetailHero

- Mobile: Stacked (image top, details bottom)
- Desktop: Split-screen (image left, details right)

### FilterToolbar

- Mobile: Horizontal scroll with snap
- Desktop: Full-width, wrap if needed

### Navigation

- Mobile: Bottom navigation bar
- Desktop: Top navigation bar with sidebar

---

## Accessibility Requirements

### EventCard

- `role="article"`
- `aria-label="Event: {title} on {date}"`
- Keyboard navigable (Enter/Space to activate)
- Focus visible

### OutfitCard

- `role="article"`
- `aria-label="Outfit: {title}, ${price}"`
- Heart button: `aria-label="Like outfit"`
- Keyboard navigable

### FilterToolbar

- `role="toolbar"`
- `aria-label="Filter options"`
- Chips: `role="button"`, `aria-pressed` for active state

### FormField

- Label associated with input (`htmlFor` + `id`)
- Error message: `aria-live="polite"`
- Required indicator: `aria-required="true"`

---

## Performance Considerations

### Image Loading

- Use Next.js `Image` component
- Lazy loading for below-fold content
- Blur placeholder
- Responsive sizes

### Card Rendering

- Virtual scrolling for long lists
- Intersection Observer for lazy loading
- Memoization for expensive renders

### Animation Performance

- Use `transform` and `opacity` (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly

---

## Testing Requirements

### Unit Tests

- Component renders correctly
- Props work as expected
- Event handlers fire
- Accessibility attributes present

### Visual Regression

- Screenshot comparison
- Multiple screen sizes
- Different states (hover, active, disabled)

### Integration Tests

- User interactions
- Form submissions
- Navigation flows
