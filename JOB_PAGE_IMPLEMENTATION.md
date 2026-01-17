# Job/Careers Page Implementation

## Overview
A new Careers page has been created at `/job` route, matching Expedia Group Careers page structure while maintaining the project's color scheme, fonts, and styling.

## Components Created

### 1. JobHero (`components/job/JobHero.tsx`)
- **Structure:** Hero section with background image
- **Features:**
  - Full-width background image with gradient overlay
  - Large centered title: "Build your future with us"
  - Supporting subtitle text
  - Smooth fade-in animation
  - Responsive min-height (500px mobile, 600px desktop)

### 2. JobSearch (`components/job/JobSearch.tsx`)
- **Structure:** Job search bar (floating above hero)
- **Features:**
  - Search input with icon
  - Location dropdown (8 locations including Remote)
  - Search button with gradient styling
  - White card with shadow, positioned above hero
  - Responsive layout (stacked on mobile, row on desktop)

### 3. JobCategories (`components/job/JobCategories.tsx`)
- **Structure:** 6-category grid
- **Categories:**
  - Engineering (25 positions)
  - Product & Design (18 positions)
  - Marketing (22 positions)
  - Data & Analytics (15 positions)
  - Sales & Partnerships (20 positions)
  - Customer Support (30 positions)
- **Features:**
  - Color-coded gradient icons
  - Job count display
  - Hover lift effect
  - Responsive: 1 col mobile, 2 col tablet, 3 col desktop

### 4. LifeAt (`components/job/LifeAt.tsx`)
- **Structure:** "Life at TravelHub" section with 4 image cards
- **Content:**
  - Collaborative Culture
  - Modern Workspaces
  - Team Events
  - Work-Life Balance
- **Features:**
  - Image cards with hover zoom effect
  - Gradient overlay on images
  - Responsive grid (1 col mobile, 2 col tablet, 4 col desktop)

### 5. Values (`components/job/Values.tsx`)
- **Structure:** "Our Culture & Values" section
- **Values:**
  - Inclusive
  - Innovative
  - Trustworthy
  - Collaborative
- **Features:**
  - Icon badges with gradient
  - 4-card grid layout
  - Centered text alignment

### 6. Locations (`components/job/Locations.tsx`)
- **Structure:** Global offices grid
- **Locations:**
  - Paris, France (45 jobs)
  - London, UK (38 jobs)
  - New York, USA (52 jobs)
  - Singapore (28 jobs)
  - Tokyo, Japan (32 jobs)
  - Berlin, Germany (25 jobs)
- **Features:**
  - Image cards with city names
  - Job count per location
  - Hover effects
  - Responsive: 1 col mobile, 2 col tablet, 3 col desktop

### 7. Diversity (`components/job/Diversity.tsx`)
- **Structure:** Diversity & Inclusion section
- **Features:**
  - Gradient background matching hero
  - Icon badge
  - Large heading and descriptive text
  - Equal opportunity statement
  - Glass-morphism card effect

### 8. JobPage (`pages/JobPage.tsx`)
- **Structure:** Main page component
- **Sections (in order):**
  1. Hero Section
  2. Job Search Bar
  3. Job Categories
  4. Life at TravelHub
  5. Culture & Values
  6. Global Offices
  7. Diversity & Inclusion

## Styling Details

### Colors
- **Hero Gradient:** `from-blue-600/90 via-purple-600/85 to-indigo-800/90` (overlay on image)
- **Button Gradient:** `from-blue-500 to-purple-600`
- **Category Icons:** Various gradients (blue, purple, pink, indigo, green, teal)
- **Text:** Gray-900 (headings), Gray-700 (body), Gray-600 (secondary)
- **Backgrounds:** White, Gray-50

### Typography
- **H1:** text-4xl md:text-5xl lg:text-6xl (hero)
- **H2:** text-3xl md:text-4xl (section titles)
- **H3:** text-xl md:text-2xl (card titles)
- **Body:** text-lg (paragraphs)

### Spacing
- **Section Padding:** py-16 md:py-20
- **Container:** max-w-4xl, max-w-5xl, max-w-7xl (depending on section)
- **Gaps:** gap-6 md:gap-8 (grids)

### Components
- **Border Radius:** rounded-2xl (cards, buttons, search bar)
- **Shadows:** shadow-md, shadow-lg, shadow-xl (hover states)
- **Transitions:** duration-300 (smooth transitions)

## Animations

All sections use Framer Motion with:
- **Initial:** opacity: 0, y: 30 (or scale: 0.9)
- **Animate:** opacity: 1, y: 0 (or scale: 1)
- **Viewport:** once: true (animate once when scrolled into view)
- **Hover:** Lift effects (y: -8), scale effects, image zoom

## Responsive Design

- **Mobile:** Single column, stacked layout
- **Tablet (md):** 2-column grids, adjusted spacing
- **Desktop (lg):** 3-4 column grids, full layout

## Routing

The page is accessible at `/job` and has been added to `App.tsx`:
```tsx
<Route 
  path="/job" 
  element={
    <Layout>
      <PageTransition>
        <JobPage />
      </PageTransition>
    </Layout>
  } 
/>
```

## Assets

### Image Placements
Currently using Unsplash placeholder images. You can replace them with local images in:
```
assets/job/
  - hero-background.jpg (for hero section)
  - life-at/
    - collaborative.jpg
    - workspace.jpg
    - team-events.jpg
    - work-life.jpg
  - locations/
    - paris.jpg
    - london.jpg
    - new-york.jpg
    - singapore.jpg
    - tokyo.jpg
    - berlin.jpg
```

### Icon Usage
- SVG icons are inline (no external dependencies)
- Gradient backgrounds for icon containers
- Consistent sizing (w-8 h-8 for icons, w-16 h-16 for containers)

## Features

✅ Expedia Careers-style structure and layout
✅ Project's color scheme maintained
✅ Project's fonts and typography
✅ Project's button styles
✅ Project's border radius and shadows
✅ Project's spacing system
✅ Fully responsive design
✅ Smooth Framer Motion animations
✅ Clean, modular component structure
✅ TypeScript typed
✅ No linting errors

## Usage

Navigate to `/job` to view the complete Careers page. All sections are properly sequenced and styled to match Expedia Careers page structure while maintaining your brand identity.

## Page Sections (In Order)

1. ✅ Hero Section - Background image with title and subtitle
2. ✅ Job Search Bar - Floating search form
3. ✅ Job Categories - 6-category grid
4. ✅ Life at TravelHub - 4 image cards
5. ✅ Culture & Values - 4-value grid
6. ✅ Global Offices - 6-location grid
7. ✅ Diversity & Inclusion - Bottom section with gradient

