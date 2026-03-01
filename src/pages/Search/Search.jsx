import { useEffect, useState } from "react";
import { searchMovies } from "../../services/tmdb";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(false);

    searchMovies(debouncedQuery)
      .then((res) => {
        setResults(res.results || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [debouncedQuery]);

  return (
    <div className="search-page">
      <Navbar />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies, shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        {!query && (
          <p className="search-placeholder">
            Start typing to search for movies...
          </p>
        )}

        {loading && <p className="search-status">Searching...</p>}

        {error && (
          <p className="search-error">
            Something went wrong. Please try again.
          </p>
        )}

        {!loading && query && results.length === 0 && !error && (
          <p className="search-status">No results found.</p>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="search-result-text">
              Showing {results.length} results for "{query}"
            </p>

            <div className="search-grid">
              {results.map(
                (movie) =>
                  movie.backdrop_path && (
                    <Link
                      key={movie.id}
                      to={`/player/${movie.id}`}
                      className="search-card"
                    >
                      <img
                        loading="lazy"
                        src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                        alt={movie.title}
                      />
                      <div className="search-overlay">
                        <h4>{movie.title}</h4>
                        <p>
                          {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "N/A"}
                        </p>
                      </div>
                    </Link>
                  ),
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
