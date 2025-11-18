# Feature Implementation Plan

## Algorithms Defined

### 1. Gamification Leaderboard Algorithm

**Score Calculation:**

```
Weekly Score = (Likes × 1) + (Rentals × 3) + (Comments × 0.5) + (Shares × 2)
```

- Rentals weighted highest (drives core business value)
- Shares weighted high (drives virality)
- Comments weighted low (engagement but less valuable)
- Weekly reset: Every Monday at 12:00 AM

**Badge Thresholds:**

- Top 10%: "Style MVP" badge
- Top 25%: "Trendsetter" badge
- 10+ rentals: "Most Rented" badge
- 50+ posts: "Top Poster" badge
- First 100 users: "Early Adopter" badge

### 2. Star Renter Algorithm

**Score Calculation:**

```
Star Score = (Total Rentals × 2) + (Avg Rating × 10) + (Repeat Customers × 5) + (On-Time Returns × 3)
```

- Top 10% of renters get "Star Renter" badge
- Badge displayed on profile header and outfit cards
- Special indicator: Gold star icon on outfit cards

### 3. Organization Types

- Sorority
- Fraternity
- Academic Club
- Cultural Club
- Social Club
- Sports Team
- Student Government
- Honor Society
- Professional Organization
- Religious Organization
- Service Organization
- Other (with text input)

---

## Implementation Order

1. **Event Calendar View** (Tab in Dashboard)
2. **Private Groups/Organizations** (Foundation for org-linked features)
3. **Gamification System** (Engagement driver)
4. **Star Renter System** (Enhancement to rentals)
5. **Scheduling in Advance** (Rental enhancement)
6. **Swipe Up Functionality** (UX enhancement)
7. **Picture Inspiration Enhancements** (Polish)
