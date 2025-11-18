# Dashboard/Feed

# Deliverable: Dashboard + Event Detail (Tabbed) — Cursor-ready spec

## Quick summary

- `/dashboard`: feed of local events (DoorList image preferred). Filter bar (All / Friends / Rentable), campus radius chip. Infinite scroll of `EventCard`.
- `/event/:id`: hero carousel (DoorList-first), meta, segmented tabs: **Inspiration | Rentals | Outfits**. Each tab lazy-loads its own data. Rent action opens an in-page modal.

---

## 1) Files / Components Cursor should generate

- `pages/Dashboard.jsx` (mobile-first)
- `components/EventCard.jsx`
- `components/FilterToolbar.jsx`
- `components/InfiniteScrollContainer.jsx`
- `pages/EventDetail.jsx`
- `components/HeroCarousel.jsx`
- `components/SegmentedTabs.jsx` (tab accessibility)
- `components/InspirationGrid.jsx`
- `components/RentalsList.jsx`
- `components/OutfitList.jsx`
- `components/RentModal.jsx`
- `api/mockEvents.json` (mock data)

---

## 2) Tailwind + visual rules (strict)

- Card: `rounded-lg overflow-hidden shadow-sm bg-white`
- Hero: `w-full h-64 md:h-96 object-cover rounded-b-2xl`
- Date pill: `absolute top-3 left-3 bg-black/70 text-white text-sm px-3 py-1 rounded`
- Title overlay: `absolute bottom-4 left-4 text-white text-lg font-semibold`
- Toolbar: `flex items-center gap-2 p-3 bg-white sticky top-14 z-40`
- Tabs: `inline-flex bg-white rounded-full p-1 border` with tab buttons: `px-4 py-2 rounded-full`
- Masonry (InspirationGrid): CSS column layout `columns-2 md:columns-3 gap-3` with `break-inside-avoid` on tiles

---

## 3) Component specs (props + interactions + aria)

### `EventCard`

Props:

```tsx
{
  (id, title, doorlistCoverPhoto, coverPhoto, startAt, campus, distanceMiles, tags, hasRentals);
}
```

Render rules:

- `cover = doorlistCoverPhoto ?? coverPhoto`
- Image markup:
  `<img src={cover} alt={`${title} cover`} class="w-full h-56 object-cover"/>`
- Overlay: date pill (human readable), title, distance chip.
- Bottom action row: like button, comment icon, shopping-bag icon if `hasRentals`.
  Interactions:
- Entire card clickable → `router.push(/event/${id})`.
- Buttons should use `button` elements with `aria-label`.

Accessibility:

- Card wrapper: `<article role="button" aria-label="Open event: Carolina Lights, November 21st">`

### `FilterToolbar`

Props:

```tsx
{
  (selectedFilter, onFilterChange, campus, radiusMiles, onChangeRadius);
}
```

Elements:

- Toggle buttons: `All | Friends | Rentable`.
- Campus chip: `Campus: UNC • 3 mi (change)` (click opens radius modal).
- Search input (visually center): `aria-label="Search events or outfits"`.

### `InfiniteScrollContainer`

Props:

```tsx
{
  (items, loadMore, hasMore, isLoading);
}
```

Behavior:

- Observe scroll; when 80% reached, call `loadMore()`.
- Show spinner during `isLoading`.

### `EventDetail`

Props: none (page-level fetch by id)

Fetch:

- `GET /api/events/:id?include=inspiration,rentals,posts`
  Layout:
- `HeroCarousel` (DoorList images first).
- Meta row: title, date/time, location string, distanceMiles, RSVP button.
- `SegmentedTabs` with three tabs. Each tab lazy-loads content and shows skeleton.

Tab behaviors:

- Switching tab updates URL hash (`#inspiration`, `#rentals`, `#outfits`) for deep-linking.
- Each tab fetch:
  - Inspiration: `GET /api/events/:id/inspiration?page=1`
  - Rentals: `GET /api/events/:id/rentals?page=1`
  - Outfits: `GET /api/events/:id/posts?page=1`

### `HeroCarousel`

Props:

```tsx
{ images: string[], titles?: string[] }

```

Rules:

