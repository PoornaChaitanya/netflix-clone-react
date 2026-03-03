const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

// Fetch Function
const fetchFromTMDB = async (endpoint) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, options);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

// Specific API Calls
export const getMoviesByCategory = (category) =>
  fetchFromTMDB(`movie/${category}?language=en-US&page=1`);

export const getByTypeAndCategory = (type, category, page = 1) =>
  fetchFromTMDB(`${type}/${category}?language=en-US&page=${page}`);

export const getMovieVideos = (id) =>
  fetchFromTMDB(`movie/${id}/videos?language=en-US`);

export const getMovieDetails = (id) =>
  fetchFromTMDB(`movie/${id}?language=en-US`);

export const getTVVideos = (id) =>
  fetchFromTMDB(`tv/${id}/videos?language=en-US`);

export const getTVDetails = (id) => fetchFromTMDB(`tv/${id}?language=en-US`);

export const searchMulti = (query, page = 1) =>
  fetchFromTMDB(
    `search/multi?query=${encodeURIComponent(query)}&language=en-US&page=${page}&include_adult=false`,
  );

export const searchMovies = (query) =>
  fetchFromTMDB(
    `search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
  );

export const getByLanguage = (lang, page = 1) =>
  fetchFromTMDB(
    `discover/movie?with_original_language=${lang}&language=en-US&page=${page}`,
  );

export const getTrendingMovies = () => fetchFromTMDB("trending/movie/week");
