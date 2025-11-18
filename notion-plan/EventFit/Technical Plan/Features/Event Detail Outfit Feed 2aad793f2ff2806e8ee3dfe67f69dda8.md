# Event Detail / Outfit Feed

# 2️⃣ Event Detail / Outfit Feed (`/event/[eventId]`)

**Purpose:**

Showcase a single event with all associated outfits, posts, and rentals. This is the **main interaction hub** for a specific event.

---

## **A. Layout**

- **Header / Navbar** (same as Dashboard)
  - Logo, search bar, notifications, profile dropdown
- **Event Header Section**
  - Cover photo (`img object-cover rounded-lg`)
  - Event Title, Date & Time, Location, Dress Code
  - Buttons:
    - `RSVP` (if private event, only available to invited users)
    - `Share` (copy link / social share)
    - `Follow Event` (notifications for new posts)
  - Tailwind: `relative bg-white shadow-md p-6 rounded-lg`
- **Navigation Tabs (Below Header)**
  - `Feed` | `Rentables` | `Attendees` | `Chat` (if chat enabled)
  - Tailwind: `flex space-x-4 border-b-2 border-gray-200 mb-4`
  - Active tab highlighted (accent color)
- **Main Content**
  - **Feed Tab**
    - Grid of `<OutfitCard>` (similar to Dashboard, but filtered to this event)
    - Infinite scroll
  - **Rentables Tab**
    - Only posts with `isRentable = true`
    - Grid/list toggle view
  - **Attendees Tab**
    - List of attending users (avatar, name, org affiliation)
    - Optional “Add Friend” / “Follow” button
  - **Chat Tab**
    - Lightweight event chat
    - Infinite scroll messages
    - Message input with emoji picker (`lucide-smile`)
- **Right Sidebar (desktop)**
  - Related events / trending outfits
  - “Style Boards” carousel (aggregated from similar events)

---

## **B. Components**

### 1. `<EventHeader>`

- Props: `title`, `coverPhoto`, `date`, `location`, `dressCode`, `rsvpStatus`
- Buttons: `RSVP`, `Share`, `Follow`
- Tailwind: `flex flex-col md:flex-row items-start md:items-center justify-between gap-4`
- Interactions:
  - `RSVP` triggers `POST /api/events/:id/rsvp`
  - `Follow` toggles notifications
  - `Share` opens modal with social links

### 2. `<OutfitCard>` (reusable from Dashboard)

- Props: `id`, `photo`, `description`, `price`, `isRentable`, `likesCount`, `commentsCount`, `owner`
- Includes **Rent button** with Stripe escrow modal

### 3. `<AttendeeList>`

- Props: array of user objects
- Show avatar + name + optional org tag
- Tailwind: `flex flex-wrap gap-3`

### 4. `<EventChat>`

- Props: messages array, currentUser
- Input box at bottom, sticky footer
- Emoji picker + send button
- Tailwind: `flex flex-col h-full space-y-2 overflow-auto`

### 5. `<StyleBoardCarousel>`

- Props: array of OutfitCards (aggregated for similar events)
- Horizontal scroll on mobile, grid on desktop

---

## **C. State Management**

- Global State:
  - `eventDetails`: event info (title, date, cover photo, dress code, attendees)
  - `eventFeed`: array of OutfitCards
  - `eventRentables`: filtered rentable items
  - `chatMessages`: array
  - `currentTab`: “Feed” | “Rentables” | “Attendees” | “Chat”
- Local State:
  - `isRSVPed`: boolean
  - `isFollowingEvent`: boolean
  - `hasMoreFeedItems`: boolean (for infinite scroll)
- **API Calls**
  - `GET /api/events/:id` → returns event metadata
  - `GET /api/events/:id/outfits` → feed items
  - `GET /api/events/:id/rentables`
  - `GET /api/events/:id/attendees`
  - `POST /api/events/:id/rsvp`
  - `POST /api/outfits/:id/rent` → triggers Stripe escrow
  - `GET /api/events/:id/chat` & `POST /api/events/:id/chat`

---

## **D. Visual Design / Styling**

- Tailwind, college aesthetic, minimal gradients
- **Event Header:** rounded, soft shadow
- **Outfit Cards:** hover lift + shadow
- Icons: **Lucide** for all buttons (`heart`, `shopping-bag`, `message-circle`, `smile`)
- Responsive: mobile first, grid layout adjusts for tablet/desktop

---

## **E. Interactions & UX Notes**

- **Tab Switching**:
  - Smooth transition without page reload
  - Data prefetching for performance
- **Rent Flow**:
  - Clicking `Rent` opens modal
  - Shows item details, rental price, dates, and confirms payment → escrow
- **Feed Actions**:
  - Like, comment, share (optimistic updates)
- **Chat**:
  - Scroll sticky to bottom for new messages
  - Real-time updates via polling or WebSockets (later)

---

## **F. Cursor Notes**

- Generate this page as its own **document planning file**
- Use professional component architecture: reusable OutfitCard, EventHeader, EventChat, StyleBoardCarousel
- Tailwind + shadcn/ui
- Lucide icons everywhere
- Include comments explaining props, state, and API endpoints
- Stick to **college aesthetic**, no gradients, minimal shadows, playful but clean
- Ensure responsive layout
