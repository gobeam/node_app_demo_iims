const {checkSchema} = require('express-validator');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// validator for register
let userValidator = checkSchema({
    'email': {
        isLength: {
            errorMessage: 'Email is required.',
            options: { min: 1 },
            trim: true,
        },
        isEmail: {
            errorMessage: 'Email is invalid.',
        },
        custom: {
            options: async (value, {req,location,path}) => {
                const user = await User.findOne({username: value});
                if(user) {
                    throw new Error('Email already taken');
                } else {
                    return true;
                }
            }
        }
    },
    'firstName': {
        isLength: {
            errorMessage: 'First name is required.',
            options: { min: 1 },
            trim: true,
        }
    },
    'lastName': {
        isLength: {
            errorMessage: 'Last name is required.',
            options: { min: 1 },
            trim: true,
        }
    },
    'address': {
        isLength: {
            errorMessage: 'Address is required.',
            options: { min: 1 },
            trim: true,
        }
    },
    'phone': {
        isLength: {
            errorMessage: 'Phone length must be 10 characters.',
            options: { min: 10, max: 10 },
            trim: true,
        }
    },
    'password': {
        isLength: {
            errorMessage: 'Password length must be min 6 characters and less than 20 characters.',
            options: { min: 6, max: 20 },
            trim: true,
        }
    },
    'age': {
        isLength: {
            errorMessage: 'Age is required.',
            options: { min: 1 },
            trim: true,
        },
        isInt: {
            errorMessage: 'Age must number.',
        }
        
    },
});

// Validator for login
let loginValidator = checkSchema({
    'email': {
        isLength: {
            errorMessage: 'Email is required.',
            options: { min: 1 },
            trim: true,
        },
        isEmail: {
            errorMessage: 'Email is invalid.',
        }
    },
    'password': {
        isLength: {
            errorMessage: 'Password is required.',
            options: { min: 1},
            trim: true,
        }
    }
});

module.exports = {
    userValidator,
    loginValidator
};
