import React from "react";
import { Box, Container, Typography } from "@mui/material";
import BgImage from "../assets/images/bgimage.jpg";
import ExercisePage from "../components/ExerciseDB";
import Footer from "../components/Footer";
import "./Workouts.css";

const Workouts = () => {
  return (
    <>
      <div 
        className="workouts-page-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%), url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Container className="workouts-container">
          <div className="workouts-header">
            <Typography variant="h1" className="workouts-main-title">
              Exercise Database
            </Typography>
            <Typography variant="h4" className="workouts-subtitle">
              Discover thousands of exercises with detailed instructions and video demonstrations
            </Typography>
          </div>
          
          <Box className="exercise-container">
            <ExercisePage />
          </Box>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Workouts;
