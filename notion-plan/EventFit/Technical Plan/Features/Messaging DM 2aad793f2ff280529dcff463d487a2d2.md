# Messaging/DM

## **Integrated Messaging / Group Chat System**

### **Purpose**

- Allow **real-time or near-real-time communication** for:
  - **Private org communities**
  - **Event-specific chats** (for coordination, outfit discussion, rental negotiation)
  - Optional **friend-to-friend messaging**
- Fully respects **privacy settings** (public vs private events/orgs)
- Works in tandem with notifications for engagement

---

### **Pages / Screens**

### 1. **Event Group Chat**

- **Components:**
  - Chat feed: chronological messages, image attachments, outfit links
  - Input bar with text, emojis, image upload
  - Optional “@mention” tagging for org members
- **Visibility:**
  - Private events → only org members/invitees
  - Public events → anyone attending or following
- **Features:**
  - “Pinned messages” for event reminders or guidelines
  - Threaded replies for outfit posts if integrated
  - Notification triggers: new message, tagged in message
- **Backend Integration:**
  - `event_chats` table:
    - `chat_id`, `event_id`, `user_id`, `message`, `attachments`, `timestamp`
  - API:
    - `GET /events/:id/chat` → filtered by privacy
    - `POST /events/:id/chat` → checks member role for private events

---

### 2. **Org / Community Chat**

- **Components:**
  - Persistent group chat for org members
  - Threads for specific topics (e.g., outfits, event planning)
  - Display org banner at top
- **Permissions:**
  - Admins → can pin, moderate, remove messages
  - Members → post, reply, react
- **Backend:**
  - `org_chats` table:
    - `chat_id`, `org_id`, `user_id`, `message`, `attachments`, `timestamp`
  - API:
    - `GET /org/:id/chat` → only accessible to org members
    - `POST /org/:id/chat` → role-based access

---

### 3. **Direct Messaging (Optional / Later Phase)**

- **Components:**
  - Friend-to-friend chat (text + outfit links)
  - Notifications for new messages
- **Backend:**
  - `direct_messages` table:
    - `dm_id`, `sender_id`, `receiver_id`, `message`, `attachments`, `timestamp`
  - API:
    - `GET /dm/:user_id` → messages for logged-in user
    - `POST /dm` → send message

---

### **Backend Architecture Updates**

- **Tables:**
  - `event_chats` (event-specific)
  - `org_chats` (org-specific)
  - `direct_messages` (user-to-user)
- **Notification Triggers:**
  - New message in event chat → notify event followers
  - New message in org chat → notify org members
  - @mentions → push notifications
- **Security & Privacy:**
  - Enforce access checks at every API endpoint
  - Messages encrypted at rest (future-proof for compliance)

---

### **Frontend / Component Notes**

- **Icons (Lucide suggested):**
  - `message-square` → chat page
  - `users` → org members online
  - `bell` → new message notification
- **UI Notes:**
  - Should feel **college-friendly, fun, clean**
  - Avoid gradients / AI-style aesthetics
  - Threads or replies should visually nest with subtle borders
  - Outfit images / links previewed inline in chat

---

### **Cursor Instructions**

- Generate as **separate planning file**
- Include **frontend components** + **backend tables/APIs**
- Enforce **role-based access** for private events/orgs
- Connect chat system to **notifications / outfit posts / event pages**
- Maintain **clean, modern, college-vibe UI**

## **EventFit Messaging Flow**

### **1. Event-Based Chat Flow**

**Scenario:** A user joins an event and wants to coordinate outfits with other attendees.

**Flow Steps:**

1. **Event Page → Chat**
   - User clicks “Event Chat” button on event detail page.
   - Frontend fetches messages via: `GET /events/:id/chat`.
   - Only users with access (public event: anyone; private event: invitees/org members) can view.
2. **Posting Messages**
   - User types message + optional image/attachment.
   - Sends via `POST /events/:id/chat`.
   - Backend validates:
     - User is allowed (role/access check)
     - Sanitizes content
     - Stores in `event_chats` table
