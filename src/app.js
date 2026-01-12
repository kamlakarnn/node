const express = require("express");

const app = express();

const {userAuth} = require("./middleware/auth")

const connectDB = require("./config/database")

const User = require("./model/user");
const { get } = require("mongoose");

app.use(express.json());  // middlware to convert json to object



app.post("/insert", async (req, res) => {

    console.log(req.body);

    const user = new User(req.body);
    
//   const userobj = {
//     name: "kamalakar",
//     email: "kamlakar@external,com",
//     password: "password123",
// }
//     const user = new User(userobj);

    try {
    await user.save();
    res.send("user inserted successfully");
    } catch (error) {
    res.status(500).send("error inserting user"+error.message );
    }
})

app.get("/getusers", async (req, res) => {
    try {
        const users = await User.find({});  
        // res.send(users);
        res.json(users);
    } catch (error) {
        res.status(500).send("error getting users"+ error.message);
    }

});

app.get("/find" , async (req,res) => {
    try {
         console.log(req.body);
        const user = await User.findOne(req.body);
       if (!user) {
        return res.status(404).send("user not found");
       }
        
    res.json(user);
    } catch (error) {
        res.status(500).send("error finding user"+ error.message);
    }
})

app.delete("/deleteUser" , async (req,res) => {
    try {
        const user_id = req.body._id;
         console.log(user_id);
        const result = await User.deleteOne(user_id);
      res.send("user deleted successfully");
       }  catch (error) { 
        res.status(500).send("error deleting user"+ error.message);
    }
})   

app.patch("/updateUser" , async (req,res) => {
    try {
        const user_id = req.body.user_id;
        const updateData = req.body;
         console.log(user_id);
        const result = await User.updateOne({_id: user_id},  updateData);
          res.send("user updated successfully");
       }  catch (error) { 
        res.status(500).send("error updating user"+ error.message);
    }
})

connectDB()  // Start the server after establishing database connection
.then(() => {
    console.log("Database connected successfully");
    app.listen(4000, () => {
  console.log("listing port 4000");
});

})
.catch((err)=>{
    console.error("Database connection failed:", err);
})

