import "./Footer.css";

const Footer = () => {
  return (
    <footer className="landing-footer container">
      <p>This is a frontend portfolio project built for learning purposes.</p>

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
          <a>Only on StreamVerse</a>
        </div>
        <div>
          <a>Media Centre</a>
          <a>Terms of Use</a>
          <a>Contact Us</a>
        </div>
      </div>

      <select className="language-select footer-lang">
        <option>English</option>
      </select>

      <p className="country">StreamVerse India</p>
    </footer>
  );
};

export default Footer;
