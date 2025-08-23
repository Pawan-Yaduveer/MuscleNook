import React, { useState } from "react";
import axios from "axios";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  MenuItem, 
  CircularProgress,
  Alert,
  Pagination,
  Chip,
  Divider
} from "@mui/material";
import { 
  Search, 
  FitnessCenter, 
  DirectionsRun, 
  TrendingUp,
  PlayArrow,
  Info
} from "@mui/icons-material";
import "./ExerciseDB.css";

const ExercisePage = () => {
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  const muscleGroups = [
    { value: "back", label: "Back", icon: "💪" },
    { value: "cardio", label: "Cardio", icon: "🏃" },
    { value: "chest", label: "Chest", icon: "💪" },
    { value: "lower%20arms", label: "Lower Arms", icon: "💪" },
    { value: "lower%20legs", label: "Lower Legs", icon: "🦵" },
    { value: "neck", label: "Neck", icon: "👤" },
    { value: "shoulders", label: "Shoulders", icon: "💪" },
    { value: "upper%20arms", label: "Upper Arms", icon: "💪" },
    { value: "upper%20legs", label: "Upper Legs", icon: "🦵" },
    { value: "waist", label: "Waist", icon: "🎯" }
  ];

  const handleMuscleChange = (e) => {
    setSelectedMuscle(e.target.value);
    setCurrentPage(1); // Reset to first page when changing muscle group
  };

  const handleSearch = async () => {
    if (!selectedMuscle) {
      setError("Please select a muscle group to search for exercises");
      return;
    }

    setLoading(true);
    setError("");
    setExercises([]);

    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedMuscle}`,
      headers: {
        'x-rapidapi-key': '0fa6cc4f62mshc831971d44e52aep106edajsnd9bb1596715b',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data && response.data.length > 0) {
        setExercises(response.data);
      } else {
        setError("No exercises found for the selected muscle group. Try a different selection.");
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setError("Failed to fetch exercises. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getMuscleGroupLabel = (value) => {
    const muscle = muscleGroups.find(m => m.value === value);
    return muscle ? muscle.label : value;
  };

  const getMuscleGroupIcon = (value) => {
    const muscle = muscleGroups.find(m => m.value === value);
    return muscle ? muscle.icon : "💪";
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  return (
    <div className="exercise-page">
      {/* Search Section */}
      <Paper elevation={3} className="exercise-search-paper">
        <Box className="exercise-search-container">
          <Typography variant="h5" className="search-title">
            <FitnessCenter className="search-icon" />
            Search For Perfect Exercises
          </Typography>
          
          <Typography variant="body1" className="search-subtitle">
            Select a muscle group to discover targeted exercises with detailed instructions and demonstrations
          </Typography>

          <Box className="search-controls">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Select Muscle Group"
                  value={selectedMuscle}
                  onChange={handleMuscleChange}
                  className="muscle-select-input"
                  variant="outlined"
                  size="large"
                  required
                >
                  <MenuItem value="">
                    <em>Choose a muscle group to target</em>
                  </MenuItem>
                  {muscleGroups.map((muscle) => (
                    <MenuItem key={muscle.value} value={muscle.value}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <span>{muscle.icon}</span>
                        <span>{muscle.label}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={4} md={3}>
                <Button
                  variant="contained"
                  size="large"
                  className="exercise-search-button"
                  fullWidth
                  onClick={handleSearch}
                  disabled={loading || !selectedMuscle}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
                >
                  {loading ? "Searching..." : "Search Exercises"}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {error && (
            <Alert severity="error" className="exercise-error">
              {error}
            </Alert>
          )}

          {selectedMuscle && (
            <Box className="selected-muscle-info">
              <Chip
                icon={<FitnessCenter />}
                label={`Targeting: ${getMuscleGroupLabel(selectedMuscle)}`}
                className="muscle-chip"
                color="primary"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
      </Paper>

      {/* Results Section */}
      {exercises.length > 0 && (
        <Paper elevation={3} className="exercise-results-paper">
          <Box className="exercise-results-container">
            <Typography variant="h5" className="results-title">
              <DirectionsRun className="results-icon" />
              {exercises.length} Exercises Found for {getMuscleGroupLabel(selectedMuscle)}
            </Typography>

            <Divider className="exercise-divider" />

            {/* Exercise Grid */}
            <Grid container spacing={3} className="exercise-grid">
              {currentExercises.map((exercise) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id}>
                  <Card elevation={2} className="exercise-card">
                    <CardMedia
                      component="img"
                      height="200"
                      image={exercise.gifUrl}
                      alt={exercise.name}
                      className="exercise-gif"
                    />
                    <CardContent className="exercise-card-content">
                      <Typography variant="h6" className="exercise-name">
                        {capitalizeFirstLetter(exercise.name)}
                      </Typography>
                      
                      <Box className="exercise-details">
                        <Chip
                          label={exercise.bodyPart}
                          size="small"
                          className="body-part-chip"
                          icon={<FitnessCenter />}
                        />
                        <Chip
                          label={exercise.equipment || "No Equipment"}
                          size="small"
                          className="equipment-chip"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box className="exercise-pagination">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  className="pagination-controls"
                />
                <Typography variant="body2" className="pagination-info">
                  Showing {indexOfFirstExercise + 1}-{Math.min(indexOfLastExercise, exercises.length)} of {exercises.length} exercises
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      )}

      {/* Empty State */}
      {!loading && !error && exercises.length === 0 && selectedMuscle && (
        <Paper elevation={3} className="empty-state-paper">
          <Box className="empty-state-container">
            <Typography variant="h6" className="empty-state-title">
              <Info className="empty-state-icon" />
              No Exercises Found
            </Typography>
            <Typography variant="body1" className="empty-state-text">
              Try selecting a different muscle group or check back later for more exercises.
            </Typography>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default ExercisePage;
