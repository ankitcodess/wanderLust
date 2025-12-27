const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type: String 
    },
     description:{
        type: String 
    },
     image:{
        type: String ,
        default: "https://thumbs.dreamstime.com/b/young-conceptual-image-large-stone-shape-human-brain-conceptual-image-large-stone-shape-110748113.jpg",
        set : (v) =>{  return v === "" ? "https://thumbs.dreamstime.com/b/young-conceptual-image-large-stone-shape-human-brain-conceptual-image-large-stone-shape-110748113.jpg"
        : v
    }
    },
     price:{
        type: Number 
    },
     location:{
        type: String 
    },
     country:{
        type: String 
     },
     reviews:[
        {
            type : Schema.Types.ObjectId,
            ref: "Review"
        },
     ],
     owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
     }
    
    
});

//mongoose middleware post for deleting review colleciton and list review (both)
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in : listing.reviews}})
    }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;