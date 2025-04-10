const express = require('express');
const Products = require('./productsModel');
const Reviews = require('../reviews/reviews.Model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

router.post("/create-product", async (req, res)=> {
    try {
        const newProduct = new Products({
            ...req.body
        })
        const savedProduct = await newProduct.save()

        const reviews = await Reviews.find({productId: savedProduct._id})
        if(reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review)=> acc + review.rating, 0);
            const avgRating = totalRating/reviews.length;
            savedProduct.rating = avgRating
            await savedProduct.save();
        }
        res.status(201).send(savedProduct);
    } catch (error) {
        console.log("Error Creating new Product", error);
        res.status(500).send({message: "Error Creating new Product"});
    }
})

router.get("/",  async (req, res)=> { 
    try {
        const { category, color, minPrice, maxPrice, page=1, limit=10 } = req.query;
        let filter = {};
        if(category && category !== "all"){ 
            filter.category = category;
        }
        if(color && color !== "all"){ 
            filter.color = color;
        }
        if(minPrice && maxPrice){ 
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if(!isNaN(min) && !isNaN(max)) { 
                filter.price = { $gte: min, $gte: max };
            }
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));
        const products = await Products.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({createdAt: -1});

        res.status(200).send({products, totalPages, totalProducts});
    } catch (error) {
        console.log("Error Fetching Product", error);
        res.status(500).send({message: "Error Fetching Product"});
    }
})

router.get("/:id", async (req, res) => { 
    try {
      const { id } = req.params;
  
      const product = await Products.findById(id).populate("author", "email username");
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      const reviews = await Reviews.find({ productId: id }).populate("userId", "username email");
  
      res.status(200).send({ product, reviews });
    } catch (error) {
      console.log("Error Fetching New Product", error);
      res.status(500).send({ message: "Error Fetching New Product" });
    }
  });

router.patch("/update-product/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
      const productId = req.params.id;
      const updateProduct = await Products.findByIdAndUpdate(productId, { ...req.body }, { new: true });
      if (!updateProduct) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      const reviews = await Reviews.find({ productId });
      res.status(200).send({ message: "Product updated successfully", product: updateProduct, reviews });
  
    } catch (error) {
      console.log("Error Updating Product", error);
      res.status(500).send({ message: "Error Updating Product" });
    }
  });  

router.delete("/delete-product/:id", verifyToken, async(req, res)=> {
    try {
        const productId = req.params.id;
        const deleteProduct = await Products.findByIdAndDelete(productId);
        if(!deleteProduct) {
            return res.status(404).send({message: "Product not found", product: deleteProduct});
        }
        await Reviews.deleteMany({productId: productId});
        res.status(200).send({message: "Product Deleted Successfully", product: deleteProduct});
    } catch (error) {
        console.log("Error Deleting Product", error);
        res.status(500).send({message: "Error Deleting Product"});
    }
}) 

router.get("/related/:id", async (req, res)=> { 
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).send({message: "Product ID is required"});
        }
        const product = await Products.findById(id);
        if(!product) {
            return res.status(404).send({message: "Product not found"});
        }
        const titleRegex = new RegExp(
            product.name.split(" ")
                .filter((word) => word.length > 1)
                .join("|"),
                "i"
        )
        const relatedProducts = await Products.find({ 
            _id: { $ne: id },
            $or: [
                { category: product.category },
                { color: product.color },
                { name: {$regex: titleRegex} }
            ]
        })
        res.status(200).send(relatedProducts);
    } catch (error) {
        console.log("Error Fetching Related Products", error);
        res.status(500).send({message: "Error Fetching Related Products"});
    }
})


module.exports = router;