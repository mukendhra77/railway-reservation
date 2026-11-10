# YĀTRĀ RAIL (యాత్రా రైల్ / यात्रा रेल)
### The Overland Rail Journal • Modern Railway Reservation Platform
**An Academic Evaluation Project engineered with Angular Standalone Components, Reactive Forms, and Multilingual Accessibility.**

---

## 🌟 1. Project Overview & Unique Visual Identity

Unlike standard, generic IRCTC-inspired railway portals with congested tables and large central booking boxes, **Yātrā Rail** introduces a **modern travel-journal and editorial platform with high-speed dispatch capabilities and fluid slide animations**:

- **Color Palette & Brand Identity:**
  - **Electric Indigo & Royal Violet (`#6366f1`, `#7c3aed`):** Core tech accents, glowing badges, and interactive highlights.
  - **Obsidian Dark Slate (`#1e242b`, `#0f172a`):** Sleek, high-contrast action buttons and structural containers.
  - **Soft Lavender & Frost Background (`#f8f9fd`, `#f1f4fa`):** Clean, spacious journal canvas.
  - **Emerald Green (`#10b981`):** Live telemetry indicators, confirmed booking stamps, and seat availability badges.
- **Brand Logo:**
  - Futuristic high-speed rail locomotive glyph with an emerald headlights accent and glowing **SMART** badge.
- **Typography:**
  - **Playfair Display** (High-end editorial headings, journey titles, and stamps).
  - **Plus Jakarta Sans** (Ultra-crisp, readable modern body fonts).
  - **JetBrains Mono** (10-digit cryptographic PNR codes, coach and berth labels).
- **Slide Animations System:**
  - **Hero Slide-In:** Text column slides in from the left (`slideInLeft`), visual photograph slides in from the right (`slideInRight`), and floating route badges glide with vertical floating animation (`slideFloat`).
  - **Booking Card Slide-Up:** Elevation slide-up entry (`slideInUp`) with 32px rounded corners and smooth spring-flip rotation on the origin/destination swap button.
  - **Interactive Sliding Track & Carousel Controls:** Horizontal sliding rail with custom `‹` and `›` slide navigation buttons for both **Popular Yātrā Corridors** and **Curated Overland Expeditions**, featuring smooth scroll snapping.
  - **Train Track Glider Animation:** Live train icon (`🚆` / `⚡`) dynamically glides along the journey duration track in search availability cards.
  - **Route Page Transition:** Smooth entrance slide animation (`pageSlideIn`) across all page navigation transitions.
- **Design Structure:**
  - **Slim Navigation:** Creative text-based logo, navigation links, instant language switcher, and authentication state.
  - **Split-Screen Hero:** Editorial storytelling on the left; panoramic scenic railway photography with overlapping destination badges on the right.
  - **Smart Dispatch Booking Panel (Matching Photo 1):** Rounded 32px floating card with icon, "LIVE" indicator, origin (📍) and destination (🏁) fields, centered circular swap button (`⇅`), travel date with calendar picker, travel class selector, High-Speed toggle, and large dark rounded search action button (`Search Available Trains →`).
  - **Popular Corridors & Vande Bharat Fast Trains (Matching Photo 2):** Dedicated showcase featuring real-life Indian Railway fast trains with speed comparisons:
    - **#22436 Vande Bharat Express** (New Delhi ⟷ Varanasi: **8h 00m** vs regular 13h 50m)
    - **#12560 Shiv Ganga Superfast Express** (New Delhi ⟷ Varanasi: **11h 05m**)
    - **#22418 Mahamana Superfast Express** (New Delhi ⟷ Varanasi: **13h 50m**)
    - **#22435 Vande Bharat Express** (Varanasi ⟷ New Delhi Return)
    - **#20608 Bengaluru-Chennai Vande Bharat Express** (**4h 25m**)
    - **#20834 Secunderabad-Visakhapatnam Vande Bharat Express** (**8h 30m**)
    - **#20901 Mumbai-Ahmedabad Vande Bharat Express** (**5h 25m**)
    - **#22229 Mumbai-Goa Vande Bharat Express** (**7h 45m**)
  - **Horizontal Train Information Cards:** Modern cards displaying live availability with Vande Bharat speed badges, duration tracks, and class chips.
  - **Authentic Digital Boarding Pass:** Perforated borders, QR/barcode simulations, official stamps, coach & berth allocations, and printable vouchers (`window.print()`).

