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

        const isMovieExist = await Movie.findOne({ moviename });
        console.log("isMovieExist")

        if (isMovieExist) {           
            return res.status(400).json({ success: false, message: "movie already exist" });
        }

      
        if (req.file) {
            thumbnailUrl = await handleImageUpload(req.file.path);
        }
        

        const newMovie = new Movie({ moviename, description, genre, thumbnail: thumbnailUrl , rating });
        if (user.role === "admin") newMovie.admin = user.id;
        await newMovie.save();
        console.log(newMovie)

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

        if (!movieDeleted) res.status(400).json({ success: false, message: "movie already deleted" });

        res.status(200).json({ success: true, message: "movie deleted successfully", data: movieDeleted });
    } catch (error) {
        next(error);
    }
};



module.exports = { createMovie, updateMovie, deleteMovie};







