import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getByTypeAndCategory } from "../../services/tmdb";
import "./Category.css";
import play_icon from "../../assets/play_icon.png";

const Category = () => {
  const { type } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map route params to API config dynamically
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
    return configs[type] || configs.movies; // Fallback to movies if invalid type
  };

  const { title, apiType, category } = getConfig();

  useEffect(() => {
    // Scroll to top when category changes
    window.scrollTo(0, 0);
    setLoading(true);

    getByTypeAndCategory(apiType, category)
      .then((res) => {
        // Filter out items without a backdrop image for a cleaner UI
        const validResults = (res.results || []).filter(
          (item) => item.backdrop_path,
        );
        setData(validResults);
      })
      .catch((err) => {
        console.error("Error fetching category data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [type, apiType, category]);

  // Loading Skeleton Array
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
            ? // Render Skeleton Loaders
              skeletonCards.map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="category-card skeleton-card"
                >
                  <div className="skeleton-image"></div>
                </div>
              ))
            : // Render Actual Cards
              data.map((item) => (
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
      </div>
    </div>
  );
};

export default Category;
