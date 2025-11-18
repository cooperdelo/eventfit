# TechStack/Architecture

# 🧩 **EventFit Technical Stack & Architecture Overview**

> Note to Cursor:
>
> Generate this as a top-level `architecture.md` planning file.
>
> Each major page or feature (e.g., Event Feed, Profile, Renting Flow) will have its **own document** referencing this structure.
>
> Maintain **strict modularity**, reusable components, and scalable folder architecture reflecting professional full-stack standards.
>
> Follow modern conventions for security, naming, and deployment.

---

## **1. Architecture Summary**

**App Type:** Cross-platform (Web + Mobile)

**Mobile Framework:** React Native (Expo)

**Web Framework:** Next.js 15 (React + TypeScript)

**Backend:** Firebase + Node/Express microservices

**Database:** Firestore (NoSQL, real-time)

**Payments:** Stripe Connect (Escrow system)

**Auth:** Firebase Authentication (.edu email verification)

**File Storage:** Firebase Storage (images, outfits)

**Deployment:**

- Frontend (Vercel for web, Expo for mobile)
- Backend (Firebase Functions or AWS Lambda, TBD post-MVP)

---

## **2. System Architecture Diagram (conceptual)**

```
[Frontend Apps]
   |--> Web App (Next.js)
   |--> Mobile App (React Native via Expo)
           |
           v
[API Layer / Functions]
   - User management
   - Event CRUD
   - Rental payments (Stripe)
   - Notifications
           |
           v
[Firebase / Firestore]
   - users/
   - events/
   - outfits/
   - rentals/
   - reviews/
   - notifications/
           |
           v
[Third-Party Integrations]
   - Stripe Connect
   - Google Maps API (optional for local events)
   - SendGrid / Firebase Messaging (for notifications)

```

---

## **3. Folder Structure (Baseline)**

```
/eventfit-app
├── /apps
│   ├── web/ (Next.js)
│   ├── mobile/ (Expo)
│
├── /packages
│   ├── /ui/ (shared components: buttons, modals, forms)
│   ├── /lib/ (utils: auth, API wrappers, helpers)
│   ├── /api/ (Node/Firebase Functions)
│
├── /docs
│   ├── architecture.md
│   ├── feature_event_feed.md
│   ├── feature_profile.md
│   ├── feature_renting_flow.md
│   ├── feature_event_creation.md
│   ├── feature_calendar.md
│   └── feature_admin_dashboard.md
│
├── /config
│   ├── firebaseConfig.ts
│   ├── stripeConfig.ts
│   └── env.local.example
│
└── package.json

```

---

## **4. Tech Choices & Rationale**

| Layer         | Tool                     | Why                                        |
| ------------- | ------------------------ | ------------------------------------------ |
| Frontend      | Next.js + React Native   | Shared component logic, fast dev, scalable |
| Backend       | Firebase Functions       | Serverless, fast MVP, built-in auth & DB   |
| Database      | Firestore                | Handles dynamic user/event data easily     |
| Auth          | Firebase Auth            | Secure, email verification ready           |
| Payments      | Stripe Connect           | Escrow + split payments out of the box     |
| Hosting       | Vercel + Expo            | Simple CI/CD, easy for team deployment     |
| Storage       | Firebase Storage         | Reliable for user-uploaded images          |
| Notifications | Firebase Cloud Messaging | Real-time alerts for returns & rentals     |
| Analytics     | Firebase Analytics       | Behavior tracking & engagement insights    |

---

## **5. Core Principles**

- **Separation of Concerns:** Each feature (Event Feed, Renting, etc.) lives in its own module.
- **Scalability:** Built with multi-campus expansion in mind.
- **Security:** Enforce .edu verification, payment holds, and limited access to private events.
- **Reusability:** Shared UI library for both web and mobile.
- **Data Consistency:** Firestore rules and indexes defined upfront.
- **AI Readiness:** Future integration layer for style recommendations (OpenAI API or Azure AI).

---

## **6. Initial Database Schema (High-Level)**

### **Users**

```json
{
  "userId": "string",
  "name": "string",
  "email": "string",
  "school": "string",
  "bio": "string",
  "profilePhoto": "url",
  "affiliation": "sorority / club / other",
  "closet": ["outfitId1", "outfitId2"],
  "trustScore": 0,
  "createdAt": "timestamp"
}
```

### **Events**

```json
{
  "eventId": "string",
  "title": "string",
  "description": "string",
  "theme": "string",
  "date": "timestamp",
  "type": "public | private",
  "creatorId": "userId",
  "organization": "string",
  "coverPhoto": "url",
  "attendees": ["userId"],
  "outfits": ["outfitId"],
  "chatId": "chatId"
}
```

### **Outfits**

```json
{
  "outfitId": "string",
  "ownerId": "userId",
  "photo": "url",
  "description": "string",
  "size": "string",
  "price": "number",
  "available": true,
  "tags": ["Formal", "Concert"],
  "rentable": true
}
```

### **Rentals**

```json
{
  "rentalId": "string",
  "outfitId": "string",
  "renterId": "string",
  "ownerId": "string",
  "status": "requested | approved | paid | returned | dispute",
  "price": "number",
  "transactionId": "string",
  "dueDate": "timestamp"
}
```

---

## **7. API Endpoints (High-Level)**

| Endpoint             | Method   | Description                       |
| -------------------- | -------- | --------------------------------- |
| `/api/auth/register` | POST     | Create user w/ .edu verification  |
| `/api/events`        | GET/POST | Fetch or create events            |
| `/api/events/:id`    | GET/PUT  | Get or update specific event      |
| `/api/outfits`       | GET/POST | List or upload outfit             |
| `/api/rent`          | POST     | Initiate rental transaction       |
| `/api/return`        | POST     | Confirm return and release escrow |
| `/api/notifications` | GET      | Fetch user alerts                 |
| `/api/reviews`       | POST     | Submit rating or feedback         |

---

## **8. Development Environment**

| Tool              | Use                                    |
| ----------------- | -------------------------------------- |
| Cursor            | AI-assisted structured code generation |
| GitHub            | Version control                        |
| Firebase Emulator | Local backend testing                  |
| Postman           | API testing                            |
| Expo Go           | Mobile testing                         |
