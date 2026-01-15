const express = require("express");

const requestRouter = express.Router();

const { userAuth} = require("../middleware/auth.js");



requestRouter.post("/sendConnectionRequest",userAuth ,async (req,res) =>{

  const user = req.user; // get user from request object set by auth middleware
    
    res.send(user.name +"   send connection request successfully")
})

module.exports = requestRouter;