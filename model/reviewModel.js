const mongoose = require("mongoose");

const reviewSchema= new mongoose.Schema({
    moviename: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    review: {
        type: String,
        minLength:50,
        maxLength:500,
        required: true,
    },
    thubnail: {
        type:String,
        default: "https:/encrypted-tbn0.gstatic.com/images?q=thn:ANd9GcRt_NZykul07nU3cliFuRZQr4_q-godkRTmRA&s",
    },


});

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };