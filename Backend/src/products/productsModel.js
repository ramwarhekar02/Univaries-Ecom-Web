const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema ({ 
    name: { 
        type: String,
        required: true, // Ensure this is provided
    },
    category: String,
    description: String,
    price: {
        type: Number,
        required: true, // Ensure this is provided
    },
    oldPrice: Number,
    image: String,
    color: String,
    rating: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true, // Ensure this is provided
    },
})

const Products = mongoose.model("Product", ProductSchema)

module.exports = Products;