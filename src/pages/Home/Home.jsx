import { useEffect, useState, useCallback } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { getMoviesByCategory } from "../../services/tmdb";
import { useNavigate } from "react-router-dom";

const SLIDE_INTERVAL = 7000;

const Home = () => {
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMoviesByCategory("popular")
      .then((res) => {
        if (res?.results?.length > 0) {
          const valid = res.results.filter((m) => m.backdrop_path).slice(0, 8);
          setHeroMovies(valid);
        }
      })
      .catch((err) => console.error("Failed to load hero movies:", err));
  }, []);

  const goToSlide = useCallback((index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 400);
  }, []);

  // Auto-advance every SLIDE_INTERVAL ms
  useEffect(() => {
    if (heroMovies.length === 0) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
        setFade(true);
      }, 400);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [heroMovies.length]);

  const heroMovie = heroMovies[currentIndex];

  return (
    <div className="home">
      <Navbar />

      <div className="hero">
        {heroMovie ? (
          <>
            <img
              key={heroMovie.id}
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
              alt={heroMovie.title}
              className={`banner-img dynamic-banner hero-fade ${fade ? "visible" : ""}`}
            />
            <div className={`hero-caption hero-fade ${fade ? "visible" : ""}`}>
              <h1 className="caption-title">
                {heroMovie.original_title || heroMovie.name || heroMovie.title}
              </h1>
              <p>{heroMovie.overview}</p>
              <div className="hero-btns">
                <button
                  className="btn"
                  onClick={() => navigate(`/player/movie/${heroMovie.id}`)}
                >
                  <img src={play_icon} alt="play icon" />
                  Play
                </button>
                <button
                  className="btn dark-btn"
                  onClick={() => navigate(`/player/movie/${heroMovie.id}`)}
                >
                  <img src={info_icon} alt="info icon" />
                  More Info
                </button>
              </div>
            </div>

            {heroMovies.length > 1 && (
              <div className="hero-dots">
                {heroMovies.map((_, i) => (
                  <button
                    key={i}
                    className={`hero-dot ${i === currentIndex ? "active" : ""}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="hero-placeholder" />
        )}
      </div>

      <div className="more-cards">
        <TitleCards category="now_playing" />
        <TitleCards title="Blockbuster Movies" category="top_rated" />
        <TitleCards title="Only on StreamVerse" category="popular" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Top picks for you" category="now_playing" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
