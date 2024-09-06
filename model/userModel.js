const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profilePic: {
        type:String,
        default: "https:/encrypted-tbn0.gstatic.com/images?q=thn:ANd9GcRt_NZykul07nU3cliFuRZQr4_q-godkRTmRA&s",
    },

});

const User = mongoose.model("User", userSchema);

module.exports = { User };