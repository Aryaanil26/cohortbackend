const {Movie } = require("../model/movieModel")
const { Review } = require("../model/reviewModel");

const mongoose = require("mongoose");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


const addReview = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;
              

        if (!isValidObjectId(movieId)) {
            return res.status(400).json({ message: "Invalid movie ID" });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const review = await Review.findOneAndUpdate(
            { userId, movieId },
            { rating, comment },
            { new: true, upsert: true }
        );

        return res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        console.error("Error adding review:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
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

