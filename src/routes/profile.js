const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const {validateEditProfileData} = require("../utils/validation.js");

profileRouter.get("/profile/view",userAuth, async (req, res) => {
  // to get the cookies from request we required cookie-parser middleware  
try {
const user = req.user; // user object is attached to request by auth middleware
console.log("user profile data :", user);
  res.json(user); // send user profile data as response
  // console.log("redaing cookies :");
} catch (error) {
    res.status(500).send("error getting profile data :" + error.message);
}
});

profileRouter.patch("/profile/update",userAuth, async (req, res) => {               
    try {   
        const user = req.user; // get user from request object set by auth middleware
        const updates = req.body; // get updates from request body
        validateEditProfileData(req); // validate the updates
        console.log("updates received :", updates);             
        // update user object with new data
        Object.keys(updates).forEach((key) => {
            user[key] = updates[key];
        });         
        await user.save(); // save updated user to database
        res.send("profile updated successfully");
    } catch (error) {
        res.status(500).send("error updating profile data :" + error.message);
    }               
});


module.exports = profileRouter;