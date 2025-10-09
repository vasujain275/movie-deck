/**
 * API module for handling TMDB API requests
 * Provides functions to fetch movies, genres, and search functionality
 * Uses TMDB v4 API with Bearer token authentication
 */

import { API_KEY, BASE_URL } from "../../config.js";

// Base configuration for API requests with Bearer token
const API_CONFIG = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * Generic fetch function with error handling and Bearer token
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} API response data
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const config = {
      ...API_CONFIG,
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Fetch trending movies from TMDB API v4
 * @param {string} timeWindow - Time window for trending ('day' or 'week')
 * @returns {Promise<Array>} Array of trending movies
 */
const fetchTrendingMovies = async (timeWindow = "week") => {
  try {
    const data = await apiRequest(`/trending/movie/${timeWindow}`);
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

/**
 * Fetch popular movies from TMDB API v4
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of popular movies
 */
const fetchPopularMovies = async (page = 1) => {
  try {
    const data = await apiRequest(`/movie/popular?page=${page}`);
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

/**
 * Fetch genres from TMDB API
 * @returns {Promise<Array>} Array of movie genres
 */
const fetchGenres = async () => {
  try {
    const data = await apiRequest("/genre/movie/list");
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

/**
 * Search movies by query using Bearer token authentication
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of search results
 */
const searchMovies = async (query, page = 1) => {
  try {
    const data = await apiRequest(
      `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    );
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

/**
 * Fetch movies by genre using Bearer token authentication
 * @param {number} genreId - Genre ID to filter by
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of movies in the specified genre
 */
const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const data = await apiRequest(
      `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
    );
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

/**
 * Fetch movie details by ID
 * @param {number} movieId - Movie ID
 * @returns {Promise<Object>} Movie details
 */
const fetchMovieDetails = async (movieId) => {
  try {
    const data = await apiRequest(
      `/movie/${movieId}?append_to_response=credits,videos,reviews`
    );
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

/**
 * Fetch now playing movies
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of now playing movies
 */
const fetchNowPlayingMovies = async (page = 1) => {
  try {
    const data = await apiRequest(`/movie/now_playing?page=${page}`);
    return data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

/**
 * Fetch top rated movies
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of top rated movies
 */
const fetchTopRatedMovies = async (page = 1) => {
  try {
    const data = await apiRequest(`/movie/top_rated?page=${page}`);
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

export {
  fetchGenres,
  fetchMovieDetails,
  fetchMoviesByGenre,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  searchMovies,
};
