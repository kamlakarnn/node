const mongoose = require('mongoose');

const validator = require('validator');
const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50   
    },
    email: {
        type: String,
        required: true,
        unique: true,  // check the whether email is unique or not
        trim: true, // remove spaces
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format' + value);
            }
        }
    },
     age: {
        type: Number,
        min: 5,
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error('Invalid gender value' + value );
            }  
        }
    },

    skills: {
        type: [String], // array of strings
        
    },
            
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is not strong enough'+ value);

            }
        }
    }
}, { timestamps: true } );

//create modelc 
// const User = mongoose.model('User', userSchema);

userSchema.methods.getJWT = async function(){
    const  user = this // instance method to get jwt token for user
    const token = await jwt.sign({_id: user._id},"secretkey",{expiresIn:"7d"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user =this
    const paswordHash = user.password

    const isPasswordValid = await brcypt.compare(passwordInputByUser,paswordHash)

    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);