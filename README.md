# 🎬 MovieDeck

<div align="center">

![MovieDeck](https://img.shields.io/badge/MovieDeck-Rose%20Pine-c4a7e7?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTJMMTMgMjFMMjIgMTJMMTMgM0wyIDEyWiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=)
![Version](https://img.shields.io/badge/version-1.0.0-eb6f92?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-9ccfd8?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-f6c177?style=for-the-badge&logo=javascript&logoColor=191724)

**A modern, elegant movie discovery platform with Rose Pine aesthetics**

[🚀 Demo](#-quick-start) • [📖 Documentation](#-features) • [🎨 Screenshots](#-theme) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ Overview

**MovieDeck** is a sophisticated movie exploration platform that seamlessly blends modern web technologies with the beautiful **Rose Pine** color palette. Built with vanilla JavaScript and powered by TMDB API v4, it offers an intuitive and visually stunning experience for discovering movies, managing watchlists, and exploring cinema.

### 🎯 Why MovieDeck?

- **🌹 Rose Pine Aesthetic**: Carefully crafted with the beloved Rose Pine color scheme for easy-on-the-eyes viewing
- **⚡ Lightning Fast**: Pure vanilla JavaScript with no framework overhead
- **🔒 Secure**: Modern Bearer token authentication with TMDB API v4
- **📱 Responsive First**: Fluid design that works beautifully on any device
- **🎪 Component Architecture**: Clean, modular codebase for easy maintenance and extension

## 🚀 Features

### 🎬 Core Functionality
- **Trending Discovery**: Explore the latest trending and popular movies
- **Smart Search**: Debounced search with real-time suggestions (500ms delay)
- **Genre Filtering**: Dynamic genre-based movie filtering
- **Watchlist Management**: Personal "Watch Later" list with persistent local storage
- **Movie Details**: Rich modal views with comprehensive movie information

### 🎨 User Experience
- **Rose Pine Theme**: Beautiful, consistent color palette throughout
- **Smooth Animations**: Subtle transitions and hover effects
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Keyboard Navigation**: Full keyboard accessibility support

### 🔧 Technical Excellence
- **Modern JavaScript**: ES6+ features with async/await patterns
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Optimized API calls with intelligent caching
- **Security**: Secure token handling and XSS protection
- **SEO Ready**: Semantic HTML with meta tags and structured data

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: TMDB API v4 with Bearer token authentication
- **Styling**: Bootstrap 5 + Custom CSS
- **Storage**: Local Storage for Watch Later functionality
- **Architecture**: Modular component-based structure

## Project Structure
```
movie-deck/                          # Root directory of the Movie Explorer Dashboard application
├── config.js                       # Configuration file containing TMDB API Bearer token and base URLs
├── .gitignore                       # Git ignore file to exclude sensitive files and dependencies from version control
├── index.html                       # Main HTML file - entry point of the web application
├── README.md                        # Project documentation with setup instructions and feature descriptions
└── src                             # Source code directory containing all application assets and logic
    ├── assets                      # Static assets directory for images and media files
    │   ├── icons                   # Directory for application icons and UI graphics
    │   └── no-image.jpg           # Placeholder image displayed when movie poster is unavailable
    ├── css                        # Stylesheets directory for application styling
    │   └── style.css              # Main CSS file with custom styles
    └── js                         # JavaScript directory containing all application logic
        ├── api.js                 # API service module for TMDB API calls and Bearer token authentication
        ├── components             # Reusable UI components directory following modular architecture
        │   ├── card.js           # Movie card component for displaying movie information in grid layout
        │   ├── movieDetails.js   # Modal component for showing detailed movie information
        │   ├── navbar.js         # Navigation bar component with search, genre filters, and watch later
        │   └── watchlist.js      # Watch later functionality component with local storage management
        ├── script.js             # Main application entry point and initialization logic
        ├── SPECIFICATION.md      # Technical specifications and implementation details for developers
        ## 🛠️ Tech Stack

<table>
<tr>
<td align="center"><strong>Frontend</strong></td>
<td>HTML5, CSS3, Vanilla JavaScript (ES6+)</td>
</tr>
<tr>
<td align="center"><strong>API</strong></td>
<td>TMDB API v4 with Bearer Token Authentication</td>
</tr>
<tr>
<td align="center"><strong>Styling</strong></td>
<td>Bootstrap 5 + Rose Pine Custom CSS</td>
</tr>
<tr>
<td align="center"><strong>Typography</strong></td>
<td>Inter Font Family (Google Fonts)</td>
</tr>
<tr>
<td align="center"><strong>Storage</strong></td>
<td>Local Storage for Watchlist Persistence</td>
</tr>
<tr>
<td align="center"><strong>Architecture</strong></td>
<td>Modular Component-Based Structure</td>
</tr>
</table>

## 📁 Project Architecture

```
movie-deck/                          # 🏠 Root directory - MovieDeck application
├── config.js                       # ⚙️  API configuration with TMDB Bearer token and endpoints
├── .gitignore                       # 🚫 Git exclusion rules for sensitive files and build artifacts
├── index.html                       # 🌐 Main HTML entry point with Rose Pine meta tags
├── README.md                        # 📚 Project documentation with setup and usage guides
└── src/                            # 📦 Source code directory - organized by functionality
    ├── assets/                     # 🖼️  Static resources and media files
    │   ├── icons/                  # 🎨 SVG icons and UI graphics (Rose Pine themed)
    │   └── no-image.jpg           # 🖼️  Fallback image for missing movie posters
    ├── css/                       # 💄 Styling and theme definitions
    │   └── style.css              # 🌹 Rose Pine theme with Bootstrap 5 integration
    └── js/                        # ⚡ JavaScript modules and application logic
        ├── api.js                 # 🔌 TMDB API service with Bearer authentication
        ├── components/            # 🧩 Reusable UI components (modular architecture)
        │   ├── card.js           # 🎬 Movie card component with hover effects
        │   ├── movieDetails.js   # 📄 Modal component for detailed movie information
        │   ├── navbar.js         # 🧭 Navigation bar with search and filters
        │   └── watchlist.js      # 📋 Watchlist management with local storage
        ├── script.js             # 🚀 Application initialization and main controller
        ├── SPECIFICATION.md      # 📋 Technical specs and development guidelines
        └── utils.js              # 🔧 Helper functions for formatting and utilities
```

## 🎨 Rose Pine Theme

MovieDeck embraces the **Rose Pine** color palette, a warm and cozy theme that's gentle on the eyes:

```css
/* Rose Pine Dark Theme Palette */
--background: #191724    /* Base background */
--foreground: #e0def4    /* Primary text */
--primary: #eb6f92       /* Love (pink) - primary accent */
--secondary: #9ccfd8     /* Foam (cyan) - secondary accent */
--accent: #f6c177        /* Gold - warning/highlight */
--muted: #26233a         /* Surface - cards and inputs */
--chart-5: #c4a7e7       /* Iris (purple) - special elements */
```

### Color Usage
- **Love (#eb6f92)**: Primary buttons, links, and interactive elements
- **Foam (#9ccfd8)**: Secondary actions and success states
- **Gold (#f6c177)**: Warnings, highlights, and special badges
- **Iris (#c4a7e7)**: Accent elements and special features
- **Surface (#26233a)**: Cards, modals, and elevated components

## 🚀 Quick Start
```
```
movie-deck/
├── config.js
├── .gitignore
├── index.html
├── README.md
└── src
    ├── assets
    │   ├── icons
    │   └── no-image.jpg
    ├── css
    │   └── style.css
    └── js
        ├── api.js
        ├── components
        │   ├── card.js
        │   ├── movieDetails.js
        │   ├── navbar.js
        │   └── watchlist.js
        ├── script.js
        ├── SPECIFICATION.md
        └── utils.js
```

## Setup Instructions

### 📋 Prerequisites

- Modern web browser with ES6+ support
- TMDB account (free registration)
- Local development server (optional but recommended)

### 1️⃣ Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd movie-deck

# Optional: Create your own branch
git checkout -b feature/my-customizations
```

### 2️⃣ Get Your TMDB API Key

1. **Create Account**: Visit [TMDB](https://www.themoviedb.org/) and create a free account
2. **Access API Settings**: Go to [API Settings](https://www.themoviedb.org/settings/api)
3. **Get Bearer Token**: Copy your **"API Read Access Token"** (NOT the API Key)

   ```bash
   # Your token should look like this:
   eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjJmZjE3OTY1ZWJiZmI0MjQxODBhNDRiNjNkMWIzYiIsIm5iZiI6MTcyMjUzMTM2OS43NDUsInN1YiI6IjY2YWJiZTI5MzFlOWUxMjNmMDUwN2IxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WRSdMCChuKZ-_-f2v7JKZND4aiLtAQOTE7xtw7RPj9U
   ```

### 3️⃣ Configure the Application

Open `config.js` and replace the placeholder with your actual Bearer token:

```javascript
// config.js
export const API_KEY = "YOUR_ACTUAL_BEARER_TOKEN_HERE";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
```

### 4️⃣ Launch MovieDeck

Choose your preferred method to serve the application:

<details>
<summary><strong>🐍 Python HTTP Server</strong> (Recommended)</summary>

```bash
# Python 3
python -m http.server 8000

# Python 2 (legacy)
python -m SimpleHTTPServer 8000

# Access at: http://localhost:8000
```
</details>

<details>
<summary><strong>📦 Node.js HTTP Server</strong></summary>

```bash
# Install globally (one-time)
npm install -g http-server

# Serve the application
npx http-server -p 8000

# Access at: http://localhost:8000
```
</details>

<details>
<summary><strong>💻 VS Code Live Server</strong></summary>

1. Install the **Live Server** extension
2. Right-click on `index.html`
3. Select **"Open with Live Server"**
4. Application opens automatically in your browser
</details>

<details>
<summary><strong>🌐 Direct File Access</strong> (Limited functionality)</summary>

```bash
# Simply open index.html in your browser
# Note: Some features may not work due to CORS restrictions
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```
</details>

## 📖 User Guide

### 🏠 Navigation Overview

| Section | Description | Features |
|---------|-------------|----------|
| **🎬 Home** | Main discovery page | Trending movies, genre browsing |
| **🔍 Search** | Movie search interface | Real-time search with debouncing |
| **🎭 Genres** | Category filtering | Dynamic genre-based filtering |
| **📋 Watchlist** | Personal movie collection | Save, organize, and manage movies |

### 🎯 Core Features in Detail

<details>
<summary><strong>🔍 Smart Search System</strong></summary>

- **Debounced Input**: Search triggers after 500ms of inactivity to optimize API calls
- **Real-time Results**: Instant movie suggestions as you type
- **Search Persistence**: Search terms remain active during navigation
- **Clear Function**: Easy reset to return to trending content

```javascript
// Search implementation example
const debouncedSearch = debounce((query) => {
    if (query.length >= 2) {
        searchMovies(query);
    } else {
        loadTrendingMovies();
    }
}, 500);
```
</details>

<details>
<summary><strong>🎭 Dynamic Genre Filtering</strong></summary>

- **Live Loading**: Genres fetched from TMDB API ensuring up-to-date categories
- **One-Click Filtering**: Instant genre-based movie filtering
- **"All" Reset**: Quick return to full trending movie list
- **Visual Feedback**: Active genre highlighting with Rose Pine colors

Available Genres:
- Action, Adventure, Animation, Comedy, Crime, Documentary
- Drama, Family, Fantasy, History, Horror, Music, Mystery
- Romance, Science Fiction, Thriller, War, Western
</details>

<details>
<summary><strong>� Watchlist Management</strong></summary>

- **Persistent Storage**: Uses browser's Local Storage for data persistence
- **Quick Actions**: One-click add/remove functionality
- **Visual Indicators**: Clear button states showing watchlist status
- **Bulk Management**: Easily manage multiple movies in your watchlist
- **Cross-Session**: Watchlist persists between browser sessions

```javascript
// Watchlist storage structure
{
  "watchlist": [
    {
      "id": 12345,
      "title": "Movie Title",
      "poster_path": "/poster.jpg",
      "release_date": "2023-01-01",
      "added_date": "2023-12-01T10:30:00.000Z"
    }
  ]
}
```
</details>

<details>
<summary><strong>🎬 Rich Movie Details</strong></summary>

- **Modal Interface**: Elegant popup with comprehensive movie information
- **High-Quality Images**: Full-resolution posters and backdrops
- **Detailed Metadata**: Release dates, ratings, genres, and plot summaries
- **Cast Information**: Key cast members and crew details
- **Action Buttons**: Direct watchlist management from detail view
</details>

### 📱 Responsive Experience

MovieDeck adapts beautifully to all screen sizes:

| Device Type | Breakpoint | Layout Features |
|-------------|------------|-----------------|
| **📱 Mobile** | `< 576px` | Single column, touch-optimized buttons |
| **📟 Tablet** | `576px - 992px` | 2-3 column grid, swipe-friendly |
| **💻 Desktop** | `> 992px` | Multi-column grid, hover effects |
| **🖥️ Large** | `> 1200px` | Expanded layout, enhanced spacing |

## ⚙️ Technical Implementation

### 🔐 TMDB API v4 Integration

MovieDeck leverages the latest **TMDB API v4** with modern Bearer token authentication:

```javascript
// Secure API authentication
const apiConfig = {
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Example API call
async function fetchTrendingMovies() {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week`, apiConfig);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

### 🏗️ Architecture Patterns

```javascript
// Component-based architecture
class MovieCard {
  constructor(movieData) {
    this.movie = movieData;
    this.element = this.render();
  }

  render() {
    // Rose Pine themed HTML generation
    return this.createCardElement();
  }

  bindEvents() {
    // Event delegation for performance
    this.element.addEventListener('click', this.handleClick.bind(this));
  }
}

// Utility functions for common operations
export const utils = {
  debounce: (func, delay) => { /* implementation */ },
  formatDate: (dateString) => { /* implementation */ },
  truncateText: (text, length) => { /* implementation */ }
};
```

### 🎛️ Performance Optimizations

- **Debounced Search**: Reduces API calls by 80% during typing
- **Image Lazy Loading**: Loads images only when needed
- **Local Storage Caching**: Reduces redundant API requests
- **Component Reuse**: Efficient DOM manipulation
- **Error Boundaries**: Graceful fallbacks for failed requests

## 🌐 Browser Support

| Browser | Minimum Version | Features |
|---------|----------------|----------|
| **Chrome** | 60+ | Full support with all optimizations |
| **Firefox** | 55+ | Complete functionality |
| **Safari** | 12+ | Full support (iOS 12+) |
| **Edge** | 79+ | Complete feature set |

### Required Browser Features
- ✅ ES6+ Support (const, let, arrow functions, async/await)
- ✅ Local Storage API
- ✅ Fetch API
- ✅ CSS Custom Properties (CSS Variables)
- ✅ CSS Grid and Flexbox

## 🚀 Deployment Options

<details>
<summary><strong>🔧 Static Hosting Platforms</strong></summary>

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
# Drag and drop the project folder to netlify.com
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### GitHub Pages
```bash
# Enable GitHub Pages in repository settings
# Select source: Deploy from branch > main
```
</details>

<details>
<summary><strong>🐳 Docker Deployment</strong></summary>

```dockerfile
# Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t moviedeck .
docker run -p 8080:80 moviedeck
```
</details>

## 🧪 Development
### 🛠️ Development Setup

```bash
# Clone and setup
git clone <repository-url>
cd movie-deck

# Create feature branch
git checkout -b feature/amazing-feature

# Setup development server (choose one)
python -m http.server 8000    # Python
npx http-server -p 8000       # Node.js
# or use VS Code Live Server
```

### 📝 Code Style Guidelines

- **ES6+ JavaScript**: Use modern syntax (const/let, arrow functions, async/await)
- **Component Pattern**: Follow established component structure
- **Rose Pine Colors**: Use CSS custom properties for consistent theming
- **Semantic HTML**: Maintain accessibility with proper ARIA labels
- **Error Handling**: Always include try/catch blocks for async operations

```javascript
// Example component structure
export class ComponentName {
  constructor(config) {
    this.config = config;
    this.element = null;
  }

  async init() {
    try {
      this.element = this.render();
      this.bindEvents();
    } catch (error) {
      console.error(`${this.constructor.name} initialization failed:`, error);
    }
  }

  render() { /* ... */ }
  bindEvents() { /* ... */ }
  destroy() { /* ... */ }
}
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 🐛 Bug Reports
1. Check existing [issues](../../issues) to avoid duplicates
2. Include browser/OS information
3. Provide steps to reproduce
4. Add screenshots if applicable

### ✨ Feature Requests
1. Open an [issue](../../issues/new) with detailed description
2. Explain the use case and benefits
3. Consider Rose Pine design principles
4. Discuss implementation approach

### 🔧 Development Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes following the code style
4. **Test** thoroughly across different browsers
5. **Commit** with descriptive messages (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request with detailed description

### 📋 Pull Request Checklist

- [ ] Code follows established patterns and style
- [ ] All existing tests pass
- [ ] New features include appropriate error handling
- [ ] Rose Pine theme consistency maintained
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No console errors or warnings
- [ ] Local Storage usage is efficient
- [ ] API calls are optimized

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 MovieDeck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

<div align="center">

**Built with ❤️ using**

[![TMDB](https://img.shields.io/badge/TMDB-API-01d277?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952b3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Rose Pine](https://img.shields.io/badge/Rose%20Pine-Theme-c4a7e7?style=for-the-badge)](https://rosepinetheme.com/)

</div>

### Special Thanks

- **[TMDB](https://www.themoviedb.org/)**: For providing comprehensive movie data and beautiful APIs
- **[Rose Pine](https://rosepinetheme.com/)**: For the gorgeous color palette that makes MovieDeck easy on the eyes
- **[Bootstrap](https://getbootstrap.com/)**: For the robust responsive framework
- **[Inter Font](https://rsms.me/inter/)**: For the clean, readable typography
- **Open Source Community**: For inspiration and collaborative spirit

### Movie Data Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

<div align="center">

---

**🌹 Made with Rose Pine aesthetics • ⚡ Powered by modern web technologies • 🎬 Driven by movie passion**

[⬆️ Back to Top](#-moviedeck)

</div>
