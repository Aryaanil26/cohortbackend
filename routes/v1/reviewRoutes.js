const express = require("express");
const {createReview, getAllReviews, getReviewById, updateReviewById, deleteReviewById} = require("../../controller/reviewController")
const { userAuth } = require("../../middlewares/userAuth");

const router = express.Router();



router.post('/createreview', userAuth,createReview)
router.patch('/updatereviewById', userAuth,updateReviewById)
router.delete('/deletereviewById', userAuth,deleteReviewById)
router.get('/getAllReviews', userAuth,getAllReviews)
router.get('/getreviewById', userAuth,getReviewById)



module.exports = { reviewRouter: router };