import React from 'react';
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import "./Home.css";

const HeroBanner = () => {
  return (
    <Container maxWidth="xl" className="hero-container">
      <Grid container spacing={4} alignItems="center" className="hero-grid">
        <Grid item xs={12} lg={7} className="hero-content">
          <Box className="hero-text-container">
            {/* Main Headline */}
            <Typography
              variant="h1"
              className="hero-headline"
              gutterBottom
            >
              Transform Your
              <span className="highlight-text"> Fitness Journey</span>
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h4"
              className="hero-subtitle"
              gutterBottom
            >
              Professional guidance, personalized workouts, and comprehensive nutrition tracking
            </Typography>

            {/* Features List */}
            <Box className="hero-features">
              <Box className="feature-item">
                <FitnessCenterIcon className="feature-icon" />
                <Typography variant="body1" className="feature-text">
                  AI-Powered Workout Recommendations
                </Typography>
              </Box>
              <Box className="feature-item">
                <TrendingUpIcon className="feature-icon" />
                <Typography variant="body1" className="feature-text">
                  Progress Tracking & Analytics
                </Typography>
              </Box>
              <Box className="feature-item">
                <RestaurantIcon className="feature-icon" />
                <Typography variant="body1" className="feature-text">
                  Smart Nutrition Planning
                </Typography>
              </Box>
            </Box>

            {/* Call to Action Buttons */}
            <Box className="hero-actions">
              <Button
                component={Link}
                to="/pages/features"
                variant="contained"
                size="large"
                className="primary-cta-button"
              >
                Explore Features
              </Button>
              <Button
                component={Link}
                to="/pages/register"
                variant="outlined"
                size="large"
                className="secondary-cta-button"
              >
                Start Free Trial
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={5} className="hero-visual">
          <Box className="hero-image-container">
            <div className="floating-card card-1">
              <Typography variant="h6" className="card-title">Workout Plans</Typography>
              <Typography variant="body2" className="card-subtitle">Personalized routines</Typography>
            </div>
            <div className="floating-card card-2">
              <Typography variant="h6" className="card-title">Progress Stats</Typography>
              <Typography variant="body2" className="card-subtitle">Track your gains</Typography>
            </div>
            <div className="floating-card card-3">
              <Typography variant="h6" className="card-title">Nutrition Guide</Typography>
              <Typography variant="body2" className="card-subtitle">Smart meal planning</Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroBanner;
