// controllers/cart.js

const mongoose = require('mongoose');
const Cart = require('../models/cart');

const Product = require('../models/product'); // Assuming you have a Product model to fetch full product details

// Function to add products to the cart
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    // Input validation
    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        let cart = await Cart.findOne();
        // Create a new cart if none exists
        if (!cart) {
            cart = new Cart({ products: [] });
        }

        // Check if product already exists in the cart
        const existingProduct = cart.products.find(item => item.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += (quantity || 1); // Increment by the specified quantity or 1
        } else {
            cart.products.push({ productId, quantity: quantity || 1 }); // Add new product
        }

        await cart.save(); // Save the updated cart
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to get all products in the cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne(); // Retrieve the cart

        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        // Fetch the full product details for each productId
        const productIds = cart.products.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        // Map over the cart products to include product details (like price)
        const cartWithDetails = cart.products.map(item => {
            const product = products.find(prod => prod._id.toString() === item.productId.toString());
            return {
                ...item.toObject(),
                product: product || {}
            };
        });

        res.status(200).json({ products: cartWithDetails }); // Return the cart contents with product details
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to update quantity of a product in the cart
const updateQuantity = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const existingProduct = cart.products.find(item => item.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity = quantity; // Update quantity
            await cart.save(); // Save the updated cart
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to delete a product from the cart
// controllers/cart.js
const deleteFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        // Remove product from the cart
        cart.products = cart.products.filter(item => item.productId.toString() !== productId);

        await cart.save();
        res.status(200).json(cart); // Return the updated cart after removal
    } catch (error) {
        console.error('Error deleting from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to process the checkout
const checkout = async (req, res) => {
    const { shippingDetails, paymentMethod, cart } = req.body;
  
    try {
      if (!shippingDetails || !cart || cart.length === 0) {
        return res.status(400).json({ message: 'Cart is empty or shipping details are missing' });
      }
  
      // Assuming you have a function to process the order
      const orderDetails = cart.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.productId.price, // Assuming product has a price property
      }));

      // Here you can clear the cart after successful checkout
      // await clearCart(); // Optional: Clear the cart after checkout if needed

      return res.status(200).json({
        message: 'Checkout successful',
        orderDetails, // Include the order details in the response
      });
    } catch (error) {
      console.error('Error processing checkout:', error);
      res.status(500).json({ message: 'Error processing checkout' });
    }
  };


// Export the functions
module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    deleteFromCart,
    checkout
};
