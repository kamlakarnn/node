const userAuth = (req, res, next) => {
    console.log("auth middleware called for user authentication");
    const userAuthValue = "aaaa"; // Rename to avoid shadowing
    try {
        if (userAuthValue === "aaaa") {
            next(); // Proceed to next middleware/route handler
        } else {
            throw new Error("unauthenticated user");
        }
    } catch (error) {
        res.status(401).send("unauthenticated user");
    }
}



module.exports = {userAuth}