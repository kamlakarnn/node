const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");

profileRouter.get("/profile",userAuth, async (req, res) => {
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


module.exports = profileRouter;