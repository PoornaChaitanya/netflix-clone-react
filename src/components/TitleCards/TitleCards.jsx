import { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { getMoviesByCategory } from "../../services/tmdb";
import play_icon from "../../assets/play_icon.png";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const cardsRef = useRef(null);

  const handleScroll = (direction) => {
    if (cardsRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      cardsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);

    getMoviesByCategory(category || "now_playing")
      .then((res) => {
        setApiData((res.results || []).filter((m) => m.backdrop_path));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on StreamVerse"}</h2>

      <div className="card-list-container">
        <button
          className="scroll-btn scroll-left"
          aria-label="Scroll left"
          onClick={() => handleScroll("left")}
        >
          &#10094;
        </button>

        <div
          className="card-list"
          ref={cardsRef}
          onWheel={(e) => {
            e.preventDefault();
            if (cardsRef.current) cardsRef.current.scrollLeft += e.deltaY;
          }}
        >
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="tc-card tc-skeleton" />
            ))}

          {error && <p className="error-text">Failed to load content.</p>}

          {!loading &&
            !error &&
            apiData.map((card) => (
              <Link
                key={card.id}
                to={`/player/movie/${card.id}`}
                className="tc-card"
              >
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.title || card.original_title}
                />
                {/* Same overlay structure as category-card */}
                <div className="tc-overlay">
                  <div className="tc-overlay-content">
                    <h4>{card.title || card.original_title}</h4>
                    <div className="tc-play-btn">
                      <img src={play_icon} alt="Play" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <button
          className="scroll-btn scroll-right"
          aria-label="Scroll right"
          onClick={() => handleScroll("right")}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default TitleCards;
