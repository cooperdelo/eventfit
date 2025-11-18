# Gamification

## **Gamification / Outfit of the Week Overview**

**Purpose:**

- Drive engagement on the EventFit platform.
- Encourage users to post outfits, rent items, and interact with the feed.
- Reward top contributors with badges and visibility.
- Create social proof and virality through leaderboards.

**Key Principles:**

- Weekly leaderboard of top-liked or most-rented outfits.
- Badges / achievements for milestones.
- Integration with push notifications for reminders and highlights.
- Admin moderation to prevent abuse or spam.

---

## **Page 31: Outfit of the Week Feed**

### **Frontend Components**

- Feed card for each outfit:
  - Photo carousel
  - Outfit title / description
  - Likes / comments / rental count
  - Badge indicator if outfit is top-ranked
- Tabs / Filters:
  - “Top Liked”
  - “Most Rented”
  - “New Entries”
- Call-to-action: “Post your outfit to compete”

### **Backend Endpoints**

- **GET /leaderboard/week** → fetch top outfits by likes and rentals for the week
- **POST /outfits/:id/entry** → add outfit to weekly competition

### **Flow**

1. Outfit is posted → automatically considered for weekly leaderboard
2. Likes and rentals tracked in real-time
3. At week’s end, leaderboard calculated based on algorithm (weighted score: likes 60%, rentals 40%)
4. Top users get badges displayed on profile

---

## **Page 32: User Badges / Achievements**

### **Frontend Components**

- Badge display on profile: Style MVP, Most Rented, Early Adopter, Top Poster
- Hover tooltip shows how badge was earned
- Badge gallery page: users can see all their unlocked badges

### **Backend Endpoints**

- **GET /users/:id/badges** → fetch user’s badges
- **POST /users/:id/badge/unlock** → unlock badge automatically

### **Flow**

1. User earns badge when leaderboard conditions met
2. Badges visible in feed, profile, and posts
3. Notifications sent when badge unlocked

---

## **Page 33: Weekly Leaderboard / Admin View**

### **Frontend Components**

- Admin dashboard view:
  - Current leaderboard standings
  - Option to manually adjust scores if abuse detected
  - Overview of engagement metrics: likes, rentals, posts

### **Backend Endpoints**

- **GET /admin/leaderboard/week** → fetch leaderboard with additional metrics
- **PATCH /admin/leaderboard/:id** → adjust points manually
- **POST /admin/notifications** → send leaderboard announcements

### **Flow**

1. Admin monitors leaderboard to prevent spam or manipulation
2. Admin can send push notifications: “Outfit of the Week leaderboard is live!”
3. Users notified of leaderboard rank and badge unlocks

---

## **Page 34: Push Notifications / Reminders for Gamification**

### **Frontend Components**

- Notification cards:
  - “Your outfit is in the top 10 this week!”
  - “Don’t forget to post your outfit for [Event Name] to compete!”
- Clickable to navigate directly to the Outfit of the Week feed

### **Backend Endpoints**

- **POST /notifications/send** → send push notification via Firebase or OneSignal
- **GET /notifications/user** → fetch user-specific notifications

### **Flow**

1. Automatically send reminders at the start and mid-week
2. Notify winners at end of week

---

## **Integration Notes**

- Leaderboard should consider **weighted engagement**: likes, rentals, shares.
- Badges are permanent and visible to encourage long-term engagement.
- Gamification **feeds into social virality**, driving both outfit posts and rentals.
- Admin oversight prevents fake likes / spam outfits.
- Real-time data sync ensures the leaderboard updates dynamically in the feed.

---

### **Cursor Instructions**

> Generate each gamification page as a separate React module using Tailwind and lucide-react icons.
>
> Requirements:
>
> - Mobile-first, clean, college-friendly design (avoid gradients / AI-looking UI)
> - Reusable leaderboard components, badge display, and notification cards
> - Backend integration hooks for engagement metrics, badge unlocking, and notifications
> - Admin pages for leaderboard monitoring and manual adjustments
> - Include clear props, state management, and modular architecture
