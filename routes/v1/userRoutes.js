const express = require("express");

const router = express.Router();

router.post("/signup");
router.post("/login");
router.post("/logout");


router.get("/profile");
router.get("/update");
router.get("/delete");

router.get("/userList");

router.get("/check-user")

module.exports = {userRouter: router };