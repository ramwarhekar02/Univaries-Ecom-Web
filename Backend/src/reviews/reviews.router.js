const express = require('express');
const Reviews = require('./reviews.Model');
const Products = require('../products/productsModel');
const router = express.Router();

router.post("/post-review", async (req, res) => { 
    try {
        const { comment, rating, productId, userId } = req.body;

        if (!comment || !rating || !productId || !userId) {
            return res.status(400).send({ message: "All Fields are Required" });
        }

        const existingReview = await Reviews.findOne({ productId, userId });

        if (existingReview) { 
            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();
        } else {
            const newReview = new Reviews({ comment, rating, userId, productId });
            await newReview.save();
        }

        const reviews = await Reviews.find({ productId });

        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const avgRating = totalRating / reviews.length;

            const product = await Products.findById(productId);

            if (product) { 
                product.rating = avgRating;
                await product.save({ validateBeforeSave: false });
            }

            return res.status(200).send({
                message: "Review Posted Successfully",
                reviews
            });
        } else {
            return res.status(404).send({ message: "Product not Found" });
        }
    } catch (error) {
        console.error("Error Posting Review:", error);
        res.status(500).send({ message: "Failed to Post Review" });
    }
});


// router.get("/get-reviews/:productId", async (req, res)=>{
//     try {  
//         const productId = req.params.productId;
//         const reviews = await Reviews.find({productId}).populate("userId", "name email");
//         if(reviews.length > 0) { 
//             res.status(200).send(reviews);
//         } else {
//             res.status(404).send({message: "No Reviews Found"});
//         }
//     } catch (error) {
//         console.error("Error Fetching Reviews", error);
//         res.status(500).send({message: "Failed to Fetch Reviews"});
//     }
// })

router.get("/total-reviews", async (req, res)=>{
    try {
        const totalReviews = await Reviews.countDocuments();    
        res.status(200).send({totalReviews});
    } catch (error) {
        console.error("Error Fetching Reviews", error);
        res.status(500).send({message: "Failed to Fetch Reviews"});
    }
})

router.get("/:userId", async (req, res)=>{
    try {
        const userId = req.params.userId;
        const reviews = await Reviews.find({userId}).sort({createdAt: -1});
        if(reviews.length === 0) { 
            res.status(200).send(reviews);
        } else {
            res.status(404).send({message: "No Reviews Found"});
        }
    } catch (error) {
        console.error("Error Fetching Reviews", error);
        res.status(500).send({message: "Failed to Fetch Reviews"});
    }
})

module.exports = router;