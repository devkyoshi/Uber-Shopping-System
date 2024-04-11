const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const verifyUser = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,customer) => {
        if(err){
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.customer = customer;
        next();
    });
};

module.exports = { verifyUser };
