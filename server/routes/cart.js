const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateQuantity, deleteFromCart, checkout } = require('../controllers/cart');
// const authenticate = require('../middleware/auth');

// Existing routes
router.post('/addtocart', addToCart);
router.get('/allcartitems', getCart);
router.post('/updatequantity', updateQuantity);
router.delete('/remove/:productId', deleteFromCart);

// New route for checkout
// router.post('/checkout', authenticate, checkout);
router.post('/checkout', checkout); 

module.exports = router;
