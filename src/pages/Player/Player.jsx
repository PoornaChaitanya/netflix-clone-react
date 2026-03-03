import { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMovieVideos,
  getMovieDetails,
  getTVVideos,
  getTVDetails,
} from "../../services/tmdb";
import TitleCards from "../../components/TitleCards/TitleCards";
import Navbar from "../../components/Navbar/Navbar";
import { useWatchlist } from "../../context/WatchlistContext";

const Player = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const [videoData, setVideoData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTV = type === "tv";
  const isInWatchlist = metaData && watchlist.some((m) => m.id === metaData.id);

  const handleWatchlistToggle = () => {
    if (!metaData) return;
    if (isInWatchlist) {
      removeFromWatchlist(metaData.id);
    } else {
      addToWatchlist({ ...metaData, media_type: isTV ? "tv" : "movie" });
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    setLoading(true);

    const videoFn = isTV ? getTVVideos : getMovieVideos;
    const detailsFn = isTV ? getTVDetails : getMovieDetails;

    Promise.all([
      videoFn(id).catch(() => null),
      detailsFn(id).catch(() => null),
    ]).then(([videoRes, metaRes]) => {
      const trailer = videoRes?.results?.find(
        (video) => video.type === "Trailer",
      );
      setVideoData(trailer || null);
      setMetaData(metaRes || null);
      setLoading(false);
    });
  }, [id, isTV]);

  // For TV shows use 'name', movies use 'title'
  const displayTitle =
    metaData?.title ||
    metaData?.name ||
    metaData?.original_title ||
    metaData?.original_name;
  const releaseYear = (
    metaData?.release_date || metaData?.first_air_date
  )?.substring(0, 4);
  const runtime = metaData?.runtime || metaData?.episode_run_time?.[0];

  // Genre-based "More Like This" category
  const getRelatedCategory = () => {
    const genreId = metaData?.genres?.[0]?.id;
    const map = {
      28: "top_rated", // Action
      53: "top_rated", // Thriller
      35: "now_playing", // Comedy
      18: "now_playing", // Drama
      16: "upcoming", // Animation
      10751: "upcoming", // Family
    };
    return map[genreId] || "popular";
  };

  return (
    <div className="info-page">
      <Navbar />

      <div className="info-hero">
        <div className="back-btn-container" onClick={handleBack}>
          <img src={back_arrow_icon} alt="back arrow" />
          <span>Back</span>
        </div>

        {loading ? (
          <div className="player-loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="trailer-container">
              {videoData?.key ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoData.key}?autoplay=1&mute=0&controls=1`}
                  title="trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="no-trailer">
                  {metaData?.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${metaData.backdrop_path}`}
                      alt="Backdrop"
                    />
                  ) : (
                    <p>Trailer Unavailable</p>
                  )}
                </div>
              )}
            </div>

            {metaData && (
              <div className="meta-container">
                <h1 className="movie-title">{displayTitle}</h1>

                <div className="movie-stats">
                  <span className="match-score">
                    {(metaData.vote_average * 10).toFixed(0)}% Match
                  </span>
                  {releaseYear && <span>{releaseYear}</span>}
                  {isTV && metaData.number_of_seasons && (
                    <span>
                      {metaData.number_of_seasons}{" "}
                      {metaData.number_of_seasons === 1 ? "Season" : "Seasons"}
                    </span>
                  )}
                  {!isTV && runtime > 0 && (
                    <span>
                      {Math.floor(runtime / 60)}h {runtime % 60}m
                    </span>
                  )}
                  <span className="hd-badge">HD</span>
                  {isTV && <span className="tv-badge">TV</span>}
                </div>

                <p className="movie-overview">{metaData.overview}</p>

                {metaData.genres && (
                  <div className="movie-genres">
                    <span className="label">Genres: </span>
                    {metaData.genres.map((g) => g.name).join(", ")}
                  </div>
                )}

                <button
                  className={`watchlist-btn ${isInWatchlist ? "in-list" : ""}`}
                  onClick={handleWatchlistToggle}
                >
                  {isInWatchlist ? "Added to My List" : "Add to My List"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="more-like-this">
        {metaData?.genres?.length > 0 && (
          <TitleCards title="More Like This" category={getRelatedCategory()} />
        )}
      </div>
    </div>
  );
};

export default Player;
