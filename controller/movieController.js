// reviewController.js
const { Movie } = require("../model/movieModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");



// Create a new movie
const createMovie = async (req, res) => {
    try {
        const { moviename,genre, description,thumbnail, rating } = req.body;
        
        const newMovie = new Movie({
            moviename,
            genre,
            description,
            thumbnail,
            rating,
            adminId: req.admin.id // Add the user's ID to the movie
        });
        
        await newMovie.save();
        return res.status(201).json({ message: "Movie added successfully", data: newMovie });
    } catch (error) {
        console.error("Error adding movie:", error);
        return res.status(500).json({ message: "Error adding movie", error: error.message });
    }
};

// Get all movies
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        return res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
};

// Get a single movie by ID
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        
        return res.status(200).json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
        return res.status(500).json({ message: "Error fetching movie", error: error.message });
    }
};

// Update a movie by ID
const updateMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const { moviename, description,genre, review, thumbnail } = req.body;
        
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: id, adminId: req.admin.id },
            { moviename, description, review,genre, thumbnail },
            { new: true }
        );
        
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found or you're not authorized to update it" });
        }
        
        return res.status(200).json({ message: "Movie updated successfully", data: updatedMovie });
    } catch (error) {
        console.error("Error updating movie:", error);
        return res.status(500).json({ message: "Error updating movie", error: error.message });
    }
};

// Delete a review by ID
const deleteMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedMovie = await Movie.findOneAndDelete({ _id: id, adminId: req.admin.id });
        
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found or you're not authorized to delete it" });
        }
        
        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Error deleting movie:", error);
        return res.status(500).json({ message: "Error deleting movie", error: error.message });
    }
};

module.exports = {
   
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
};