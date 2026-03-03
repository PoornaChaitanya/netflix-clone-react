import { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { getMoviesByCategory } from "../../services/tmdb";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMoviesByCategory("popular")
      .then((res) => {
        if (res?.results?.length > 0) {
          const randomMovie =
            res.results[Math.floor(Math.random() * res.results.length)];
          setHeroMovie(randomMovie);
        }
      })
      .catch((err) => console.error("Failed to load hero movie:", err));
  }, []);

  return (
    <div className="home">
      <Navbar />

      <div className="hero">
        {heroMovie ? (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
              alt="movie image"
              className="banner-img dynamic-banner"
            />
            <div className="hero-caption">
              <h1 className="caption-title">
                {heroMovie.original_title || heroMovie.name || heroMovie.title}
              </h1>
              <p>{heroMovie.overview}</p>
              <div className="hero-btns">
                <button
                  className="btn"
                  onClick={() => navigate(`/player/${heroMovie.id}`)}
                >
                  <img src={play_icon} alt="play icon" />
                  Play
                </button>
                <button className="btn dark-btn">
                  <img src={info_icon} alt="info icon" />
                  More Info
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hero-placeholder"></div>
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
