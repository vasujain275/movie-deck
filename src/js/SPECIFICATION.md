# 🎬 Movie Explorer Dashboard — Project Specification

## 🧩 Overview
**Movie Explorer Dashboard** is a modern web app that lets users explore trending and popular movies using the **TMDB API**.  
Users can:
- Browse featured movies
- Search by title
- Filter by genre
- Maintain a personal **“Watch Later”** list stored locally

The project emphasizes **clean UI**, **maintainable code**, and **modern asynchronous JavaScript**.

---

## 🎯 Core Objectives
- Build a responsive movie dashboard using **TMDB API**
- Implement **search, filter, and persistence** features
- Maintain **clean, modular, and well-documented** code
- Deliver a **minimalist, modern UI**

---

## ⚙️ Functional Requirements

### 1. 🏠 Home Page (10 marks)
- Display a **grid of featured/trending movies** from TMDB using Bootstrap cards.
- Each card should include:
  - Poster image  
  - Movie title  
  - Release year  
  - Rating (⭐)  
  - **“Watch Later”** button

---

### 2. 🔍 Search Feature (15 marks)
- Add a search bar to find movies by title (via TMDB search endpoint).
- Use **Promises / async-await** with **`setTimeout`** to simulate a delayed search.
- Handle no results gracefully with a “No movies found” message.

---

### 3. 🎭 Genre Filter (10 marks)
- Fetch genres dynamically from TMDB and render buttons (e.g., Action, Drama, Comedy).
- On click, filter and display movies matching that genre.
- Include an **“All”** button to reset filters.

---

### 4. 🕒 Watch Later List (15 marks)
- Allow users to save movies to a **Watch Later** list.
- Store movie data in **Local Storage**.
- Retrieve and render saved movies on page reload.
- Provide an option to remove movies from the list.

---

### 5. 📱 Responsiveness & UX (10 marks)
- Must be **fully responsive** (mobile-first, tablet, desktop).
- Use **Bootstrap grid + flex utilities**.
- Maintain consistent spacing, typography, and colors.
- Include loading states and smooth hover effects.

---

## 🧠 Technical Guidelines

| Area | Specification |
|------|----------------|
| **Frontend** | HTML5, CSS3 (Bootstrap 5), JavaScript (ES6+) |
| **API Source** | [TMDB API](https://developer.themoviedb.org/docs/getting-started) |
| **Async Handling** | `fetch()` + `async/await` + Promises |
| **Persistence** | Local Storage for “Watch Later” |
| **Design Style** | Clean, minimal, modern (Netflix-like grid) |
| **Performance** | Lazy-load images, debounce search, handle API errors |
| **Deployment** | GitHub Pages / Netlify optional |
| **Code Style** | Modular JS, descriptive naming, JSDoc-style comments |

---

## 🧾 Example API Usage

**Base URL:**  
```

[https://api.themoviedb.org/3](https://api.themoviedb.org/3)

````

**Endpoints:**
- Trending Movies → `/trending/movie/week`
- Search by Title → `/search/movie?query=TITLE`
- Genres → `/genre/movie/list`
- Movies by Genre → `/discover/movie?with_genres=GENRE_ID`

Example Fetch:
```js
const fetchTrendingMovies = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};
````

---

## 📂 Suggested File Structure

```
movie-explorer/
│
├── index.html
├── style.css
├── script.js
├── api.js               # all TMDB API calls
├── utils.js             # helpers (debounce, storage, etc.)
│
├── components/
│   ├── card.js          # movie card rendering
│   ├── navbar.js        # search + genre filters
│   └── watchlist.js     # watch later logic
│
└── assets/
    └── icons/
```

---

## 💡 UI Guidelines

* Use a **dark, cinematic theme** with subtle shadows.
* Use **Bootstrap Cards** or custom flexbox grid.
* Minimal use of borders, rely on spacing and contrast.
* Smooth hover animations for cards and buttons.

---

## ✅ Deliverables

* Fully functional movie dashboard with all features implemented.
* Clean, modular, well-commented codebase.
* Consistent responsive design.
* Working TMDB API integration with error handling.
* Local Storage persistence for “Watch Later”.

---

## 🚀 Bonus (Optional)

* Add pagination or infinite scroll.
* Show movie details (overview, runtime, trailer link) in a modal.
* Add toast notifications for watchlist actions.
* Include a theme toggle (light/dark).

---

## 🔐 Environment Setup

Create a `.env` or `config.js` file with your TMDB API key:

```js
export const API_KEY = "YOUR_TMDB_API_KEY";
```

---

## 🧾 References

* [TMDB API Docs](https://developer.themoviedb.org/reference/intro/getting-started)
* [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
* [MDN Web Docs - Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---
