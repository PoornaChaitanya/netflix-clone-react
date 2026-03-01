import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      navRef.current.classList.toggle("nav-dark", window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav ref={navRef} className="navbar">
      {/* LEFT SIDE */}
      <div className="navbar-left">
        <img
          src={logo}
          alt="Netflix logo"
          className="logo"
          onClick={() => navigate("/home")}
        />

        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category/tv"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Shows
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category/movies"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Movies
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category/new"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              New & Popular
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-list"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My List
            </NavLink>
          </li>

          {/* Language Dropdown */}
          <li className="language-dropdown">
            <span>Browse by Language</span>
            <div className="language-menu">
              <button onClick={() => navigate("/language/en")}>English</button>
              <button onClick={() => navigate("/language/hi")}>Hindi</button>
              <button onClick={() => navigate("/language/te")}>Telugu</button>
            </div>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-right">
        <img
          src={search_icon}
          alt="search"
          className="icons"
          onClick={() => navigate("/search")}
        />

        <img src={bell_icon} alt="notifications" className="icons" />

        <div className="navbar-profile">
          <img src={profile_img} alt="profile" className="profile" />
          <img src={caret_icon} alt="caret" />

          <div className="dropdown">
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