- DoorList images first (server returns ordered array).
- Swipeable on mobile, arrow nav on desktop.
- Image slides: `img` with `alt` and `loading="lazy"`.
- Show small microcopy `Source: DoorList` if first image was DoorList.

### `InspirationGrid`

Props:

```tsx
{
  items;
} // items: {id,imageUrl,title,price,affiliateLink,matchingRentalsCount}
```

Tile UI:

- Image, overlay bottom with `title` + `price`.
- Top-right badge `BUY`.
- Small bottom-left pill `Rent similar (n)` if `matchingRentalsCount>0`.
  Interactions:
- Click tile → open `InspirationItemModal` with retailer link + Save + Rent similar CTA.

### `RentalsList`

Props:

```tsx
{
  items;
} // items: {id,title,images,pricePerDay,deposit,owner,distanceMiles,availableDates}
```

Card UI:

- Image, title, price/day, small owner avatar, `Rent` button.
  Interactions:
- Click `Rent` → `RentModal` with date picker + price calc → Stripe flow.

### `OutfitList`

Props:

```tsx
{
  posts;
} // user posts with images, caption, author
```

UI:

- Social-style cards with image, likes, comments. Click opens full post modal.

---

## 4) API endpoints (exact, minimal)

- `GET /api/events?lat={lat}&lng={lng}&radius_m={r}&page={p}`
  Response: list of event summaries (see sample below).
- `GET /api/events/:id?include=inspiration,rentals,posts`
  Response: event + arrays (inspiration, rentals, posts) OR empty arrays.
- `GET /api/events/:id/inspiration?page=1`
- `GET /api/events/:id/rentals?page=1`
- `GET /api/events/:id/posts?page=1`
- `POST /api/bookings` (only for rent modal; include minimal shape for integration)

### Sample `/api/events` response (copy for Cursor)

```json
{
  "data": [
    {
      "id": "evt_carolina_lights",
      "title": "Carolina Lights",
      "doorlistCoverPhoto": "https://cdn.doorlist/evt_123/img1.jpg",
      "coverPhoto": "https://cdn.myapp/evt_123/hero.jpg",
      "startAt": "2025-11-21T19:00:00Z",
      "location": { "type": "Point", "coordinates": [-79.0444, 35.904] },
      "campus": "UNC Chapel Hill",
      "distanceMiles": 0.9,
      "tags": ["concert", "nightlife"],
      "hasRentals": true
    },
    {
      "id": "evt_homecoming",
      "title": "Homecoming Block Party",
      "doorlistCoverPhoto": null,
      "coverPhoto": "https://cdn.myapp/evt_124/hero.jpg",
      "startAt": "2025-10-10T18:00:00Z",
      "location": { "type": "Point", "coordinates": [-79.045, 35.907] },
      "campus": "UNC Chapel Hill",
      "distanceMiles": 2.1,
      "tags": ["gameday", "party"],
      "hasRentals": false
    }
  ],
  "page": 1,
  "hasMore": true
}
```

### Sample `/api/events/:id?include=inspiration,rentals,posts`

```json
{
  "id": "evt_carolina_lights",
  "title": "Carolina Lights",
  "images": ["https://cdn.doorlist/evt_123/img1.jpg", "https://cdn.myapp/evt_123/hero2.jpg"],
  "startAt": "2025-11-21T19:00:00Z",
  "location": { "type": "Point", "coordinates": [-79.0444, 35.904] },
  "distanceMiles": 0.9,
  "inspiration": {
    "items": [
      {
        "id": "insp_1",
        "imageUrl": "https://img.retail/black-dress.jpg",
        "title": "Little black dress",
        "price": "$45",
        "affiliateLink": "https://shop/blackdress",
        "matchingRentalsCount": 2
      },
      {
        "id": "insp_2",
        "imageUrl": "https://img.retail/jacket.jpg",
        "title": "Denim Jacket",
        "price": "$60",
        "affiliateLink": "https://shop/denim",
        "matchingRentalsCount": 1
      }
    ],
    "page": 1,
    "hasMore": true
  },
  "rentals": {
    "items": [
      {
        "id": "r_1",
        "title": "Black Cocktail Dress (S)",
        "images": ["https://cdn.rent/1.jpg"],
        "pricePerDay": 12,
        "deposit": 40,
        "owner": { "id": "u_10", "name": "Emma" },
        "availableDates": [{ "from": "2025-11-20", "to": "2025-11-30" }],
        "distanceMiles": 0.5
      }
    ],
    "page": 1,
    "hasMore": false
  },
  "posts": {
    "items": [
      /* user posts */
    ],
    "page": 1,
    "hasMore": false
  }
}
```

