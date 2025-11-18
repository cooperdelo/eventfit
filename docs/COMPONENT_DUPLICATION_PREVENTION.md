# Component Duplication Prevention System

## Overview

This system ensures zero component duplication through automated checks, clear organization, and strict import rules.

---

## System Components

### 1. Component Organization (4-Level Hierarchy)

**Level 1: Base UI** → `packages/ui/src/components/`

- Button, Card, Input, Avatar, Badge, Modal
- **Rule:** NEVER duplicate. Always import from `@eventfit/ui`

**Level 2: Layouts** → `packages/ui/src/layouts/`

- Navbar, Footer, BottomNavigation
- **Rule:** NEVER duplicate. Always import from `@eventfit/ui`

**Level 3: Shared** → `packages/ui/src/components/shared/`

- DateBadge, GradientOverlay, FilterChip, ProductCard
- **Rule:** Only if used in 2+ features

**Level 4: Features** → `apps/web/src/components/[feature]/`

- EventCard, OutfitCard, FilterToolbar, etc.
- **Rule:** One component per file. Group by feature.

---

## Automated Prevention

### Pre-Commit Hook

**Location:** `.husky/pre-commit`

**Checks:**

1. Design token validation
2. Duplicate component detection
3. Linting and formatting

**Blocks commits if:**

- Duplicate component names found
- Hardcoded design values found
- Linting errors

### Duplicate Detection Script

**Command:** `npm run check:duplicates`

**Checks:**

- Duplicate component names
- Similar component patterns
- Wrong component locations

**Output:**

- Lists all duplicates
- Suggests fixes
- Exits with error if duplicates found

### ESLint Rules

**Location:** `.eslintrc.json`

**Rules:**

- `no-duplicate-imports`: Prevents duplicate imports
- `import/no-duplicates`: Prevents duplicate imports

---

## Manual Prevention

### Component Registry

**Location:** `docs/COMPONENT_REGISTRY.md`

**Purpose:**

- Complete list of all components
- Shows component location
- Shows import path
- Shows status (complete/pending)

**Before creating component:**

1. Check registry
2. Search for similar components
3. Verify no duplicates exist

### Component Organization Guide

**Location:** `docs/COMPONENT_ORGANIZATION.md`

**Purpose:**

- Defines component hierarchy
- Explains organization rules
- Shows correct file structure
- Provides examples

### Import Guide

**Location:** `docs/COMPONENT_IMPORT_GUIDE.md`

**Purpose:**

- Quick reference for imports
- Shows correct import paths
- Shows wrong imports (to avoid)
- Decision tree for imports

---

## Workflow: Creating a Component

### Step 1: Check Existing Components

```bash
# Check component registry
cat docs/COMPONENT_REGISTRY.md

# Run duplicate checker
npm run check:duplicates

# Search codebase
grep -r "ComponentName" apps/web/src packages/ui/src
```

### Step 2: Determine Location

```
Is it Button/Card/Input/Avatar/Badge/Modal?
→ packages/ui/src/components/

Is it Navbar/Footer/BottomNav?
→ packages/ui/src/layouts/

Is it used in 2+ features?
→ packages/ui/src/components/shared/

Is it feature-specific?
→ apps/web/src/components/[feature]/
```

### Step 3: Create Component

```tsx
// Follow standard structure
// Use base components
// Export from index file
```

### Step 4: Update Registry

```markdown
# Add to docs/COMPONENT_REGISTRY.md

| Component     | File              | Purpose | Status      |
| ------------- | ----------------- | ------- | ----------- |
| ComponentName | ComponentName.tsx | Purpose | ✅ Complete |
```

### Step 5: Verify

```bash
# Check for duplicates
npm run check:duplicates

# Validate design tokens
npm run validate:tokens

# Type check
npm run type-check
```

---

## Detection Methods

### Method 1: Automated (Pre-Commit)

- Runs automatically on every commit
- Blocks commits with duplicates
- Shows exact duplicate locations

### Method 2: Manual (Before PR)

- Run `npm run check:duplicates`
- Review component registry
- Check import paths

### Method 3: Code Review

- Reviewer checks for duplicates
- Verifies component location
- Checks import paths

### Method 4: Weekly Audit

- Review component structure
- Check for similar components
- Update registry

---

## Fixing Duplicates

### If Duplicate Found

1. **Identify Canonical Version**
   - Which one matches design system?
   - Which one is more complete?
   - Which one is in correct location?

2. **Update All Imports**

   ```bash
   # Find all usages
   grep -r "DuplicateComponent" apps/web/src packages/ui/src

   # Update imports
   # Replace with canonical import path
   ```

3. **Remove Duplicate**

   ```bash
   # Delete duplicate file
   rm apps/web/src/components/duplicate/DuplicateComponent.tsx

   # Update index file
   # Remove export
   ```

4. **Update Registry**
   - Remove duplicate entry
   - Update documentation

5. **Verify**
   ```bash
   npm run check:duplicates
   npm run validate:tokens
   ```

---

## Component Index Files

### Purpose

- Clean imports
- Single source of truth
- Easy to find components

### Structure

```tsx
// apps/web/src/components/events/index.ts
export { EventCard } from './EventCard';
export { EventGrid } from './EventGrid';
```

### Usage

```tsx
// ✅ CORRECT
import { EventCard, EventGrid } from '@/components/events';

// ❌ WRONG
import { EventCard } from '@/components/events/EventCard';
```

---

## Enforcement Checklist

### Pre-Commit

- [ ] Duplicate check passes
- [ ] Design token validation passes
- [ ] Linting passes
- [ ] Type checking passes

### Before PR

- [ ] Component registry updated
- [ ] No duplicate components
- [ ] Correct import paths
- [ ] Exported from index file

### Code Review

- [ ] Component location verified
- [ ] No duplicates found
- [ ] Uses base components
- [ ] Follows organization rules

---

## Success Metrics

Track these metrics:

- **Duplicate components found:** Target 0
- **Components in wrong location:** Target 0
- **Direct file imports:** Target 0
- **Missing index exports:** Target 0

---

## Quick Commands

```bash
# Check for duplicates
npm run check:duplicates

# Validate design tokens
npm run validate:tokens

# Type check
npm run type-check

# Lint
npm run lint

# All checks
npm run check:duplicates && npm run validate:tokens && npm run type-check && npm run lint
```

---

## Summary

**Prevention Layers:**

1. ✅ Automated pre-commit hooks
2. ✅ Component registry
3. ✅ Clear organization rules
4. ✅ Import guidelines
5. ✅ Code review process

**Result:**

- Zero duplicate components
- Clean architecture
- Easy to find components
- Consistent imports
- Scalable structure
