import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import BgImage from "../assets/images/bgimage.jpg";
import "./About.css";

const AboutUs = () => {
  const features = [
    {
      title: "Personal Account",
      description: "Create and manage your personalized fitness profile",
      icon: "👤"
    },
    {
      title: "Diet Profile",
      description: "Track your nutritional preferences and dietary restrictions",
      icon: "🍎"
    },
    {
      title: "Goal Settings",
      description: "Set and monitor your fitness and health objectives",
      icon: "🎯"
    },
    {
      title: "Meal Planner",
      description: "Plan your weekly meals with smart recommendations",
      icon: "📅"
    },
    {
      title: "Water Intake Log",
      description: "Monitor your daily hydration and set water goals",
      icon: "💧"
    },
    {
      title: "Workout Database",
      description: "Access comprehensive exercise library and routines",
      icon: "🏋️‍♂️"
    },
    {
      title: "Nutrition Checker",
      description: "Analyze your meals for nutritional content",
      icon: "🔍"
    },
    {
      title: "BMR Calculator",
      description: "Calculate your daily caloric needs accurately",
      icon: "🧮"
    }
  ];

  return (
    <>
      <div 
        className="about-page-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%), url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Container className="about-container">
          <div className="about-header">
            <h1 className="about-main-title">About MuscleNook</h1>
            <p className="about-subtitle">
              Empowering your fitness journey with innovative technology and comprehensive wellness solutions
            </p>
          </div>

          <Row className="about-content">
            <Col lg={8} className="about-description">
              <Card className="about-description-card">
                <Card.Body>
                  <h2 className="about-section-title">Our Mission</h2>
                  <p className="about-text">
                    MuscleNook is a cutting-edge fitness platform designed to revolutionize how people approach their health and wellness goals. 
                    We believe that everyone deserves access to professional-grade fitness tools and personalized guidance, regardless of their 
                    experience level or fitness background.
                  </p>
                  
                  <h2 className="about-section-title">What We Offer</h2>
                  <p className="about-text">
                    Our comprehensive platform provides users with an extensive suite of tools and resources to support their fitness journey. 
                    From personalized workout plans to advanced nutrition tracking, we've built everything you need to succeed.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} className="about-stats">
              <Card className="stats-card">
                <Card.Body>
                  <h3 className="stats-title">Platform Stats</h3>
                  <div className="stat-item">
                    <div className="stat-number">8+</div>
                    <div className="stat-label">Core Features</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">1000+</div>
                    <div className="stat-label">Exercises</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Support</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="features-showcase">
            <h2 className="features-showcase-title">Our Core Features</h2>
            <Row className="features-grid">
              {features.map((feature, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="feature-item-col">
                  <Card className="feature-showcase-card">
                    <Card.Body>
                      <div className="feature-icon-large">{feature.icon}</div>
                      <h4 className="feature-showcase-title">{feature.title}</h4>
                      <p className="feature-showcase-description">{feature.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
