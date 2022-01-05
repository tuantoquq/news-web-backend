const mongoose = require("mongoose");

const Topics = mongoose.model(
    "Topics",
    new mongoose.Schema({
        topic_id: {
            type: Number,
            required: true,
            unique: true
        },
        topic_name: {
            type: String,
            required: true
        },
        type: {
            type: Number,
            required: true
        },
    })
);

module.exports = Topics;