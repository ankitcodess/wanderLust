if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}
// console.log(process.env.SECRET);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const expressError = require("./expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");   //joi validation
const session = require("express-session");
const flash = require("connect-flash"); // or connect-flash
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");  

app.engine("ejs", ejsMate);
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));
app.use(express.static(path.join(__dirname,"./public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const sessionOptions = {
    secret : "mysecretcode",
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
}
app.use(session(sessionOptions));
app.use(flash());

//for passport to store data in hash security 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//for flash
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;    // current user session data to access req.user in views ejs section directly (user data for session)
    next();
});

//demo for passport post post request to enter data using register() method
// app.get("/demo",async (req,res)=>{
//     let fakeUser = new User({
//         username : "akshit",
//         email : "akshit@gmail.com"
//     });

//      let testData = await User.register(fakeUser,"heyday");
//      res.send(testData)
// });


//routes require
const listingRoute = require("./routes/listing.js");
app.use("/",listingRoute);
const reviewRoute = require("./routes/review.js");
app.use("/",reviewRoute);
const userRoute = require("./routes/user.js");
app.use("/",userRoute);


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

//check error if no existing root found
app.all(/(.*)/, (req, res, next) => {
    next(new expressError(404,"page not found"));
});

//  DEFAULT ERROR HANDLER

app.use((err,req,res,next)=>{
  let {status=500,message="something went wrong"} = err;
  
    res.status(status).render("./listings/error",{message});
});