---

## 🚀 2. Technologies & Architecture

- **Angular (Standalone Architecture):** Built with Angular 22 without legacy `NgModules`.
- **TypeScript:** Strict type-safety with clean interfaces (`User`, `Train`, `Booking`, `Passenger`, `Station`).
- **Angular Router:** Seamless client-side routing with functional Route Guards (`authGuard`).
- **Reactive Forms:** FormArrays, custom validators (password mismatch, phone pattern, same source/destination prevention).
- **LocalStorage Persistence:** Complete local database simulation for users (`railway_users`) and bookings (`railway_bookings`).
- **Internationalization (i18n & l10n):**
  - **3 Languages Supported:** **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.
  - Instant live language dropdown in Navbar.
  - Full XLIFF translation files (`src/locale/messages.xlf`, `messages.te.xlf`, `messages.hi.xlf`).
  - Regional Date (`Intl.DateTimeFormat`), Currency (`₹` INR), and Time localization.

---

## 📂 3. Final Project Structure

```
e:/PROJECTS/Railway reservation/
├── angular.json                     # Angular build and budget configuration
├── package.json                     # Dependencies and npm scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── README.md                        # Documentation and evaluation guide
├── src/
│   ├── index.html                   # HTML entry point with Google Fonts
│   ├── styles.css                   # Global CSS theme variables, buttons & cards
│   ├── main.ts                      # Angular application bootstrap
│   ├── locale/                      # Official Angular XLIFF Translation Files
│   │   ├── messages.xlf             # English source
│   │   ├── messages.te.xlf          # Telugu translations
│   │   └── messages.hi.xlf          # Hindi translations
│   └── app/
│       ├── app.ts                   # Root Standalone Component
│       ├── app.html                 # Root template with Navbar & RouterOutlet
│       ├── app.css                  # Root layout styling
│       ├── app.routes.ts            # Route configuration with authGuard
│       ├── app.config.ts            # Application providers & locale registration
│       ├── guards/
│       │   └── auth.guard.ts        # Route guard protecting booking & history
│       ├── models/
│       │   ├── user.model.ts        # User data model
│       │   ├── train.model.ts       # Train, Station, and Class models
│       │   └── booking.model.ts     # Booking and Passenger models
│       ├── services/
│       │   ├── auth.service.ts      # Authentication & LocalStorage user manager
│       │   ├── train.service.ts     # Station & Train schedules repository
│       │   ├── booking.service.ts   # PNR generator & booking lifecycle manager
│       │   └── translation.service.ts# Multilingual dictionary & date/currency formatter
│       ├── pipes/
│       │   └── translate.pipe.ts    # Reactive template translation pipe
│       └── components/
│           ├── navbar/              # Slim navigation bar with logo & lang switcher
│           ├── home/                # Split-screen hero, floating search & destinations
│           ├── login/               # Minimalist login with password toggle & demo autofill
│           ├── register/            # Two-column registration with validation
│           ├── train-search/        # Dedicated search page with station validation
│           ├── train-list/          # Horizontal train availability cards & class selector
│           ├── booking/             # Passenger FormArray & itemized fare breakdown
│           ├── booking-confirmation/# Digital boarding pass with QR & print function
│           ├── my-bookings/         # Ticket card stream & cancellation modal (80% refund)
│           └── pnr-status/          # 10-digit PNR tracker with coach & berth allocation
```

---

## 🔑 4. Demo Credentials & Sample PNRs for Evaluation

To make college evaluation instantaneous, the application comes **pre-seeded with demo data in LocalStorage**:

### Demo Traveler Account:
- **Email:** `student@university.edu`
- **Password:** `Password@123`
*(A 1-click **"Autofill Demo Credentials"** button is also provided on the Login page).*

