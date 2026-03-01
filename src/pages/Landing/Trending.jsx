import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/tmdb";
import "./Trending.css";

const Trending = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrendingMovies()
      .then((res) => setTrending(res.results || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="trending-section container">
      <h2>Trending Now</h2>

      <div className="trending-row">
        {trending.slice(0, 10).map((movie, index) => (
          <div key={movie.id} className="trending-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <span className="ranking">{index + 1}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
