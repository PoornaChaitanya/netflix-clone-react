import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Hero.css";
import EmailCTA from "./EmailCTA";
import heroBg from "/background_banner.jpg";
import logo from "../../assets/logo.png";

const Hero = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <section className="landing" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="landing-overlay">
        <nav className="landing-nav">
          <img src={logo} alt="Netflix Logo" className="landing-logo" />

          <div className="landing-nav-right">
            <select className="language-select">
              <option>English</option>
              <option>हिन्दी</option>
            </select>

            <button className="signin-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </nav>

        <div className="landing-content">
          <h1>
            Unlimited movies, <br /> shows, and more
          </h1>
          <h3>Starts at ₹149. Cancel at any time.</h3>

          <EmailCTA />
        </div>
      </div>

      <div className="hero-fade"></div>
    </section>
  );
};

export default Hero;
