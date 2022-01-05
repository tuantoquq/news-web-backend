const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../model");
const User = db.user;
const Role = db.role;
const httpStatus = require("../utils/httpStatus")
const { TokenExpiredError } = jwt;


const CatchExpiredTokenError = (err, res) => {
    if(err instanceof TokenExpiredError){
        return res.status(httpStatus.UNAUTHORIZED).send({
            code: httpStatus.UNAUTHORIZED,
            message: "Unauthorized! Access token was expired"
        });
    }
    return res.status(httpStatus.UNAUTHORIZED).send({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized!"
    });
}

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(httpStatus.FORBIDDEN).send({
            code: httpStatus.FORBIDDEN,
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return CatchExpiredTokenError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
}

const isAdmin = (req,res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: err
            });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles}
            },
            (err, roles) => {
                if(err){
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                        code: httpStatus.INTERNAL_SERVER_ERROR,
                        message: err
                    });
                    return;
                }

                for(let i = 0; i < roles.length; i++){
                    if(roles[i].name === "ADMIN"){
                        next();
                        return;
                    }
                }
                res.status(httpStatus.FORBIDDEN).send({
                    code: httpStatus.FORBIDDEN,
                    message: "Require ADMIN role!"
                });
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt;
