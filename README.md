# TravelHub - Modern Travel Booking Platform

<div align="center">

![TravelHub](https://img.shields.io/badge/TravelHub-1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, professional, and fully responsive travel booking platform built with React, TypeScript, and Tailwind CSS. This project replicates the Expedia.fr frontend experience with a focus on clean architecture, best practices, and user experience.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Project Structure](#-project-structure) • [Scripts](#-scripts)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Configuration](#-configuration)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

TravelHub is a comprehensive travel booking platform that provides users with an intuitive interface to search and book flights, hotels, car rentals, and travel packages. Built as a Final Year Project (FYP), this application demonstrates modern web development practices with a focus on:

- **Clean Architecture**: Well-organized codebase following industry best practices
- **Type Safety**: Full TypeScript implementation with strict mode enabled
- **Modern UI/UX**: Responsive design with smooth animations and transitions
- **Performance**: Optimized build process with Vite
- **Scalability**: Modular component structure for easy maintenance and extension

---

## ✨ Features

### Core Functionality
- 🏨 **Hotel Booking**: Search, filter, and book hotels with detailed information
- ✈️ **Flight Search**: Comprehensive flight search with multiple filters
- 🚗 **Car Rentals**: Browse and compare car rental options
- 📦 **Travel Packages**: All-in-one travel packages combining flights and hotels
- 💬 **AI Chat Assistant**: Interactive chatbot for travel planning assistance
- 📅 **Itinerary Builder**: Create personalized travel itineraries
- 🎫 **Booking Management**: View and manage bookings with confirmation details

### User Experience
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🎨 **Modern Animations**: Smooth page transitions using Framer Motion
- 🌙 **Theme Support**: Dark mode capability (via ThemeContext)
- 🔐 **Authentication**: User authentication with persistent sessions
- 🔍 **Advanced Search**: Multi-criteria filtering and sorting
- 📊 **Real-time Updates**: Dynamic content updates and state management

### Pages & Sections
- **Home Page**: Hero section with search functionality, popular destinations, featured hotels
- **Search Results**: Advanced filtering, sorting, and pagination
- **Detail Pages**: Comprehensive information for hotels, flights, and cars
- **Booking Flow**: Complete booking process with confirmation
- **Admin Dashboard**: Analytics, trends, and performance metrics
- **Support & Resources**: FAQs, travel guides, and customer support

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.2.0** - UI library with hooks and modern patterns
- **TypeScript 5.3.3** - Type-safe JavaScript with strict mode
- **Vite 5.0.8** - Next-generation build tool and dev server
- **React Router v6** - Client-side routing and navigation

### Styling & UI
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Framer Motion 10.16.16** - Animation library for React
- **PostCSS** - CSS processing with Autoprefixer

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript Compiler** - Type checking and compilation
- **Vite HMR** - Hot Module Replacement for fast development

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- **Git** (for version control)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd FYP
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite's default port).

---

## 💻 Usage

### Development Mode

```bash
npm run dev
```

Starts the Vite development server with:
- Hot Module Replacement (HMR)
- Fast refresh
- Source maps for debugging
- Automatic browser opening

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory:
- TypeScript compilation
- Code minification
- Asset optimization
- Tree shaking

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Type Checking

```bash
npm run lint
```

Runs ESLint to check for code quality issues.

---

## 📁 Project Structure

```
FYP/
├── public/                 # Static public assets
├── src/                    # Source code
│   ├── assets/            # Images, icons, fonts
│   ├── components/         # Reusable UI components
│   │   ├── ui/           # Base UI components
│   │   ├── layout/       # Layout components (Header, Footer, LayoutWrapper)
│   │   ├── common/       # Shared/common components
│   │   └── [feature]/    # Feature-specific components
│   ├── pages/            # Page components (73 pages)
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React contexts (Auth, Theme)
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # Application constants
│   ├── utils/            # Utility functions
│   ├── data/             # Static/mock data
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx           # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # Project documentation
```

### Key Directories

- **`src/components/`**: 89 reusable components organized by feature
- **`src/pages/`**: 73 page components for different routes
- **`src/types/`**: Centralized TypeScript type definitions
- **`src/hooks/`**: Custom React hooks (useAuth, useLocalStorage, useDebounce, useMediaQuery)
- **`src/constants/`**: App-wide constants (routes, config, navigation)
- **`src/contexts/`**: Global state management (AuthContext, ThemeContext)

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
VITE_API_URL=http://localhost:8000
```

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of: import Header from '../../components/layout/Header'
import Header from '@/components/layout/Header';
import { TravelPackage } from '@/types';
import { ROUTES } from '@/constants';
```

Configured in:
- `vite.config.ts` - Vite alias resolution
- `tsconfig.json` - TypeScript path mapping

### TypeScript Configuration

- **Strict Mode**: Enabled for maximum type safety
- **Target**: ES2020
- **Module**: ESNext
- **JSX**: React-jsx

### Tailwind CSS

- **Content Paths**: Configured to scan all `src/**/*.{js,ts,jsx,tsx}` files
- **Dark Mode**: Class-based (configured but not fully implemented)
- **Custom Colors**: Extended with app-specific color palette

---

## 🎨 Best Practices

This project follows industry best practices:

### Code Organization
- ✅ Feature-based component structure
- ✅ Centralized type definitions
- ✅ Reusable custom hooks
- ✅ Constants separated from logic
- ✅ Single responsibility principle

### TypeScript
- ✅ Strict mode enabled
- ✅ Interfaces for all props
- ✅ Type-safe contexts
- ✅ No `any` types

### React Patterns
- ✅ Functional components with hooks
- ✅ Context API for global state
- ✅ Custom hooks for reusable logic
- ✅ Proper component composition

### Performance
- ✅ Code splitting ready (React.lazy compatible)
- ✅ Optimized build process
- ✅ Efficient re-renders
- ✅ Lazy loading compatible structure

---

## 🗺️ Routes

### Main Pages
- `/` - Home page
- `/flights` - Flight search
- `/hotels` - Hotel search
- `/cars` - Car rental
- `/packages` - Travel packages
- `/deals` - Special deals

### Search & Results
- `/search/hotels` - Hotel search results
- `/search/flights` - Flight search results
- `/search/cars` - Car search results

### Detail Pages
- `/hotel/:id` - Hotel details
- `/flight/:id` - Flight details

### Booking
- `/booking/confirmation` - Booking confirmation
- `/booking/demo` - Booking demo page

### Chat & Itinerary
- `/chat` - AI travel assistant
- `/chat/history` - Chat history
- `/itinerary/builder` - Itinerary builder
- `/itinerary/:id` - Itinerary details

### Company Pages
- `/about` - About us
- `/jobs` - Careers
- `/support` - Customer support
- `/partnerships` - Partnership opportunities

See `src/constants/routes.ts` for complete route definitions.

---

## 🔧 Development Guidelines

### Adding New Components

1. Create component in appropriate directory:
   - `src/components/ui/` - Base UI components
   - `src/components/[feature]/` - Feature-specific components
   - `src/components/common/` - Shared components

2. Export with TypeScript interfaces:
```typescript
interface ComponentProps {
  // Define props
}

export const Component: React.FC<ComponentProps> = ({ ... }) => {
  // Component implementation
};
```

### Adding New Pages

1. Create page in `src/pages/`
2. Add route in `src/App.tsx`
3. Use `LayoutWrapper` for consistent layout
4. Add navigation links if needed

### Using Types

Import from centralized types:
```typescript
import { TravelPackage, BookingDetails } from '@/types';
```

### Using Constants

Import from constants:
```typescript
import { ROUTES, APP_CONFIG } from '@/constants';
```

---

## 🧪 Testing

Currently, the project does not include a testing framework. To add testing:

1. Install Vitest (recommended for Vite):
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

2. Create test files: `*.test.tsx` or `*.spec.tsx`

3. Add test script to `package.json`:
```json
"test": "vitest"
```

---

## 📝 Code Style

- **ESLint**: Configured with React and TypeScript rules
- **Formatting**: Follows standard React/TypeScript conventions
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Comments**: JSDoc-style comments for components

---

## 🤝 Contributing

This is a Final Year Project (FYP). For contributions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is created for educational purposes as part of a Final Year Project (FYP).

---

## 👨‍💻 Author

**Nouman**

- Developed as part of Final Year Project (FYP)
- Modern web development practices
- Clean architecture and best practices

---

## 🙏 Acknowledgments

- **Expedia.fr** - Design inspiration
- **React Team** - Excellent framework
- **Vite Team** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

---

## 🚀 Deployment

### Deploy to Vercel

The project is configured for easy deployment on Vercel:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Automatic Configuration**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite
   - Install Command: `npm install`

The `vercel.json` file is already configured with:
- ✅ SPA routing (all routes redirect to index.html)
- ✅ Build optimization
- ✅ Framework detection

### Build Output

The production build creates optimized chunks:
- `react-vendor.js` - React, React DOM, React Router
- `animation-vendor.js` - Framer Motion
- `index.js` - Application code
- `index.css` - All styles

### Environment Variables

If needed, add environment variables in Vercel dashboard:
- `VITE_API_URL` - API base URL (if using backend)

---

## 📞 Support

For support, email support@travelhub.com or visit our [Support Page](/support).

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Vite**

⭐ Star this repo if you find it helpful!

</div>
