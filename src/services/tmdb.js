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

export const getByTypeAndCategory = (type, category) =>
  fetchFromTMDB(`${type}/${category}?language=en-US&page=1`);

export const getMovieVideos = (id) =>
  fetchFromTMDB(`movie/${id}/videos?language=en-US`);

export const searchMovies = (query) =>
  fetchFromTMDB(`search/movie?query=${query}&language=en-US&page=1`);

export const getByLanguage = (lang) =>
  fetchFromTMDB(
    `discover/movie?with_original_language=${lang}&language=en-US&page=1`,
  );

export const getTrendingMovies = () => fetchFromTMDB("trending/movie/week");
