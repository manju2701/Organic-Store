const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword
} = require("../controllers/user"); // Import all necessary controller functions
const router = express.Router();

// Public Routes
router.post('/register', register);  // Register route
router.post('/login', login);        // Login route
router.post('/forgot-password', forgotPassword);  // Forgot Password route

router.post('/logout', logout);      // Logout route

module.exports = router;
