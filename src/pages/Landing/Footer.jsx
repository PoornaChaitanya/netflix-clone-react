import "./Footer.css";
import EmailCTA from "./EmailCTA";

const Footer = () => {
  return (
    <footer className="landing-footer container">
      <p>Questions? Call 000-800-919-1743</p>

      <div className="footer-grid">
        <div>
          <a>FAQ</a>
          <a>Investor Relations</a>
          <a>Privacy</a>
          <a>Speed Test</a>
        </div>
        <div>
          <a>Help Centre</a>
          <a>Jobs</a>
          <a>Cookie Preferences</a>
          <a>Legal Notices</a>
        </div>
        <div>
          <a>Account</a>
          <a>Ways to Watch</a>
          <a>Corporate Information</a>
          <a>Only on Netflix</a>
        </div>
        <div>
          <a>Media Centre</a>
          <a>Terms of Use</a>
          <a>Contact Us</a>
        </div>
      </div>

      <select className="language-select footer-lang">
        <option>English</option>
        <option>हिन्दी</option>
      </select>

      <p className="country">Netflix India</p>
    </footer>
  );
};

export default Footer;
