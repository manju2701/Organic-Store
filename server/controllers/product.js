const Product = require('../models/product');

// Function to add a single product
const addProduct = async (req, res) => {
    try {
        const { name, description, image, price } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required." });
        }

        const product = new Product({
            name,
            description,
            image: image || null,
            price: price || 0,
        });

        const createdProduct = await product.save();
        return res.status(201).json({
            message: "Product added successfully",
            product: createdProduct,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            totalProducts: products.length,
            products,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
};