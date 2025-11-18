# Event Management

## **Event Management / Event Creation & Approval**

### **Purpose**

- Allow campus organizations (sororities, clubs, sports teams) to **create events** that students can view and interact with.
- Provide **admin oversight** to approve or reject events.
- Tie each event to **Outfit Feeds**, **Group Chats**, and **Calendar** for full ecosystem integration.

---

### **Pages / Screens**

### 1. **Event Creation (Org / User)**

- **Access:** Verified org accounts or users with permission.
- **Components:**
  - Form fields:
    - Event Title
    - Date & Time
    - Location (auto-suggest nearby campus venues)
    - Theme / Dress Code
    - Cover Photo / Banner
    - Description
    - Privacy: Public (all campus) or Private (invite-only)
  - “Submit for Approval” button
- **Validation:**
  - Required fields check
  - Date & time cannot be in the past
  - Cover photo file size & format limits
- **Outcome:** Event saved in **pending approval queue**.

### 2. **Admin Approval Dashboard**

- **Access:** Admin users only
- **Components:**
  - Table or card view of pending events
  - Event preview (title, date, org, banner)
  - Buttons: Approve / Reject / Request Changes
  - Optional: Comment section for feedback to creator
- **Outcome:** Approved events appear on public or private feeds; rejected events send notification to creator.

### 3. **Event List / Calendar View**

- **Access:** All verified users
- **Components:**
  - Calendar view (month/week/day)
  - List view (upcoming events)
  - Filters:
    - Event type (formal, concert, tailgate, rush)
    - Public vs Private
    - Nearby (geo-based)
- **Interactions:**
  - Clicking an event → opens **Event Detail / Outfit Feed**
  - “Interested” or RSVP (optional MVP)

### 4. **Event Detail Page**

- **Components:**
  - Event title, date/time, location
  - Cover photo / banner
  - Description & theme
  - Outfit Feed (posts associated with event)
  - Optional Group Chat button
  - RSVP or Join button (if private)
  - Organizer info & link to profile

### 5. **Event Edit / Management (Org)**

- **Access:** Event creator or org admin
- **Components:**
  - Edit fields (title, date/time, banner, description)
  - Upload new images or update dress code
  - Cancel event button
  - Visibility toggle (Public / Private)
- **Validation:** Only editable **before event start** or as allowed by admin.

---

### **Backend Architecture**

- **Database:**
  - Events table:
    - `id`, `title`, `description`, `theme`, `location`, `date_time`, `cover_photo_url`, `privacy`, `org_id`, `status` (pending/approved/rejected)
  - Event_Posts table (relation to Outfit Feed)
  - Event_Chat table (relation to messaging system)
- **APIs:**
  - `POST /events` → create event
  - `GET /events` → list events (filter by campus, type, date)
  - `GET /events/:id` → event detail
  - `PATCH /events/:id` → edit event
  - `POST /events/:id/approve` → admin approval
  - `POST /events/:id/reject` → admin rejection
- **Notifications:** Notify creator on approval/rejection

---

### **UI/UX Notes**

- Should be **visually consistent** with main dashboard:
  - Clean, white background with soft accents (college colors optional)
  - Clear CTA buttons (submit, approve, RSVP)
  - Lucide icons for:
    - Calendar (`calendar`)
    - Location (`map-pin`)
    - Chat (`message-square`)
    - Approval (`check-circle`)
    - Rejection (`x-circle`)
- Avoid AI-looking gradients; keep **warm, minimal, student-friendly aesthetic**

---

### **Cursor Instructions**

- Generate as **its own document planning file**.
- Follow **strict architecture standards**: clear separation of components, API endpoints, DB schema.
- Include both **frontend (screens/components)** and **backend structure**.
-

## **Integrated Event Management + Org Community System**

### **Purpose**

- Events are now **linked to both the public campus calendar and private org/community calendars**.
- Only **approved org members** can see private events or post to private feeds.
- All event-related outfit posts, RSVPs, and reminders respect **org privacy rules**.

---

### **Pages / Screens (Updated)**

### 1. **Event Creation (Org + Individual)**

- **Components:**
  - Title, date, theme, dress code, description, cover photo
  - Event type: Private (org members) / Public (all campus)
  - Automatic tagging:
    - If created by org → linked to org feed
    - If public → appears on campus calendar feed
- **UX Notes:**
  - Dropdown to select privacy
  - Auto-fill org members if org-linked
- **Backend Integration:**
  - `event` table includes:
    - `event_id`, `title`, `creator_id`, `org_id` (nullable), `privacy`, `date`, `theme`
  - Event fetch:
    - `/events?user_id=XXX` → returns public events + private org events user belongs to

### 2. **Org Calendar + Public Campus Calendar**

- **Org Calendar:**
  - Only visible to org members
  - Shows private events and public org events
  - Filter: All / Upcoming / Past
- **Public Calendar:**
  - Campus-wide events
  - Shows public events from orgs and individuals
- **Integration:**
  - Calendar items link to event detail page
  - Outfit feed filters based on event ID and privacy

### 3. **Org / Event Feed**

- **Private Feed (Org only):**
  - Outfit posts, event discussions, announcements
  - Only approved members can post or comment
- **Public Feed (Campus):**
  - Public events’ outfit posts
  - Optional visibility of orgs’ public posts
- **Filtering:**
  - By event
  - By friend/following
  - Rentable items only (optional)

### 4. **Membership-Driven Access**

- **Roles & Permissions:**
  - Admin → full control (approve members, create events, moderate posts)
  - Member → post outfits, RSVP, comment
  - Non-member → only see public org info
- **APIs:**
  - `GET /orgs/:id/events` → filtered by member role
  - `GET /events/:id/feed` → respects event privacy
  - `POST /events/:id/post` → only allowed for org members if private

### 5. **Notifications & Outfit Reminders**

- Private events → only notify org members
- Public events → notify anyone following event or org
- Reminder logic:
  - “Your rental for [event] is due”
  - “Check outfits for [event]”
  - “New post in your org feed”

---

### **Backend Architecture Updates**

- **Database Tables:**
  - `Events` → `event_id`, `title`, `org_id`, `privacy`, `date`, `theme`
  - `Org_Members` → `user_id`, `org_id`, `role`, `status`
  - `Event_Posts` → `post_id`, `event_id`, `user_id`, `type`, `content`, `timestamp`
- **APIs:**
  - `POST /events` → supports org-linked or individual creation
  - `GET /events` → returns filtered events (public + private if member)
  - `GET /org/:id/feed` → returns org posts only
  - `POST /events/:id/posts` → enforce role-based posting

---

### **Frontend / Component Notes**

- **Event Cards**:
  - Visual cue for private vs public (lock icon vs globe)
- **Org Feed**:
  - Include org banner at top
  - Outfit posts display member name, photo, optional rent link
- **Calendar Views**:
  - Toggle: “My Orgs” / “Campus Public”
- **Lucide Icons Suggested:**
  - `lock` → private event
  - `globe` → public event
  - `calendar` → calendar page
  - `users` → org member list

---

### **Cursor Instructions**

- Generate as **separate planning file**.
- Include **frontend pages/components** and **backend tables + APIs**.
- Enforce **privacy-based event filtering** across feeds, calendar, and notifications.
- Ensure **strict architecture**: separate concerns (event logic, org membership, feeds, notifications, privacy checks).
