import React from "react";
import { Box, Container, Typography } from "@mui/material";
import BgImage from "../assets/images/bgimage.jpg";
import NutritionCheckerForm from "../components/NutritionCheckerForm";
import Footer from "../components/Footer";
import "./NutritionChecker.css";

const NutritionChecker = () => {
  return (
    <>
      <div 
        className="nutrition-page-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%), url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Container className="nutrition-container">
          <div className="nutrition-header">
            <Typography variant="h1" className="nutrition-main-title">
              Nutrition Checker
            </Typography>
            <Typography variant="h4" className="nutrition-subtitle">
              Analyze your meals and get detailed nutritional insights to make informed food choices
            </Typography>
          </div>
          
          <Box className="nutrition-form-container">
            <NutritionCheckerForm />
          </Box>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default NutritionChecker;
