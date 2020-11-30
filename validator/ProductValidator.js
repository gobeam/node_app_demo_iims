const {checkSchema} = require('express-validator');

let productValidator = checkSchema({
    'name': {
        isLength: {
            errorMessage: 'Name is required and must be greater than 2 characters.',
            options: { min: 2 },
            trim: true,
        }
    },
    'price': {
        isLength: {
            errorMessage: 'Price is required.',
            options: { min: 1 },
            trim: true,
        },
        isFloat: {
            errorMessage: 'Price must be under range 1-1000',
            options: {
                min:1,
                max: 1000
            }
        },

    },
    'status': {
        isBoolean: true

    }
});
module.exports = productValidator;