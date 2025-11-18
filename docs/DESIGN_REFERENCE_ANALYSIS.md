# Design Reference Analysis - EventFit Quality Standards

## Overview

This document analyzes 7 reference images to extract specific design patterns, UI elements, and quality standards that EventFit must match or exceed.

---

## Reference 1: Dark-Themed Event Discovery Platform

### Key Elements

- **Top Navigation Bar**
  - Friend suggestions row with circular profile pictures
  - "Add" buttons overlaid on profile pictures (small, blue, rounded)
  - Navigation tabs: "For You", "My Events", "Trending Events"
  - Active tab indicated by white underline

- **Event Card Design**
  - Large, prominent card with rounded corners
  - Date badge: Light grey rounded rectangle, top-left corner
    - Two-line format: "NOV" (small) / "23" (large, bold)
  - Full-width event graphic/image
  - QR code visible in bottom-left of graphic
  - Dark gradient overlay at bottom for text readability
  - Event details overlay:
    - Organizer icon (small circular) + name in light grey
    - Event title: Large, bold, white sans-serif
    - Date & location: Smaller light grey text with vertical bar separator

### Design Patterns

- Dark mode aesthetic (dark background, white/light text)
- Strong visual hierarchy (title most prominent)
- Date badge as visual anchor
- Gradient overlay for text legibility
- Clean spacing and typography

### EventFit Implementation

- Event cards should have date badge in top-left
- Use gradient overlay for event details when needed
- Dark mode support (optional but recommended)
- Profile pictures with action buttons (Add Friend, Follow)

---

## Reference 2: Pinterest Post Detail Page

### Key Elements

- **Layout**: Two-column (image left, details right)
- **Main Image**: Large, full-height on left side
- **Right Panel**:
  - Interaction icons: Heart (with count), Share, More options
  - Red "Save" button (prominent, top-right)
  - Title: Large, bold font
  - Description: Multi-line text with "... more" expand
  - Creator profile: Circular picture + name
  - "Shop the look" section:
    - Horizontal scrollable product cards
    - Each card: Image, price, brand name
    - Clean, minimal card design
  - Comments section:
    - "Comments" header
    - Input field: "Add a comment"
    - Icons: Smiley, camera, picture frame

### Design Patterns

- Split-screen layout for detail pages
- Horizontal scrolling for related items
- Clear call-to-action buttons (Save)
- Social interaction elements prominent
- Product cards in horizontal carousel

### EventFit Implementation

- Event detail page: Hero image left, details right (desktop)
- "Rent" button should be prominent (like "Save")
- Horizontal scroll for related outfits/rentals
- Comments section with rich input (emoji, media)
- Creator profile display with follow button

---

## Reference 3: Pinterest Search/Explore Page

### Key Elements

- **Top Navigation**: Search bar, Log in/Sign up buttons
- **Breadcrumb**: "Explore > Men's Fashion > Mens Fashion Ideas"
- **Page Header**:
  - Title: "Stylish mens outfits"
  - Description: "Discover Pinterest's best ideas..."
  - Context: "144k people searched this - Last updated 1w"
- **Filter Buttons**: Rounded rectangles, light grey background
  - Examples: "+ Casual", "+ Casual Classy", "+ Casual Summer"
  - Multiple filters can be active
- **Masonry Grid Layout**:
  - Variable height cards
  - Images fill card width
  - Text below image: Title + description
  - Tags/metadata visible

### Design Patterns

- Masonry/Pinterest-style grid
- Filter chips as interactive buttons
- Breadcrumb navigation
- Search context and metadata
- Clean card design with consistent spacing

### EventFit Implementation

- Dashboard feed: Masonry grid for outfit cards
- Filter toolbar with chip-style buttons
- Breadcrumb navigation for event categories
- Search results with context (e.g., "X events found")
- Variable height cards based on content

---

## Reference 4: Messaging/Chat Interface

### Key Elements

