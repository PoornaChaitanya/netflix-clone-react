import { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { getMoviesByCategory } from "../../services/tmdb";
import { useWatchlist } from "../../context/WatchlistContext";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const cardsRef = useRef(null);
  const { addToWatchlist } = useWatchlist();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getMoviesByCategory(category || "now_playing")
      .then((res) => {
        setApiData(res.results || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>

      <div
        className="card-list"
        ref={cardsRef}
        onWheel={(e) => {
          e.preventDefault();
          if (cardsRef.current) {
            cardsRef.current.scrollLeft += e.deltaY;
          }
        }}
      >
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton-card" />
          ))}

        {error && <p className="error-text">Failed to load movies.</p>}

        {!loading &&
          !error &&
          apiData.map(
            (card) =>
              card.backdrop_path && (
                <div className="card-wrapper" key={card.id}>
                  <Link to={`/player/${card.id}`} className="card">
                    <img
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/w300${card.backdrop_path}`}
                      alt={card.original_title}
                    />
                    <p>{card.original_title}</p>
                  </Link>
                </div>
              ),
          )}
      </div>
    </div>
  );
};

export default TitleCards;
