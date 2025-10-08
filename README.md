# Movie Explorer Dashboard

## Overview
Movie Explorer Dashboard is a modern web application that allows users to explore trending and popular movies using the TMDB API v4 with Bearer token authentication. The application provides a clean and responsive user interface, enabling users to search for movies, filter by genre, and maintain a personal "Watch Later" list.

## Features
- 🎬 Browse trending and popular movies
- 🔍 Search for movies by title with debounced input
- 🎭 Filter movies by genre dynamically
- 📺 Save movies to a "Watch Later" list with local storage persistence
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🔐 Secure Bearer token authentication with TMDB API
- ⚡ Modern async/await JavaScript with error handling
- 🎨 Netflix-inspired dark theme UI

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: TMDB API v4 with Bearer token authentication
- **Styling**: Bootstrap 5 + Custom CSS
- **Storage**: Local Storage for Watch Later functionality
- **Architecture**: Modular component-based structure

## Project Structure
```
movie-deck/
├── config.js                   # TMDB API Bearer token configuration
├── index.html                  # Main HTML file with Bootstrap 5
├── README.md                   # Project documentation
└── src/
    ├── css/
    │   └── style.css           # Modern Netflix-inspired styles
    ├── js/
    │   ├── api.js              # TMDB API v4 functions with Bearer auth
    │   ├── script.js           # Main application initialization
    │   ├── utils.js            # Utility functions (debounce, etc.)
    │   └── components/
    │       ├── card.js         # Movie card component with interactions
    │       ├── navbar.js       # Navigation with search and genre filters
    │       └── watchlist.js    # Watch Later functionality
    └── assets/
        └── icons/              # Application icons
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd movie-deck
```

### 2. Get TMDB Bearer Token
1. Go to [TMDB API Settings](https://www.themoviedb.org/settings/api)
2. Create an account if you don't have one
3. Copy your **"API Read Access Token"** (NOT the API Key)
   - This is the Bearer token that starts with "eyJ..."
   - It's much longer than the regular API key

### 3. Configure the Application
Open `config.js` in the root directory and replace the placeholder:

```javascript
// Replace YOUR_TMDB_BEARER_TOKEN_HERE with your actual Bearer token
export const API_KEY = "eyJhbGciOiJIUzI1NiJ9..."; // Your actual Bearer token
export const BASE_URL = "https://api.themoviedb.org";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
```

### 4. Launch the Application
Open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using Live Server extension in VS Code
# Right-click index.html → "Open with Live Server"
```

## Usage

### Basic Navigation
- **Home**: Browse trending movies on the main page
- **Search**: Use the search bar to find movies by title (debounced search)
- **Genre Filter**: Click genre buttons to filter movies by category
- **Watch Later**: Add/remove movies from your personal watch list

### Features in Detail

#### 🔍 Search Functionality
- Type in the search bar to find movies by title
- Search is debounced (500ms delay) to avoid excessive API calls
- Clear search to return to trending movies

#### 🎭 Genre Filtering
- Click on genre buttons to filter movies by category
- "All" button resets to trending movies
- Genres are loaded dynamically from TMDB API

#### 📺 Watch Later List
- Click "Add to Watch Later" on any movie card
- Movies are stored in browser's local storage
- Access your list via the "Watch Later" button in navigation
- Remove movies by clicking "Remove from Watch Later"

#### 📱 Responsive Design
- Mobile-first design with Bootstrap 5
- Optimized for mobile, tablet, and desktop screens
- Touch-friendly interface elements

## API Authentication

This application uses **TMDB API v4** with **Bearer token authentication** for enhanced security and access to the latest features:

```javascript
// API requests include Authorization header
headers: {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

## Browser Compatibility
- Modern browsers with ES6+ support
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- Local Storage support required for Watch Later functionality

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie data
- [Bootstrap 5](https://getbootstrap.com/) for responsive design components
- Movie poster images courtesy of TMDB
