import { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieVideos } from "../../services/tmdb";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    setLoading(true);

    getMovieVideos(id)
      .then((res) => {
        const trailer = res.results?.find((video) => video.type === "Trailer");

        setVideoData(trailer || null);
        setLoading(false);
      })
      .catch(() => {
        setVideoData(null);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="back arrow"
        onClick={handleBack}
        className="back-btn"
      />

      {loading && <p className="player-loading">Loading trailer...</p>}

      {!loading && videoData?.key && (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${videoData.key}`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <div className="player-info">
            <p>{videoData.published_at?.slice(0, 10)}</p>
            <p>{videoData.name}</p>
            <p>{videoData.type}</p>
          </div>
        </>
      )}

      {!loading && !videoData && (
        <p className="player-empty">Trailer unavailable.</p>
      )}
    </div>
  );
};

export default Player;
