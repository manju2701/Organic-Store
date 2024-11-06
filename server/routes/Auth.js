const express = require('express');
const { register, VerfiyEmail, forgotPassword, resetPassword } = require('../controllers/Auth');
const router = express.Router();

router.post('/register', register);
router.post('/verifyEmail', VerfiyEmail);
router.post('/forgotPassword', forgotPassword);  // Route for forgot password
router.post('/resetPassword', resetPassword);    // Route for reset password

module.exports = router;
