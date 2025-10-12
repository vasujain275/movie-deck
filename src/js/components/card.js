/**
 * Movie Card Component
 * Creates and manages movie cards with Bootstrap styling
 */

import { IMAGE_BASE_URL } from "../../../config.js";
import { openMovieDetailsModal } from "./movieDetails.js";
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
        <div class="card h-100 movie-card fade-in shadow-sm rounded-4 border-0" style="cursor: pointer;">
            <img src="${
              movie.poster_path
                ? IMAGE_BASE_URL + movie.poster_path
                : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI3NTAiIGZpbGw9IiNmOGY5ZmEiLz48cmVjdCB4PSIxNzUiIHk9IjMyNSIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMCIgZmlsbD0iI2RlZTJlNiIvPjx0ZXh0IHg9IjI1MCIgeT0iMzgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM3NTdkIiBmb250LWZhbWlseT0iSW50ZXIsIEFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIj5ObyBJbWFnZTwvdGV4dD48dGV4dCB4PSIyNTAiIHk9IjQwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZjNzU3ZCIgZm9udC1mYW1pbHk9IkludGVyLCBBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjQwMCI+QXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=="
            }"
                 class="card-img-top movie-poster rounded-top-4"
                 alt="${movie.title} Poster"
                 loading="lazy">
            <div class="card-body d-flex flex-column p-3">
                <h5 class="card-title movie-title fw-semibold mb-2">${
                  movie.title
                }</h5>
                <p class="card-text text-muted small mb-2">${
                  new Date(movie.release_date).getFullYear() || "N/A"
                }</p>
                <div class="d-flex align-items-center mb-3">
                    <span class="rating me-2 text-warning fw-semibold">⭐ ${
                      movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
                    }</span>
                    <small class="text-muted">(${
                      movie.vote_count || 0
                    } votes)</small>
                </div>
                <div class="mt-auto">
                    <button class="btn ${
                      isInWatchLater ? "btn-danger" : "btn-primary"
                    } w-100 watch-later-btn rounded-pill fw-semibold"
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
  watchLaterBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent card click event
    handleWatchLaterClick(movie, watchLaterBtn);
  });

  // Add event listener for card click to open movie details
  const movieCard = card.querySelector(".movie-card");
  movieCard.addEventListener("click", () => {
    openMovieDetailsModal(movie.id);
  });

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
 * @param {string} type - Notification type (success, danger, info, warning)
 */
function showNotification(message, type = "info") {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => {
    notification.classList.add("hide");
    setTimeout(() => notification.remove(), 300);
  });

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Create icon based on type
  const icons = {
    success: "✓",
    danger: "✕",
    info: "ℹ",
    warning: "⚠",
  };

  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icons[type] || icons.info}</span>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.classList.add('hide'); setTimeout(() => this.parentElement.remove(), 300)">
      ×
    </button>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add("hide");
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

export { createMovieCard, renderMovieCards, showNotification };
