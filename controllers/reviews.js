const Review = require("../models/review");
const Listing = require("../models/listings");

module.exports.createReview = async (req,res)=>{
   let listing = await Listing.findById(req.params.id);;
   let newReview = new Review(req.body);  //saving into review collection
   newReview.author = req.user._id;
   listing.reviews.push(newReview);    //pushing into listings

   await newReview.save();
   await listing.save();
   console.log("new review saved");
   req.flash("success","new review added");
 res.redirect(`/listings/${req.params.id}`);
 };

 module.exports.destroyReview = async(req,res)=>{
     let {id,reviewId} = req.params;
     await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}}); //to select and deltete specific review
     await Review.findByIdAndDelete(reviewId);
     req.flash("success","review deleted");
     res.redirect(`/listings/${id}`);
 
  };