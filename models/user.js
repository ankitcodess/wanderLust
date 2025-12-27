const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema({
    email :  {
        type : String,
        required : true
    }
});

UserSchema.plugin(passportLocalMongoose); // adds username, hash, salt, authenticate()

let User = mongoose.model("User",UserSchema);

module.exports = User;
