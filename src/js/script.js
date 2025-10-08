/**
 * Main application script
 * Initializes the Movie Explorer Dashboard
 */

import { fetchGenres, fetchTrendingMovies } from "./api.js";
import { renderMovieCards, showNotification } from "./components/card.js";
import { setupNavbar } from "./components/navbar.js";
import { setupWatchlist } from "./components/watchlist.js";

/**
 * Initialize the application
 */
const init = async () => {
  try {
    // Show initial loading state
    showLoadingState();

    // Check if API key is configured
    const { API_KEY } = await import("../../config.js");
    if (!API_KEY || API_KEY === "YOUR_TMDB_BEARER_TOKEN_HERE") {
      showAPIKeyError();
      return;
    } // Initialize components
    console.log("Initializing Movie Explorer Dashboard...");

    // Setup watch later functionality first
    setupWatchlist();

    // Fetch initial data
    const [trendingMovies, genres] = await Promise.all([
      fetchTrendingMovies(),
      fetchGenres(),
    ]);

    // Setup navigation with genres
    setupNavbar(genres);

    // Render initial movies
    renderMovieCards(trendingMovies);

    // Show success message
    showNotification(
      "Movie Explorer Dashboard loaded successfully!",
      "success"
    );

    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Error initializing application:", error);
    showErrorState(error);
  }
};

/**
 * Show loading state while app initializes
 */
function showLoadingState() {
  const movieGrid = document.getElementById("movie-grid");
  if (movieGrid) {
    movieGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <h4>Loading Movie Explorer Dashboard...</h4>
                <p class="text-muted">Fetching the latest movies for you</p>
            </div>
        `;
  }
}

/**
 * Show API key configuration error
 */
function showAPIKeyError() {
  const movieGrid = document.getElementById("movie-grid");
  if (movieGrid) {
    movieGrid.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">⚠️ Bearer Token Required</h4>
                    <p>To use this application, you need to configure your TMDB Bearer Token:</p>
                    <ol>
                        <li>Go to <a href="https://www.themoviedb.org/settings/api" target="_blank" class="alert-link">TMDB API Settings</a></li>
                        <li>Copy your <strong>"API Read Access Token"</strong> (NOT the API Key)</li>
                        <li>Open <code>config.js</code> in the project root</li>
                        <li>Replace <code>"YOUR_TMDB_BEARER_TOKEN_HERE"</code> with your Bearer Token</li>
                        <li>Refresh the page</li>
                    </ol>
                    <hr>
                    <p class="mb-0">The Bearer Token starts with "eyJ..." and is much longer than the API key.</p>
                </div>
            </div>
        `;
  }
}

/**
 * Show error state when initialization fails
 * @param {Error} error - The error that occurred
 */
function showErrorState(error) {
  const movieGrid = document.getElementById("movie-grid");
  if (movieGrid) {
    movieGrid.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">❌ Application Error</h4>
                    <p>Failed to load the Movie Explorer Dashboard.</p>
                    <hr>
                    <p class="mb-0">
                        <strong>Error:</strong> ${error.message}<br>
                        <small class="text-muted">Check the console for more details and ensure your internet connection is working.</small>
                    </p>
                    <button class="btn btn-outline-danger mt-3" onclick="location.reload()">
                        🔄 Retry
                    </button>
                </div>
            </div>
        `;
  }

  showNotification(
    "Failed to load application. Please check your internet connection and API key.",
    "danger"
  );
}

/**
 * Handle application errors globally
 */
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  showNotification(
    "An unexpected error occurred. Please refresh the page.",
    "danger"
  );
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  showNotification(
    "An error occurred while loading data. Please try again.",
    "danger"
  );
});

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", init);

// Add some global utility functions for debugging
window.MovieExplorer = {
  init,
  showLoadingState,
  showAPIKeyError,
  showErrorState,
};
