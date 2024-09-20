const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const { Movie } = require("../model/movieModel");
const { handleImageUpload } = require("../utils/imageUpload");

const createMovie = async (req, res, next) => {
    try {
        const user = req.user;

        const { moviename, description, genre, rating, thumbnail } = req.body;
        let thumbnailUrl;

        if (!moviename || !description || !genre || !thumbnail ||!rating) {
            return res.status(400).json({ message: "all fields required" });
        }

        const isMovieExist = await Movie.findOne({ title });

        if (isMovieExist) {
            return res.status(400).json({ success: false, message: "movie already exist" });
        }

        if (req.file) {
            thumbnailUrl = await handleImageUpload(req.file.path);
        }

        const newMovie = new Movie({ moviename, description, genre, thumbnail: thumbnailUrl , rating });
        if (user.role === "admin") newMovie.admin = user.id;
        await newMovie.save();

        res.status(201).json({ success: true, message: "movie created successfully" });
    } catch (error) {
        next(error);
    }
};
const updateMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const { moviename, description, genre, thumbnail, rating } = req.body;
        let thumbnailUrl;

        // req.file

        const isMovieExist = await Movie.findOne({ _id: movieId });

        if (!isMovieExist) {
            return res.status(400).json({ success: false, message: "movie does not exist" });
        }

        if (req.file) {
            thumbnailUrl = await handleImageUpload(req.file.path);
        }

        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: movieId },
            { moviename, description, rating, genre,  thumbnail: thumbnailUrl },
            { new: true }
        );

        res.status(200).json({ success: true, message: "movie updated successfully", data: updatedMovie });
    } catch (error) {
        next(error);
    }
};
const deleteMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const movieDeleted = await Movie.findByIdAndDelete({ _id: movieId });

        if (!movieDeleted) res.status(400).json({ success: true, message: "movie already deleted" });

        res.status(200).json({ success: true, message: "movie deleted successfully", data: movieDeleted });
    } catch (error) {
        next(error);
    }
};



module.exports = { createMovie, updateMovie, deleteMovie};







// // reviewController.js
// const { Movie } = require("../model/movieModel");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { generateToken } = require("../utils/token");
// const { cloudinaryInstance } = require("../config/cloudinaryConfig");
// const { handleImageUpload } = require("../utils/imageUpload");

// // // Middleware to check if the user is authenticated
// // const authenticateAdmin = (req, res, next) => {
// //     let token;

// //     // Check Authorization header
// //     const authHeader = req.header('Authorization');
// //     if (authHeader && authHeader.startsWith('Bearer ')) {
// //         token = authHeader.replace('Bearer ', '');
// //     }

// //     // If not in Authorization header, check cookies
// //     if (!token && req.cookies && req.cookies.token) {
// //         token = req.cookies.token;
// //     }

// //     if (!token) {
// //         return res.status(401).json({ message: "Authentication required" });
// //     }

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         req.admin = decoded;
// //         next();
// //     } catch (error) {
// //         return res.status(401).json({ message: "Invalid token" });
// //     }
// // };
// l
// // Create a new movie
// const createMovie = async (req, res) => {
//     try {
//         const { moviename,genre, description,thumbnail, rating } = req.body;
//         let thumbnailUrl;
            
//     if(req.file) {
//        thumbnailUrl = await handleImageUpload(req.file.path);
//         }


//         const newMovie = new Movie({
//             moviename,
//             genre,
//             description,
//             thumbnail: thumbnailUrl,
//             rating,
//             adminId: req.admin.id // Add the user's ID to the movie
//         });
        
//         await newMovie.save();
//         return res.status(201).json({ message: "Movie added successfully", data: newMovie });
//     } catch (error) {
//         console.error("Error adding movie:", error);
//         return res.status(500).json({ message: "Error adding movie", error: error.message });
    
//     }
// };

// // Get all movies
// const getAllMovies = async (req, res) => {
//     try {
//         const movies = await Movie.find();
//         return res.status(200).json(movies);
//     } catch (error) {
//         console.error("Error fetching movies:", error);
//         return res.status(500).json({ message: "Error fetching movies", error: error.message });
//     }
// };

// // Get a single movie by ID
// const getMovieById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const movie = await Movie.findById(id);
        
//         if (!movie) {
//             return res.status(404).json({ message: "Movie not found" });
//         }
        
//         return res.status(200).json(movie);
//     } catch (error) {
//         console.error("Error fetching movie:", error);
//         return res.status(500).json({ message: "Error fetching movie", error: error.message });
//     }
// };

// // Update a movie by ID
// const updateMovieById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { moviename, description,genre, review, thumbnail } = req.body;
        
//         const updatedMovie = await Movie.findOneAndUpdate(
//             { _id: id, adminId: req.admin.id },
//             { moviename, description, review,genre, thumbnail },
//             { new: true }
//         );
        
//         if (!updatedMovie) {
//             return res.status(404).json({ message: "Movie not found or you're not authorized to update it" });
//         }
        
//         return res.status(200).json({ message: "Movie updated successfully", data: updatedMovie });
//     } catch (error) {
//         console.error("Error updating movie:", error);
//         return res.status(500).json({ message: "Error updating movie", error: error.message });
//     }
// };

// // Delete a review by ID
// const deleteMovieById = async (req, res) => {
//     try {
//         const { id } = req.params;
        
//         const deletedMovie = await Movie.findOneAndDelete({ _id: id, adminId: req.admin.id });
        
//         if (!deletedMovie) {
//             return res.status(404).json({ message: "Movie not found or you're not authorized to delete it" });
//         }
        
//         return res.status(200).json({ message: "Movie deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting movie:", error);
//         return res.status(500).json({ message: "Error deleting movie", error: error.message });
//     }
// };

// module.exports = {
//     // authenticateAdmin,
//     createMovie,
//     getAllMovies,
//     getMovieById,
//     updateMovieById,
//     deleteMovieById,
// };