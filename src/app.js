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

app.use(express.json()); // middlware to convert json to object
app.use(cookieParser()); //middleware to parse cookies

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
    res.status(500).send("error inserting user" + error.message);
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({});
    // res.send(users);
    res.json(users);
  } catch (error) {
    res.status(500).send("error getting users" + error.message);
  }
});

app.get("/find", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne(req.body);
    if (!user) {
      return res.status(404).send("user not found");
    }

    res.json(user);
  } catch (error) {
    res.status(500).send("error finding user" + error.message);
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    const user_id = req.body._id;
    console.log(user_id);
    const result = await User.deleteOne(user_id);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(500).send("error deleting user" + error.message);
  }
});

app.post("/signup", async (req, res) => {
  //validation of data using helper function
  try {
    validateSignUpData(req);

    const { password } = req.body;
    //encrypt the password before saving to db
    const passwordHash = await brcypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      password: passwordHash,
    });

    await user.save();
    res.send("user registered successfully");
  } catch (error) {
    res.status(500).send("error registering user" + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const isPasswordMatch = await brcypt.compare(password, user.password);
    // check the code of password decrept and check .
    // if (!isPasswordMatch) {
    //   return res.status(401).send("invalid password");
    // }
    // res.send("login successful");

    if (isPasswordMatch) {
      //create Jwt token .
      const token = await jwt.sign({ _id: user._id }, "secretkey");
      console.log(" jwt token generated :", token);

      //add token to cookies and send response back to user.
      //   res.cookie("token", "asdfghjkhgdfghjsdfghjsdffffffff11111111111111111111111111111111111111111111111");
      res.cookie("token", token);
      res.send("login successful");
    } else {
      throw new Error("invalid password");
    }
  } catch (error) {
    res.status(400).send("error logging in :" + error.message);
  }
});

app.get("/profile",userAuth, async (req, res) => {
  // to get the cookies from request we required cookie-parser middleware
//   const cookies = req.cookies;

//   const { token } = cookies;

//   // verify the token
//   const decodedMessage = await jwt.verify(token, "secretkey");
//   console.log("decoded message : ", decodedMessage);
//   // get the user id from decoded message
//   const { _id } = decodedMessage;
//   console.log("logged in user :" + _id);

//   // fetch the user profile from db
//   const user = await User.findOne({ _id: _id });
//   if (!user) {
//     return res.status(404).send("user not found");
//   }
try {
const user = req.user; // user object is attached to request by auth middleware
console.log("user profile data :", user);
  res.json(user); // send user profile data as response
  // console.log("redaing cookies :");
} catch (error) {
    res.status(500).send("error getting profile data :" + error.message);
}
});

app.patch("/updateUser", async (req, res) => {
  const user_id = req.body.user_id;
  const updateData = req.body;

  try {
    // Validate allowed updates -- api level validation to check what we can update
    const allowedUpdates = ["user_id", "name", "age", "gender", "password"];
    const isupdateAllowed = Object.keys(updateData).every((k) =>
      allowedUpdates.includes(k)
    );
    console.log(isupdateAllowed);

    if (!isupdateAllowed) {
      throw new Error("update not allowed");
    }

    console.log(user_id);
    const result = await User.updateOne({ _id: user_id }, updateData, {
      runValidators: true, // to run the validators defined in the schema
    });
    res.send("user updated successfully");
  } catch (error) {
    res.status(500).send("error updating user" + error.message);
  }
});

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
