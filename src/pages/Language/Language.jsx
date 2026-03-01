import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getByLanguage } from "../../services/tmdb";
import "./Language.css";

const Language = () => {
  const { lang } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getByLanguage(lang).then((res) => {
      setData(res.results || []);
    });
  }, [lang]);

  return (
    <div className="category-page">
      <Navbar />
      <div className="category-container">
        <h1>Language: {lang.toUpperCase()}</h1>

        <div className="category-grid">
          {data.map(
            (item) =>
              item.backdrop_path && (
                <Link
                  key={item.id}
                  to={`/player/${item.id}`}
                  className="category-card"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
                    alt={item.title}
                  />

                  <div className="category-overlay">
                    <h4>{item.title || item.name}</h4>
                    <p>
                      {item.release_date ? item.release_date.slice(0, 4) : ""}
                    </p>
                  </div>
                </Link>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Language;
