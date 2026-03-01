import "./Features.css";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";

const Features = () => {
  return (
    <section className="features-section container">
      <h2>More reasons to join</h2>

      <div className="features-grid">
        <FeatureCard
          title="Enjoy on your TV"
          desc="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV and more."
          icon={icon1}
        />
        <FeatureCard
          title="Download your shows to watch offline"
          desc="Save your favourites easily and always have something to watch."
          icon={icon2}
        />
        <FeatureCard
          title="Watch everywhere"
          desc="Stream unlimited movies and TV shows on your phone, tablet, laptop and TV."
          icon={icon3}
        />
        <FeatureCard
          title="Create profiles for kids"
          desc="Send kids on adventures with their favourite characters in a space made just for them."
          icon={icon4}
        />
      </div>
    </section>
  );
};

const FeatureCard = ({ title, desc, icon }) => (
  <div className="feature-card">
    <div className="feature-content">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
    <div className="feature-icon">
      <img src={icon} alt="" />
    </div>
  </div>
);

export default Features;
