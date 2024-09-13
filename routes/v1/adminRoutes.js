const express = require("express");
const { adminSignup, adminLogin ,adminLogout,adminProfile } = require("../../controller/adminController");
const { adminAuth } = require("../../middlewares/adminAuth");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);


router.get("/profile/:id",adminAuth, adminProfile);

module.exports = { adminRouter: router};
