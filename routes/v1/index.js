const express = require("express");
const { userRouter } = require("./userRoutes");
const { adminRouter } = require("./adminRoutes");
const { reviewRouter } = require("./reviewRoutes");
const { movieRouter } = require("./movieRoutes");


const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/admin", adminRouter);
v1Router.use("/review", reviewRouter);
v1Router.use("/movie", movieRouter)

module.exports = { v1Router };