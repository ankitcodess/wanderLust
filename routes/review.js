const express = require("express");
const router = express.Router({mergeParams : true});
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const {validateReview, isLoggedIn, saveRedirectUrl,isReviewAuthor} = require("../middleware");
const reviewController = require("../controllers/reviews.js");

 
//REVIEW ROUTE insert
router.post("/listings/:id/reviews",isLoggedIn,validateReview,reviewController.createReview );

 // DELETE REVIEW ROUTE
 router.delete("/listings/:id/reviews/:reviewId",isLoggedIn,saveRedirectUrl,isReviewAuthor,reviewController.destroyReview);


module.exports = router;
