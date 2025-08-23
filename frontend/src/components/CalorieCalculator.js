import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Chip } from "@mui/material";
import { FitnessCenter, TrendingUp, Restaurant, Scale, Calculate } from "@mui/icons-material";
import "./calorie.css";

const CalorieCalculator = ({ onViewChange }) => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activityLevel: "sedentary"
  });

  const [results, setResults] = useState(null);
  const [currentView, setCurrentView] = useState("form");

  const activityMultipliers = {
    sedentary: 1.2,      // Little or no exercise
    lightlyActive: 1.375, // Light exercise/sports 1-3 days/week
    moderatelyActive: 1.55, // Moderate exercise/sports 3-5 days/week
    veryActive: 1.725,    // Hard exercise/sports 6-7 days a week
    extremelyActive: 1.9  // Very hard exercise/sports & physical job
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateCalories = (e) => {
    e.preventDefault();
    
    if (!formData.age || !formData.weight || !formData.height) {
      alert("Please fill in all fields");
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (formData.gender === "male") {
      bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age) + 5;
    } else {
      bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age) - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[formData.activityLevel];

    // Calculate different calorie goals
    const weightLoss = Math.round(tdee - 500); // 500 calorie deficit
    const maintenance = Math.round(tdee);
    const weightGain = Math.round(tdee + 500); // 500 calorie surplus

    // Calculate BMI
    const bmi = (formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1);
    
    // Determine BMI category
    let bmiCategory = "";
    let bmiColor = "";
    if (bmi < 18.5) {
      bmiCategory = "Underweight";
      bmiColor = "#ff9800";
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = "Normal Weight";
      bmiColor = "#4caf50";
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = "Overweight";
      bmiColor = "#ff9800";
    } else {
      bmiCategory = "Obese";
      bmiColor = "#f44336";
    }

    // Calculate macros for maintenance
    const protein = Math.round(formData.weight * 2.2); // 1g per lb of body weight
    const fat = Math.round((maintenance * 0.25) / 9); // 25% of calories from fat
    const carbs = Math.round((maintenance - (protein * 4) - (fat * 9)) / 4); // Remaining calories from carbs

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss,
      maintenance,
      weightGain,
      bmi,
      bmiCategory,
      bmiColor,
      protein,
      fat,
      carbs
    });

    setCurrentView("results");
    onViewChange("results");
  };

  const resetCalculator = () => {
    setFormData({
      age: "",
      weight: "",
      height: "",
      gender: "male",
      activityLevel: "sedentary"
    });
    setResults(null);
    setCurrentView("form");
    onViewChange("form");
  };

  const renderForm = () => (
    <Paper elevation={3} className="calculator-form-paper">
      <Box className="calculator-form-container">
        <Typography variant="h5" className="form-title">
          <Calculate className="form-icon" />
          Calculate Your Daily Calorie Needs
        </Typography>
        
        <form onSubmit={calculateCalories}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age (years)"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="calculator-input"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="calculator-input"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height (cm)"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="calculator-input"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Gender"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="calculator-input"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Activity Level"
                value={formData.activityLevel}
                onChange={(e) => handleInputChange("activityLevel", e.target.value)}
                className="calculator-input"
                helperText="Select your daily activity level for accurate calculations"
              >
                <MenuItem value="sedentary">Sedentary (Little or no exercise)</MenuItem>
                <MenuItem value="lightlyActive">Lightly Active (Light exercise 1-3 days/week)</MenuItem>
                <MenuItem value="moderatelyActive">Moderately Active (Moderate exercise 3-5 days/week)</MenuItem>
                <MenuItem value="veryActive">Very Active (Hard exercise 6-7 days/week)</MenuItem>
                <MenuItem value="extremelyActive">Extremely Active (Very hard exercise & physical job)</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="calculate-button"
                fullWidth
              >
                Calculate My Calories
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );

  const renderResults = () => (
    <Paper elevation={3} className="results-paper">
      <Box className="results-container">
        <Typography variant="h5" className="results-title">
          <TrendingUp className="results-icon" />
          Your Calorie Analysis Results
        </Typography>

        {/* BMR and TDEE Section */}
        <Grid container spacing={3} className="results-grid">
          <Grid item xs={12} md={6}>
            <Paper elevation={2} className="metric-card bmr-card">
              <Typography variant="h6" className="metric-title">
                <Scale className="metric-icon" />
                Basal Metabolic Rate (BMR)
              </Typography>
              <Typography variant="h4" className="metric-value">
                {results.bmr} calories
              </Typography>
              <Typography variant="body2" className="metric-description">
                Calories your body needs at complete rest
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} className="metric-card tdee-card">
              <Typography variant="h6" className="metric-title">
                <FitnessCenter className="metric-icon" />
                Total Daily Energy Expenditure (TDEE)
              </Typography>
              <Typography variant="h4" className="metric-value">
                {results.tdee} calories
              </Typography>
              <Typography variant="body2" className="metric-description">
                Total calories needed based on your activity level
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Calorie Goals Section */}
        <Typography variant="h6" className="section-title">
          Daily Calorie Goals
        </Typography>
        
        <Grid container spacing={2} className="calorie-goals-grid">
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} className="goal-card weight-loss-card">
              <Typography variant="h6" className="goal-title">Weight Loss</Typography>
              <Typography variant="h4" className="goal-calories">{results.weightLoss}</Typography>
              <Typography variant="body2" className="goal-description">500 calorie deficit</Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} className="goal-card maintenance-card">
              <Typography variant="h6" className="goal-title">Maintenance</Typography>
              <Typography variant="h4" className="goal-calories">{results.maintenance}</Typography>
              <Typography variant="body2" className="goal-description">Maintain current weight</Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} className="goal-card weight-gain-card">
              <Typography variant="h6" className="goal-title">Weight Gain</Typography>
              <Typography variant="h4" className="goal-calories">{results.weightGain}</Typography>
              <Typography variant="body2" className="goal-description">500 calorie surplus</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* BMI Section */}
        <Typography variant="h6" className="section-title">
          Body Mass Index (BMI)
        </Typography>
        
        <Paper elevation={2} className="bmi-card">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className="bmi-value">
                {results.bmi}
              </Typography>
              <Typography variant="body1" className="bmi-label">Your BMI</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Chip
                label={results.bmiCategory}
                style={{ backgroundColor: results.bmiColor, color: 'white' }}
                className="bmi-chip"
              />
              <Typography variant="body2" className="bmi-description">
                BMI Category
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Macros Section */}
        <Typography variant="h6" className="section-title">
          Recommended Daily Macros
        </Typography>
        
        <Grid container spacing={2} className="macros-grid">
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} className="macro-card protein-card">
              <Typography variant="h6" className="macro-title">Protein</Typography>
              <Typography variant="h4" className="macro-value">{results.protein}g</Typography>
              <Typography variant="body2" className="macro-description">
                Build and repair muscle
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} className="macro-card carbs-card">
              <Typography variant="h6" className="macro-title">Carbohydrates</Typography>
              <Typography variant="h4" className="macro-value">{results.carbs}g</Typography>
              <Typography variant="body2" className="macro-description">
                Energy for workouts
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} className="macro-card fat-card">
              <Typography variant="h6" className="macro-title">Fat</Typography>
              <Typography variant="h4" className="macro-value">{results.fat}g</Typography>
              <Typography variant="body2" className="macro-description">
                Hormone production
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box className="action-buttons">
          <Button
            variant="outlined"
            onClick={resetCalculator}
            className="reset-button"
          >
            Calculate Again
          </Button>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <div className="calorie-calculator">
      {currentView === "form" ? renderForm() : renderResults()}
    </div>
  );
};

export default CalorieCalculator;