### Pre-Seeded 10-Digit PNR Numbers:
- `4829104821` — *Rajdhani Overland Express (New Delhi → Mumbai CSMT, Class 2A)*
- `8392104712` — *Konkan Sea Breeze VistaDome (Mumbai CSMT → Madgaon Goa, Vista Lounge)*

---

## 💻 5. Running the Application Using Angular CLI

### Prerequisites:
- **Node.js** (v20+ or v26 LTS recommended)
- **npm** (v10+)
- **Angular CLI** (`@angular/cli`)

### Step 1: Install Dependencies (if not already installed)
```bash
npm install
```

### Step 2: Start Development Server
```bash
ng serve
```
or:
```bash
npm start
```

### Step 3: Open in Browser
Open your browser and navigate to:
```
http://localhost:4200/
```

### Step 4: Build for Production
To generate the optimized production bundle:
```bash
ng build
```
*(Compiled output will be placed in `dist/railway-reservation/browser`)*.

---

## 🧪 6. Testing Checklist

1. **Authentication:**
   - Click **Register** → create account with name, email, 10-digit phone, and matching password.
   - Click **Sign In** → test login with demo credentials or newly created account.
   - Click **Logout** → sessions properly terminate in LocalStorage.
2. **Train Search & Validation:**
   - Select origin and destination.
   - If origin == destination, a validation alert immediately appears preventing invalid searches.
   - Click the swap button (`⟷`) to invert origin and destination.
3. **Train Availability:**
   - Multiple trains render in clean horizontal cards with timetable, duration, and class chips.
   - Click any class chip (e.g. `3A` or `2A`) to preview fares and seat counts.
4. **Ticket Booking:**
   - Add/remove passengers dynamically (up to 4 passengers).
   - Observe live itemized fare breakdown (base fare + catering + taxes).
   - Click **Confirm Reservation** → generates a unique 10-digit PNR and auto-allocates realistic coaches (`B3`, `A1`, `H1`) and berths (`Lower`, `Upper`, `Window`).
5. **Digital Pass & Printing:**
   - The confirmation screen displays an official digital boarding pass with PNR, watermark stamp, and barcode.
   - Click **Print / Download Ticket** to trigger the browser's print dialog.
6. **My Bookings & Cancellation:**
   - Open **My Bookings** to view all tickets for the user.
   - Click **Cancel Ticket** → preview cancellation modal with calculated 80% refund.
   - Confirming cancellation immediately updates LocalStorage and marks ticket as `CANCELLED`.
7. **PNR Status Tracking:**
   - Navigate to **PNR Status** → input any 10-digit PNR (or click a sample chip).
   - Shows chart preparation status, train timing, and passenger coach/berth allocations.
8. **Language Switching (i18n):**
   - Click the language selector (`🌐 EN`) in the top navigation.
   - Switch between **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)** to see instant dynamic translation across the UI.

---

## 🌐 7. Deploying to GitHub & GitHub Pages

This repository is equipped with an automated GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and publishes your Angular app to GitHub Pages on every `git push`.

### Step 1: Create a GitHub Repository
1. Log into your GitHub account: **[github.com](https://github.com)**
2. Click **New** repository.
3. Name it (e.g. `railway-reservation`), keep it **Public**, and do NOT check "Add a README" (we already have one).
4. Click **Create repository**.

### Step 2: Initialize Git and Push Your Project
In your PowerShell terminal in this project folder:
```bash
git init
git add .
git commit -m "feat: complete Yātrā Rail reservation platform"
git branch -M main
git remote add origin https://github.com/<your-username>/railway-reservation.git
git push -u origin main
```

### Step 3: Enable GitHub Pages in Repository Settings
1. Open your repository on GitHub.
2. Click **Settings** (tab at the top) → select **Pages** from the left sidebar.
3. Under **Build and deployment** → **Source**, change from *Deploy from a branch* to **GitHub Actions**.
4. That's it! GitHub will automatically trigger the workflow, build the Angular project with the proper base URL, and publish your website to:
   ```
   https://<your-username>.github.io/railway-reservation/
   ```

