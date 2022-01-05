const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../model");
const User = db.user;
const Role = db.role;
const httpStatus = require("../utils/httpStatus")
//signup controller
exports.signup =  (req, res) => {
    const user = new User({
        username: req.body.username,
        nick_name: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
        address: req.body.address,
        date_of_birth: req.body.date_of_birth
    });

    user.save((err, user) => {
        if(err){
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: err
            });
            return;
        }

        Role.findOne({name: "USER"}, (err, role) => {
            if(err){
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    code: httpStatus.INTERNAL_SERVER_ERROR,
                    message: err
                });
                return;
            }

            user.roles = [role._id];
            user.save(err => {
                if(err){
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                        code: httpStatus.INTERNAL_SERVER_ERROR,
                        message: err
                    });
                    return;
                }
                console.log("registrations info: ", user);
                res.status(httpStatus.CREATED).send({
                    code: httpStatus.CREATED,
                    message: "User was registered successfully!"
                });
            });
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .populate("roles","-__v")
    .exec((err, user) => {
        if(err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: err
            });
            return;
        }
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send({
                code: httpStatus.NOT_FOUND,
                message: "User not found!"
            });
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(httpStatus.UNAUTHORIZED).send({
                code: httpStatus.UNAUTHORIZED,
                message: "Invalid Password!",
                data: {
                    accessToken: null
                }
            })
        }

        var token = jwt.sign({
            id: user.id,
            username: user.username,
            nick_name: user.nick_name,
            email: user.email,
            address: user.address,
            date_of_birth: user.date_of_birth
        }, config.secret, {
            expiresIn: 86400 //24 hours
        });

        var authorities = [];

        for(let i = 0; i< user.roles.length; i++){
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        console.log("login info: ",user)
        res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            message: "Login successfully!",
            data: {
                username: user.username,
                nick_name: user.nick_name,
                email: user.email,
                address: user.address,
                date_of_birth: user.date_of_birth,
                accessToken: token 
            }
        });
        
    });
};
