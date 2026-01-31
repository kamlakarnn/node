const express = require("express");
const app = express();
const { userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./model/user");
const { get } = require("mongoose");
const { validateSignUpData } = require("./utils/validation");
const brcypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use(express.json()); // middlware to convert json to object
app.use(cookieParser()); //middleware to parse cookies



// router
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.status(404).send("user not found");
//     }
//     // const isPasswordMatch = await brcypt.compare(password, user.password);
//     const isPasswordMatch = await user.validatePassword(password);
//     // check the code of password decrept and check .
//     if (isPasswordMatch) {
//       //create Jwt token .
//     //   const token = await jwt.sign({ _id: user._id }, "secretkey", {expiresIn:"7d"}); // provide secret key and expiry time
//     const token = await user.getJWT(); // use instance method to get jwt token
    
//     // console.log(" jwt token generated :", token);

//       //add token to cookies and send response back to user.
//       //   res.cookie("token", "asdfghjkhgdfghjsdfghjsdffffffff11111111111111111111111111111111111111111111111");
//       res.cookie("token", token);   // you can set cookies time out also
//       res.send("login successful");
//     } else {
//       throw new Error("invalid password");
//     }
//   } catch (error) {
//     res.status(400).send("error logging in :" + error.message);
//   }
// });

app.get("/profile",userAuth, async (req, res) => {
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


// app.post("/sendConnectionRequest",userAuth ,async (req,res) =>{

//   const user = req.user; // get user from request object set by auth middleware
    
//     res.send(user.name +"   send connection request successfully")
// })


connectDB() // Start the server after establishing database connection
  .then(() => {
    console.log("Database connected successfully");
    app.listen(4000, () => {
      console.log("listing port 4000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
