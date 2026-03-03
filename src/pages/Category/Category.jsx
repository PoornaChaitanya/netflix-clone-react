import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getByTypeAndCategory } from "../../services/tmdb";
import "./Category.css";
import play_icon from "../../assets/play_icon.png";

const Category = () => {
  const { type } = useParams();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const getConfig = () => {
    const configs = {
      tv: { title: "Popular TV Shows", apiType: "tv", category: "popular" },
      movies: {
        title: "Top Rated Movies",
        apiType: "movie",
        category: "top_rated",
      },
      new: {
        title: "New & Popular",
        apiType: "movie",
        category: "now_playing",
      },
    };
    return configs[type] || configs.movies;
  };

  const { title, apiType, category } = getConfig();

  // Reset and fetch page 1 whenever category type changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setPage(1);

    getByTypeAndCategory(apiType, category, 1)
      .then((res) => {
        const valid = (res.results || []).filter((item) => item.backdrop_path);
        setData(valid);
        setTotalPages(res.total_pages || 1);
      })
      .catch((err) => console.error("Error fetching category data:", err))
      .finally(() => setLoading(false));
  }, [type, apiType, category]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);

    getByTypeAndCategory(apiType, category, nextPage)
      .then((res) => {
        const valid = (res.results || []).filter((item) => item.backdrop_path);
        setData((prev) => [...prev, ...valid]);
        setPage(nextPage);
      })
      .catch((err) => console.error("Error loading more:", err))
      .finally(() => setLoadingMore(false));
  };

  const hasMore = page < totalPages;
  const skeletonCards = Array(20).fill(null);

  return (
    <div className="category-page">
      <Navbar />

      <div className="category-hero">
        <div className="hero-content">
          <h1>{title}</h1>
          <p>
            Explore the best {apiType === "tv" ? "shows" : "movies"} handpicked
            for you.
          </p>
        </div>
      </div>

      <div className="category-container">
        <div className="category-grid">
          {loading
            ? skeletonCards.map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="category-card skeleton-card"
                >
                  <div className="skeleton-image"></div>
                </div>
              ))
            : data.map((item) => (
                <Link
                  key={item.id}
                  to={`/player/${apiType}/${item.id}`}
                  className="category-card"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    alt={item.title || item.name}
                    loading="lazy"
                  />
                  <div className="category-overlay">
                    <div className="overlay-content">
                      <h4>{item.title || item.name}</h4>
                      <div className="play-icon-container">
                        <img src={play_icon} alt="Play" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {!loading && data.length === 0 && (
          <div className="no-results">
            <h2>No content found for this category.</h2>
          </div>
        )}

        {!loading && hasMore && (
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
