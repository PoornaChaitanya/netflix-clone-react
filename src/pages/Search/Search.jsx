import { useEffect, useState } from "react";
import { searchMulti } from "../../services/tmdb";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Search.css";
import "../../components/TitleCards/TitleCards.css";
import play_icon from "../../assets/play_icon.png";

const VALID_TYPES = ["movie", "tv"];

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  // Fresh search on new query
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setPage(1);
      setTotalPages(1);
      return;
    }

    setLoading(true);
    setError(false);
    setPage(1);

    searchMulti(debouncedQuery, 1)
      .then((res) => {
        const valid = (res.results || []).filter(
          (r) => VALID_TYPES.includes(r.media_type) && r.backdrop_path,
        );
        setResults(valid);
        setTotalPages(res.total_pages || 1);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [debouncedQuery]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);

    searchMulti(debouncedQuery, nextPage)
      .then((res) => {
        const valid = (res.results || []).filter(
          (r) => VALID_TYPES.includes(r.media_type) && r.backdrop_path,
        );
        setResults((prev) => [...prev, ...valid]);
        setPage(nextPage);
        setLoadingMore(false);
      })
      .catch(() => setLoadingMore(false));
  };

  const hasMore = page < totalPages;

  return (
    <div className="search-page">
      <Navbar />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies & TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          autoFocus
        />

        {!query && (
          <p className="search-placeholder">
            Start typing to search movies and TV shows...
          </p>
        )}

        {loading && <div className="search-spinner" />}

        {error && (
          <p className="search-error">
            Something went wrong. Please try again.
          </p>
        )}

        {!loading && query && results.length === 0 && !error && (
          <p className="search-status">No results found for "{query}".</p>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="search-result-text">
              Showing {results.length} results for "{query}"
            </p>

            <div className="search-grid">
              {results.map((item) => (
                <Link
                  key={`${item.media_type}-${item.id}`}
                  to={`/player/${item.media_type}/${item.id}`}
                  className="tc-card"
                >
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    alt={item.title || item.name}
                  />
                  <div className="tc-overlay">
                    <div className="tc-overlay-content">
                      <h4>{item.title || item.name}</h4>
                      <div className="tc-play-btn">
                        <img src={play_icon} alt="Play" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
