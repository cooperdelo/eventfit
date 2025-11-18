# Profile/Closet

# 3️⃣ Profile / Closet Page (`/profile/[userId]`)

**Purpose:**

Allow users to manage their personal profile, rentable items, rental history, and social connections. Core hub for identity + inventory.

---

## **A. Layout**

- **Header / Navbar** (same as Dashboard & Event pages)
  - Logo, search bar, notifications, profile dropdown
- **Profile Header**
  - Avatar (circular, 120px)
  - Name, Org/Sorority, School, Bio
  - “Edit Profile” button (opens modal for editing)
  - Stats: Total Rentals, Items Listed, Followers
- **Tabs / Navigation**
  - `Closet` | `Rental History` | `Wishlist` | `Friends` | `Settings`
  - Active tab highlighted
  - Tailwind: `flex space-x-4 border-b-2 border-gray-200 mb-4`
- **Main Content**
  - **Closet Tab**
    - Grid of `<ClosetItemCard>`
    - Buttons: `Add Item`, `Edit Item`, `Mark as Rentable / Unrentable`
    - Infinite scroll / pagination
  - **Rental History Tab**
    - List of past rentals (outfit image, renter, dates, rating)
    - Option to repeat rental if still available
  - **Wishlist Tab**
    - Items the user wants to rent or borrow
    - Saved posts from other users / outfit inspiration
  - **Friends Tab**
    - List of friends / followers with avatar + add/remove friend button
  - **Settings Tab**
    - Profile settings (email, password)
    - Notification preferences
    - Payment methods
    - Account deletion

---

## **B. Components**

### 1. `<ProfileHeader>`

- Props: `avatar`, `name`, `org`, `school`, `bio`, `stats`
- Tailwind: `flex flex-col md:flex-row items-start md:items-center justify-between gap-4`
- Stats section: `flex gap-6`

### 2. `<ClosetItemCard>`

- Props: `photo`, `name`, `size`, `price`, `isRentable`, `editEnabled`
- Actions:
  - `Rentable toggle` → updates DB
  - `Edit` → modal with image upload, size, price
  - `Delete` → confirmation modal
- Tailwind: `rounded-lg shadow hover:shadow-lg transition duration-150 cursor-pointer`

### 3. `<RentalHistoryItem>`

- Props: `photo`, `renterName`, `startDate`, `endDate`, `rating`
- Tailwind: `flex items-center gap-4 p-3 rounded-lg bg-white shadow-sm`

### 4. `<WishlistItem>`

- Similar to ClosetItemCard, shows “Save” or “Rent” actions

### 5. `<FriendCard>`

- Props: `avatar`, `name`, `org`
- Button: `Add / Remove Friend`
- Tailwind: `flex items-center gap-3 p-2 rounded hover:bg-gray-50`

---

## **C. State Management**

- Global State:
  - `userProfile`: avatar, bio, org, school, stats
  - `closetItems`: array of user-owned items
  - `rentalHistory`: array of past rentals
  - `wishlistItems`
  - `friendsList`
- Local State:
  - `isEditingProfile`: boolean
  - `editingItemId`: string
  - `hasMoreClosetItems`: boolean (infinite scroll)
- **API Calls**
  - `GET /api/users/:id` → profile info
  - `PUT /api/users/:id` → update profile
  - `GET /api/users/:id/closet` → closet items
  - `POST /api/users/:id/closet` → add new item
  - `PUT /api/closet/:itemId` → edit item
  - `DELETE /api/closet/:itemId` → remove item
  - `GET /api/users/:id/rental-history`
  - `GET /api/users/:id/wishlist`
  - `GET /api/users/:id/friends` & `POST /api/users/:id/friends`

---

## **D. Visual Design / Styling**

- Tailwind + shadcn/ui
- College aesthetic, clean, playful, minimal gradients
- **Closet Grid:** 2 cols mobile / 3–4 cols tablet & desktop
- Icons: Lucide (`edit`, `trash`, `shopping-bag`, `heart`, `user-plus`)
- Buttons: rounded, accent hover color
- Responsive first, accessible (keyboard nav, alt text for images)

---

## **E. Interactions & UX Notes**

- **Closet**
  - Hover shows quick actions (`Edit`, `Rentable toggle`, `Delete`)
  - Drag & drop future feature for reordering items
- **Rental History**
  - Click item → quick view modal with rating, rental dates
- **Wishlist**
  - Tap “Rent” → triggers Stripe modal for rental
- **Friends**
  - Add friend → sends notification, updates UI optimistically
- **Settings**
  - Toggle notifications → updates backend immediately

---

## **F. Cursor Notes**

- Generate this as **its own document planning file**
- Follow professional component hierarchy: ProfileHeader, ClosetItemCard, RentalHistoryItem, WishlistItem, FriendCard
- Tailwind + shadcn/ui + Lucide icons
- Include inline comments explaining props, state, and API integration
- Ensure clean, college-inspired style (no AI gradients, playful minimalism)
- Fully responsive layout
