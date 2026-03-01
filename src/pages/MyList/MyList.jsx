import { useWatchlist } from "../../context/WatchlistContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./MyList.css";

const MyList = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="mylist-page">
      <Navbar />
      <div className="mylist-container">
        <h2>My List</h2>

        {watchlist.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          <div className="mylist-grid">
            {watchlist.map((movie) => (
              <div key={movie.id} className="mylist-card">
                <Link to={`/player/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                </Link>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
