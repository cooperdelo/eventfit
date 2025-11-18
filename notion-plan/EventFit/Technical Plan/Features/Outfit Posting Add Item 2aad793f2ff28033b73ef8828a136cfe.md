# Outfit Posting/Add Item

# 4️⃣ Outfit Posting / Add Item Modal (`<AddOutfitModal />`)

**Purpose:**

Enable users to upload outfits for rent or inspiration, tag them with event(s), and set details like size, price, and availability. This modal should feel intuitive, stylish, and consistent with the app’s college aesthetic.

---

## **A. Layout / Structure**

- **Modal Header**
  - Title: “Add New Outfit”
  - Close icon (`LucideX`) top-right
- **Image Upload Section**
  - Drag & drop + click to upload
  - Preview thumbnails
  - Max 5 images
  - Optional cropping and rotate tools
- **Basic Info**
  - Outfit Name / Description
  - Event Tag (dropdown or multi-select) — links to event feed
  - Category: Dress, Top, Bottom, Accessory, Shoes, Other
  - Size (multi-select, S/M/L/XS/Custom)
  - Color picker (optional)
- **Rental Info**
  - Toggle: “Available for Rent”
  - Price per rental (currency input)
  - Deposit / penalty toggle (optional)
- **Inspiration Toggle**
  - Checkbox: “Show as inspiration only” (not rentable)
- **Advanced Options (Optional)**
  - Outfit tags: #Formal, #Concert, #Gameday
  - Friend/Closet visibility: Public / Friends only / Org-only
- **Footer**
  - Cancel / Post buttons
  - Posting triggers loader + API call

---

## **B. Components**

### 1. `<ImageUploader>`

- Props: `maxImages`, `onUpload`, `previewImages`
- Tailwind: `border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50`
- Shows preview grid below drag-drop area

### 2. `<TextInput>` / `<Textarea>`

- Tailwind: `rounded-lg border-gray-300 p-2 w-full focus:ring-2 focus:ring-accent`

### 3. `<DropdownMultiSelect>` (Event Tag + Category)

- Props: `options`, `selected`, `onChange`
- Tailwind: clean, minimal hover & selected state

### 4. `<ToggleSwitch>`

- For Rentable / Inspiration only / Deposit options

### 5. `<ColorPicker>` (optional)

- Tailwind + simple palette

### 6. `<NumberInput>`

- For rental price
- Shows currency symbol, min/max validation

### 7. `<TagInput>`

- For outfit tags (#Formal, #Concert, etc.)

### 8. `<VisibilitySelector>`

- Radio buttons or small toggle: Public / Friends / Org-only

---

## **C. State Management**

- Local state within modal:
  - `images: File[]`
  - `name: string`
  - `description: string`
  - `eventIds: string[]`
  - `category: string`
  - `sizes: string[]`
  - `price: number`
  - `depositRequired: boolean`
  - `isRentable: boolean`
  - `isInspiration: boolean`
  - `tags: string[]`
  - `visibility: string`
- Validation:
  - Require at least 1 image
  - If rentable, price required
  - Size must be selected

---

## **D. API Integration**

- `POST /api/outfits`
  ```json
  {
    "userId": "string",
    "images": ["url1", "url2"],
    "name": "string",
    "description": "string",
    "eventIds": ["event1", "event2"],
    "category": "string",
    "sizes": ["S", "M"],
    "price": 25,
    "depositRequired": true,
    "isRentable": true,
    "isInspiration": false,
    "tags": ["#Formal", "#Gameday"],
    "visibility": "public"
  }
  ```
- Response:
  - `200 OK` → success
  - `400 Bad Request` → validation errors
- Optional: Upload images first to `/api/images` → returns URLs for `images` array

---

## **E. Visual Design / Styling**

- Tailwind + shadcn/ui
- College-friendly, clean, playful aesthetic
- **No AI gradients**; subtle accents for buttons and toggles
- Responsive modal (mobile: full-screen, desktop: centered card)
- Use **Lucide icons**: `upload`, `x`, `plus`, `tag`, `dollar-sign`

---

## **F. Interactions / UX Notes**

- Drag & drop images → preview instantly
- Auto-scroll if modal exceeds viewport height
- Toggle “Available for Rent” → dynamically shows price/deposit fields
- Multi-select events → searchable dropdown
- Validation prevents posting incomplete info
- On success: closes modal, triggers feed refresh

---

## **G. Cursor Notes**

- Generate as **own document planning file**
- Modular React component structure: `<AddOutfitModal>` + subcomponents
- Include state management, props, Tailwind classes, Lucide icons
- Stick to professional standards: readable, maintainable, fully responsive
- Ensure college-friendly UI and consistent style with dashboard/profile