---

## 5) DoorList image priority rules (exact)

- Server should set `images[]` for event with DoorList images first when available. UI must:
  ```jsx
  const heroImages = event.images || [];
  // carousel renders heroImages[0] first
  ```
- If DoorList image broken/missing, fallback to `coverPhoto`. Show microcopy `Image source: DoorList` only if DoorList image exists.

---

## 6) Campus radius behavior (exact)

- On signup store `user.preferences.campus` and `user.preferences.radiusMiles`.
- Dashboard request includes lat/lng + radius_meters (radiusMiles \* 1609).
- Server returns only events within radius; each event includes `distanceMiles`.
- UI shows chip: `Campus: UNC Chapel Hill • 3 mi` — clicking opens a modal to change radius (options: 1 mi / 3 mi / 5 mi / campus-wide).

---

## 7) Loading / empty / error states (copyable)

- **Dashboard loading**: skeleton cards 3x with shimmer `animate-pulse`.
- **No events**: `No events found within 3 miles. Try expanding your radius or check campus-wide events.` CTA: `Change radius`.
- **EventDetail loading**: hero skeleton and tab skeletons with pulsing boxes.
- **Inspiration empty**: `No inspiration yet. Be the first to add a look.` CTA: `Add inspiration`.
- **Rentals empty**: `No rentals listed for this event.` CTA: `Request a rental` or `Post your item`.
- **Network error**: inline alert `Something went wrong. Retry` with `Retry` button.

---

## 8) Minimal QA checklist (only dashboard + event detail)

- EventCard click navigates to `/event/:id`.
- DoorList image appears as first hero image when present.
- Tabs load data lazily; switching preserves scroll position and updates URL hash.
- Rent CTA opens modal and pre-fills event id.
- Radius filter changes feed results accurately.
- Keyboard accessibility for tabs (arrow keys / Enter) and modals trap focus.
- Infinite scroll loads next page and appends items.

---

## 9) Small mock JSON for Cursor (put in `api/mockEvents.json`)

```json
{
  "events": [
    {
      "id": "evt_carolina_lights",
      "title": "Carolina Lights",
      "images": ["https://cdn.doorlist/evt_123/img1.jpg", "https://cdn.myapp/evt_123/hero2.jpg"],
      "startAt": "2025-11-21T19:00:00Z",
      "location": { "coordinates": [-79.0444, 35.904] },
      "campus": "UNC Chapel Hill",
      "distanceMiles": 0.9,
      "tags": ["concert"],
      "hasRentals": true
    },
    {
      "id": "evt_homecoming",
      "title": "Homecoming Block Party",
      "images": ["https://cdn.myapp/evt_124/hero.jpg"],
      "startAt": "2025-10-10T18:00:00Z",
      "location": { "coordinates": [-79.045, 35.907] },
      "campus": "UNC Chapel Hill",
      "distanceMiles": 2.1,
      "tags": ["gameday"],
      "hasRentals": false
    }
  ],
  "inspiration_sample": [
    {
      "id": "insp_1",
      "imageUrl": "https://img.retail/black-dress.jpg",
      "title": "Little black dress",
      "price": "$45",
      "affiliateLink": "https://shop/blackdress",
      "matchingRentalsCount": 2
    },
    {
      "id": "insp_2",
      "imageUrl": "https://img.retail/jacket.jpg",
      "title": "Denim Jacket",
      "price": "$60",
      "affiliateLink": "https://shop/denim",
      "matchingRentalsCount": 1
    }
  ],
  "rentals_sample": [
    {
      "id": "r_1",
      "title": "Black Cocktail Dress (S)",
      "images": ["https://cdn.rent/1.jpg"],
      "pricePerDay": 12,
      "deposit": 40,
      "owner": { "id": "u_10", "name": "Emma" },
      "availableDates": [{ "from": "2025-11-20", "to": "2025-11-30" }],
      "distanceMiles": 0.5
    }
  ]
}
```
