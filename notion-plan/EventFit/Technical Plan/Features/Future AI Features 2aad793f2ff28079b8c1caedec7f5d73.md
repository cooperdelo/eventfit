# Future AI Features

**Strategy:** Use Maps for location data (cheap), generative images for content (one-time cost), and image editing as a premium (paid) feature.

---

### 50-Mile Event Radius (Maps)

- **Google Model / API:** Google Maps Platform (Geocoding)
- **Cost (Per Usage):** $5.00 / 1,000 requests
- **Strategy & Notes:** **Extremely Low Cost.** When an event is created, you call the API _once_ to get coordinates. **Cost: $0.005 (half a cent).** Store this in Supabase. The user's phone queries _your_ database for free. The $200/mo free credit covers **40,000** event creations.

### "Get Inspired" AI Outfit Board

- **Google Model / API:** Imagen 3 (Fast Mode)
- **Cost (Per Usage):** ~$0.02 / image generated
- **Strategy & Notes:** **Content Cost, Not User Cost.** You (as admin) generate 100 "UNC Gameday" looks. **Total cost: $2.00.** You store these images, and all users see them for free.

### Remove Background (Premium Feature)

- **Google Model /API:** Imagen 3 (Image Editing)
- **Cost (Per Usage):** ~$0.02 / image edited
- **Strategy & Notes:** **Monetization Opportunity.** This is a perfect feature for your "Premium" users. It costs you 2 cents, but you can include it in a paid subscription. It pays for itself.

### Visual Style Search (New Idea)

- **Google Model / API:** Vertex AI Vision (Embeddings)
- **Cost (Per Usage):** ~$0.0001 / image (to embed)
- **Strategy & Notes:** **The "Wow" Feature.** Replaces text tags. When a user taps "Find Similar" on a dress, your app finds _visually similar_ items from all user closets. The cost is negligible (one-hundredth of a cent) to "fingerprint" each item on upload.

## **EventFit – Future AI Features Module**

### **1. Core AI Features (Future / Long-Term)**

1. **AI Style Assistant**
   - Suggests outfits for events based on:
     - Event type and theme
     - Weather
     - User’s closet / rented items
     - Peer trends on campus
   - Provides visual style boards (collages or mood boards)
   - Personalized suggestions (“Top 3 outfits you might like for this event”)
2. **Automated Outfit Recommendations**
   - AI-powered “what to wear” feed:
     - Suggests outfits users can rent from peers
     - Uses trending outfits and campus popularity metrics
     - Links to outfit listings in the app
   - Could optionally integrate affiliate links to local or online stores (for inspiration + buyable items)
3. **Friend / Closet Matching AI**
   - Matches users with peers of similar size, style, or org affiliation
   - Suggests potential outfit swaps / rentals
   - Provides notifications for “Closet Match Alerts” when friends post new rentable items
4. **Event Trend Analytics**
   - AI predicts what will be trending for upcoming events
   - Displays a “Campus Trend Board” (event + outfit insights)
   - Could drive gamification and outfit of the week selections
5. **Smart Notifications / Outfit Reminders**
   - Push notifications based on AI predictions:
     - “You might want to borrow this outfit for Friday’s concert”
     - “Trend alert: most rented outfits for formal this weekend”
   - Helps reduce forgotten rentals and enhances engagement
6. **Trust Score / Reliability Insights**
   - AI calculates user reliability:
     - Rental history
     - On-time returns
     - Peer ratings
   - Provides risk scoring for rental approval or highlights top “trusted lenders”

---

### **2. Integration Points**

- **Outfit Module**: AI reads user closet & outfit posts → recommends items
- **Event Module**: AI reads event type, attendees, weather → recommends outfits
- **Notifications Module**: AI triggers personalized push / in-app alerts
- **Gamification Module**: AI helps surface Outfit of the Week candidates and trend stats
- **Renting & Payment Module**: AI flags high-risk rentals based on trust scores (optional future feature)

---

### **3. Technical Notes for Cursor / Developers**

- Mark as **future / optional layer** — don’t block MVP features.
- Should be modular:
  - AI modules can be swapped or upgraded independently.
  - Should consume existing user, outfit, and event data.
- Visual representation in architecture diagram:
  - Draw as “Future AI Layer” on top of existing modules.
  - Connect to **Outfit Module**, **Event Module**, **Notifications**, and **Gamification Module**.
- Avoid MVP dependency — core renting, events, and chat must function without AI.