3. **Notifications**
   - Backend triggers notification:
     - New message in chat → users following the event get push notification
     - @mention → tagged user receives priority notification
   - Notification links to the event chat page
4. **Integration with Outfits**
   - Users can link outfit posts:
     - Click “Attach Outfit” → select outfit from profile/closet
     - Backend saves `chat_id` → `outfit_id` relation
     - Inline preview in chat feed
5. **Real-Time Updates**
   - WebSocket / Firebase Realtime Database / Supabase Realtime for live chat updates

---

### **2. Organization / Community Chat Flow**

**Scenario:** Sorority or club members coordinate outfits for multiple events and discuss rentals.

**Flow Steps:**

1. **Org Dashboard → Chat**
   - Members see “Org Chat” button on dashboard
   - Backend fetch: `GET /org/:id/chat`
   - Access: only org members
2. **Posting Messages**
   - Same as event chat:
     - Text + attachments (outfits, links)
     - Optional pinned messages for announcements
   - Messages stored in `org_chats` table
3. **Notifications**
   - New org message → push notifications to org members
   - @mentions → priority notification
4. **Integration with Events**
   - Messages can reference specific events:
     - Use `event_id` foreign key for cross-linking
     - Chat can show “Related Event” tag

---

### **3. Direct Messaging (Optional / Phase 2)**

**Scenario:** Users want 1:1 communication for renting or outfit coordination.

**Flow Steps:**

1. **Friend List → DM**
   - Users select friend → opens DM thread
   - Backend fetch: `GET /dm/:user_id`
2. **Posting Messages**
   - Same as above: text + image + outfit link
   - Stored in `direct_messages` table
3. **Notifications**
   - Push notification to receiver for new DM
   - Outfit attachments clickable → navigates to outfit page

---

### **4. Integration with Calendar / Events / Outfits**

| Feature       | Integration                                                                          |
| ------------- | ------------------------------------------------------------------------------------ |
| Event Chat    | Linked directly from Event Detail Page; updates reflected in Event Feed for activity |
| Org Chat      | Linked from Org Dashboard; can reference event pages for context                     |
| Notifications | New messages trigger push + in-app notifications                                     |
| Outfit Links  | Inline preview with direct link to Outfit Detail / Posting page                      |
| Privacy       | Access checked for each type (public/private events, org members, friends only)      |

---

### **5. Frontend Notes (UI/UX)**

- **Icons (Lucide):**
  - `message-square` → chat page
  - `users` → online members
  - `bell` → new message notification
  - `paperclip` → attachments
- **Style:**
  - College-friendly, clean, minimal gradients
  - Threads / replies: subtle borders, light shadows
  - Outfits in chat: small card previews with image + brand + size + availability
- **Components:**
  - Chat Feed Component
  - Message Input Component
  - Attachment / Outfit Selector Component
  - Notification Banner Component

---

### **6. Backend Architecture / Tables**

- **event_chats**: `chat_id`, `event_id`, `user_id`, `message`, `attachments`, `timestamp`
- **org_chats**: `chat_id`, `org_id`, `user_id`, `message`, `attachments`, `timestamp`, `pinned`
- **direct_messages**: `dm_id`, `sender_id`, `receiver_id`, `message`, `attachments`, `timestamp`
- **chat_outfit_links**: `chat_id`, `outfit_id`

**APIs:**

- `GET /events/:id/chat`
- `POST /events/:id/chat`
- `GET /org/:id/chat`
- `POST /org/:id/chat`
- `GET /dm/:user_id`
- `POST /dm`

---

### **7. Cursor Instructions**

- Generate as **separate planning files for each chat type**
- Connect **chat system to notifications, outfits, event pages, and org pages**
- Maintain **college-friendly UI and style consistency**
- Enforce **role-based access for private events/orgs**
- Include **frontend components and backend tables/APIs**
