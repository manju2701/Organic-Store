// controllers/wishlist.js

const mongoose = require('mongoose');
const Wishlist = require('../models/wishlist');


// Function to add products to the wishlist
const addToWishlist = async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        let wishlist = await Wishlist.findOne();
        if (!wishlist) {
            wishlist = new Wishlist({ products: [] });
        }

        const existingProduct = wishlist.products.find(item => item.productId === productId);
        if (!existingProduct) {
            wishlist.products.push({ productId });
            await wishlist.save();
            return res.status(200).json(wishlist);
        } else {
            return res.status(409).json({ message: 'Product already in wishlist' });
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to get all products in the wishlist
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne();
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist is empty' });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to delete a product from the wishlist
const deleteFromWishlist = async (req, res) => {
    const { productId } = req.params;

    try {
        let wishlist = await Wishlist.findOne();
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist is empty' });
        }

        wishlist.products = wishlist.products.filter(item => item.productId !== productId);
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        console.error('Error deleting from wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the functions
module.exports = {
    addToWishlist,
    getWishlist,
    deleteFromWishlist
};
