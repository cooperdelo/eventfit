# Search/Filter

## **Search & Filtering Overview**

**Purpose:**

Allow users to quickly find outfits, rental items, events, or users that match their criteria, making discovery fast and intuitive.

**Key Principles:**

- Multi-level filters (event type, size, availability, price, popularity)
- Search across outfits, events, and users
- Mobile-first, minimalistic, visually appealing (college vibe, no gradients, clean UI)
- Real-time results with suggestions

---

## **Page 13: Search Bar / Global Search Component**

### **Purpose**

- Provide a unified entry point for all searches
- Available on dashboard, top nav, and public pages

### **Components**

- Input field with placeholder: “Search outfits, events, users…”
- Autocomplete suggestions as user types: outfit names, event names, users
- Optional icons (lucide-search, lucide-user, lucide-calendar)
- Recent searches & trending searches

### **Backend**

- **GET /search?q=string&type=all|outfit|event|user** → returns top results
- Supports server-side filtering for performance

---

## **Page 14: Filters Panel / Modal**

### **Purpose**

- Allow users to narrow search results by multiple attributes

### **Filter Categories**

1. **Event Type / Occasion**: Formal, Gameday, Concert, Party, Other
2. **Availability / Date**: Select range or “available now”
3. **Size / Fit**: XS, S, M, L, XL, etc.
4. **Price Range**: Slider or min/max inputs
5. **Rentable vs Lookbook Only**: Toggle
6. **Location / Campus**: Default to user’s school; optional radius filter
7. **Friends / Network**: “Only friends” toggle
8. **Popularity / Likes**: Top liked, trending, recently posted

### **Components**

- Slide-over modal for mobile
- Sidebar for desktop
- Multi-select checkboxes / toggle switches
- Apply / Reset buttons

### **Backend**

- **GET /items?filters={}** → returns filtered items/events
- Supports pagination for performance

---

## **Page 15: Search Results / Filtered Feed**

### **Purpose**

- Display items or events after search/filtering

### **Components**

- Cards: image, title, price (if rentable), tags
- Infinite scroll or paginated list
- Badges: “Rentable”, “Friends posted”, “Trending”
- Optional quick action: Rent or Like directly from results

### **Backend**

- Uses same **/items** endpoint with query params
- Supports sorting: newest, price low → high, most liked, closest events

---

## **Page 16: Saved Filters / Favorites**

### **Purpose**

- Allow users to save commonly used searches for quick access

### **Components**

- “Save Filter” button on filters modal
- Dropdown of saved filters
- Load / Edit / Delete saved filters

### **Backend**

- **POST /filters/save** → save filters for user
- **GET /filters/:userId** → load saved filters

---

## **Page 17: Suggested / Trending Search Suggestions**

### **Purpose**

- Boost engagement by surfacing popular outfits/events

### **Components**

- Horizontal scroll cards for trending items
- Auto-populated by: most liked, most rented, campus popularity
- CTA: “View Outfit/Event”

### **Backend**

- **GET /items?trending=true** → fetch trending outfits/events

---

## **Integration Notes**

- Integrate **Search & Filters** directly into dashboard and event feeds so users can filter while browsing.
- Ensure filters and search are **fast and reactive**; use debounce on input.
- Use **Lucide icons** consistently (search, filter, calendar, user).
- Mobile-friendly: slide-over filters, sticky search bar.

---

### **Cursor Instructions**

> Generate each component as a separate React module with Tailwind CSS styling:
>
> - Components: GlobalSearchBar, FiltersPanel, FilteredFeed, SavedFilters, TrendingSuggestions
> - Ensure **strict architecture**: separation of concerns, reusable UI components, clear folder structure
> - Mobile-first, visually appealing, college campus style (no gradients, minimal AI feel)
> - Backend endpoints as placeholders for future integration (Node.js / Firebase / API)
