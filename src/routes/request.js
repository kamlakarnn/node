const express = require("express");

const requestRouter = express.Router();

const { userAuth} = require("../middleware/auth.js");
const User = require("../model/user.js");
const ConnectionRequest = require("../model/connectionRequest.js");



requestRouter.post("/request/send/:status/:toUserId",userAuth ,async (req,res) =>{

try {
      const fromUserId = req.user._id; // get user from request object set by auth middleware
        const toUserId = req.params.toUserId;       
        const status = req.params.status;
    
        if(fromUserId.equals(toUserId)){
            return res.status(400).send("cannot send connection request to yourself");
        }
        const allowedStatus = ["ignored","interested"];
    
        if(!allowedStatus.includes(status)){
            return res.status(400).send("invalid status type"+status);
        }
      
        const toUser = await User.findById(toUserId);

        if(!toUser){
            return res.status(404).send("to user not found");
        }
    
        const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId , toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}
        ]     
        });
    
        if(existingConnectionRequest){
            return res.status(400).send("connection request already exists between these users");
        }
    
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
    
       const data = await connectionRequest.save();
    
       res.json({message: req.user.name + " is " +status +" in "+toUser.name, data});
    
    }
 catch (error) {
    res.status(400).send("error sending connection request :" + error.message);
    }
});

requestRouter.post("/request/respond/:status/:requestId",userAuth ,async (req,res) =>{
try {
    const loggedInUserId = req.user._id; // get user from request object set by auth middleware
    const requestId = req.params.requestId;       
    const status = req.params.status;
    const allowedStatus = ["accepted","rejected"];

    if(!allowedStatus.includes(status)){
        return res.status(400).send("invalid status type"+status);
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId, 
        toUserId: loggedInUserId,
        status: "interested"
 });

    if(!connectionRequest){
        return res.status(404).send("no pending connection request found for this user");
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({message: req.user.name + " has " +status +" the connection request", data});


} catch (error) {
    res.status(400).send("error responding to connection request :" + error.message);
    }
    

})

module.exports = requestRouter;