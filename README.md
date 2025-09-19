# Ashley Direct - B2B Portal

A modern, responsive B2B dashboard application built with React and Tailwind CSS.

## Features

- **Modern Dashboard Interface**: Clean, professional design optimized for B2B operations
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Interactive Navigation**: Sidebar navigation with multiple sections
- **Real-time Statistics**: Order tracking, revenue monitoring, and client management
- **Order Management**: View recent orders with status tracking
- **Product Analytics**: Top-selling products with performance metrics
- **Search Functionality**: Quick search across the platform
- **Notification System**: Alert system for important updates

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy

## Project Structure

```
ashley-direct/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vercel.json          # Vercel deployment configuration
└── README.md
```

## Features Overview

### Dashboard
- Key performance indicators (KPIs)
- Recent order tracking
- Top product performance
- Revenue and client statistics

### Navigation Sections
- **Dashboard**: Main overview with statistics and recent activity
- **Orders**: Order management and tracking
- **Products**: Product catalog and performance metrics
- **Clients**: Customer relationship management
- **Settings**: Application configuration

### Responsive Design
- Mobile-first approach
- Collapsible sidebar for mobile devices
- Touch-friendly interface elements
- Optimized for various screen sizes

## Customization

The application is built with modularity in mind. Key customization points:

- **Colors**: Modify Tailwind CSS classes in components
- **Layout**: Adjust grid systems and component structures
- **Data**: Replace mock data with real API endpoints
- **Navigation**: Add or modify navigation items in the App component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is a prototype application for demonstration purposes.

---

**Powered by rodrigo**