const Listing = require("../models/listings");

module.exports.allListing = async(req,res)=>{
     let alldata = await Listing.find({});
    res.render("./listings/index.ejs",{alldata});
};

module.exports.renderCreateListing = async(req,res)=>{
res.render("./listings/new.ejs")
};

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
   let data = await Listing.findById(id)
    .populate("owner")
    .populate({path: "reviews",populate: "author"});
   //populate show full details of ref obid
// if listing does not exists in url and we still go  then use this flash  
if(!data){
    req.flash("error","Listing u requested for does not exists");
     return res.redirect("/listings");
}
    res.render("./listings/show.ejs",{data});
};
 
module.exports.createListing = async(req,res,next)=>{
let newlisting = req.body;
newlisting.owner = req.user._id;  //adding the req.user(login data  of passport) into newlisting owner data accesssing id to store 
await Listing.create(newlisting);   // inserting one data (insertONe) 
req.flash("success","New listing created");   //connect-flash session one time message 
res.redirect("/listings"); 
};


module.exports.renderEditForm = async(req,res)=>{
     let {id} = req.params;
    let data = await Listing.findById(id);
    // if listing does not exists in url and we still go.instead of err we use then use this flash 
if(!data){
    req.flash("error","Listing u requested for does not exists");
     return res.redirect("/listings");
}
    res.render("./listings/edit.ejs",{data});
};


module.exports.updateListing = async(req,res,next)=>{
    let {id} = req.params;
    let newdata= req.body;
   let data = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id,newdata);
    req.flash("success"," updated succesfully")
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success"," deleted successfully")
    res.redirect("/listings");
};