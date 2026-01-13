const validator = require('validator');


const validateSignUpData = (req) => {
    const {name ,age ,email,gender,password} = req.body;

    if(!name){
        throw new Error('Name is required');
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('Password is not strong : '+ password);
    }
     else if(!validator.isEmail(email)){
        throw new Error('Invalid email format : '+ email);
    }
    
}

module.exports = {
    validateSignUpData
};  
// const connectDB = async () => {
// //   try {
//     await mongoose.connect(
//         "mongodb+srv://kamalakargpt_db_user: