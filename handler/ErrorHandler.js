const {checkSchema, check, validationResult} = require('express-validator');

exports.catchError = (fn) => {

    return (req, res, next) => {
        let validationError = validationResult(req);
        if(validationError.errors && validationError.errors.length > 0) {
            let validateMsg = {};
            for(const validationObj of validationError.errors) {
                validateMsg[validationObj.param] =validationObj.msg;
            }
            req.flash('errors',validateMsg);
            req.flash('oldInput', req.body);
            res.redirect('back');
            return
        }

        return fn(req,res,next).catch(next);
    }
}

exports.flashValidationError = (err, req, res, next) => {
    console.log(err);
    console.log('validation method', validationResult(req))
    // const errors = validationResult(req);
    // console.log(errors);
    next();


}