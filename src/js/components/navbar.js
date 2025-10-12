/**
 * Navigation Component
 * Creates and manages the navigation bar with search and genre filtering
 */

import {
  fetchMoviesByGenre,
  fetchTrendingMovies,
  searchMovies,
} from "../api.js";
import { debounce } from "../utils.js";
import { renderMovieCards, showNotification } from "./card.js";
import { getWatchLaterMovies } from "./watchlist.js";

let currentGenres = [];
let searchTimeout;

/**
 * Setup the navigation bar
 * @param {Array} genres - Array of genre objects from TMDB API
 */
function setupNavbar(genres) {
  currentGenres = genres;
  const navbarContainer = document.getElementById("navbar");
  const genreFiltersContainer = document.getElementById(
    "genre-filters-container"
  );

  if (!navbarContainer) {
    console.error("Navbar container not found");
    return;
  }

  if (!genreFiltersContainer) {
    console.error("Genre filters container not found");
    return;
  }

  navbarContainer.innerHTML = "";
  navbarContainer.appendChild(createNavbar());

  genreFiltersContainer.innerHTML = "";
  genreFiltersContainer.appendChild(createGenreFilters(genres));

  setupEventListeners();
}

/**
 * Create the navigation bar element
 * @returns {HTMLElement} Navigation bar element
 */
function createNavbar() {
  const navbar = document.createElement("nav");
  navbar.className = "navbar navbar-expand-lg navbar-light bg-light mb-4";

  navbar.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand fw-bold d-flex align-items-center" href="#" id="home-link">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                    <circle cx="8" cy="10" r="2" fill="currentColor"/>
                    <path d="M14 15l2-3 3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="2" y="19" width="20" height="2" fill="currentColor"/>
                </svg>
                MovieDeck
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarContent">
                <div class="mx-auto">
                    <form class="d-flex" role="search" id="search-form">
                        <input class="form-control me-2"
                               type="search"
                               placeholder="Search movies..."
                               id="search-input"
                               autocomplete="off">
                        <button class="btn btn-outline-primary" type="submit">
                            🔍
                        </button>
                    </form>
                </div>

                <div class="navbar-nav ms-auto">
                    <button class="btn btn-outline-primary me-2" id="watch-later-toggle">
                        📺 Watch Later
                    </button>
                </div>
            </div>
        </div>
    `;

  return navbar;
}

/**
 * Create the genre filters section
 * @param {Array} genres - Array of genre objects
 * @returns {HTMLElement} Genre filters container element
 */
function createGenreFilters(genres) {
  const container = document.createElement("div");
  container.className = "container-fluid";

  container.innerHTML = `
    <div class="row">
      <div class="col-12">
        <div class="genre-filters d-flex flex-wrap justify-content-center gap-2">
          <button class="btn btn-sm btn-primary genre-btn active" data-genre-id="all">
            All
          </button>
          ${genres
            .map(
              (genre) => `
              <button class="btn btn-sm btn-outline-primary genre-btn" data-genre-id="${genre.id}">
                ${genre.name}
              </button>
            `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  return container;
}

/**
 * Setup event listeners for navbar interactions
 */
function setupEventListeners() {
  // Search functionality
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  if (searchForm && searchInput) {
    // Debounced search on input
    const debouncedSearch = debounce(handleSearch, 500);
    searchInput.addEventListener("input", debouncedSearch);

    // Search on form submit
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSearch();
    });
  }

  // Genre filter buttons
  const genreButtons = document.querySelectorAll(".genre-btn");
  genreButtons.forEach((button) => {
    button.addEventListener("click", handleGenreFilter);
  });

  // Home link
  const homeLink = document.getElementById("home-link");
  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      loadTrendingMovies();
      resetActiveGenre();
      clearSearch();
    });
  }

  // Watch Later toggle
  const watchLaterToggle = document.getElementById("watch-later-toggle");
  if (watchLaterToggle) {
    watchLaterToggle.addEventListener("click", toggleWatchLater);
  }
}

/**
 * Handle search functionality with loading state
 */
async function handleSearch() {
  const searchInput = document.getElementById("search-input");
  const query = searchInput.value.trim();

  if (query.length === 0) {
    loadTrendingMovies();
    return;
  }

  if (query.length < 2) {
    return; // Don't search for very short queries
  }

  try {
    showNotification("Searching movies...", "info");

    // Simulate delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const movies = await searchMovies(query);
    renderMovieCards(movies);

    if (movies.length === 0) {
      showNotification(`No movies found for "${query}"`, "warning");
    } else {
      showNotification(
        `Found ${movies.length} movie(s) for "${query}"`,
        "success"
      );
    }

    resetActiveGenre();
  } catch (error) {
    console.error("Search error:", error);
    showNotification("Search failed. Please try again.", "danger");
  }
}

/**
 * Handle genre filter selection
 * @param {Event} event - Click event
 */
async function handleGenreFilter(event) {
  const button = event.target;
  const genreId = button.dataset.genreId;

  // Update active state
  document
    .querySelectorAll(".genre-btn")
    .forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  // Clear search
  clearSearch();

  try {
    let movies;
    if (genreId === "all") {
      movies = await fetchTrendingMovies();
      showNotification("Showing trending movies", "info");
    } else {
      movies = await fetchMoviesByGenre(genreId);
      const genreName =
        currentGenres.find((g) => g.id === parseInt(genreId))?.name ||
        "Unknown";
      showNotification(`Showing ${genreName} movies`, "info");
    }

    renderMovieCards(movies);
  } catch (error) {
    console.error("Genre filter error:", error);
    showNotification("Failed to load movies. Please try again.", "danger");
  }
}

/**
 * Load trending movies
 */
async function loadTrendingMovies() {
  try {
    const movies = await fetchTrendingMovies();
    renderMovieCards(movies);
    showNotification("Showing trending movies", "info");
  } catch (error) {
    console.error("Error loading trending movies:", error);
    showNotification("Failed to load trending movies", "danger");
  }
}

/**
 * Reset active genre to "All"
 */
function resetActiveGenre() {
  document
    .querySelectorAll(".genre-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const allButton = document.querySelector('[data-genre-id="all"]');
  if (allButton) {
    allButton.classList.add("active");
  }
}

/**
 * Clear search input
 */
function clearSearch() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = "";
  }
}

/**
 * Toggle Watch Later view
 */
function toggleWatchLater() {
  const watchLaterBtn = document.getElementById("watch-later-toggle");
  const isWatchLaterView = watchLaterBtn.textContent.includes("Back");

  if (isWatchLaterView) {
    // Go back to main view
    watchLaterBtn.innerHTML = "📺 Watch Later";
    loadTrendingMovies();
    resetActiveGenre();
    clearSearch();
  } else {
    // Show watch later movies
    watchLaterBtn.innerHTML = "⬅️ Back to Movies";
    showWatchLaterMovies();
    resetActiveGenre();
    clearSearch();
  }
}

/**
 * Show Watch Later movies
 */
function showWatchLaterMovies() {
  const watchLaterMovies = getWatchLaterMovies();

  if (watchLaterMovies.length === 0) {
    const container = document.getElementById("movie-grid");
    container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info" role="alert">
                    <h4 class="alert-heading">Your Watch Later list is empty</h4>
                    <p>Start adding movies to your Watch Later list to see them here!</p>
                </div>
            </div>
        `;
    return;
  }

  renderMovieCards(watchLaterMovies);
  showNotification(
    `Showing ${watchLaterMovies.length} movie(s) from your Watch Later list`,
    "info"
  );
}

export { createNavbar, setupNavbar };
