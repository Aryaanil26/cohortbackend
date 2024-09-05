const express = require("express");
const { userRouter } = require("./userRoutes");
const {reviewRouter } = require("./reviewRoutes");

const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/movie", reviewRouter);

module.exports = { v1Router };