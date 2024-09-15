const express = require("express");
const {createMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById} = require("../../controller/movieController")
const {adminAuth } = require("../../middlewares/adminAuth");

const router = express.Router();



router.post('/createmovie', adminAuth,createMovie)
router.patch('/updatemovieById', adminAuth,updateMovieById)
router.delete('/deletemovieById', adminAuth,deleteMovieById)
router.get('/getAllmovies', adminAuth,getAllMovies)
router.get('/getmovieById', adminAuth,getMovieById)



module.exports = { movieRouter: router };