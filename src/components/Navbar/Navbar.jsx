import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Refs to handle click outside
  const langRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  // Handle Scroll Transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Click Outside Dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".hamburger-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Shows", path: "/category/tv" },
    { name: "Movies", path: "/category/movies" },
    { name: "New & Popular", path: "/category/new" },
    { name: "My List", path: "/my-list" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "nav-dark" : "nav-transparent"}`}>
      <div className="navbar-container">
        {/* =============== LEFT =============== */}
        <div className="navbar-left">
          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="hamburger-btn"
            aria-label="Toggle Navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`hamburger-icon ${isMobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <img
            src={logo}
            alt="StreamVerse logo"
            className="logo"
            onClick={() => navigate("/home")}
            aria-hidden="true"
          />

          {/* Desktop Navigation Links */}
          <ul className="desktop-menu">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {/* Language Dropdown */}
            <li
              className="language-dropdown-container"
              ref={langRef}
              onMouseEnter={() =>
                window.innerWidth > 768 && setLangDropdownOpen(true)
              }
              onMouseLeave={() =>
                window.innerWidth > 768 && setLangDropdownOpen(false)
              }
            >
              <button
                className="language-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
              >
                Languages
                <img
                  src={caret_icon}
                  alt=""
                  className={`caret-icon ${langDropdownOpen ? "rotated" : ""}`}
                />
              </button>

              <div className={`lang-menu ${langDropdownOpen ? "visible" : ""}`}>
                <button
                  onClick={() => {
                    navigate("/language/en");
                    setLangDropdownOpen(false);
                  }}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    navigate("/language/hi");
                    setLangDropdownOpen(false);
                  }}
                >
                  Hindi
                </button>
                <button
                  onClick={() => {
                    navigate("/language/te");
                    setLangDropdownOpen(false);
                  }}
                >
                  Telugu
                </button>
              </div>
            </li>
          </ul>
        </div>

        {/* =============== RIGHT =============== */}
        <div className="navbar-right">
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => navigate("/search")}
          >
            <img src={search_icon} alt="search" className="icons" />
          </button>

          {/* Notifications Dropdown */}
          <div
            className="navbar-profile"
            ref={notificationsRef}
            onMouseEnter={() =>
              window.innerWidth > 768 && setNotificationsOpen(true)
            }
            onMouseLeave={() =>
              window.innerWidth > 768 && setNotificationsOpen(false)
            }
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <button
              className="icon-btn notification-btn"
              aria-label="Notifications"
            >
              <img src={bell_icon} alt="notifications" className="icons" />
              <span className="notification-dot"></span>
            </button>

            <div
              className={`notifications-dropdown ${notificationsOpen ? "visible" : ""}`}
            >
              <div className="notification-item">
                <img
                  src={logo}
                  alt="StreamVerse Logo"
                  className="notification-img"
                />
                <div className="notification-text">
                  <p className="notification-title">New Arrival</p>
                  <p className="notification-desc">
                    Stranger Things Season 5 is now available to watch!
                  </p>
                  <p className="notification-time">2 hours ago</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="notification-item">
                <img
                  src={logo}
                  alt="StreamVerse Logo"
                  className="notification-img"
                />
                <div className="notification-text">
                  <p className="notification-title">Recommendation</p>
                  <p className="notification-desc">
                    Based on your activity, we think you'll love The Witcher.
                  </p>
                  <p className="notification-time">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div
            className="navbar-profile"
            ref={profileRef}
            onMouseEnter={() =>
              window.innerWidth > 768 && setProfileDropdownOpen(true)
            }
            onMouseLeave={() =>
              window.innerWidth > 768 && setProfileDropdownOpen(false)
            }
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <img src={profile_img} alt="profile avatar" className="profile" />
            <img
              src={caret_icon}
              alt=""
              className={`caret-icon ${profileDropdownOpen ? "rotated" : ""}`}
            />

            <div
              className={`profile-dropdown ${profileDropdownOpen ? "visible" : ""}`}
            >
              <div className="profile-dropdown-header">
                <img src={profile_img} alt="" className="profile-small" />
                <span>User Account</span>
              </div>
              <div className="dropdown-divider"></div>
              <button onClick={() => navigate("/home")}>Manage Profiles</button>
              <button onClick={() => navigate("/home")}>Account</button>
              <button onClick={() => navigate("/help")}>Help Center</button>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="sign-out-btn">
                Sign out of StreamVerse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =============== MOBILE MENU SIDEBAR =============== */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "visible" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <aside
        ref={mobileMenuRef}
        className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu-header">
          <div className="mobile-profile-info">
            <img src={profile_img} alt="" className="profile-mobile" />
            <div className="mobile-profile-text">
              <span className="user-name">User Account</span>
              <span className="switch-profile">Switch Profiles</span>
            </div>
          </div>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "mobile-nav-link active" : "mobile-nav-link"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li className="mobile-divider"></li>
          <li className="mobile-section-title">Languages</li>
          <li>
            <button
              className="mobile-nav-button"
              onClick={() => navigate("/language/en")}
            >
              English
            </button>
          </li>
          <li>
            <button
              className="mobile-nav-button"
              onClick={() => navigate("/language/hi")}
            >
              Hindi
            </button>
          </li>
          <li>
            <button
              className="mobile-nav-button"
              onClick={() => navigate("/language/te")}
            >
              Telugu
            </button>
          </li>
        </ul>

        <div className="mobile-menu-footer">
          <button onClick={handleLogout} className="mobile-sign-out">
            Sign Out
          </button>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
