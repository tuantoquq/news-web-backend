const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../model");
const User = db.user;
const httpStatus = require("../utils/httpStatus");
const userController = {};

userController.changePassword = async (req, res, next) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId);
    if (user == null) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }

    const { currentPassword, newPassword } = req.body;
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(httpStatus.BAD_REQUEST).send({
        code: httpStatus.BAD_REQUEST,
        message: "Current password incorrect",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user = await User.findOneAndUpdate(
      { _id: userId },
      {
        password: hashedNewPassword,
      }
    );

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "User not found",
      });
    }

    //create and assign a token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        nick_name: user.nick_name,
        email: user.email,
        address: user.address,
        date_of_birth: user.date_of_birth
      },
      config.secret,
      {
        expiresIn: 86400, //24 hours
      }
    );

    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "Change password successfully!",
      data: {
        id: user.id,
        username: user.username,
        nick_name: user.nick_name,
        email: user.email,
        address: user.address,
        date_of_birth: user.date_of_birth,
        accessToken: token
      },
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

//get user information
userController.getUserInfo = async (req, res, next) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId);
    if (user == null) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "get user information successfully!",
      data: user
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

// update address
userController.updateUserAddress = async (req, res, next) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId);
    if (user == null) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    const { newAddress } = req.body;
    user = await User.findOneAndUpdate(
      {_id: userId},
      {
        address: newAddress
      }
    );
    const rsUser = await User.findById(userId);
    res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "update user\'s address successfully!",
      data: rsUser
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

// update date of birth
userController.updateUserDateOfBirth = async (req, res, next) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId);
    if (user == null) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    const { newDateOfBirth } = req.body;
    user = await User.findOneAndUpdate(
      {_id: userId},
      {
        date_of_birth: newDateOfBirth
      }
    );
    const rsUser = await User.findById(userId);
    res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "update user\'s date_of_birth successfully!",
      data: rsUser
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

// update nick name
userController.updateUserNickName = async (req, res, next) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId);
    if (user == null) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    const { nickName } = req.body;
    user = await User.findOneAndUpdate(
      {_id: userId},
      {
        nick_name: nickName
      }
    );
    const rsUser = await User.findById(userId);
    res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "update user\'s nick name successfully!",
      data: rsUser
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

// update email
userController.updateUserEmail = async (req, res, next) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId);
    if (user == null) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    const newEmail = req.body.newEmail;
    //check exist email
    let checkUser = await User.find({
      email: newEmail
    });
    if(checkUser.length != 0){
      console.log(checkUser);
      return res.status(httpStatus.BAD_REQUEST).send({
        code: httpStatus.BAD_REQUEST,
        message: "Email has already existed!"
      });
    }
    user = await User.findOneAndUpdate(
      {_id: userId},
      {
        email: newEmail
      }
    );
    const rsUser = await User.findById(userId);
    res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "update user\'s email successfully!",
      data: rsUser
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

// update username -- not to need
userController.updateUserName= async (req, res, next) => {
  try {
    let userId = req.userId;
    let user = await User.findById(userId);
    if (user == null) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        code: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    const { newUsername } = req.body;
    // check exist username
    let checkUser = await User.find({
      username: newUsername
    });
    if(checkUser){
      return res.status(httpStatus.BAD_REQUEST).send({
        code: httpStatus.BAD_REQUEST,
        message: "Username has already existed!"
      });
    }
    user = await User.findOneAndUpdate(
      {_id: userId},
      {
        username: newUsername
      }
    );
    const rsUser = await User.findById(userId);
    res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "update username successfully!",
      data: rsUser
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

// get list user: ADMIN -> require admin role
userController.getListUsers = async (req, res, next) => {
  try{
    const listUsers = await User.find();
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "get all user succesfully!",
      data: {
        count: listUsers.length,
        list_user: listUsers
      }
    })
  }catch{
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
}
module.exports = userController;
