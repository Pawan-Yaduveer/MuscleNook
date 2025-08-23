import React from "react";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import BgImage from "../assets/images/bgimage.jpg";

const Home = () => {
  return (
    <>
      <div
        className="home-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%), url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div className="home-overlay">
          <HeroBanner />
          <HomeContent />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
