const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs'); // For password hashing
const crypto = require('crypto');   // For generating reset tokens
const { transporter } = require('../middleware/email'); // Your email transport config
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


// Register function
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login function

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, email: user.email });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Logout function (clear the token or session)
const logout = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Forgot Password function
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',  // or any other email service you want to use
        auth: {
            user: 'your-email@gmail.com', // your email
            pass: 'your-email-password'   // your email password or app-specific password
        }
    });

    // Set up email data
    let mailOptions = {
        from: '"Your Name" <your-email@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Password Reset Request', // Subject line
        text: 'Click the link to reset your password...', // plain text body
        html: '<b>Click the link to reset your password...</b>' // HTML body content
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to send reset email.' });
    }
};



module.exports = { register, login, logout, forgotPassword,};
