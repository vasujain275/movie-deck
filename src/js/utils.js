// Utility functions for the Movie Explorer Dashboard

// Debounce function to limit the rate at which a function can fire
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// Function to save a movie to local storage
export const saveToWatchLater = (movie) => {
    const watchLaterList = getWatchLaterList();
    watchLaterList.push(movie);
    localStorage.setItem('watchLater', JSON.stringify(watchLaterList));
};

// Function to retrieve the watch later list from local storage
export const getWatchLaterList = () => {
    const list = localStorage.getItem('watchLater');
    return list ? JSON.parse(list) : [];
};

// Function to remove a movie from the watch later list
export const removeFromWatchLater = (movieId) => {
    const watchLaterList = getWatchLaterList();
    const updatedList = watchLaterList.filter(movie => movie.id !== movieId);
    localStorage.setItem('watchLater', JSON.stringify(updatedList));
};