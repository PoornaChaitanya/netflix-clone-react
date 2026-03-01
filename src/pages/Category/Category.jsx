import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getByTypeAndCategory } from "../../services/tmdb";
import "./Category.css";

const Category = () => {
  const { type } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getConfig = () => {
    switch (type) {
      case "tv":
        return {
          title: "Popular TV Shows",
          apiType: "tv",
          category: "popular",
        };
      case "movies":
        return {
          title: "Top Rated Movies",
          apiType: "movie",
          category: "top_rated",
        };
      case "new":
        return {
          title: "Now Playing",
          apiType: "movie",
          category: "now_playing",
        };
      default:
        return { title: "Popular", apiType: "movie", category: "popular" };
    }
  };

  const { title, apiType, category } = getConfig();

  useEffect(() => {
    setLoading(true);

    if (type === "tv") {
      getByTypeAndCategory("tv", "popular").then((res) => {
        setData(res.results || []);
        setLoading(false);
      });
    } else if (type === "movies") {
      getByTypeAndCategory("movie", "top_rated").then((res) => {
        setData(res.results || []);
        setLoading(false);
      });
    } else if (type === "new") {
      getByTypeAndCategory("movie", "now_playing").then((res) => {
        setData(res.results || []);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [type]);

  return (
    <div className="category-page">
      <Navbar />

      <div className="category-container">
        <h1>{title}</h1>

        {loading && <p>Loading...</p>}

        <div className="category-grid">
          {!loading &&
            data.map(
              (item) =>
                item.backdrop_path && (
                  <Link
                    key={item.id}
                    to={`/player/${item.id}`}
                    className="category-card"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
                      alt={item.title || item.name}
                    />
                    <div className="category-overlay">
                      <h4>{item.title || item.name}</h4>
                    </div>
                  </Link>
                ),
            )}
        </div>
      </div>
    </div>
  );
};

export default Category;
