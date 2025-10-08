/**
 * Movie Card Component
 * Creates and manages movie cards with Bootstrap styling
 */

import { IMAGE_BASE_URL } from "../../../config.js";
import {
  getWatchLaterMovies,
  removeFromWatchLater,
  saveToWatchLater,
} from "./watchlist.js";

/**
 * Create a movie card element
 * @param {Object} movie - Movie object from TMDB API
 * @returns {HTMLElement} Movie card element
 */
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "col-lg-3 col-md-4 col-sm-6 mb-4";

  const watchLaterMovies = getWatchLaterMovies();
  const isInWatchLater = watchLaterMovies.some(
    (watchMovie) => watchMovie.id === movie.id
  );

  card.innerHTML = `
        <div class="card h-100 movie-card">
            <img src="${
              movie.poster_path
                ? IMAGE_BASE_URL + movie.poster_path
                : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI3NTAiIGZpbGw9IiMzMzMzMzMiLz48cmVjdCB4PSIxNzUiIHk9IjMyNSIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMCIgZmlsbD0iIzU1NTU1NSIvPjx0ZXh0IHg9IjI1MCIgeT0iMzgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk5vIEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjI1MCIgeT0iNDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkF2YWlsYWJsZTwvdGV4dD48L3N2Zz4="
            }"
                 class="card-img-top movie-poster"
                 alt="${movie.title} Poster"
                 loading="lazy">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title movie-title">${movie.title}</h5>
                <p class="card-text text-muted">${
                  new Date(movie.release_date).getFullYear() || "N/A"
                }</p>
                <p class="card-text">
                    <span class="rating">⭐ ${
                      movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
                    }</span>
                </p>
                <div class="mt-auto">
                    <button class="btn ${
                      isInWatchLater ? "btn-danger" : "btn-primary"
                    } w-100 watch-later-btn"
                            data-movie-id="${movie.id}">
                        ${
                          isInWatchLater
                            ? "Remove from Watch Later"
                            : "Add to Watch Later"
                        }
                    </button>
                </div>
            </div>
        </div>
    `;

  // Add event listener for watch later button
  const watchLaterBtn = card.querySelector(".watch-later-btn");
  watchLaterBtn.addEventListener("click", () =>
    handleWatchLaterClick(movie, watchLaterBtn)
  );

  return card;
}

/**
 * Handle watch later button click
 * @param {Object} movie - Movie object
 * @param {HTMLElement} button - Button element
 */
function handleWatchLaterClick(movie, button) {
  const watchLaterMovies = getWatchLaterMovies();
  const isInWatchLater = watchLaterMovies.some(
    (watchMovie) => watchMovie.id === movie.id
  );

  if (isInWatchLater) {
    removeFromWatchLater(movie.id);
    button.textContent = "Add to Watch Later";
    button.className = "btn btn-primary w-100 watch-later-btn";

    // Show notification
    showNotification(`${movie.title} removed from Watch Later`, "danger");
  } else {
    saveToWatchLater(movie);
    button.textContent = "Remove from Watch Later";
    button.className = "btn btn-danger w-100 watch-later-btn";

    // Show notification
    showNotification(`${movie.title} added to Watch Later`, "success");
  }
}

/**
 * Render movie cards in the grid
 * @param {Array} movies - Array of movie objects
 * @param {string} containerId - ID of container element
 */
function renderMovieCards(movies, containerId = "movie-grid") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Movie grid container not found");
    return;
  }

  // Show loading state
  container.innerHTML =
    '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

  // Simulate loading delay for better UX
  setTimeout(() => {
    if (movies.length === 0) {
      container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info" role="alert">
                        <h4 class="alert-heading">No movies found</h4>
                        <p>Try adjusting your search criteria or browse different genres.</p>
                    </div>
                </div>
            `;
      return;
    }

    container.innerHTML = "";
    movies.forEach((movie) => {
      if (movie.poster_path || movie.title) {
        // Only show movies with valid data
        container.appendChild(createMovieCard(movie));
      }
    });
  }, 300);
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Bootstrap alert type (success, danger, info, warning)
 */
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show notification`;
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  // Add to page
  document.body.insertBefore(notification, document.body.firstChild);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

export { createMovieCard, renderMovieCards, showNotification };
