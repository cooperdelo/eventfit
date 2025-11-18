# Notifications

## **Page 4: Notifications / Outfit Reminders**

### **Purpose**

- Keep users aware of upcoming events, outfit deadlines, and rental actions
- Increase engagement with timely nudges
- Reduce missed returns or forgotten event preparations

---

### **Types of Notifications**

1. **Event Outfit Reminders**
   - “Your formal is in 3 days — check what others are wearing.”
   - “You liked an outfit for [Event Name] — post yours before it’s too late.”
2. **Rental Notifications**
   - Rental request received
   - Item delivered → confirm receipt
   - Rental due / overdue → reminder to return
   - Optional extension request from renter
3. **Social / Engagement**
   - Someone liked your outfit post
   - Comment notifications
   - Outfit of the Week leaderboard updates

---

### **User Flow**

1. **Notification Center**
   - Accessible from top bar bell icon
   - Shows **chronological list** of notifications
   - Types color-coded or icon-tagged (Lucide icons: `Bell`, `Heart`, `MessageCircle`)
2. **Notification Item**
   - Icon
   - Title / short description
   - Optional CTA button (e.g., “View Outfit”, “Confirm Delivery”, “Check Event”)
   - Timestamp
3. **Outfit Reminders**
   - Triggered 3 days / 1 day / same day before event
   - Push notifications + in-app alert
   - Linked directly to Event Detail / Outfit Feed
4. **Rental Alerts**
   - Reminder to confirm receipt → triggers payout release
   - Reminder to return item → optional late fee logic
5. **Settings**
   - Users can toggle:
     - Push notifications on/off
     - Event reminders frequency
     - Rental alerts on/off
     - Weekly digest vs instant alerts

---

### **Backend & Integration**

**APIs**

- **GET /notifications** → fetch user notifications
- **POST /notifications/mark-read** → mark notifications as read
- **WebSocket / Firebase Realtime** → push new notifications instantly
- **Triggers**
  - Event approaching → schedule outfit reminder
  - Rental status changes → rental notifications

**Data Model**

```
Notification {
  id: string
  type: enum (event_reminder | rental | social)
  related_event_id?: string
  related_post_id?: string
  message: string
  read: boolean
  timestamp: datetime
  cta_url?: string
}

```

---

### **UI Components**

| Component           | Notes                                      |
| ------------------- | ------------------------------------------ |
| Notification Center | Vertical list, swipe-to-dismiss on mobile  |
| Notification Card   | Icon, message, CTA button, timestamp       |
| Push Alert          | Minimal banner, click → opens related page |
| Settings Page       | Toggle switches for each notification type |

**Design Notes**

- Clean and minimal: no gradients
- Consistent Lucide icons: bell for general, heart for likes, message for comments
- Prioritize readability and quick action

---

### **Cursor Instructions**

> Generate this as a standalone React component.
>
> - Sub-components: NotificationList, NotificationCard, SettingsPanel
> - Include WebSocket or Firebase integration for real-time updates
> - Style with Tailwind CSS, mobile-first, clean college vibe
> - Ensure each notification type has distinct icon + CTA
