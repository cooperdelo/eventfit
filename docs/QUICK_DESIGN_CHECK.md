# Quick Design Check - 5 Minute Verification

## Before Every Commit

### 1. Visual Check (2 min)

- [ ] Open component in browser
- [ ] Compare with reference image side-by-side
- [ ] Check spacing matches (use browser dev tools)
- [ ] Check colors match (use color picker)
- [ ] Check typography matches

### 2. Code Check (2 min)

- [ ] No hardcoded colors (search for `#` in file)
- [ ] No hardcoded spacing (search for `px` in CSS)
- [ ] Uses design tokens from `@eventfit/ui`
- [ ] Reuses existing components

### 3. Responsive Check (1 min)

- [ ] Mobile (375px) - looks good
- [ ] Tablet (768px) - looks good
- [ ] Desktop (1280px) - looks good

## Red Flags (Stop and Fix)

🚩 Hardcoded color found
🚩 Hardcoded spacing found
🚩 New component created (check if duplicate exists)
🚩 Doesn't match reference image
🚩 Missing hover/loading/error states
🚩 No TypeScript types

## Quick Fixes

**Found hardcoded color?**

```tsx
// ❌ Bad
<div className="bg-[#F97316]">

// ✅ Good
<div className="bg-accent">
```

**Found hardcoded spacing?**

```tsx
// ❌ Bad
<div style={{ padding: '16px' }}>

// ✅ Good
<div className="p-4">
```

**Need to create component?**

1. Check `packages/ui/src/components/` first
2. Check `apps/web/src/components/` for feature-specific
3. Only create if truly unique
