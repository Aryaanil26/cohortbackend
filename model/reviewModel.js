const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User collection
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie", // Reference to Movie collection
        required: true,
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
