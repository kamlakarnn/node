const jwt = require("jsonwebtoken");
const User = require("../model/user.js");

// const userAuth = (req, res, next) => {
//   
//     const userAuthValue = "aaaa"; // Rename to avoid shadowing
//     try {
//         if (userAuthValue === "aaaa") {
//             next(); // Proceed to next middleware/route handler
//         } else {
//             throw new Error("unauthenticated user");
//         }
//     } catch (error) {
//         res.status(401).send("unauthenticated user");
//     }
// }

    /* Middleware to authenticate user jwt token validation */
const userAuth = async (req, res, next) => {

    try {
        const token = req.cookies.token; // Get token from cookies  
        if (!token) {
            throw new Error("no token provided");
        }

        const decodedObj = await jwt.verify(token, "secretkey"); // Verify token
        // console.log("decoded object in mid: ", decodedObj);
        const {_id} = decodedObj // Get user id from decoded token

        // Find user by id
        const user = await User.findOne({_id: _id});
        if (!user) {
            throw new Error("user not found");
        }   
        req.token = token; // Attach token to request
        req.user = user; // Attach user object to request
        next(); // Proceed to next middleware/route handler
    } catch (error) {
        res.status(401).send("ERROR: " + error.message);
    }

}


module.exports = {userAuth}