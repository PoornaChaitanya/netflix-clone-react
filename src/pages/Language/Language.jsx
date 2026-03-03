import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getByLanguage } from "../../services/tmdb";
import "../Category/Category.css";
import play_icon from "../../assets/play_icon.png";

const languageNames = {
  en: "English",
  hi: "Hindi",
  te: "Telugu",
  ta: "Tamil",
  ja: "Japanese",
  ko: "Korean",
  es: "Spanish",
  fr: "French",
};

const Language = () => {
  const { lang } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get full language name or default to the code (uppercase)
  const fullLanguageName = languageNames[lang.toLowerCase()] || lang.toUpperCase();

  useEffect(() => {
    // Scroll to top when language route changes
    window.scrollTo(0, 0);
    setLoading(true);

    getByLanguage(lang)
      .then((res) => {
        // Filter out items without a backdrop image for a cleaner UI
        const validResults = (res.results || []).filter(item => item.backdrop_path);
        setData(validResults);
      })
      .catch((err) => {
        console.error("Error fetching language data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lang]);

  // Loading Skeleton Array
  const skeletonCards = Array(20).fill(null);

  return (
    <div className="category-page">
      <Navbar />

      <div className="category-hero">
        <div className="hero-content">
          <h1>{fullLanguageName} Movies & TV</h1>
          <p>Explore the best international and local hits in {fullLanguageName}.</p>
        </div>
      </div>

      <div className="category-container">
        <div className="category-grid">
          {loading ? (
            // Render Skeleton Loaders
            skeletonCards.map((_, index) => (
              <div key={`skeleton-${index}`} className="category-card skeleton-card">
                <div className="skeleton-image"></div>
              </div>
            ))
          ) : (
            // Render Actual Cards
            data.map((item) => (
              <Link
                key={item.id}
                to={`/player/${item.id}`}
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
            ))
          )}
        </div>

        {!loading && data.length === 0 && (
          <div className="no-results">
            <h2>No content found for this language.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Language;
