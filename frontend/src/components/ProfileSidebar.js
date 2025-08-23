import React from "react";
import { 
  Paper, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Box,
  Typography,
  Avatar,
  Chip
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { 
  Person, 
  Restaurant, 
  CalendarToday, 
  WaterDrop,
  Settings,
  FitnessCenter
} from "@mui/icons-material";
import "./Profile.css";

const ProfileSidebar = ({ userInfo }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/pages/profile/update",
      label: "Update Profile",
      icon: <Person />,
      description: "Edit your personal information"
    },
    {
      path: "/pages/profile/diet",
      label: "Diet Profile",
      icon: <Restaurant />,
      description: "Manage your dietary preferences"
    },
    {
      path: "/pages/profile/meal-plan",
      label: "Meal Plan",
      icon: <CalendarToday />,
      description: "View and customize meal plans"
    },
    {
      path: "/pages/profile/water-intake",
      label: "Water Intake",
      icon: <WaterDrop />,
      description: "Track your hydration goals"
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Paper elevation={3} className="profile-sidebar-paper">
      <Box className="profile-sidebar-container">
        {/* User Info Section */}
        <Box className="user-info-section">
          <Avatar
            className="user-avatar"
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
          >
            {userInfo?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          
          <Typography variant="h6" className="user-name">
            {userInfo?.name || 'User Name'}
          </Typography>
          
          <Typography variant="body2" className="user-email">
            {userInfo?.email || 'user@example.com'}
          </Typography>
          
          <Chip
            icon={<FitnessCenter />}
            label="Active Member"
            color="primary"
            variant="outlined"
            className="member-status-chip"
          />
        </Box>

        <Divider className="sidebar-divider" />

        {/* Navigation Menu */}
        <List className="sidebar-navigation">
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding className="sidebar-list-item">
              <ListItemButton
                component={Link}
                to={item.path}
                className={`sidebar-button ${isActive(item.path) ? 'active' : ''}`}
                selected={isActive(item.path)}
              >
                <ListItemIcon className={`sidebar-icon ${isActive(item.path) ? 'active' : ''}`}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  className="sidebar-text"
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Quick Stats */}
        <Box className="quick-stats-section">
          <Typography variant="h6" className="stats-title">
            Quick Stats
          </Typography>
          
          <Box className="stats-grid">
            <Box className="stat-item">
              <Typography variant="h4" className="stat-number">
                {userInfo?.workoutCount || 0}
              </Typography>
              <Typography variant="body2" className="stat-label">
                Workouts
              </Typography>
            </Box>
            
            <Box className="stat-item">
              <Typography variant="h4" className="stat-number">
                {userInfo?.streak || 0}
              </Typography>
              <Typography variant="body2" className="stat-label">
                Day Streak
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileSidebar;
