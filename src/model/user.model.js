const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        nick_name: String,
        email: String,
        password: String,
        roles:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        address: String,
        date_of_birth: String
    })
);

module.exports = User;