- **Left Sidebar**:
  - User profile at top with checkmark
  - Navigation tabs: "Primary", "General", "Channels", "Requests"
  - Search bar
  - Stories/Highlights row (circular profile pictures)
  - Contact list:
    - Circular profile picture
    - Name
    - Status/last message snippet
    - Timestamp (e.g., "2h", "5d", "1w")
  - Bottom icons: Menu, Grid, Profile
- **Right Content Area**:
  - Chat header: Profile picture, name, "X active today"
  - Action icons: Phone, Video, Info
  - Message feed:
    - Messages with profile pictures
    - Media attachments (images, videos)
    - Text messages
    - Timestamps
    - Reactions ("Liked a message")
  - Message input: Text field + icons (mic, image, heart)

### Design Patterns

- Two-panel layout (sidebar + content)
- Stories/highlights row
- Message bubbles with profile context
- Media attachments inline
- Rich input with multiple options
- Status indicators and timestamps

### EventFit Implementation

- Event chat: Similar two-panel layout
- Stories/highlights for recent events
- Message bubbles with user avatars
- Outfit/image attachments in messages
- Rich message input (text, emoji, media)
- Active status indicators

---

## Reference 5: Instagram Settings/Edit Profile

### Key Elements

- **Left Sidebar Navigation**:
  - "Settings" title
  - Meta Accounts Center section (with logo)
  - Categorized sections:
    - "How you use Instagram"
    - "For professionals"
    - "Who can see your content"
    - "How others can interact with you"
    - "What you see"
  - Icons for each navigation item
  - Active item highlighted with grey background
- **Right Content Area**:
  - "Edit profile" title
  - Profile section:
    - Circular profile picture (left)
    - Username + full name
    - "Change photo" button (blue, rounded)
  - Form fields:
    - Label in bold
    - Input field with rounded corners
    - Helper text below inputs
    - Character counter (e.g., "9 / 150")
  - Dropdown menus
  - Toggle switches
  - "Submit" button (large, blue, rounded, centered)

### Design Patterns

- Sidebar navigation with categories
- Clean form design
- Helper text and character counters
- Toggle switches for boolean options
- Prominent submit button
- Consistent spacing and typography

### EventFit Implementation

- Profile settings page: Similar sidebar navigation
- Form fields with labels, inputs, helper text
- Character counters for bio/descriptions
- Toggle switches for privacy settings
- Profile picture upload with preview
- Consistent form styling across app

---

## Reference 6: E-Commerce Product Grid

### Key Elements

- **Top Section**:
  - Search query: "baggy (29514 results)"
  - Popular brands row: "Levi's", "Carhartt", "Nike", "Dickies"
  - Filter dropdowns: Category, Brand, Price, Size, Color, Condition
  - "On sale" checkbox
  - Active filter chips:
    - Multiple brands as chips
    - Colors as chips
    - "Clear all" button
  - Sort button (top-right)
- **Product Grid**:
  - 2x4 grid layout
  - Product cards:
    - Image fills card
    - Heart icon (bottom-right of image)
    - Price displayed
    - Size displayed
    - Brand name
    - Sale prices with strikethrough

### Design Patterns

- Filter chips for active filters
- Grid layout for products
- Heart icon for favorites
- Price and size prominently displayed
- Sale indicators (strikethrough prices)
- Clear all filters option

### EventFit Implementation

- Closet/rental grid: Similar product card design
- Filter chips for active filters (size, color, price, etc.)
- Heart icon for wishlist/favorites
- Price and size on outfit cards
- "Clear all" filter option
- Sort functionality

---

## Reference 7: Pinterest Landing Page

### Key Elements

- **Top Navigation**:
  - Logo (left)
  - Links: "Explore", "Shop"
  - Right: "About", "Businesses", "Create", "News"
  - Buttons: "Log in" (red), "Sign up" (white with red border)
- **Hero Section**:
  - Large headline: "Get your next" + "new look outfit" (blue)
  - Carousel dots indicator
