const mongoose = require("mongoose");

const movieSchema= new mongoose.Schema({
    moviename: {
        type:String,
        required:true,
    },
    description: {
        type: String,
        minLength:50,
        maxLength:500,
        required: true,
    },
    genre:{
      type:String
    },
    rating: {
     type:Number,
     require: true,
     minLength:1,
     maxLength:5
    },
    thubnail: {
        type:String,
        default: "https:/encrypted-tbn0.gstatic.com/images?q=thn:ANd9GcRt_NZykul07nU3cliFuRZQr4_q-godkRTmRA&s",
    },


});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };