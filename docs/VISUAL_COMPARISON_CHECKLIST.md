# Visual Comparison Checklist

Use this checklist every time you build or modify a component to ensure it matches reference images exactly.

## Setup

1. Open reference image in one window
2. Open your implementation in another window
3. Use browser dev tools to inspect

---

## EventCard (Reference 1)

### Date Badge

- [ ] Position: `absolute top-3 left-3` (12px from top and left)
- [ ] Background: `bg-gray-100/90` (light grey, 90% opacity)
- [ ] Border radius: `rounded-lg` (8px)
- [ ] Padding: `px-3 py-1`
- [ ] Format: Two lines - "NOV" (small, uppercase) / "23" (large, bold)
- [ ] Text color: `text-gray-800` and `text-gray-900`

### Image

- [ ] Height: `h-48` (192px) on mobile, `h-64` (256px) on desktop
- [ ] Width: Full width
- [ ] Object fit: `object-cover` (no stretching)

### Gradient Overlay

- [ ] Position: Bottom 40% of image
- [ ] Gradient: `from-black/70 via-black/50 to-transparent`
- [ ] Direction: `bg-gradient-to-t` (from bottom to top)

### Event Details Overlay

- [ ] Organizer: Small icon (4px circle) + name in `text-gray-300`
- [ ] Title: `text-lg md:text-xl font-bold text-white`
- [ ] Date & location: `text-sm text-gray-300` with `|` separator
- [ ] Padding: `p-4` (16px)

### Tags

- [ ] Below image, not on overlay
- [ ] Style: `px-3 py-1 bg-teal-50 text-teal-800 rounded-full`
- [ ] Font: `text-xs font-medium`
- [ ] Gap: `gap-2` between tags

### Hover Effect

- [ ] Shadow: `hover:shadow-lg`
- [ ] Scale: `hover:scale-[1.02]`
- [ ] Transition: `transition-all duration-300`

---

## FilterToolbar (Reference 3, 6)

### Container

- [ ] Sticky: `sticky top-14 z-40`
- [ ] Background: `bg-white`
- [ ] Border: `border-b border-gray-200`
- [ ] Padding: `px-4 py-3`

### Filter Chips

- [ ] Default: `bg-gray-100 text-gray-700`
- [ ] Active: `bg-teal-50 text-teal-800`
- [ ] Shape: `rounded-full`
- [ ] Padding: `px-3 py-1`
- [ ] Font: `text-sm font-medium`
- [ ] Hover: `hover:bg-gray-200` or `hover:bg-teal-100`
- [ ] Gap: `gap-2` between chips

### Search Input

- [ ] Border: `border border-gray-300`
- [ ] Border radius: `rounded-lg`
- [ ] Padding: `px-4 py-2`
- [ ] Focus: `focus:ring-2 focus:ring-blue-500`

---

## Button (Reference 2, 5, 7)

### Primary Button

- [ ] Background: `bg-blue-600`
- [ ] Text: `text-white`
- [ ] Border radius: `rounded-lg` (8px)
- [ ] Padding: `px-6 py-2` (md) or `px-8 py-3` (lg)
- [ ] Font: `font-medium`
- [ ] Hover: `hover:bg-blue-700`
- [ ] Active: `active:scale-[0.98]`

### Secondary Button

- [ ] Background: `bg-white`
- [ ] Border: `border border-gray-300`
- [ ] Text: `text-gray-700`
- [ ] Hover: `hover:bg-gray-50`

---

## Input Field (Reference 5)

### Label

- [ ] Font: `font-medium text-gray-700`
- [ ] Margin: `mb-1`
- [ ] Required indicator: Red asterisk

### Input

- [ ] Border: `border border-gray-300`
- [ ] Border radius: `rounded-lg`
- [ ] Padding: `p-3`
- [ ] Focus: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
- [ ] Error: `border-red-500 text-red-600`

### Helper Text

- [ ] Font: `text-sm text-gray-500`
- [ ] Margin: `mt-1`

### Character Counter

- [ ] Position: `absolute bottom-2 right-2`
- [ ] Font: `text-xs text-gray-400`
- [ ] Format: "9 / 150"

---

## Card (Reference 1, 3, 6, 7)

### Base Styles

- [ ] Background: `bg-white`
- [ ] Border radius: `rounded-xl` (12px) or `rounded-2xl` (16px)
- [ ] Shadow: `shadow-sm`
- [ ] Padding: `p-4` (16px) or `p-6` (24px)

### Hover State

- [ ] Shadow: `hover:shadow-lg`
- [ ] Scale: `hover:scale-[1.02]`
- [ ] Transition: `transition-all duration-300`

---

## Avatar (Reference 1, 4, 5)

### Base

- [ ] Shape: `rounded-full`
- [ ] Object fit: `object-cover`
- [ ] Border: `border-2 border-white` (for overlap)

### Sizes

- [ ] Small: `w-8 h-8` (32px)
- [ ] Medium: `w-10 h-10` (40px)
- [ ] Large: `w-12 h-12` (48px)
- [ ] Extra Large: `w-16 h-16` (64px)

---

## Badge/Tag (Reference 1, 3, 6)

### Default

- [ ] Background: `bg-gray-100`
- [ ] Text: `text-gray-700`
- [ ] Shape: `rounded-full`
- [ ] Padding: `px-3 py-1`
- [ ] Font: `text-sm font-medium`

### Active Filter

- [ ] Background: `bg-teal-50`
- [ ] Text: `text-teal-800`
- [ ] Hover: `hover:bg-teal-100`

---

## Measurement Tools

### Browser Dev Tools

1. Right-click element → Inspect
2. Check computed styles
3. Use ruler tool (if available)
4. Check color values

### Manual Measurement

1. Use browser zoom (100%)
2. Use screenshot tool with measurements
3. Compare pixel-by-pixel if needed

---

## Common Mistakes to Avoid

❌ **Using wrong spacing**

- Don't use `p-5` (20px) when spec says `p-4` (16px)
- Don't use `gap-3` (12px) when spec says `gap-2` (8px)

❌ **Using wrong colors**

- Don't use `bg-gray-200` when spec says `bg-gray-100`
- Don't use `text-gray-600` when spec says `text-gray-700`

❌ **Using wrong border radius**

- Don't use `rounded-lg` (8px) when spec says `rounded-xl` (12px)

❌ **Missing hover states**

- Always implement hover effects
- Check transition timing

❌ **Wrong typography**

- Check font size exactly
- Check font weight exactly
- Check line height if specified

---

## Approval Criteria

**Component is approved when:**

- ✅ All checklist items checked
- ✅ Side-by-side comparison shows match
- ✅ All breakpoints tested
- ✅ All states tested
- ✅ No hardcoded values found
- ✅ Uses design tokens only

**If any item fails:**

- ❌ Fix before merging
- ❌ Document intentional deviations
- ❌ Get design approval for changes
