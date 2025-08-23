import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Divider,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";
import { 
  WaterDrop, 
  Add, 
  Remove, 
  TrendingUp, 
  LocalDrink,
  Refresh
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useUpdateWaterIntakeMutation } from "../slices/usersApiSlice";
import "./Profile.css";

const WaterIntakeLog = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [totalWater, setTotalWater] = useState(0);
  const [loggedWater, setLoggedWater] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2.5); // Default 2.5L daily goal

  const [updateWaterIntake] = useUpdateWaterIntakeMutation();

  useEffect(() => {
    const fetchWaterIntake = async () => {
      try {
        const response = await fetch(`/api/users/water-intake/${currentDate}`);
        const data = await response.json();

        setTotalWater(data.litersDrank || 0);

        const waterIntakeData = JSON.stringify(data);
        localStorage.setItem("waterIntake", waterIntakeData);
      } catch (error) {
        console.error("Fetch water intake error:", error);
        setTotalWater(0);
      }
    };

    // Load the water intake from local storage
    const storedWaterIntake = localStorage.getItem("waterIntake");
    if (storedWaterIntake) {
      const parsedWaterIntake = JSON.parse(storedWaterIntake);
      setTotalWater(parsedWaterIntake.litersDrank || 0);
    } else {
      fetchWaterIntake();
    }
  }, [currentDate]);

  const handleChange = (event) => {
    const { value } = event.target;
    setLoggedWater(parseFloat(value) || 0);
  };

  const handleUpdate = async (increment) => {
    try {
      const newTotalWater = increment
        ? totalWater + loggedWater
        : Math.max(0, totalWater - loggedWater);

      const waterIntakeData = {
        litersDrank: newTotalWater,
      };

      // Save the water intake to local storage
      localStorage.setItem("waterIntake", JSON.stringify(waterIntakeData));

      const updatedWaterIntake = await updateWaterIntake(
        waterIntakeData
      ).unwrap();

      if (updatedWaterIntake) {
        toast.success("Water intake updated successfully!");
        setTotalWater(updatedWaterIntake.litersDrank);
        setLoggedWater(0);
      }
    } catch (error) {
      toast.error("Failed to save the water intake.");
      console.error("Save water intake error:", error);
    }
  };

  const resetWaterIntake = () => {
    setTotalWater(0);
    setLoggedWater(0);
    localStorage.removeItem("waterIntake");
    toast.info("Water intake reset for today");
  };

  const getProgressPercentage = () => {
    return Math.min((totalWater / dailyGoal) * 100, 100);
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return "#4CAF50"; // Green
    if (percentage >= 75) return "#FF9800"; // Orange
    if (percentage >= 50) return "#2196F3"; // Blue
    return "#F44336"; // Red
  };

  const getHydrationStatus = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return "Excellent! You're well hydrated! 💧";
    if (percentage >= 75) return "Great progress! Almost there! 🚰";
    if (percentage >= 50) return "Good start! Keep drinking water! 💪";
    return "Time to hydrate! Start drinking water! 🥤";
  };

  return (
    <Box className="water-intake-container">
      {/* Header Section */}
      <Paper elevation={3} className="water-intake-paper">
        <Box className="water-intake-header">
          <Typography variant="h4" className="water-intake-title">
            <WaterDrop className="water-intake-icon" />
            Water Intake Tracker
          </Typography>
          <Typography variant="body1" className="water-intake-subtitle">
            Stay hydrated and track your daily water consumption for optimal health
          </Typography>
        </Box>

        <Divider className="water-intake-divider" />

        {/* Daily Progress */}
        <Box className="water-progress-section">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="progress-info">
                <Typography variant="h6" className="progress-title">
                  Today's Progress
                </Typography>
                <Typography variant="h3" className="water-amount">
                  {totalWater.toFixed(2)}L
                </Typography>
                <Typography variant="body2" className="water-goal">
                  of {dailyGoal}L daily goal
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box className="progress-visual">
                <Box className="progress-bar-container">
                  <LinearProgress
                    variant="determinate"
                    value={getProgressPercentage()}
                    sx={{
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getProgressColor(),
                        borderRadius: 10,
                      }
                    }}
                  />
                  <Typography variant="body2" className="progress-percentage">
                    {getProgressPercentage().toFixed(1)}%
                  </Typography>
                </Box>
                
                <Typography variant="body1" className="hydration-status">
                  {getHydrationStatus()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Water Logging Section */}
      <Paper elevation={3} className="water-logging-paper">
        <Box className="water-logging-container">
          <Typography variant="h6" className="logging-section-title">
            Log Water Intake
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Amount (liters)"
                value={loggedWater}
                onChange={handleChange}
                className="water-input"
                placeholder="0.25"
                inputProps={{
                  min: 0,
                  step: 0.05,
                  max: 5
                }}
                InputProps={{
                  startAdornment: <LocalDrink className="input-icon" />
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Box className="water-actions">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdate(true)}
                  disabled={loggedWater <= 0}
                  className="add-water-button"
                  startIcon={<Add />}
                  fullWidth
                >
                  Add Water
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Box className="water-actions">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleUpdate(false)}
                  disabled={loggedWater <= 0 || totalWater <= 0}
                  className="subtract-water-button"
                  startIcon={<Remove />}
                  fullWidth
                >
                  Subtract Water
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box className="reset-section">
            <Button
              variant="text"
              onClick={resetWaterIntake}
              className="reset-button"
              startIcon={<Refresh />}
            >
              Reset for Today
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Quick Add Buttons */}
      <Paper elevation={3} className="quick-add-paper">
        <Box className="quick-add-container">
          <Typography variant="h6" className="quick-add-title">
            Quick Add
          </Typography>
          
          <Grid container spacing={2} className="quick-add-buttons">
            {[0.25, 0.5, 1, 1.5, 2].map((amount) => (
              <Grid item key={amount}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setLoggedWater(amount);
                    handleUpdate(true);
                  }}
                  className="quick-add-button"
                  startIcon={<WaterDrop />}
                >
                  +{amount}L
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      {/* Hydration Tips */}
      <Paper elevation={3} className="hydration-tips-paper">
        <Box className="hydration-tips-container">
          <Typography variant="h6" className="tips-title">
            💡 Hydration Tips
          </Typography>
          
          <Grid container spacing={2} className="tips-grid">
            <Grid item xs={12} sm={6} md={4}>
              <Card className="tip-card" elevation={1}>
                <CardContent className="tip-content">
                  <Typography variant="body2" className="tip-text">
                    <strong>Morning:</strong> Start your day with 1-2 glasses of water
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card className="tip-card" elevation={1}>
                <CardContent className="tip-content">
                  <Typography variant="body2" className="tip-text">
                    <strong>During Exercise:</strong> Drink water every 15-20 minutes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card className="tip-card" elevation={1}>
                <CardContent className="tip-content">
                  <Typography variant="body2" className="tip-text">
                    <strong>Evening:</strong> Reduce intake 2 hours before bedtime
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default WaterIntakeLog;
