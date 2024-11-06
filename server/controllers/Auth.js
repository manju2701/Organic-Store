const { SendVerificationCode, WelcomeEmail, SendPasswordResetCode } = require("../middleware/emailveri");
const USER = require("../models/Auth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        let user = await USER.findOne({ email });
        if (user) {
            return res.status(408).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user
        user = await USER.create({
            name,
            email,
            password: hashedPassword,
            verificationCode
        });
        await user.save();

        // Send verification code via email
        SendVerificationCode(user.email, user.verificationCode);

        return res.status(200).json({
            success: true,
            message: "Registered Successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message,
        });
    }
};

// Verify email
const VerfiyEmail = async (req, res) => {
    try {
        const { code } = req.body;

        const user = await USER.findOne({
            verificationCode: code,
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
        }

        // Mark user as verified
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();

        // Send welcome email
        await WelcomeEmail(user.email, user.name);

        return res.status(200).json({ success: true, message: "Email Verified Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "Internal server error" });
    }
};

// Forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        let user = await USER.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate reset code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save the reset code in the database (valid for 1 hour)
        user.passwordResetCode = resetCode;
        user.passwordResetCodeExpiresAt = Date.now() + 3600000; // 1 hour expiration
        await user.save();

        // Send the password reset code via email
        SendPasswordResetCode(user.email, resetCode);

        return res.status(200).json({
            success: true,
            message: "Password reset code sent to your email."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Check if all required fields are provided
        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields (email, otp, newPassword) are required."
            });
        }

        // Find user by email and OTP
        const user = await USER.findOne({
            email,
            passwordResetCode: otp,
            passwordResetCodeExpiresAt: { $gt: Date.now() }, // Check if the code has expired
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset code."
            });
        }

        // Validate new password (you can add your own password strength checks here)
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long."
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        user.password = hashedPassword;
        user.passwordResetCode = undefined; // Clear reset code after password change
        user.passwordResetCodeExpiresAt = undefined; // Clear expiration time
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully."
        });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    register,
    VerfiyEmail,
    forgotPassword,
    resetPassword,
};
