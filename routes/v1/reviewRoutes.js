const express = require("express");
const {addReview, getAverageRating, deleteReview,getMovieReviews} = require("../../controller/reviewController")
const {userAuth } = require("../../middlewares/userAuth");

const router = express.Router();



router.post('/addreview/:movieId',userAuth,addReview)
router.patch('/averagerating', userAuth,getAverageRating)
router.delete('/deletereview', userAuth,deleteReview)
router.delete('/moviereviews',getMovieReviews)


module.exports = { reviewRouter: router };