const User = require("../models/user");

module.exports.renderSignupForm =(req,res)=>{
    res.render("./users/signup");
};


module.exports.signup = async(req,res,next)=>{
    try{
    let {username, email,password} = req.body;
    const newUser = new User({username ,email});
  const registered = await User.register(newUser,password);    //register() method to insert into passport in db
    console.log(registered);  
    //after sign up automatically login not (login data to enter again) LOGIN METHOD 
    req.login(registered,(err,next)=>{
        if(err){
            return next(err);
        }
            req.flash("success","succesfully registered");
            res.redirect("/listings");
    })

    } catch(e){
        req.flash("error",e.message); 
        res.redirect("/signup");
    }
};

module.exports.renderLoginFrom = (req,res)=>{
    res.render("./users/login");
};

module.exports.login = (req,res)=>{
        req.flash("success","welcome back ..");
        res.redirect(res.locals.redirectUrl || "/listings");    // if res.locals does not exists then just redirect to /listings
    }

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","successfully logged out");
        res.redirect("/listings");
    });
};