const express = require("express");

const router = express.Router();

router.get("/",(req, res, next) =>{
    res.send("accessed movie  route get method");
});

module.exports = {reviewRouter: router };