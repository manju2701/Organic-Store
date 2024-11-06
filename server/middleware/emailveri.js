const { transporter } = require('./email'); // Import the transporter

// Send Verification Code (for registration)
const SendVerificationCode = async (email, verificationCode) => {
    try {
        await transporter.sendMail({
            from: '"Manjusha Parikapalli" <parikapallymanju@gmail.com>',
            to: email, // To the recipient's email
            subject: "OTP Verification",
            text: "Verify Your Email",
            html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
        });
        console.log("Verification code email sent successfully");
    } catch (err) {
        console.error("Error sending verification code email:", err);
    }
};

// Send Welcome Email (for post-email-verification)
const WelcomeEmail = async (email, name) => {
    try {
        await transporter.sendMail({
            from: '"Parikapalli Manjusha" <parikapallymanju@gmail.com>',
            to: email,
            subject: "Welcome!",
            text: `Hello ${name}, your email has been verified successfully.`,
            html: `<p>Hello <strong>${name}</strong>, your email has been verified successfully.</p>`,
        });
        console.log("Welcome email sent successfully");
    } catch (err) {
        console.error("Error sending welcome email:", err);
    }
};

// Send Password Reset Code (for forgot password)
const SendPasswordResetCode = async (email, resetCode) => {
    try {
        await transporter.sendMail({
            from: '"Manjusha Parikapalli" <parikapallymanju@gmail.com>',
            to: email,
            subject: "Password Reset Request",
            text: `Your password reset code is: ${resetCode}. It will expire in 1 hour.`,
            html: `<p>Your password reset code is: <strong>${resetCode}</strong>. It will expire in 1 hour.</p>`,
        });
        console.log("Password reset code email sent successfully");
    } catch (err) {
        console.error("Error sending password reset code email:", err);
    }
};

// Send Password Reset Confirmation (after resetting the password)
const SendPasswordResetConfirmation = async (email) => {
    try {
        await transporter.sendMail({
            from: '"Manjusha Parikapalli" <parikapallymanju@gmail.com>',
            to: email,
            subject: "Password Reset Successful",
            text: "Your password has been reset successfully.",
            html: `<p>Your password has been <strong>reset successfully</strong>.</p>`,
        });
        console.log("Password reset confirmation email sent successfully");
    } catch (err) {
        console.error("Error sending password reset confirmation email:", err);
    }
};

module.exports = {
    SendVerificationCode,
    WelcomeEmail,
    SendPasswordResetCode,
    SendPasswordResetConfirmation
};
