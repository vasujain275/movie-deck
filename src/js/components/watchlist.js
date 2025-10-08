/**
 * Watch Later functionality
 * Manages local storage operations for the Watch Later feature
 */

const WATCHLIST_KEY = "watchLaterMovies";

/**
 * Save a movie to the Watch Later list
 * @param {Object} movie - Movie object to save
 */
export const saveToWatchLater = (movie) => {
  try {
    const watchLaterMovies = getWatchLaterMovies();

    // Check if movie already exists
    const existingMovie = watchLaterMovies.find((m) => m.id === movie.id);
    if (existingMovie) {
      console.log("Movie already in Watch Later list");
      return;
    }

    // Add movie to list
    watchLaterMovies.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      genre_ids: movie.genre_ids || [],
      dateAdded: new Date().toISOString(),
    });

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchLaterMovies));
    console.log(`Movie "${movie.title}" added to Watch Later list`);
  } catch (error) {
    console.error("Error saving to Watch Later:", error);
  }
};

/**
 * Retrieve the Watch Later list from local storage
 * @returns {Array} Array of movies in Watch Later list
 */
export const getWatchLaterMovies = () => {
  try {
    const movies = localStorage.getItem(WATCHLIST_KEY);
    return movies ? JSON.parse(movies) : [];
  } catch (error) {
    console.error("Error retrieving Watch Later movies:", error);
    return [];
  }
};

/**
 * Remove a movie from the Watch Later list
 * @param {number} movieId - ID of movie to remove
 */
export const removeFromWatchLater = (movieId) => {
  try {
    const watchLaterMovies = getWatchLaterMovies();
    const updatedMovies = watchLaterMovies.filter(
      (movie) => movie.id !== movieId
    );

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedMovies));
    console.log(`Movie with ID ${movieId} removed from Watch Later list`);
  } catch (error) {
    console.error("Error removing from Watch Later:", error);
  }
};

/**
 * Check if a movie is in the Watch Later list
 * @param {number} movieId - Movie ID to check
 * @returns {boolean} True if movie is in Watch Later list
 */
export const isInWatchLater = (movieId) => {
  const watchLaterMovies = getWatchLaterMovies();
  return watchLaterMovies.some((movie) => movie.id === movieId);
};

/**
 * Clear all movies from Watch Later list
 */
export const clearWatchLater = () => {
  try {
    localStorage.removeItem(WATCHLIST_KEY);
    console.log("Watch Later list cleared");
  } catch (error) {
    console.error("Error clearing Watch Later list:", error);
  }
};

/**
 * Get the count of movies in Watch Later list
 * @returns {number} Number of movies in Watch Later list
 */
export const getWatchLaterCount = () => {
  return getWatchLaterMovies().length;
};

/**
 * Setup Watch Later functionality
 * This function can be called to initialize any Watch Later related features
 */
export const setupWatchlist = () => {
  // Update Watch Later count in navbar if element exists
  updateWatchLaterCount();

  // Listen for storage changes from other tabs
  window.addEventListener("storage", (e) => {
    if (e.key === WATCHLIST_KEY) {
      updateWatchLaterCount();
      // You could also refresh the current view if showing Watch Later movies
    }
  });
};

/**
 * Update the Watch Later count display
 */
const updateWatchLaterCount = () => {
  const watchLaterBtn = document.getElementById("watch-later-toggle");
  if (watchLaterBtn) {
    const count = getWatchLaterCount();
    const baseText = watchLaterBtn.textContent.includes("Back")
      ? "⬅️ Back to Movies"
      : "📺 Watch Later";

    if (count > 0 && !watchLaterBtn.textContent.includes("Back")) {
      watchLaterBtn.innerHTML = `📺 Watch Later (${count})`;
    } else if (!watchLaterBtn.textContent.includes("Back")) {
      watchLaterBtn.innerHTML = "📺 Watch Later";
    }
  }
};
