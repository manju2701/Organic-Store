const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

const Product =  mongoose.model("product",  productsSchema);
module.exports = Product