# Private Group

## **Private Group / Organization Community System**

### **Purpose**

- Allow sororities, clubs, or other student organizations to create a **private space** for members.
- Events created by the org automatically populate **their private calendar** and optionally a **public campus calendar**.
- Members can post outfits, coordinate rentals, and communicate within their group.
- Admins (org leaders) maintain control over membership and content.

---

### **Pages / Screens**

### 1. **Org / Sorority Landing Page**

- **Components:**
  - Banner / logo
  - Description / motto
  - Membership count
  - Upcoming events (private or public)
  - Outfit Feed specific to the group
  - CTA: “Join Group” (pending approval if private)
- **Privacy:**
  - Public org page → shows general info, no private content
  - Private org page → content visible only to approved members

### 2. **Membership / Invitation System**

- **Mechanics:**
  - Admins can invite members via `.edu` email or unique invite link
  - Users can request to join; admins approve/reject
  - Membership table in DB:
    - `user_id`, `org_id`, `role` (member/admin), `status` (pending/approved/rejected)
- **Notifications:**
  - Pending invites
  - Approved/Rejected notifications

### 3. **Org Event Calendar**

- **Features:**
  - Displays **all events created by the org**
  - Filters: private (members only) vs public (all campus)
  - Integration:
    - Event detail → Outfit Feed
    - RSVP system if private
- **Backend:**
  - Org ID linked to each event
  - Calendar fetch: `/events?org_id=XXX&privacy=XXX`

### 4. **Org Feed / Community Board**

- **Components:**
  - Outfit posts by members
  - Announcements from admins
  - Likes / reactions
  - Optional: pinned posts or resources (e.g., packing list, event guide)
- **Post Types:**
  - Outfit post (with optional rentable items)
  - Text announcement
  - Photo album
- **Filtering:** By event, by date, by popularity

### 5. **Org Admin Panel**

- **Components:**
  - Membership management (invite, approve/reject)
  - Event approval / creation
  - Post moderation
  - Analytics: engagement per post, event RSVPs

---

### **Backend Architecture**

- **Database Tables:**
  - `Organizations` → `id`, `name`, `description`, `privacy`, `banner_url`
  - `Org_Members` → `user_id`, `org_id`, `role`, `status`
  - `Org_Posts` → `post_id`, `org_id`, `user_id`, `type`, `content`, `event_id`, `timestamp`
- **APIs:**
  - `POST /orgs` → create org
  - `POST /orgs/:id/invite` → invite member
  - `PATCH /orgs/:id/member/:user_id` → approve/reject membership
  - `GET /orgs/:id/events` → fetch org events
  - `POST /orgs/:id/posts` → create post
  - `GET /orgs/:id/feed` → fetch posts

---

### **UI/UX Notes**

- Keep **college vibe aesthetic**:
  - No neon gradients, warm and clean, student-friendly
  - Use Lucide icons for:
    - Users (`users`)
    - Calendar (`calendar`)
    - Posts (`message-circle`)
    - Settings (`settings`)
- Emphasize **private vs public differentiation** clearly for users

---

### **Cursor Instructions**

- Generate as a **standalone document**.
- Separate **frontend (components/pages)** and **backend structure (DB + API)**.
- Maintain **strict architecture standards**.
- Ensure all group interactions tie to **events, outfit feeds, and notifications**.

---
