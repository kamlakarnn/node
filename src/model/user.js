const mongoose = require('mongoose');

const validator = require('validator');


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

module.exports = mongoose.model('User', userSchema);