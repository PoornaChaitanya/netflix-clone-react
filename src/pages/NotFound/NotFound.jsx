import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <div className="notfound-divider" />
        <div className="notfound-text">
          <h2>Lost your way?</h2>
          <p>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <button className="notfound-btn" onClick={() => navigate("/home")}>
            StreamVerse Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
