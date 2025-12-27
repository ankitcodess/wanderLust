const { findById } = require("./models/user");
const Listing = require("./models/listings");
const Review = require("./models/review");
const expressError = require("./expressError");
const { listingSchema, reviewSchema  } = require("./schema.js");   //joi validation

//joi error handler for valid data listing
 module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
if(error){
    // const msg = error.details.map(el => el.message).join(", ");
//    req.flash("error",msg);
//    res.redirect("/listings/new");
    throw new expressError(400,error);
}
else{
    next();
}
};

//JOI ERROR VALIDATION FOR VALID DATA REVIEW
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
if(error){
    throw new expressError(400,error);
}
else{
    next();
}
};



//to check is logged in 
module.exports.isLoggedIn = (req,res,next)=>{
   
   if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;     //for saving url in session before login to redirect 
        req.flash("error","user must be logged in first");
        return res.redirect("/login");      
    }
    next();
};


//for saving the urlrediected into the locals as it gets deleted
//  in session after login(session resets so req.session.redirecturl get deleted)
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;   // saving into session then locals
    }
    next();
} 

// to verify if the owner and logged person match to edit or delete permission 
module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);
      if(!data.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","u don't have permission to edit this listing")
    return res.redirect(`/listings/${id}`);
   }
   next();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
      let {id,reviewId} = req.params;
      let data = await Review.findById(reviewId);
      if(!data.author._id.equals(res.locals.currUser._id)){
        req.flash("error","u are not the author of this review");
        return res.redirect(`/listings/${id}`);
      }
      next();
}






 