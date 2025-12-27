const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listings.js");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const expressError = require("./expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");   //joi validation

const Review = require("./models/review.js");

app.engine("ejs", ejsMate);
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));
app.use(express.static(path.join(__dirname,"./public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


let port = 3000;

app.listen(port,()=>{
    console.log(`the server is live on server`);
});

//CONNECTING TO MONGOOSE DB
main().then((res)=>{
console.log("successfully connected to db");
})
.catch((err)=>{
    console.log("err in mongoose connection ",err);
});

 async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//HOME ROUTE
app.get("/",(req,res)=>{
    res.send("its working");
});


//joi error handler for valid data listing
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
if(error){
    throw new expressError(400,error);
}
else{
    next();
}
};

//JOI ERROR VALIDATION FOR VALID DATA REVIEW
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
if(error){
    throw new expressError(400,error);
}
else{
    next();
}
};




 
//Listing route (all lists )
app.get("/listings",async(req,res)=>{
     let alldata = await Listing.find({});
    res.render("./listings/index.ejs",{alldata});
});

//new 

app.get("/listings/new",async(req,res)=>{
res.render("./listings/new.ejs")
});

//SHOW DATA ROUTE(SINGLE DATA)

app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs",{data});
});

//INSERT LIST
app.post("/listings",validateListing,async(req,res,next)=>{

let newlisting = req.body;
await Listing.create(newlisting);   // inserting one data (insertONe) 
res.redirect("/listings"); 
});

//EDIT ROUTE

app.get("/listings/:id/edit",async(req,res)=>{
     let {id} = req.params;
    let data = await Listing.findById(id);
    res.render("./listings/edit.ejs",{data});
});

//EDIT ROUTE POST

app.put("/listings/:id/edit",validateListing,async(req,res,next)=>{
    let {id} = req.params;
    let newdata= req.body;
   let data = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id,newdata);
    res.redirect("/listings");
});


//DELETE ROUTE

app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

//REVIEW ROUTE
app.post("/listings/:id/reviews",validateReview, async (req,res)=>{
   let listing = await Listing.findById(req.params.id);;
   let newReview = new Review(req.body);  //saving into review collection
   
   listing.reviews.push(newReview);    //pushing into listings

   await newReview.save();
   await listing.save();
   console.log("new review saved");
 res.redirect(`/listings/${req.params.id}`);
 });

 // DELETE REVIEW ROUTE
 app.delete("/listings/:id/reviews/:reviewId",async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}}); //to select and deltete specific review
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);

 });





//check error if no existing root found
app.all(/(.*)/, (req, res, next) => {
    next(new expressError(404,"page not found"));
});

//  DEFAULT ERROR HANDLER

app.use((err,req,res,next)=>{
  let {status=500,message="something went wrong"} = err;
  
    res.status(status).render("./listings/error",{message});
});

