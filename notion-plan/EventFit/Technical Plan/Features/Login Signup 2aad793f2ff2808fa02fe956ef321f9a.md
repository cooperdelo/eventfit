# Login/Signup

## **Page 1: Login / Onboarding**

### **Purpose**

Enable secure access to the platform while ensuring college exclusivity via `.edu` email verification. Introduces users to EventFit with a smooth, stylish onboarding experience.

---

### **User Flow**

1. **Landing / Welcome Screen**
   - Hero image with college-vibe (students at events, stylish outfits)
   - Tagline: _“Rent. Lend. Discover outfits for every campus event.”_
   - Buttons: `Sign Up` | `Login`
   - Optional: `Learn More` → About page
2. **Sign Up Flow**
   1. **Email Entry**
      - Input: email (`.edu` check validation)
      - Inline error: “Please use your school email”
      - CTA: `Continue`
   2. **Password Creation**
      - Input: password + confirm password
      - Strength meter (optional)
      - CTA: `Continue`
   3. **Profile Setup**
      - Full Name
      - Profile Photo (optional)
      - School (auto-detect from email)
      - Sorority / Club (optional)
      - Short Bio
      - CTA: `Finish Setup`
   4. **Intro Slides / Quick Tutorial (Optional)**
      - 3–4 swipeable slides introducing core features:
        1. Event Feed
        2. Outfit Posting
        3. Renting & Escrow
        4. Style Boards / Inspiration
      - Skip button always available
3. **Login Flow**
   - Email + Password
   - “Forgot Password?” link
   - CTA: `Login`
   - Option: `Sign in with Apple / Google` (if desired)
4. **Success**
   - Redirect to **Dashboard / Main Feed**

---

### **UI Components**

| Component                  | Details                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| Header                     | College vibe, simple nav for landing (Sign Up/Login)                                           |
| Hero Image                 | Full-width, no gradients, authentic photos, overlay tagline text                               |
| Buttons                    | Tailwind primary buttons, rounded corners (2xl), hover effect, solid colors (no neon/gradient) |
| Input Fields               | Rounded, soft shadow, inline error messages, mobile-first design                               |
| Carousel / Tutorial Slides | Swipable with dots for progress, minimal icons, light animation                                |
| Icons                      | Lucide icons: Email, Lock, User, ArrowRight, Skip                                              |

---

### **State & Validation**

- **Email:** Must match `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/`
- **Password:** Minimum 8 characters, include a number
- **Profile Photo:** Optional; preview before upload
- **School Detection:** Auto-fill from email domain
- **CTA Buttons:** Disabled until input valid

---

### **API / Backend Integration**

- **POST /auth/signup**
  - Inputs: email, password, fullName, profilePhoto, school, orgs, bio
  - Returns: user token, user profile
- **POST /auth/login**
  - Inputs: email, password
  - Returns: user token, profile
- **GET /school/verify**
  - Input: email domain
  - Returns: boolean (is valid school)
- **POST /auth/forgot-password**
  - Inputs: email
  - Sends reset link
- **Image Upload API**
  - Stores profile photo to S3 / Firebase Storage

---

### **UX Notes**

- Keep everything mobile-first (React Native / Expo compatible)
- Onboarding should feel **friendly, light, and college-focused**
- Avoid AI-like gradients; use **flat colors + authentic photography**
- Include **micro-interactions** (button hover, slide swipe, subtle animations)
- Keep onboarding skippable; users can learn in-app

---

### **Cursor Instructions**

> Generate this page as a standalone React/Next.js component, styled with Tailwind.
>
> - Use Lucide icons.
> - Keep file structure clean (`components/`, `pages/`).
> - Ensure `.edu` email validation is functional.
> - Include form state + inline error handling.
> - Include onboarding slides as a reusable Carousel component.
> - Provide notes for backend integration hooks.
> - Style should reflect **college campus vibe**, **no gradients**, minimal neon, warm & authentic.
> - Each form step can be its own sub-component, all integrated into the onboarding flow.
