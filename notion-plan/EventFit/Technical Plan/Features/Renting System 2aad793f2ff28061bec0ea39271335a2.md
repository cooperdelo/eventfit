# Renting System

## **Renting Logic Overview**

**Purpose:**

Enable peer-to-peer rentals securely, reliably, and transparently, minimizing flakiness and encouraging trust.

**Key Principles:**

- Escrow-based payment system
- Verification of item delivery
- Optional late fees or extension payments
- Reviews after each rental
- Integration with notifications & reminders

---

## **Page 5: Item / Outfit Listing (Add Item)**

### **Purpose**

- Let users add an outfit for rent
- Capture details for both display and rental processing

### **Fields / Components**

- Photos (1–5, carousel style)
- Item Name / Short Description
- Brand / Size
- Rent Price per day / week
- Deposit (optional, held in escrow)
- Availability Window (start/end dates)
- Tags (event types: formal, tailgate, concert)
- CTA: “Save & List”

### **Backend**

- **POST /items** → create item
- Store images in S3 / Firebase Storage
- Link item to user profile & closet

---

## **Page 6: Item Detail / Outfit Page**

### **Purpose**

- Display item info, rental status, and allow rental actions

### **Components**

- Carousel of images
- Description / brand / size / price / deposit
- Availability calendar (select rental dates)
- Rent button → triggers **rental request flow**
- User info / reviews for the lender

### **Rental Status**

- Available
- Pending (someone requested)
- Rented
- Returned

---

## **Page 7: Rental Request Page**

### **Flow**

1. User selects dates → clicks Rent
2. Shows **total cost + deposit**
3. Optional: Request extension or additional days (approved by lender)
4. “Send Request” → notification to lender

### **Components**

- Date picker
- Price calculation (rental days × price + deposit + optional fee)
- Notes / instructions box
- Confirm / Cancel buttons

### **Backend**

- **POST /rentals** → create rental request
- Status: pending → approved/denied

---

## **Page 8: Rental Approval / Management (Lender View)**

### **Purpose**

- Allow lender to approve, deny, or manage rental requests

### **Components**

- Rental request list (pending)
- Accept / Reject buttons
- Optional message to renter
- View renter profile + rating

### **Backend**

- **PATCH /rentals/:id** → update status
- Notify renter via push notification

---

## **Page 9: Payment & Escrow**

### **Purpose**

- Secure payment handling
- Ensure payout only after confirmed delivery

### **Flow**

1. Renter pays → funds held in escrow (Stripe Connect)
2. Lender marks item delivered → renter confirms receipt → funds released
3. Late returns → optional penalty fee applied
4. Admin can intervene if dispute arises

### **Components**

- Payment modal (Stripe/PayPal)
- Status badge: Pending / Delivered / Completed / Dispute
- CTA buttons: Confirm Delivery, Confirm Receipt

### **Backend**

- **POST /payments** → initiate escrow
- **PATCH /payments/:id/release** → release funds
- **PATCH /payments/:id/refund** → admin refund if dispute

---

## **Page 10: Rental History / My Rentals**

### **Purpose**

- Track all current and past rentals for both renter and lender

### **Components**

- Tabs: “Active Rentals”, “Pending Requests”, “Past Rentals”
- Card per rental: item image, dates, total price, status
- CTA: Rate lender/renter after return

### **Backend**

- **GET /rentals?userId=:id** → fetch all rentals for user
- Status tracking: pending, active, completed, canceled

---

## **Page 11: Reviews & Trust Score**

### **Purpose**

- Encourage responsible renting and reward reliable users

### **Components**

- Star rating (1–5)
- Text review
- Show aggregate trust score on profile (badge or number)

### **Backend**

- **POST /reviews** → store review after rental completion
- Update **user trust score** based on ratings

---

## **Page 12: Notifications Integration**

### **Rental-Related Notifications**

- Rental request received
- Rental approved/denied
- Item delivered → confirm receipt
- Return due / overdue reminder
- Dispute resolution alerts

**UI Components**

- Notification card icons: Bell + small package icon
- Push + in-app alerts

---

## **Backend Data Models (Summary)**

```
Item {
  id: string
  owner_id: string
  name: string
  description: string
  brand: string
  size: string
  images: string[]
  rent_price: number
  deposit: number
  available_start: date
  available_end: date
  tags: string[]
}

Rental {
  id: string
  item_id: string
  renter_id: string
  lender_id: string
  start_date: date
  end_date: date
  total_price: number
  deposit: number
  status: enum(pending, approved, delivered, completed, canceled, dispute)
}

Payment {
  id: string
  rental_id: string
  amount: number
  status: enum(pending, held, released, refunded)
}

Review {
  id: string
  rental_id: string
  reviewer_id: string
  reviewee_id: string
  rating: int
  text: string
}

```

---

### **Cursor Instructions**

> Generate each page as a separate React component with strict architecture:
>
> - Tailwind CSS styling, mobile-first, clean college vibe (no gradients, no neon, minimal AI feel)
> - Pages: AddItem, ItemDetail, RentalRequest, RentalApproval, PaymentModal, RentalHistory, ReviewForm
> - Include Stripe/Firebase integration placeholders for payments, notifications, real-time updates
> - Each component should follow professional software dev standards: separation of concerns, reusable components, clear folder structure
