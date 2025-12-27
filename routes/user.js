const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const{ saveRedirectUrl ,isLoggedIn}= require("../middleware.js");   //after login save redirected url the user wanted to go

const userController = require("../controllers/users.js");

// SIGN ROUTE
router.get("/signup",userController.renderSignupForm);
//signup POST data sendeing
router.post("/signup",userController.signup);

// login GET route
router.get("/login",userController.renderLoginFrom);

//login POST route
router.post("/login",saveRedirectUrl,passport.authenticate('local',{ failureRedirect : '/login',failureFlash : true})
    ,userController.login);

// logout get route
router.get("/logout",userController.logout);

module.exports = router;


