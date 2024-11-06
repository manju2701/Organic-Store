const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/product');
const router = express.Router();

router.post('/add', addProduct);
router.get('/all', getAllProducts);

module.exports = router;
