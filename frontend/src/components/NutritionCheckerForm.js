import React, { useState } from "react";
import axios from "axios";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Grid, 
  Chip, 
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { 
  Search, 
  Restaurant, 
  Scale, 
  LocalDrink, 
  LocalCafe, 
  TrendingUp,
  Info
} from "@mui/icons-material";
import "./Nutrition.css";

const NutritionCheckerForm = () => {
  const [foodItem, setFoodItem] = useState("");
  const [nutritionResult, setNutritionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchNutrition = async (e) => {
    e.preventDefault();
    
    if (!foodItem.trim()) {
      setError("Please enter a food item to search");
      return;
    }

    setLoading(true);
    setError("");
    setNutritionResult(null);

    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
          foodItem.trim()
        )}`,
        {
          headers: {
            "X-Api-Key": "WOO23cTA4ww2yrQ+otISmw==Z3Q2fFBcCTeE3OWj",
          },
        }
      );

      const data = response.data;

      if (data.items && data.items.length > 0) {
        setNutritionResult(data.items[0]);
      } else {
        setError("No nutrition information found for that food item. Try a different search term.");
      }
    } catch (error) {
      console.error("Error fetching nutrition information:", error);
      setError("Failed to fetch nutrition information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getNutrientColor = (value, type) => {
    if (type === 'calories') {
      if (value < 100) return '#4caf50';
      if (value < 300) return '#ff9800';
      return '#f44336';
    }
    if (type === 'protein') {
      if (value > 20) return '#4caf50';
      if (value > 10) return '#ff9800';
      return '#f44336';
    }
    if (type === 'fiber') {
      if (value > 5) return '#4caf50';
      if (value > 2) return '#ff9800';
      return '#f44336';
    }
    return '#666';
  };

  const renderSearchForm = () => (
    <Paper elevation={3} className="nutrition-search-paper">
      <Box className="nutrition-search-container">
        <Typography variant="h5" className="search-title">
          <Restaurant className="search-icon" />
          Nutrition Information Search
        </Typography>
        
        <Typography variant="body1" className="search-subtitle">
          Search for any food item to get detailed nutritional information and make informed dietary choices
        </Typography>

        <form onSubmit={handleSearchNutrition} className="search-form">
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <TextField
                fullWidth
                label="Enter food item (e.g., apple, chicken breast, rice)"
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
                className="nutrition-search-input"
                placeholder="Search for nutrition information..."
                variant="outlined"
                size="large"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={4} md={3}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="nutrition-search-button"
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && (
          <Alert severity="error" className="nutrition-error">
            {error}
          </Alert>
        )}
      </Box>
    </Paper>
  );

  const renderNutritionResults = () => (
    <Paper elevation={3} className="nutrition-results-paper">
      <Box className="nutrition-results-container">
        <Typography variant="h5" className="results-title">
          <LocalDrink className="results-icon" />
          Nutrition Information for {nutritionResult.name}
        </Typography>

        {/* Quick Stats Cards */}
        <Grid container spacing={3} className="nutrition-stats-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} className="nutrition-stat-card calories-card">
              <CardContent>
                <Typography variant="h6" className="stat-title">
                  <LocalDrink className="stat-icon" />
                  Calories
                </Typography>
                <Typography variant="h4" className="stat-value" style={{ color: getNutrientColor(nutritionResult.calories, 'calories') }}>
                  {nutritionResult.calories}
                </Typography>
                <Typography variant="body2" className="stat-unit">kcal per 100g</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} className="nutrition-stat-card protein-card">
              <CardContent>
                <Typography variant="h6" className="stat-title">
                  <Scale className="stat-icon" />
                  Protein
                </Typography>
                <Typography variant="h4" className="stat-value" style={{ color: getNutrientColor(nutritionResult.protein_g, 'protein') }}>
                  {nutritionResult.protein_g}g
                </Typography>
                <Typography variant="body2" className="stat-unit">per 100g</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} className="nutrition-stat-card carbs-card">
              <CardContent>
                <Typography variant="h6" className="stat-title">
                  <TrendingUp className="stat-icon" />
                  Carbs
                </Typography>
                <Typography variant="h4" className="stat-value">
                  {nutritionResult.carbohydrates_total_g}g
                </Typography>
                <Typography variant="body2" className="stat-unit">per 100g</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} className="nutrition-stat-card fat-card">
              <CardContent>
                <Typography variant="h6" className="stat-title">
                  <Scale className="stat-icon" />
                  Total Fat
                </Typography>
                <Typography variant="h4" className="stat-value">
                  {nutritionResult.fat_total_g}g
                </Typography>
                <Typography variant="body2" className="stat-unit">per 100g</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider className="nutrition-divider" />

        {/* Detailed Nutrition Table */}
        <Typography variant="h6" className="detailed-nutrition-title">
          Detailed Nutritional Breakdown
        </Typography>
        
        <TableContainer component={Paper} elevation={2} className="nutrition-table-container">
          <Table className="nutrition-table">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Nutrient</TableCell>
                <TableCell className="table-header" align="right">Amount</TableCell>
                <TableCell className="table-header" align="right">Daily Value %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Calories</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.calories} kcal</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Total Fat</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.fat_total_g}g</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Saturated Fat</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.fat_saturated_g}g</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Cholesterol</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.cholesterol_mg}mg</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Sodium</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.sodium_mg}mg</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Total Carbohydrates</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.carbohydrates_total_g}g</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Dietary Fiber</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.fiber_g}g</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Total Sugars</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.sugar_g}g</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className="nutrient-name">Protein</TableCell>
                <TableCell align="right" className="nutrient-value">{nutritionResult.protein_g}g</TableCell>
                <TableCell align="right" className="nutrient-dv">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons */}
        <Box className="nutrition-actions">
          <Button
            variant="outlined"
            onClick={() => {
              setFoodItem("");
              setNutritionResult(null);
              setError("");
            }}
            className="new-search-button"
            startIcon={<Search />}
          >
            Search Another Food
          </Button>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <div className="nutrition-checker-form">
      {renderSearchForm()}
      
      {nutritionResult && renderNutritionResults()}
    </div>
  );
};

export default NutritionCheckerForm;
