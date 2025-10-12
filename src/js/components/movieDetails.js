/**
 * Movie Details Modal Component
 * Handles displaying detailed movie information in a Bootstrap modal
 */

import { IMAGE_BASE_URL } from "../../../config.js";
import { fetchMovieDetails } from "../api.js";
import { showNotification } from "./card.js";

/**
 * Open movie details modal and load movie data
 * @param {number} movieId - TMDB movie ID
 */
export async function openMovieDetailsModal(movieId) {
  const modal = document.getElementById("movieDetailsModal");
  const modalTitle = document.getElementById("movieDetailsModalLabel");
  const modalContent = document.getElementById("movieDetailsContent");

  // Show modal with loading state
  const bootstrapModal = new bootstrap.Modal(modal);
  modalTitle.textContent = "Loading Movie Details...";
  modalContent.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  bootstrapModal.show();

  try {
    // Fetch detailed movie data
    const movieDetails = await fetchMovieDetails(movieId);

    // Update modal title
    modalTitle.textContent = movieDetails.title;

    // Render movie details
    modalContent.innerHTML = renderMovieDetails(movieDetails);
  } catch (error) {
    console.error("Error loading movie details:", error);
    modalContent.innerHTML = `
      <div class="alert alert-danger m-3" role="alert">
        <h4 class="alert-heading">Error Loading Movie Details</h4>
        <p>We couldn't load the movie details. Please try again later.</p>
        <button class="btn btn-outline-danger" onclick="this.closest('.modal').querySelector('[data-bs-dismiss]').click()">
          Close
        </button>
      </div>
    `;
    showNotification("Failed to load movie details", "danger");
  }
}

/**
 * Render movie details HTML with improved design
 * @param {Object} movie - Movie details object from TMDB API
 * @returns {string} HTML string for movie details
 */
