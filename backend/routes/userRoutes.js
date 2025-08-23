import express from "express";
const router = express.Router();

import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

import {
  logWaterIntake,
  updateWaterIntake,
  getUserWaterIntake,
} from "../controllers/userWaterIntakeController.js";

import { protect } from "../middleware/authMiddleware.js";

// Register, login, logout
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

// User profile routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Water intake routes
router
  .route("/water-intake")
  .post(protect, logWaterIntake)
  .put(protect, updateWaterIntake);

router.route("/water-intake/:date").get(protect, getUserWaterIntake);

// ✅ Test route for GET /api/users (useful for debugging)
router.get("/", (req, res) => {
  res.send("User route is working!");
});

export default router;
