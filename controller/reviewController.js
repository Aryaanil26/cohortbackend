const { Movie } = require("../models/movieModel");
const { Review } = require("../models/reviewModel");

const addReview = async (req, res) => {
    try {
        const { movieId, rating, comment } = req.body;
        const userId = req.user.id;

        // Validate if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "movie not found" });
        }

        // Create or update the review
        const review = await Review.findOneAndUpdate({ userId, movieId }, { rating, comment }, { new: true, upsert: true });

        // Optionally, you can update the movie's average rating here

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getMovieReviews = async (req, res) => {
    try {
        const { movieId } = req.params;

        const reviews = await Review.find({ movieId }).populate("userId", "name").sort({ createdAt: -1 });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this movie" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const deleteReview = async (req, res) => {
    try {
        
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId });

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getAverageRating = async (req, res) => {
    try {
        const { movieId } = req.params;

        const reviews = await Review.find({ movieId });
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this movie" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { getAverageRating, deleteReview, addReview, getMovieReviews };



// // reviewController.js
// const { Review } = require("../model/reviewModel");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { generateToken } = require("../utils/token");

// // Middleware to check if the user is authenticated
// const authenticateUser = (req, res, next) => {
//     let token;

//     // Check Authorization header
//     const authHeader = req.header('Authorization');
//     if (authHeader && authHeader.startsWith('Bearer ')) {
//         token = authHeader.replace('Bearer ', '');
//     }

//     // If not in Authorization header, check cookies
//     if (!token && req.cookies && req.cookies.token) {
//         token = req.cookies.token;
//     }

//     if (!token) {
//         return res.status(401).json({ message: "Authentication required" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };

// // Create a new review
// const createReview = async (req, res) => {
//     try {
//         const { moviename, review, rating } = req.body;
        
//         const newReview = new Review({
//             moviename,
//             review,
//             rating,
//             userId: req.user.id // Add the user's ID to the review
//         });
        
//         await newReview.save();
//         return res.status(201).json({ message: "Review added successfully", data: newReview });
//     } catch (error) {
//         console.error("Error adding review:", error);
//         return res.status(500).json({ message: "Error adding review", error: error.message });
//     }
// };

// // Get all reviews
// const getAllReviews = async (req, res) => {
//     try {
//         const reviews = await Review.find();
//         return res.status(200).json(reviews);
//     } catch (error) {
//         console.error("Error fetching reviews:", error);
//         return res.status(500).json({ message: "Error fetching reviews", error: error.message });
//     }
// };

// // Get a single review by ID
// const getReviewById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const review = await Review.findById(id);
        
//         if (!review) {
//             return res.status(404).json({ message: "Review not found" });
//         }
        
//         return res.status(200).json(review);
//     } catch (error) {
//         console.error("Error fetching review:", error);
//         return res.status(500).json({ message: "Error fetching review", error: error.message });
//     }
// };

// // Update a review by ID
// const updateReviewById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { moviename, description, review, thumbnail } = req.body;
        
//         const updatedReview = await Review.findOneAndUpdate(
//             { _id: id, userId: req.user.id },
//             { moviename, description, review, thumbnail },
//             { new: true }
//         );
        
//         if (!updatedReview) {
//             return res.status(404).json({ message: "Review not found or you're not authorized to update it" });
//         }
        
//         return res.status(200).json({ message: "Review updated successfully", data: updatedReview });
//     } catch (error) {
//         console.error("Error updating review:", error);
//         return res.status(500).json({ message: "Error updating review", error: error.message });
//     }
// };

// // Delete a review by ID
// const deleteReviewById = async (req, res) => {
//     try {
//         const { id } = req.params;
        
//         const deletedReview = await Review.findOneAndDelete({ _id: id, userId: req.user.id });
        
//         if (!deletedReview) {
//             return res.status(404).json({ message: "Review not found or you're not authorized to delete it" });
//         }
        
//         return res.status(200).json({ message: "Review deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting review:", error);
//         return res.status(500).json({ message: "Error deleting review", error: error.message });
//     }
// };

// module.exports = {
//     authenticateUser,
//     createReview,
//     getAllReviews,
//     getReviewById,
//     updateReviewById,
//     deleteReviewById,
// };