- **Masonry Grid**:
  - Asymmetrical layout
  - Variable height cards
  - Rounded corners
  - Subtle shadows
  - Images fill cards
- **Footer**:
  - "Here's how it works" link with chevron
  - Thin grey line separator

### Design Patterns

- Clean navigation bar
- Large, bold typography for headlines
- Masonry grid as main content
- Rounded corners and shadows
- Call-to-action elements
- Minimal footer

### EventFit Implementation

- Landing page: Similar hero section
- Masonry grid for featured outfits/events
- Clean navigation with CTA buttons
- Large, bold headlines
- "How it works" section
- Minimal footer design

---

## Quality Standards Summary

### Visual Design

1. **Cards**: Rounded corners (12-16px), subtle shadows, white backgrounds
2. **Typography**: Clear hierarchy, bold for titles, regular for body
3. **Spacing**: Consistent padding (16px, 24px, 32px)
4. **Colors**: Clean, minimal palettes; use gradients sparingly
5. **Images**: Full-width in cards, proper aspect ratios

### Component Patterns

1. **Profile Pictures**: Circular, consistent sizing
2. **Buttons**: Rounded (8-12px), clear hierarchy (primary/secondary)
3. **Input Fields**: Rounded, subtle borders, helper text
4. **Filter Chips**: Rounded rectangles, active state clear
5. **Navigation**: Clear active states, icons + text

### Layout Patterns

1. **Two-Panel**: Sidebar + content (desktop)
2. **Masonry Grid**: Variable height cards
3. **Horizontal Scroll**: For related items
4. **Split Screen**: Image left, details right (detail pages)

### Interaction Patterns

1. **Hover States**: Subtle scale/shadow changes
2. **Active States**: Clear visual indication
3. **Loading States**: Skeleton screens
4. **Empty States**: Helpful messaging with CTAs
5. **Error States**: Clear error messages with retry

### Mobile Considerations

1. **Responsive**: Mobile-first approach
2. **Touch Targets**: Minimum 44x44px
3. **Navigation**: Bottom nav for mobile
4. **Cards**: Full-width on mobile, grid on desktop

---

## Implementation Checklist

### Dashboard/Feed

- [ ] Masonry grid layout for outfit cards
- [ ] Filter toolbar with chip-style buttons
- [ ] Date badge on event cards (top-left)
- [ ] Profile pictures with action buttons
- [ ] Horizontal scroll for related items
- [ ] Search bar with context

### Event Detail Page

- [ ] Split-screen layout (desktop): Image left, details right
- [ ] Hero carousel with date badge
- [ ] Prominent "Rent" button (like Pinterest "Save")
- [ ] Horizontal scroll for related outfits
- [ ] Comments section with rich input
- [ ] Creator profile display

### Profile Page

- [ ] Sidebar navigation (desktop)
- [ ] Form fields with labels and helper text
- [ ] Character counters for bio
- [ ] Toggle switches for settings
- [ ] Profile picture upload with preview
- [ ] Grid layout for closet items

### Messaging/Chat

- [ ] Two-panel layout: Sidebar + messages
- [ ] Stories/highlights row
- [ ] Message bubbles with avatars
- [ ] Media attachments inline
- [ ] Rich input (text, emoji, media)
- [ ] Status indicators

### Product/Rental Cards

- [ ] Heart icon for favorites
- [ ] Price and size prominently displayed
- [ ] Sale indicators (if applicable)
- [ ] Image fills card
- [ ] Consistent card styling

### Landing Page

- [ ] Clean navigation bar
- [ ] Large, bold hero headline
- [ ] Masonry grid for featured content
- [ ] CTA buttons prominent
- [ ] Minimal footer

---

## Next Steps

1. Create component library matching these patterns
2. Build design system tokens (colors, spacing, typography)
3. Implement responsive layouts
4. Add animations and micro-interactions
5. Test on multiple devices
6. Iterate based on user feedback
