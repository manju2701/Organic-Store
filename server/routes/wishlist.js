// routes/wishlist.js

const express = require('express');
const router = express.Router();
const { addToWishlist, getWishlist, deleteFromWishlist } = require('../controllers/wishlist');

router.post('/addtowishlist', addToWishlist);
router.get('/allwishlistitems', getWishlist);
router.delete('/remove/:productId', deleteFromWishlist);

module.exports = router;
