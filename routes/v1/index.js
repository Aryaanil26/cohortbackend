const express = require("express");
const { userRouter } = require("./userRoutes");
const { adminRouter } = require("./adminRoutes");




const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/admin", adminRouter);


module.exports = { v1Router };