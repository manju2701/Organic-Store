// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Import cookie parser
const db = require('./database/db'); // Ensure this connects to your MongoDB
const userRoutes = require('./routes/user'); // Import user-related routes
const cartRoutes = require('./routes/cart'); // Import cart-related routes
const productRoutes = require('./routes/product'); // Import product-related routes
const wishlistRoutes = require('./routes/wishlist'); // Import wishlist-related routes
const authRoutes = require('./routes/Auth'); // Import authentication-related routes
require('dotenv').config();
const bcrypt = require('bcryptjs');  // This line tries to import bcryptjs


const app = express();

// Connect to MongoDB
db();

// Middleware Setup

// Set CORS configuration to allow methods like DELETE
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow DELETE method
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies if needed (optional)
}));


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware for cookie parsing

// Basic route for testing the server
app.get("/", (req, res) => {
    res.send("Hello, Welcome to the Application");
});

// API routes
app.use("/user", userRoutes); // All user-related routes
app.use('/api/cart', cartRoutes); // Cart routes under '/api/cart'
app.use('/api/products', productRoutes); // Product routes under '/api/products'
app.use('/api/wishlist', wishlistRoutes); // Wishlist routes under '/api/wishlist'
app.use('/api/auth', authRoutes); // Authentication-related routes under '/api/auth'

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
