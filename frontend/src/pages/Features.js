import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./Features.css";
import BgImage from "../assets/images/bgimage.jpg";

const FeatureCard = ({ title, description, link, image }) => {
  return (
    <Card className="professional-feature-card">
      <div className="feature-image-container">
        <img src={image} alt={title} className="feature-image" />
        <div className="feature-overlay">
          <div className="feature-icon">🏋️‍♂️</div>
        </div>
      </div>
      <Card.Body className="feature-card-body">
        <Card.Title className="feature-title">{title}</Card.Title>
        <Card.Text className="feature-description">{description}</Card.Text>
        <Link to={link} className="professional-feature-button">
          Explore Feature
        </Link>
      </Card.Body>
    </Card>
  );
};

const FeaturesPage = () => {
  const features = [
    {
      title: "Workout Database",
      description:
        "Access our comprehensive exercise library with detailed instructions, video demonstrations, and personalized workout recommendations.",
      link: "/pages/workouts",
      image: "https://images.stockcake.com/public/1/4/4/1442875a-a4ae-491f-ba37-3d892d972779_large/intense-lifting-session-stockcake.jpg",
    },
    {
      title: "Nutrition Checker",
      description:
        "Analyze your meals with our advanced nutrition database. Get detailed breakdowns of calories, macros, and micronutrients.",
      link: "/pages/nutrition-checker",
      image: "https://scontent.flko11-1.fna.fbcdn.net/v/t1.6435-9/122007326_144477494055796_97532102392258088_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=MLacDqtrVFAQ7kNvgH2z_CI&_nc_zt=23&_nc_ht=scontent.flko11-1.fna&_nc_gid=A-NOkl9nRt5E1KSh5ivCTDr&oh=00_AYCHfIEUU29gQ5ClUptdXCcLm6rshCmHgY4k_GQXFJu6lQ&oe=67925F64",
    },
    {
      title: "BMR Calculator",
      description:
        "Calculate your Basal Metabolic Rate and daily caloric needs. Get personalized insights to optimize your nutrition plan.",
      link: "/pages/bmr-calculator",
      image: "https://myyogaayurveda.com/wp-content/uploads/2022/05/flat-infographic-metabolism-level-scale-with-arrow-measurement-value_88138-934.webp",
    },
    {
      title: "Create Account",
      description:
        "Join our fitness community to track progress, save workouts, and unlock personalized features tailored to your goals.",
      link: "/pages/register",
      image: "https://www.shutterstock.com/shutterstock/videos/3633134879/thumb/8.jpg?ip=x480",
    },
    {
      title: "Meal Planner",
      description:
        "Plan your weekly meals with our intelligent meal planner. Get recipe suggestions, shopping lists, and nutritional guidance.",
      link: "/pages/profile/meal-plan",
      image: "https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/17537/logo.png",
    },
    {
      title: "Water Intake Log",
      description:
        "Track your daily hydration with our water intake logger. Set reminders and monitor your hydration goals for optimal health.",
      link: "/pages/profile/meal-plan",
      image: "https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?cs=srgb&dl=pexels-pixabay-327090.jpg&fm=jpg",
    },
  ];

  return (
    <>
      <div 
        className="features-page-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%), url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Container className="features-container">
          <div className="features-header">
            <h1 className="features-main-title">Discover Our Features</h1>
            <p className="features-subtitle">
              Transform your fitness journey with our comprehensive suite of tools and features
            </p>
          </div>

          <Row className="features-grid">
            {features.map((feature, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="feature-col">
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  link={feature.link}
                  image={feature.image}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default FeaturesPage;
