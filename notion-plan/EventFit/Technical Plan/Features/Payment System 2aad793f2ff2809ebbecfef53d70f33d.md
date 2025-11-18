# Payment System

## **Payment & Escrow System Overview**

**Purpose:**

- Ensure secure transactions between renters and lenders.
- Protect lenders from non-payment or non-return.
- Hold funds in escrow until rental obligations are met.
- Support optional penalties for late returns or damages.

**Key Principles:**

- Integrate **Stripe Connect** for handling payments.
- Full escrow: platform holds funds until rental is confirmed delivered.
- Clear status tracking for both user and admin.
- Desktop + mobile-friendly UI.
- Integration with **Rental Management** and **Admin Dashboard** for disputes.

---

## **Page 26: Checkout / Rent Item Flow**

### **Frontend Components**

- Item card: photo, size, rental price, deposit (optional), available dates
- Calendar picker: select rental dates
- Price breakdown modal: rental cost, security deposit, fees
- Payment button: “Pay & Reserve”
- Confirmation modal: shows escrow status

### **Backend Endpoints**

- **POST /rentals/create** → create rental request (status: pending payment)
- **POST /payments/initiate** → initiate Stripe payment (funds go to escrow)
- **GET /rentals/:id/status** → track payment & delivery status

### **Flow**

1. User selects item + rental dates
2. Checkout modal shows total + deposit
3. Stripe processes payment → funds held in escrow
4. Rental status updated to “Payment Received, Awaiting Delivery”

---

## **Page 27: Delivery & Return Confirmation**

### **Frontend Components**

- Lender confirms item shipped → button “Mark as Delivered”
- Renter confirms receipt → button “Confirm Delivery”
- Reminder notifications for overdue confirmations

### **Backend Endpoints**

- **PATCH /rentals/:id/delivered** → lender confirms delivery
- **PATCH /rentals/:id/received** → renter confirms receipt

### **Flow**

- Payment is released from escrow **only after renter confirms receipt**
- If renter doesn’t confirm within X days → admin intervention workflow triggers

---

## **Page 28: Late Returns / Penalty System**

### **Frontend Components**

- Notifications to renter when due date approaches
- Button for lender to report late return / damage
- Payment modal for applying penalty

### **Backend Endpoints**

- **PATCH /rentals/:id/penalty** → adds penalty fee to rental cost
- **POST /admin/dispute** → triggers admin resolution

### **Flow**

1. Item not returned by due date → renter receives automated reminder
2. Lender reports late return → admin sees dispute
3. Admin can deduct deposit or apply penalty
4. Escrow payment released after resolution

---

## **Page 29: Refund & Dispute Handling**

### **Frontend Components**

- Lender dashboard: view rental disputes, request admin review
- Renter dashboard: contest penalty, request refund
- Admin modal: review disputes, approve/reject penalties or refunds

### **Backend Endpoints**

- **POST /admin/disputes/:id/resolve** → resolves payment disputes
- **PATCH /rentals/:id/refund** → refund escrow partially or fully

---

## **Page 30: Payment History & Receipts**

### **Frontend Components**

- User dashboard tab: “My Payments”
- Shows past rentals, status, fees paid, and receipts
- Filter by date, status, or event

### **Backend Endpoints**

- **GET /payments/history** → fetch transaction history
- **GET /payments/:id/receipt** → download PDF receipt

---

## **Integration Notes**

- All payments **must go through Stripe Connect** for escrow and compliance.
- Rental status and payments must be **synchronized** with admin dashboard for monitoring.
- Notifications for pending payments, overdue items, or disputes should be **real-time** (Firebase / WebSocket).
- Escrow release logic is **atomic**: funds released only when both delivery and return conditions are met or admin resolves disputes.
- Keep deposit and penalties **clearly communicated** to users during checkout.

---

### **Cursor Instructions**

> Generate each payment-related page as a separate React module with Tailwind styling.
>
> Ensure:
>
> - Reusable components (modals, tables, buttons)
> - API integration hooks for Stripe and backend endpoints
> - Clear UI for escrow status and dispute handling
> - Mobile-first design, visually clean, college-friendly (avoid AI/gradient aesthetics)
> - Admin views for dispute resolution and rental monitoring
