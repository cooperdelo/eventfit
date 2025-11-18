# Quick Reference - EventFit Development

## 🎯 Quality Standards (Instagram/Pinterest Level)

### Visual Design

- **Cards**: `rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02]`
- **Spacing**: Consistent `p-4` or `p-6`, `gap-4` or `gap-6`
- **Typography**: Clear hierarchy, bold titles, regular body
- **Colors**: Use design tokens, no hardcoded colors
- **Shadows**: Subtle `shadow-sm`, not glowing

### Component Patterns

- **EventCard**: Date badge top-left, gradient overlay, white text
- **OutfitCard**: Heart icon top-right, price prominent, image fills card
- **FilterChip**: Rounded-full, active state clear (teal/blue)
- **ProfilePicture**: Always circular, consistent sizes
- **Buttons**: Rounded-lg, clear hierarchy (primary/secondary)

### Layout Patterns

- **Dashboard**: Masonry grid, filter toolbar sticky
- **Event Detail**: Split-screen (desktop), stacked (mobile)
- **Profile**: Sidebar nav (desktop), bottom nav (mobile)
- **Messaging**: Two-panel (sidebar + content)

---

## 📋 Pre-Development Checklist

- [ ] Reviewed reference images
- [ ] Identified reusable components
- [ ] Planned component structure
- [ ] Defined TypeScript interfaces

---

## ✅ Development Checklist

- [ ] Matches reference image exactly
- [ ] Uses design system tokens
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Hover states and animations
- [ ] Loading/error/empty states
- [ ] Accessibility attributes
- [ ] TypeScript types defined
- [ ] No duplicate code

---

## 🚫 Never Do This

- ❌ Create duplicate components
- ❌ Use inline styles
- ❌ Skip TypeScript types
- ❌ Ignore accessibility
- ❌ Skip responsive design
- ❌ Hardcode colors/spacing

---

## 📐 Key Measurements

### Spacing

- Card padding: `16px` (`p-4`) or `24px` (`p-6`)
- Gap between cards: `16px` (`gap-4`) or `24px` (`gap-6`)
- Section spacing: `32px` (`mb-8`) or `48px` (`mb-12`)

### Typography

- Page title: `text-3xl` or `text-4xl`, `font-bold`
- Card title: `text-lg` or `text-xl`, `font-semibold`
- Body: `text-base` (16px)
- Metadata: `text-sm` (14px)

### Border Radius

- Cards: `rounded-xl` (12px) or `rounded-2xl` (16px)
- Buttons: `rounded-lg` (8px)
- Badges: `rounded-full`

---

## 🎨 Color Palette

- Primary text: `text-gray-900`
- Secondary text: `text-gray-600`
- Primary button: `bg-blue-600 text-white`
- Active filter: `bg-teal-50 text-teal-800`
- Border: `border-gray-300`

---

## 🔄 Animation Standards

```tsx
// Card hover
className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"

// Button hover
className="transition-colors duration-200 hover:bg-blue-700"

// Page transition
duration: 200-300ms
properties: opacity + transform (GPU accelerated)
```

---

## 📱 Responsive Breakpoints

- Mobile: `< 768px` - Single column, bottom nav
- Tablet: `768px - 1024px` - 2 columns, sidebar nav
- Desktop: `> 1024px` - 3-4 columns, top nav

---

## 🧩 Component Structure

```tsx
// 1. Imports
import React from 'react';

// 2. Types
interface Props { ... }

// 3. Component
export const Component: React.FC<Props> = ({ ... }) => {
  return ( ... );
};
```

---

## 📚 Reference Documents

- `DESIGN_REFERENCE_ANALYSIS.md` - Detailed analysis of reference images
- `BUILD_PLAN_WITH_QUALITY_STANDARDS.md` - Complete build plan
- `COMPONENT_SPECIFICATIONS.md` - Component specs and requirements
- `QUALITY_ASSURANCE_GUIDE.md` - QA checklist and review process

---

## 🎯 Success Criteria

Component is ready when:

- ✅ Matches reference image exactly
- ✅ Works on all devices
- ✅ Accessible to all users
- ✅ Performs well
- ✅ Code is clean
- ✅ No duplicates

---

## 🆘 Quick Help

**Unsure about design?** → Check reference images
**Need component spec?** → See `COMPONENT_SPECIFICATIONS.md`
**Quality questions?** → See `QUALITY_ASSURANCE_GUIDE.md`
