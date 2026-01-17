# TravelHub - Expedia.fr Frontend Clone

A modern, professional, and fully modular frontend clone of Expedia.fr built with React + Tailwind CSS + TypeScript. This project is developed for Final Year Project (FYP) and features a visually impressive, highly responsive, and user-friendly interface.

## 🚀 Features

- **8 Complete Pages**: Home, Search Results, Hotel Detail, Flight Detail, Car Rental, Packages, Login/Sign-Up, and Booking Confirmation
- **Fully Responsive**: Mobile-first design that works seamlessly on desktop, tablet, and mobile devices
- **Modern Animations**: Framer Motion animations for smooth page transitions and 3D card effects
- **React Router v6**: Complete navigation system linking all pages
- **Modular Components**: Reusable, well-structured components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern utility-first CSS framework

## 📦 Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 🗂️ Project Structure

```
FYP/
├── components/          # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── AnimatedPage.tsx
│   ├── AnimatedCard.tsx
│   └── ... (other components)
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── SearchResultsPage.tsx
│   ├── HotelDetailPage.tsx
│   ├── FlightDetailPage.tsx
│   ├── CarRentalPage.tsx
│   ├── PackagesPage.tsx
│   ├── AuthPage.tsx
│   └── BookingConfirmationPage.tsx
├── App.tsx             # Main app with routing
├── index.tsx           # Entry point
├── index.css           # Global styles
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🎨 Pages Overview

### 1. Home Page (`/`)
- Hero section with search functionality
- Popular destinations
- Travel categories
- Featured hotels
- Newsletter signup

### 2. Search Results (`/search/hotels`, `/search/flights`, `/search/cars`)
- Advanced filtering system
- Sortable results
- Pagination
- Responsive grid layout

### 3. Hotel Detail Page (`/hotel/:id`)
- Image gallery with carousel
- Hotel information and amenities
- Booking panel
- Reviews section
- Nearby hotels

### 4. Flight Detail Page (`/flight/:id`)
- Flight information panel
- Price and booking options
- Itinerary details
- Similar flights

### 5. Car Rental Page (`/cars`)
- Search and filters
- Car listings with details
- Sort and pagination

### 6. Packages Page (`/packages`)
- Flight + Hotel packages
- Package cards with highlights
- Filtering and sorting

### 7. Login/Sign-Up Page (`/login`, `/signup`)
- Authentication forms
- Social login options
- Form validation

### 8. Booking Confirmation Page (`/booking/confirmation`)
- Booking summary
- Itinerary details
- Payment information
- Action buttons (Print, Email, Modify)

## 🎯 Key Technologies

- **React 18**: UI library
- **TypeScript**: Type safety
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animation library
- **Vite**: Build tool and dev server

## 🎨 Animation Features

- **Page Transitions**: Smooth fade and slide animations between pages
- **Card Hover Effects**: 3D-like scaling, rotation, and elevation
- **Stagger Animations**: Sequential animations for lists and grids
- **Interactive Elements**: Button and form interactions

## 🔗 Navigation

All pages are fully linked:
- Header navigation links to all main sections
- Cards link to their respective detail pages
- Booking actions navigate to confirmation page
- Footer links to various sections

## 📱 Responsive Design

- **Mobile**: Single column layouts, collapsible menus
- **Tablet**: 2-column grids, optimized spacing
- **Desktop**: 3-column grids, full navigation

## 🛠️ Development

### Adding New Components

1. Create component in `components/` directory
2. Export with TypeScript interfaces
3. Import and use in pages

### Adding New Pages

1. Create page in `pages/` directory
2. Add route in `App.tsx`
3. Wrap with `AnimatedPage` component
4. Add navigation links in Header

## 📝 Code Style

- TypeScript interfaces for all props
- Modular, reusable components
- Consistent naming conventions
- Code comments for clarity
- FYP project comments in each component

## 🎓 FYP Project Notes

This project is a replication of Expedia.fr's frontend for educational purposes as part of a Final Year Project. All components include comments indicating they are part of the Expedia.fr replication.

## 📄 License

This project is created for educational purposes as part of a Final Year Project.

## 👨‍💻 Author

Developed as part of FYP (Final Year Project)

---

**Note**: This is a frontend-only implementation. Backend integration would be required for full functionality.
