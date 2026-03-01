import "./Landing.css";
import Hero from "./Hero";
import Trending from "./Trending";
import Features from "./Features";
import FAQ from "./FAQ";
import BottomCTA from "./EmailCTA";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <Hero />
      <div className="purple-divider"></div>
      <Trending />
      <Features />
      <FAQ />
      <BottomCTA />
      <Footer />
    </div>
  );
};

export default Landing;
