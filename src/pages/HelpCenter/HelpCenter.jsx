import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HelpCenter.css";
import logo from "../../assets/logo.png";
import helpIcon1 from "../../assets/help_icon1.png";
import helpIcon2 from "../../assets/help_icon2.png";
import helpIcon3 from "../../assets/help_icon3.png";
import downArrow from "../../assets/down_arrow.png";
import searchIcon from "../../assets/search_icon.svg";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <div className="help-center-page">
      {/* Header */}
      <header className="help-header">
        <div className="help-header-content">
          <div className="help-logo-container">
            <img
              src={logo}
              alt="StreamVerse Logo"
              className="help-logo"
              onClick={() => navigate("/home")}
            />
            <span className="help-logo-separator">|</span>
            <span className="help-logo-text">Help Center</span>
          </div>
          <div className="help-header-actions">
            <button className="help-join-btn" onClick={() => navigate("/")}>
              Join StreamVerse
            </button>
            <button
              className="help-signin-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="help-hero">
        <div className="help-hero-content">
          <h1>How can we help?</h1>
          <div className="help-search-box">
            <img src={searchIcon} alt="search" className="search-icon" />
            <input type="text" placeholder="Type a question, topic or issue" />
          </div>
          <div className="help-popular-topics">
            <strong>Popular topics:</strong>{" "}
            <a href="#">How to sign up for StreamVerse</a>,{" "}
            <a href="#">Plans and Pricing</a>,{" "}
            <a href="#">Can't sign in to StreamVerse</a>,{" "}
            <a href="#">Parental controls on StreamVerse</a>
          </div>

          <div className="help-explore-topics">
            <strong>Explore Topics</strong>
            <img
              src={downArrow}
              alt="explore topics"
              className="explore-arrow"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="help-main">
        <div className="help-vertical-list">
          {/* Account and Billing */}
          <div className="help-topic-card">
            <div className="help-topic-header">
              <img src={helpIcon1} alt="profile logo" className="topic-icon" />
              <h2>Account and Billing</h2>
            </div>
            <div className="help-topic-items">
              <div
                className="help-topic-item"
                onClick={() => toggleSection("account_settings")}
              >
                <h3>Account Settings</h3>
                <img
                  src={downArrow}
                  alt="expand"
                  className={`chevron ${openSection === "account_settings" ? "expanded" : ""}`}
                />
              </div>
              {openSection === "account_settings" && (
                <div className="help-topic-content">
                  <ul>
                    <li>
                      <a href="#">How to change your password</a>
                    </li>
                    <li>
                      <a href="#">How to change your email</a>
                    </li>
                    <li>
                      <a href="#">How to update your phone number</a>
                    </li>
                  </ul>
                </div>
              )}

              <div
                className="help-topic-item"
                onClick={() => toggleSection("paying")}
              >
                <h3>Paying for StreamVerse</h3>
                <img
                  src={downArrow}
                  alt="expand"
                  className={`chevron ${openSection === "paying" ? "expanded" : ""}`}
                />
              </div>
              {openSection === "paying" && (
                <div className="help-topic-content">
                  <ul>
                    <li>
                      <a href="#">Billing and Payments</a>
                    </li>
                    <li>
                      <a href="#">Updating your payment method</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Fix a Problem */}
          <div className="help-topic-card">
            <div className="help-topic-header">
              <img src={helpIcon2} alt="tool logo" className="topic-icon" />
              <h2>Fix a Problem</h2>
            </div>
            <div className="help-topic-items">
              <div className="help-topic-item">
                <h3>Account Issues</h3>
                <img src={downArrow} alt="expand" className="chevron" />
              </div>
              <div className="help-topic-item">
                <h3>Billing Issues</h3>
                <img src={downArrow} alt="expand" className="chevron" />
              </div>
              <div className="help-topic-item">
                <h3>Error Codes</h3>
                <img src={downArrow} alt="expand" className="chevron" />
              </div>
              <div className="help-topic-item">
                <h3>Problems Watching</h3>
                <img src={downArrow} alt="expand" className="chevron" />
              </div>
            </div>
          </div>

          {/* Watching and Playing */}
          <div className="help-topic-card">
            <div className="help-topic-header">
              <img src={helpIcon3} alt="desktop logo" className="topic-icon" />
              <h2>Watching and Playing</h2>
            </div>
            <div className="help-topic-items">
              <div className="help-topic-item">
                <h3>Profiles</h3>
                <img src={downArrow} alt="expand" className="chevron" />
              </div>
              <div className="help-topic-item">
                <h3>Supported Devices</h3>
                <img src={downArrow} alt="expand" className="chevron" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="help-footer">
        <div className="help-footer-content">
          <ul className="help-footer-links">
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Cookie Preferences</a>
            </li>
            <li>
              <a href="#">Corporate Information</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;
