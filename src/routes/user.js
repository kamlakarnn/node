const express = require('express');
const userRouter = express.Router();

const { userAuth} = require("../middleware/auth.js");
const User = require("../model/user.js");
const ConnectionRequest = require("../model/connectionRequest.js");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received",userAuth ,async (req,res) =>{
    try {
        const loggedInUser = req.user._id; // get user from request object set by auth middleware 
        const requests = await ConnectionRequest.find({
            toUserId: loggedInUser._id, //
            status: "interested",
        }).populate('fromUserId', 'name email'); // populate fromUserId with name and email only

        res.json({requests});
    } catch (error) {
        res.status(400).send("error getting received connection requests :" + error.message);
    }               
});

userRouter.get("/user/connection",userAuth ,async (req,res) =>{
    try{
        const loggedInUser = req.user
        const connectionRequest = await ConnectionRequest.find({
         $or:[
            {toUserId: loggedInUser._id, status:"accepted"}, 
            {fromUserId: loggedInUser._id, status:"accepted"}
         ]
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)
        console.log(connectionRequest)

        const data = connectionRequest.map((row) => {
            if(row.fromUserId.toString === loggedInUser._id.toString){
                return row.toUserId
            }
            return row.fromUserId
        });
        res.json({data})
    }catch(err){
        res.status(400).send({message:err.message})
    }
})



module.exports = userRouter;
