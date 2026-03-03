import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <a
          href="https://www.facebook.com/netflix/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebook_icon} alt="facebook logo" />
        </a>
        <a
          href="https://www.instagram.com/netflix/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram_icon} alt="instagram logo" />
        </a>
        <a
          href="https://twitter.com/netflix"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter_icon} alt="twitter logo" />
        </a>
        <a
          href="https://www.youtube.com/netflix"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtube_icon} alt="youtube logo" />
        </a>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">© 1997-2026 StreamVerse, Inc.</p>
    </div>
  );
};

export default Footer;