function renderMovieDetails(movie) {
  const posterUrl = movie.poster_path
    ? IMAGE_BASE_URL + movie.poster_path
    : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI3NTAiIGZpbGw9IiNmOGY5ZmEiLz48cmVjdCB4PSIxNzUiIHk9IjMyNSIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMCIgZmlsbD0iI2RlZTJlNiIvPjx0ZXh0IHg9IjI1MCIgeT0iMzgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM3NTdkIiBmb250LWZhbWlseT0iSW50ZXIsIEFyaWFsIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIj5ObyBJbWFnZTwvdGV4dD48dGV4dCB4PSIyNTAiIHk9IjQwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZjNzU3ZCIgZm9udC1mYW1pbHk9IkludGVyLCBBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjQwMCI+QXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  // Get director from crew
  const director =
    movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
    "N/A";

  // Get main cast (first 6)
  const cast = movie.credits?.cast?.slice(0, 6) || [];

  // Get trailer
  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return `
    <!-- Hero Section with Backdrop -->
    ${
      backdropUrl
        ? `
      <div class="position-relative overflow-hidden">
        <img src="${backdropUrl}" class="w-100" style="height: 280px; object-fit: cover;" alt="${
            movie.title
          } backdrop">
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(to bottom, rgba(25,23,36,0.3) 0%, rgba(25,23,36,0.8) 70%, var(--card) 100%);"></div>
        <div class="position-absolute bottom-0 start-0 w-100 p-4">
          <div class="container">
            <h2 class="text-white mb-2 fw-bold">${movie.title}</h2>
            ${
              movie.tagline
                ? `<p class="text-white-50 mb-0 fst-italic">${movie.tagline}</p>`
                : ""
            }
          </div>
        </div>
      </div>
    `
        : `
      <div class="p-4 bg-primary text-white text-center">
        <h2 class="mb-2 fw-bold">${movie.title}</h2>
        ${
          movie.tagline
            ? `<p class="mb-0 opacity-75 fst-italic">${movie.tagline}</p>`
            : ""
        }
      </div>
    `
    }

    <div class="p-4">
      <div class="row g-4">
        <!-- Left Column: Poster and Actions -->
        <div class="col-lg-4">
          <div class="text-center">
            <img src="${posterUrl}" class="img-fluid rounded-4 shadow-lg mb-3" style="max-height: 400px;" alt="${
    movie.title
  } poster">

            <!-- Action Buttons -->
            <div class="d-grid gap-2">
              ${
                trailer
                  ? `
                <button class="btn btn-primary btn-lg" onclick="window.open('https://www.youtube.com/watch?v=${trailer.key}', '_blank')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="me-2">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Trailer
                </button>
              `
                  : ""
              }
              <button class="btn btn-outline-primary" onclick="window.open('https://www.themoviedb.org/movie/${
                movie.id
              }', '_blank')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View on TMDB
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Movie Information -->
        <div class="col-lg-8">
          <!-- Quick Stats -->
          <div class="row g-3 mb-4">
            <div class="col-6 col-md-3">
              <div class="card bg-primary bg-opacity-10 border-primary border-opacity-25 text-center">
                <div class="card-body py-3">
                  <div class="fs-4 fw-bold text-primary">${rating}</div>
                  <small class="text-muted">⭐ Rating</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card bg-secondary bg-opacity-10 border-secondary border-opacity-25 text-center">
                <div class="card-body py-3">
                  <div class="fs-5 fw-bold text-secondary">${releaseYear}</div>
                  <small class="text-muted">📅 Year</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card bg-success bg-opacity-10 border-success border-opacity-25 text-center">
                <div class="card-body py-3">
                  <div class="fs-6 fw-bold text-success">${runtime}</div>
                  <small class="text-muted">⏱️ Runtime</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card bg-warning bg-opacity-10 border-warning border-opacity-25 text-center">
                <div class="card-body py-3">
                  <div class="fs-6 fw-bold text-warning">${
                    movie.vote_count || 0
                  }</div>
                  <small class="text-muted">👥 Votes</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Genres -->
          ${
            movie.genres && movie.genres.length > 0
              ? `
            <div class="mb-4">
              <h6 class="text-muted mb-2 fw-semibold">Genres</h6>
              <div class="d-flex flex-wrap gap-2">
                ${movie.genres
                  .map(
                    (genre) =>
                      `<span class="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-50 rounded-pill px-3 py-2">${genre.name}</span>`
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          <!-- Overview -->
          ${
            movie.overview
              ? `
            <div class="mb-4">
              <h6 class="text-muted mb-2 fw-semibold">Overview</h6>
              <p class="text-light-emphasis lh-lg">${movie.overview}</p>
            </div>
          `
              : ""
          }

          <!-- Cast & Crew -->
          <div class="row mb-4">
            <div class="col-md-6">
              <h6 class="text-muted mb-2 fw-semibold">Director</h6>
              <p class="mb-0 fw-medium">${director}</p>
            </div>
            ${
              cast.length > 0
                ? `
              <div class="col-md-6">
                <h6 class="text-muted mb-2 fw-semibold">Cast</h6>
                <div class="d-flex flex-wrap gap-1">
                  ${cast
                    .map(
                      (actor) =>
                        `<span class="badge bg-secondary bg-opacity-20 text-secondary">${actor.name}</span>`
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
          </div>

          <!-- Additional Details -->
          ${
            movie.budget ||
            movie.revenue ||
            (movie.production_companies &&
              movie.production_companies.length > 0)
              ? `
            <div class="card bg-muted bg-opacity-10 border-0">
              <div class="card-body">
                <h6 class="card-title text-muted mb-3 fw-semibold">Production Details</h6>
                <div class="row g-3">
                  ${
                    movie.budget && movie.budget > 0
                      ? `
                    <div class="col-sm-6">
                      <strong class="text-muted">Budget:</strong>
                      <div class="text-success fw-medium">$${movie.budget.toLocaleString()}</div>
                    </div>
                  `
                      : ""
                  }

                  ${
                    movie.revenue && movie.revenue > 0
                      ? `
                    <div class="col-sm-6">
                      <strong class="text-muted">Revenue:</strong>
                      <div class="text-primary fw-medium">$${movie.revenue.toLocaleString()}</div>
                    </div>
                  `
                      : ""
                  }

                  ${
                    movie.production_companies &&
                    movie.production_companies.length > 0
                      ? `
                    <div class="col-12">
                      <strong class="text-muted">Production Companies:</strong>
                      <div class="mt-1">${movie.production_companies
                        .map((company) => company.name)
                        .join(", ")}</div>
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `;
}
