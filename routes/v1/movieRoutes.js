const express = require("express");
const {createMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById} = require("../../controller/movieController")
const {adminAuth } = require("../../middlewares/adminAuth");
const { upload } = require("../../middlewares/multer");

const router = express.Router();



router.post('/createmovie',upload.single('thumbnail') , adminAuth,createMovie)
router.patch('/updatemovieById', adminAuth,updateMovieById)
router.delete('/deletemovieById', adminAuth,deleteMovieById)
router.get('/getAllmovies', adminAuth,getAllMovies)
router.get('/getmovieById', adminAuth,getMovieById)



module.exports = { movieRouter: router };