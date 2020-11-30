const {checkSchema, check, validationResult} = require('express-validator');

exports.catchError = (fn) => {
    return (req, res, next) => {
        return fn(req,res,next).catch(next)
    }
}

exports.flashValidationError = (err, req, res, next) => {
    console.log('validation method', validationResult(req))
    const errors = validationResult(req);
    console.log(errors);


}