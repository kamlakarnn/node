const express =require("express")

const authRouter = express.Router();

const User = require("../model/user.js");
const {validateSignUpData} = require("../utils/validation.js");
const bcrpt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body; // get user data from request body

    validateSignUpData(req); // validate user data

    // check if user with the same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("user with this email already exists");
    }          
    
    const passwordHash = await bcrpt.hash(password,10); // hash the password

    console.log("password hash  generated :", passwordHash);      

    const newUser = new User({ name, email, password:passwordHash});
    console.log("new user data :", newUser);    
    await newUser.save();   // save new user to database                    
    res.status(201).send("user registered successfully");
  } catch (error) {
    res.status(400).send("error registering user :" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    // const isPasswordMatch = await brcypt.compare(password, user.password);
    const isPasswordMatch = await user.validatePassword(password);
    // check the code of password decrept and check .
    if (isPasswordMatch) {
      //create Jwt token .
    //   const token = await jwt.sign({ _id: user._id }, "secretkey", {expiresIn:"7d"}); // provide secret key and expiry time
    const token = await user.getJWT(); // use instance method to get jwt token
    
    // console.log(" jwt token generated :", token);

      //add token to cookies and send response back to user.
      //   res.cookie("token", "asdfghjkhgdfghjsdfghjsdffffffff11111111111111111111111111111111111111111111111");
      res.cookie("token", token);   // you can set cookies time out also
      res.send("login successful");
    } else {
      throw new Error("invalid password");
    }
  } catch (error) {
    res.status(400).send("error logging in :" + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("token"); // Clear the token cookie to log out the user
    res.send("logout successful");
  } catch (error) {
    res.status(400).send("error logging out :" + error.message);
  }
});


module.exports = authRouter