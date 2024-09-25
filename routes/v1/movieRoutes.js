const express = require("express");
const {createMovie,  updateMovie, deleteMovie} = require("../../controller/movieController")
const {adminAuth } = require("../../middlewares/adminAuth");
const { upload } = require("../../middlewares/multer");

const router = express.Router();



router.post('/createmovie',adminAuth, upload.single('thumbnail') ,createMovie)
router.patch('/updatemovie',adminAuth, upload.single('thumbnail'),updateMovie)
router.delete('/deletemovie', adminAuth,deleteMovie)




module.exports = { movieRouter: router };