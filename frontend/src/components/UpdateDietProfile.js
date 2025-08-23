import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Divider,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Chip,
  CircularProgress
} from "@mui/material";
import { 
  Height, 
  Scale, 
  TrendingUp, 
  Person, 
  Wc, 
  DirectionsRun, 
  Flag,
  Restaurant,
  Calculate,
  Save
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useUpdateStatusMutation } from "../slices/usersApiSlice";
import "./Profile.css";

const UpdateDietProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    goalWeight: "",
    age: "",
    gender: "",
    activityLevel: "",
    goal: ""
  });

  const [updateStatus] = useUpdateStatusMutation();

  const [nutritionData, setNutritionData] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
  });

  const activityLevels = [
    { value: "sedentary", label: "Sedentary", description: "Little or no exercise" },
    { value: "lightlyActive", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { value: "active", label: "Active", description: "Moderate exercise 3-5 days/week" },
    { value: "veryActive", label: "Very Active", description: "Hard exercise 6-7 days/week" }
  ];

  const goals = [
    { value: "Maintenance", label: "Maintenance", description: "Maintain current weight" },
    { value: "Cutting", label: "Cutting", description: "Lose weight and fat" },
    { value: "Bulking", label: "Bulking", description: "Gain muscle and weight" }
  ];

  const genders = [
    { value: "male", label: "Male", icon: "👨" },
    { value: "female", label: "Female", icon: "👩" },
    { value: "other", label: "Other", icon: "👤" }
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/user/status");
        const data = await response.json();

        setFormData({
          height: data.height || "",
          weight: data.weight || "",
          goalWeight: data.goalWeight || "",
          age: data.age || "",
          gender: data.gender || "",
          activityLevel: data.activityLevel || "",
          goal: data.goal || ""
        });

        const profileData = JSON.stringify(data);
        localStorage.setItem("profileData", profileData);
        setIsLoading(false);
      } catch (err) {
        toast.error("Failed to fetch profile data.");
        setIsLoading(false);
      }
    };

    const profileData = localStorage.getItem("profileData");
    if (profileData) {
      const parsedData = JSON.parse(profileData);
      setFormData({
        height: parsedData.height || "",
        weight: parsedData.weight || "",
        goalWeight: parsedData.goalWeight || "",
        age: parsedData.age || "",
        gender: parsedData.gender || "",
        activityLevel: parsedData.activityLevel || "",
        goal: parsedData.goal || ""
      });
      setIsLoading(false);
    } else {
      fetchProfileData();
    }
  }, []);

  useEffect(() => {
    if (formData.weight && formData.activityLevel && formData.goal) {
      const activityMultiplier = {
        sedentary: 1.4,
        lightlyActive: 1.6,
        active: 1.8,
        veryActive: 2.0,
      }[formData.activityLevel];

      let calculatedCalories = formData.weight * 22 * activityMultiplier;
      let calculatedProtein = formData.weight * 2.2;

      switch (formData.goal) {
        case "Cutting":
          calculatedCalories -= 500;
          break;
        case "Bulking":
          calculatedCalories += 500;
          break;
        default:
          break;
      }

      let calculatedFat = (calculatedCalories * 0.25) / 9;
      let calculatedCarbs = (calculatedCalories - (calculatedProtein * 4 + calculatedFat * 9)) / 4;

      setNutritionData({
        calories: Math.round(calculatedCalories),
        protein: Math.round(calculatedProtein),
        fat: Math.round(calculatedFat),
        carbs: Math.round(calculatedCarbs)
      });
    }
  }, [formData.weight, formData.activityLevel, formData.goal]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (Object.values(formData).every(value => value)) {
      try {
        const response = await updateStatus(formData).unwrap();
        toast.success("Diet Profile Updated Successfully!");
        
        const profileData = JSON.stringify(formData);
        localStorage.setItem("profileData", profileData);
      } catch (err) {
        toast.error(err?.data?.message || err.error || "Failed to update diet profile");
      }
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };

  if (isLoading) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} />
        <Typography variant="h6" className="loading-text">
          Loading your diet profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="diet-profile-container">
      {/* Main Form */}
      <Paper elevation={3} className="diet-profile-paper">
        <Box className="diet-profile-header">
          <Typography variant="h4" className="diet-profile-title">
            <Restaurant className="diet-profile-icon" />
            Update Diet Profile
          </Typography>
          <Typography variant="body1" className="diet-profile-subtitle">
            Set your physical metrics and fitness goals to get personalized nutrition recommendations
          </Typography>
        </Box>

        <Divider className="diet-profile-divider" />

        <form onSubmit={submitHandler} className="diet-profile-form">
          <Grid container spacing={3}>
            {/* Physical Metrics Section */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                <Height className="section-icon" />
                Physical Metrics
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Height (cm)"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="diet-profile-input"
                placeholder="e.g., 175"
                InputProps={{
                  startAdornment: <Height className="input-icon" />
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Weight (kg)"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="diet-profile-input"
                placeholder="e.g., 70"
                InputProps={{
                  startAdornment: <Scale className="input-icon" />
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Goal Weight (kg)"
                value={formData.goalWeight}
                onChange={(e) => handleInputChange("goalWeight", e.target.value)}
                className="diet-profile-input"
                placeholder="e.g., 65"
                InputProps={{
                  startAdornment: <TrendingUp className="input-icon" />
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="diet-profile-input"
                placeholder="e.g., 25"
                InputProps={{
                  startAdornment: <Person className="input-icon" />
                }}
              />
            </Grid>

            {/* Personal Details Section */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                <Wc className="section-icon" />
                Personal Details
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Gender"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="diet-profile-input"
                InputProps={{
                  startAdornment: <Wc className="input-icon" />
                }}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender.value} value={gender.value}>
                    {gender.icon} {gender.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Activity Level"
                value={formData.activityLevel}
                onChange={(e) => handleInputChange("activityLevel", e.target.value)}
                className="diet-profile-input"
                InputProps={{
                  startAdornment: <DirectionsRun className="input-icon" />
                }}
              >
                {activityLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Fitness Goals Section */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                <Flag className="section-icon" />
                Fitness Goals
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Goal"
                value={formData.goal}
                onChange={(e) => handleInputChange("goal", e.target.value)}
                className="diet-profile-input"
                InputProps={{
                  startAdornment: <Flag className="input-icon" />
                }}
              >
                {goals.map((goal) => (
                  <MenuItem key={goal.value} value={goal.value}>
                    {goal.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box className="form-actions">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className="update-diet-profile-button"
                  fullWidth
                  startIcon={<Save />}
                >
                  Update Diet Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Nutrition Summary */}
      {nutritionData.calories > 0 && (
        <Paper elevation={3} className="nutrition-summary-paper">
          <Box className="nutrition-summary-container">
            <Typography variant="h5" className="nutrition-summary-title">
              <Calculate className="nutrition-summary-icon" />
              Your Nutrition Summary
            </Typography>
            
            <Grid container spacing={3} className="nutrition-stats-grid">
              <Grid item xs={6} sm={3}>
                <Card className="nutrition-stat-card">
                  <CardContent className="nutrition-stat-content">
                    <Typography variant="h4" className="nutrition-stat-value">
                      {nutritionData.calories}
                    </Typography>
                    <Typography variant="body2" className="nutrition-stat-label">
                      Calories
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Card className="nutrition-stat-card">
                  <CardContent className="nutrition-stat-content">
                    <Typography variant="h4" className="nutrition-stat-value">
                      {nutritionData.protein}g
                    </Typography>
                    <Typography variant="body2" className="nutrition-stat-label">
                      Protein
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Card className="nutrition-stat-card">
                  <CardContent className="nutrition-stat-content">
                    <Typography variant="h4" className="nutrition-stat-value">
                      {nutritionData.fat}g
                    </Typography>
                    <Typography variant="body2" className="nutrition-stat-label">
                      Fat
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Card className="nutrition-stat-card">
                  <CardContent className="nutrition-stat-content">
                    <Typography variant="h4" className="nutrition-stat-value">
                      {nutritionData.carbs}g
                    </Typography>
                    <Typography variant="body2" className="nutrition-stat-label">
                      Carbs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Divider className="nutrition-divider" />

            <Box className="nutrition-recommendations">
              <Typography variant="h6" className="recommendations-title">
                Recommendations
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Chip
                    icon={<Flag />}
                    label={`Goal: ${formData.goal}`}
                    color="primary"
                    variant="outlined"
                    className="recommendation-chip"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Chip
                    icon={<DirectionsRun />}
                    label={`Activity: ${formData.activityLevel}`}
                    color="secondary"
                    variant="outlined"
                    className="recommendation-chip"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default UpdateDietProfile;
