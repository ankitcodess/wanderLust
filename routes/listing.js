const express = require("express");
const app = express();
const router = express.Router();
const Listing = require("../models/listings.js");
const expressError = require("../expressError.js");
const { isLoggedIn,isOwner ,validateListing }= require("../middleware.js");
const ListingController = require("../controllers/listings.js");

const multer  = require('multer');      //for file uplord
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); 

//Listing route (all lists )
router.get("/listings",ListingController.allListing);

//new 
router.get("/listings/new",isLoggedIn,ListingController.renderCreateListing);

//SHOW DATA ROUTE(SINGLE DATA)
router.get("/listings/:id",ListingController.showListing);

//INSERT LIST
// router.post("/listings",validateListing,ListingController.createListing);4
router.post("/listings",upload.single('image'),(req,res)=>{
    res.send(req.file);
    console.log(req.file);
});

//EDIT ROUTE
router.get("/listings/:id/edit",isLoggedIn,isOwner,ListingController.renderEditForm);

//EDIT ROUTE POST UPdate
router.put("/listings/:id/edit",isLoggedIn,isOwner,validateListing,ListingController.updateListing);


//DELETE ROUTE
router.delete("/listings/:id",isLoggedIn,isOwner,ListingController.destroyListing);



module.exports = router;