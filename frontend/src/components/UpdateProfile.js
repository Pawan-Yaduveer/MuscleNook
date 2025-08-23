import { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Divider,
  Alert,
  CircularProgress
} from "@mui/material";
import { 
  Person, 
  Email, 
  Lock, 
  Save,
  Shield
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import "./Profile.css";

const UpdateProfile = ({ userInfo, dispatch }) => {
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const [UpdateProfile, { isLoading }] = useUpdateUserMutation();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const res = await UpdateProfile({
        _id: userInfo._id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password || undefined,
      }).unwrap();
      
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated Successfully!");
      
      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        password: "",
        confirmPassword: ""
      }));
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Failed to update profile");
    }
  };

  return (
    <Paper elevation={3} className="update-profile-paper">
      <Box className="update-profile-container">
        <Box className="form-header">
          <Typography variant="h4" className="form-title">
            <Person className="form-icon" />
            Update Profile
          </Typography>
          <Typography variant="body1" className="form-subtitle">
            Keep your profile information up to date and secure
          </Typography>
        </Box>

        <Divider className="form-divider" />

        <form onSubmit={submitHandler} className="update-profile-form">
          <Grid container spacing={3}>
            {/* Personal Information Section */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Personal Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="profile-input"
                placeholder="Enter your full name"
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: <Person className="input-icon" />
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="profile-input"
                placeholder="Enter your email address"
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: <Email className="input-icon" />
                }}
              />
            </Grid>

            {/* Security Section */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                <Shield className="section-icon" />
                Security Settings
              </Typography>
              <Typography variant="body2" className="section-description">
                Leave password fields blank if you don't want to change your password
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="profile-input"
                placeholder="Enter new password (optional)"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: <Lock className="input-icon" />
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="profile-input"
                placeholder="Confirm new password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: <Lock className="input-icon" />
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box className="form-actions">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className="update-profile-button"
                  fullWidth
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {/* Success Message */}
        {!isLoading && formData.password && formData.confirmPassword && (
          <Alert severity="info" className="password-info">
            <Typography variant="body2">
              <strong>Note:</strong> Your password will be updated along with your profile information.
            </Typography>
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default UpdateProfile;
