import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import ProfileSidebar from "../components/ProfileSidebar";
import UpdateProfile from "../components/UpdateProfile";
import UpdateDietProfile from "../components/UpdateDietProfile";
import MealPlan from "../components/MealPlan";
import WaterIntake from "../components/WaterIntake";
import Footer from "../components/Footer";
import BgImage from "../assets/images/bgimage.jpg";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setCredentials(userInfo));
  }, [userInfo, dispatch]);

  return (
    <>
      <Box 
        className="profile-page-background"
        sx={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%), url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Container maxWidth="xl" className="profile-container">
          <Box className="profile-header">
            <Typography variant="h1" className="profile-main-title">
              My Profile
            </Typography>
            <Typography variant="h5" className="profile-subtitle">
              Manage your fitness profile, track progress, and customize your experience
            </Typography>
          </Box>

          <Grid container spacing={3} className="profile-content">
            <Grid item xs={12} md={4} lg={3} className="profile-sidebar-col">
              <ProfileSidebar userInfo={userInfo} dispatch={dispatch} />
            </Grid>
            <Grid item xs={12} md={8} lg={9} className="profile-main-col">
              <Box className="profile-main-content">
                <Routes>
                  <Route
                    path="/"
                    element={<UpdateProfile userInfo={userInfo} dispatch={dispatch} />}
                  />
                  <Route
                    path="update"
                    element={<UpdateProfile userInfo={userInfo} dispatch={dispatch} />}
                  />
                  <Route path="diet" element={<UpdateDietProfile />} />
                  <Route path="meal-plan" element={<MealPlan />} />
                  <Route path="water-intake" element={<WaterIntake />} />
                </Routes>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Profile;
