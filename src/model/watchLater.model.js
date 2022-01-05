const mongoose = require("mongoose");

const WatchLater = mongoose.model(
    "WatchLater",
    new mongoose.Schema({
        user_id:{
            type: String,
            required: true
        },
        topic:{
            type: String,
            required:true
        },
        news_id: {
            type: Number,
            required: true
        },
        add_time:{
            type: Number,
            required: true,
        }
    })
);

module.exports = WatchLater;