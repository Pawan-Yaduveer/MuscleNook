import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import CalorieCalculator from "../components/CalorieCalculator";
import FormContainer from "../components/FormContainer";
import Footer from "../components/Footer";
import BgImage from "../assets/images/bgimage.jpg";
import "./BMRCalculator.css";

const BMRCalculator = () => {
  const [currentView, setCurrentView] = useState("form");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const getHeadingText = () => {
    switch (currentView) {
      case "form":
        return "BMR Calculator";
      case "results":
        return "BMR Results";
      case "supplements":
        return "Required Supplements";
      default:
        return "BMR Calculator";
    }
  };

  return (
    <>
      <div 
        className="bmr-page-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%), url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Container className="bmr-container">
          <div className="bmr-header">
            <Typography variant="h1" className="bmr-main-title">
              BMR Calculator
            </Typography>
            <Typography variant="h4" className="bmr-subtitle">
              Calculate your Basal Metabolic Rate and daily caloric needs for optimal health and fitness
            </Typography>
          </div>

          <FormContainer>
            <Box className="bmr-content-container">
              <Typography variant="h4" className="bmr-dynamic-heading">
                {getHeadingText()}
              </Typography>
              
              <CalorieCalculator onViewChange={handleViewChange} />
            </Box>
          </FormContainer>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default BMRCalculator;
