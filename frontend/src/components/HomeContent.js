import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container, Carousel } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Home.css";

const HomeContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const workoutImages = [
    {
      src: "https://images.stockcake.com/public/7/0/7/707de8aa-8fc7-4a44-ae75-b43b3e205f6e_large/intense-gym-workout-stockcake.jpg",
      alt: "Intense Gym Workout",
      title: "Strength Training",
      description: "Build muscle and increase your strength with our proven programs"
    },
    {
      src: "https://images.stockcake.com/public/7/2/1/721c7c9a-47a4-4226-8ff8-0bab07c5128e_large/intense-workout-session-stockcake.jpg",
      alt: "Intense Workout Session",
      title: "Cardio Fitness",
      description: "Boost your endurance and burn calories effectively"
    },
    {
      src: "https://i.ytimg.com/vi/b2NO_SoCd0g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBRxoTJ1lCoy3qOgN5qXfNn7xG4GA",
      alt: "Fitness Motivation",
      title: "Motivation",
      description: "Stay inspired and push through your fitness challenges"
    },
    {
      src: "https://i.ytimg.com/vi/gey73xiS8F4/maxresdefault.jpg",
      alt: "Workout Routine",
      title: "Routine Building",
      description: "Create sustainable habits for long-term fitness success"
    },
    {
      src: "https://images.stockcake.com/public/5/6/c/56c0cadf-4024-40c7-94b6-f530b2e302fd_large/intense-gym-workout-stockcake.jpg",
      alt: "Gym Workout",
      title: "Muscle Building",
      description: "Transform your physique with targeted muscle development"
    },
    {
      src: "https://img.freepik.com/premium-photo/muscular-woman-doing-back-training-with-barbell-gym-fit-woman-weightlifting-gym_360066-6048.jpg",
      alt: "Weightlifting",
      title: "Power Training",
      description: "Unlock your power potential with progressive overload"
    },
    {
      src: "https://img.freepik.com/premium-photo/couple-training-gym_926199-2696503.jpg",
      alt: "Couple Training",
      title: "Partner Workouts",
      description: "Train together and achieve your goals as a team"
    },
    {
      src: "https://miro.medium.com/v2/resize:fit:1400/1*-1D7YmRD8R0tprwZCsxjow.jpeg",
      alt: "Fitness Journey",
      title: "Your Journey",
      description: "Every step brings you closer to your fitness dreams"
    }
  ];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % workoutImages.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? workoutImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home-content-section">
      <Container className="home-content-container">
        <Row className="break-limits-section">
          <Col className="text-center">
            <h2 className="break-limits-title">BREAK THE LIMITS!!</h2>
            <p className="break-limits-subtitle">
              Push beyond your boundaries and discover your true potential
            </p>
          </Col>
        </Row>

        <Row className="workout-gallery-section">
          <Col className="text-center">
            <h3 className="gallery-title">Transform Your Fitness Journey</h3>
            <p className="gallery-subtitle">
              Every workout brings you closer to your goals
            </p>
          </Col>
        </Row>

        <Row className="carousel-section">
          <Col className="text-center">
            <div className="carousel-container">
              <Carousel
                activeIndex={activeIndex}
                onSelect={handleSelect}
                interval={5000}
                pause="hover"
                className="workout-carousel"
                indicators={false}
                controls={false}
              >
                {workoutImages.map((image, index) => (
                  <Carousel.Item key={index} className="carousel-item">
                    <div className="carousel-image-container">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="carousel-image"
                      />
                      <div className="carousel-overlay">
                        <div className="carousel-content">
                          <h3 className="carousel-title">{image.title}</h3>
                          <p className="carousel-description">{image.description}</p>
                          <Button
                            as={Link}
                            to="/pages/workouts"
                            className="carousel-cta-button"
                            size="lg"
                          >
                            Explore {image.title}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>

              {/* Custom Navigation Controls */}
              <div className="carousel-controls">
                <button 
                  className="carousel-control-btn prev-btn"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  className="carousel-control-btn next-btn"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <FaChevronRight />
                </button>
              </div>

              {/* Custom Indicators */}
              <div className="carousel-indicators">
                {workoutImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="cta-section">
          <Col className="text-center">
            <Button
              as={Link}
              to="/pages/register"
              className="cta-button"
              size="lg"
            >
              Start Your Journey Today
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeContent;
