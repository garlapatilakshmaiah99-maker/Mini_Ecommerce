// Defines signup/login API paths
const express = require("express");
const router = express.Router();

const {signup,userLogin,adminLogin,logout} = require("../controllers/AuthController");

router.post("/signup", signup);
router.post("/user-login", userLogin);
router.post("/admin-login", adminLogin);         //post
router.post("/logout", logout);

module.exports = router;
