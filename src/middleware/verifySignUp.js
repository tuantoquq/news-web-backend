const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;
const httpStatus = require("../utils/httpStatus")

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    //check username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err){
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: err
            });
            return;
        }

        if(user){
            res.status(httpStatus.BAD_REQUEST).send({
                code: httpStatus.BAD_REQUEST,
                message: "Failed! Username is already in use!"
            });
            return;
        }

        //check email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if(err){
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    code: httpStatus.INTERNAL_SERVER_ERROR,
                    message: err
                });
                return;
            }
            
            if(user){
                res.status(httpStatus.BAD_REQUEST).send({
                    code: httpStatus.BAD_REQUEST,
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i< req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(httpStatus.BAD_REQUEST).send({
                    code: httpStatus.BAD_REQUEST,
                    message:  `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;