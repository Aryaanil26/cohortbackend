const express = require("express");
const { adminSignup, adminLogin ,adminLogout,adminProfile,checkAdmin } = require("../../controller/adminController");
const { adminAuth } = require("../../middlewares/adminAuth");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);


router.get("/profile",adminAuth, adminProfile);
router.get("/check-user", )

module.exports = { adminRouter: router};
