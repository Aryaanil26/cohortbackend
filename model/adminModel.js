const mongoose = require("mongoose");

const adminSchema= new mongoose.Schema({
    role: {
        type:String
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

});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };