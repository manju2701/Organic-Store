// models/wishlist.js

const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
