const express = require("express");

const app = express();

const {userAuth} = require("./middleware/auth")

const connectDB = require("./config/database")

const User = require("./model/user");



// app.post("/insert",(req,res)=>{
//     res.send("inserted data successfully")
// })

// app.delete("/delete",(req,res)=>{
//     res.send("delete the data sucessfully")
// })

// app.get("/data",(req,res)=>{
//     res.send("data sucessfully")
// })

// app.use("/",(req,res)=>{
//     res.send("hellowesefweg")
// })

// app.use("/",

//     (req,res , next)=>{
//       res.send("hellowesefweg")

//     console.log("hi ist req handler");

//  next();
// },

//     (req,res)=>{
//     res.send("hello i am 2 nd handler")

//     })

// app.use("/", (req, res, next) => {
//   console.log("first middleware");
//   // res.send("calling from app use")
//   next();
// });

// app.get("/user/data", (req, res) => {
//     console.log("fetching user data");
//     try {
//         const userAuth = "araaa"; // Assuming this comes from req headers or auth middleware
//         if (userAuth === "aaaa") {
//             res.send("user data successfully");
//         } else {
//             throw new Error("unauthenticated user");
//         }
//     } catch (error) {
//         res.status(401).send("sdkndkdj");
//     }
// });


// app.get ("/user/data", userAuth, (req, res) => {
//     try {
//     console.log("fetching user data");
//     res.send("user data successfully");
//     } catch (error) {
//          res.status(401).send("unauthenticated user is comming from middleware");
//     }
// });

// Catch-all for unmatched routes (404)
// app.use((req, res, next) => {
//     const error = new Error("No route matched - 404 Not Found");
//     error.status = 404;
//     next(error); // Pass to error middleware
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     res.status(err.status || 500).send(err.message || "Internal server error");
// });

app.post("/insert", async (req, res) => {
  const userobj = {
    name: "kamalakar",
    email: "kamlakar@external,com",
    password: "password123",
}
    const user = new User(userobj);

    try {
    await user.save();
    res.send("user inserted successfully");
    } catch (error) {
    res.status(500).send("error inserting user" + error.message);
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


// app.listen(4000, () => {
//   console.log("listing port 4000");
// })
