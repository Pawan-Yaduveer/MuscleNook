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
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Restaurant,
  CalendarToday,
  Save,
  Add,
  Edit,
  Delete,
  FreeBreakfast,
  LunchDining,
  DinnerDining,
  LocalCafe
} from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  useCreateMealPlanMutation,
  useUpdateMealPlanMutation,
} from "../slices/usersApiSlice";
import "./Profile.css";

const MealPlan = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [mealData, setMealData] = useState({
    meal1: "",
    meal2: "",
    meal3: "",
    meal4: "",
    meal5: "",
    snacks: ""
  });

  const [createMealPlan] = useCreateMealPlanMutation();
  const [updateMealPlan] = useUpdateMealPlanMutation();

  const mealTypes = [
    { key: "meal1", label: "Breakfast", icon: <FreeBreakfast />, color: "#FF6B6B" },
    { key: "meal2", label: "Morning Snack", icon: <LocalCafe />, color: "#4ECDC4" },
    { key: "meal3", label: "Lunch", icon: <LunchDining />, color: "#45B7D1" },
    { key: "meal4", label: "Afternoon Snack", icon: <LocalCafe />, color: "#96CEB4" },
    { key: "meal5", label: "Dinner", icon: <DinnerDining />, color: "#FFEAA7" },
    { key: "snacks", label: "Evening Snacks", icon: <Restaurant />, color: "#DDA0DD" }
  ];

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await fetch(`/api/user/meal-plan/${currentDate}`);
        const data = await response.json();

        setMealData({
          meal1: data.meal1 || "",
          meal2: data.meal2 || "",
          meal3: data.meal3 || "",
          meal4: data.meal4 || "",
          meal5: data.meal5 || "",
          snacks: data.snacks || ""
        });
      } catch (error) {
        console.error("Fetch meal plan error:", error);
        // Clear form if no meal plan exists for the date
        setMealData({
          meal1: "",
          meal2: "",
          meal3: "",
          meal4: "",
          meal5: "",
          snacks: ""
        });
      }
    };

    fetchMealPlan();
  }, [currentDate]);

  const handleInputChange = (field, value) => {
    setMealData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mealPlanData = {
        date: currentDate,
        ...mealData
      };

      const existingMealPlan = await updateMealPlan(mealPlanData).unwrap();
      if (existingMealPlan) {
        toast.success("Meal plan updated successfully!");
      } else {
        await createMealPlan(mealPlanData).unwrap();
        toast.success("Meal plan created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save the meal plan.");
      console.error("Save meal plan error:", error);
    }
  };

  const clearMealPlan = () => {
    setMealData({
      meal1: "",
      meal2: "",
      meal3: "",
      meal4: "",
      meal5: "",
      snacks: ""
    });
  };

  const getMealIcon = (mealType) => {
    return mealTypes.find(type => type.key === mealType)?.icon || <Restaurant />;
  };

  const getMealColor = (mealType) => {
    return mealTypes.find(type => type.key === mealType)?.color || "#666";
  };

  const hasMeals = Object.values(mealData).some(meal => meal.trim() !== "");

  return (
    <Box className="meal-plan-container">
      {/* Header Section */}
      <Paper elevation={3} className="meal-plan-paper">
        <Box className="meal-plan-header">
          <Typography variant="h4" className="meal-plan-title">
            <Restaurant className="meal-plan-icon" />
            Meal Plan
          </Typography>
          <Typography variant="body1" className="meal-plan-subtitle">
            Plan and track your daily meals for better nutrition and fitness results
          </Typography>
        </Box>

        <Divider className="meal-plan-divider" />

        {/* Date Selection */}
        <Box className="date-selection-section">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Select Date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="date-input"
                InputProps={{
                  startAdornment: <CalendarToday className="input-icon" />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className="date-actions">
                <Button
                  variant="outlined"
                  onClick={clearMealPlan}
                  className="clear-button"
                  startIcon={<Delete />}
                >
                  Clear Plan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Meal Plan Form */}
      <Paper elevation={3} className="meal-plan-form-paper">
        <Box className="meal-plan-form-container">
          <Typography variant="h6" className="form-section-title">
            Plan Your Meals
          </Typography>

          <form onSubmit={handleSubmit} className="meal-plan-form">
            <Grid container spacing={3}>
              {mealTypes.map((mealType) => (
                <Grid item xs={12} sm={6} key={mealType.key}>
                  <Card className="meal-input-card" elevation={2}>
                    <CardContent className="meal-input-content">
                      <Box className="meal-input-header">
                        <Box className="meal-type-info">
                          <Box
                            className="meal-type-icon"
                            sx={{ color: mealType.color }}
                          >
                            {mealType.icon}
                          </Box>
                          <Typography variant="h6" className="meal-type-label">
                            {mealType.label}
                          </Typography>
                        </Box>
                      </Box>

                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder={`What's for ${mealType.label.toLowerCase()}?`}
                        value={mealData[mealType.key]}
                        onChange={(e) => handleInputChange(mealType.key, e.target.value)}
                        className="meal-input-field"
                        variant="outlined"
                        size="small"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box className="meal-plan-actions">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className="save-meal-plan-button"
                  fullWidth
                  startIcon={<Save />}
                >
                  Save Meal Plan
                </Button>
              </Box>
            </Grid>
          </form>
        </Box>
      </Paper>

      {/* Meal Plan Summary */}
      {hasMeals && (
        <Paper elevation={3} className="meal-summary-paper">
          <Box className="meal-summary-container">
            <Typography variant="h6" className="meal-summary-title">
              Today's Meal Plan Summary
            </Typography>

            <Grid container spacing={2} className="meal-summary-grid">
              {mealTypes.map((mealType) => {
                const meal = mealData[mealType.key];
                if (!meal.trim()) return null;

                return (
                  <Grid item xs={12} sm={6} md={4} key={mealType.key}>
                    <Card className="meal-summary-card" elevation={2}>
                      <CardContent className="meal-summary-content">
                        <Box className="meal-summary-header">
                          <Box
                            className="meal-summary-icon"
                            sx={{ color: mealType.color }}
                          >
                            {mealType.icon}
                          </Box>
                          <Typography variant="subtitle1" className="meal-summary-label">
                            {mealType.label}
                          </Typography>
                        </Box>

                        <Typography variant="body2" className="meal-summary-text">
                          {meal}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {!hasMeals && (
              <Box className="empty-meal-plan">
                <Typography variant="body1" className="empty-meal-plan-text">
                  No meals planned for this date. Start planning your nutrition journey!
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default MealPlan;
