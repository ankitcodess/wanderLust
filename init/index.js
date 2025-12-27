const mongoose = require("mongoose");
const Listing = require("../models/listings.js");
const sampledata = require("./data.js");


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

const generatedata =async ()=>{
await Listing.deleteMany({});
 const updatedData = sampledata.map(obj =>{    // to insert owner details in each list temporary new array
    return {
        ...obj,
        owner :"692821009004baf34f9dbc0b"
    }
});
await Listing.insertMany(updatedData);
console.log("data was succesfully inserted");
}

generatedata();

