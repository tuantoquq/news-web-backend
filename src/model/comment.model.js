const mongoose = require("mongoose");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        list_comment: {
            type: Array,
            required: true
        },
        news_id: {
            type: Number,
            required: true
        }
    })
);

module.exports = Comment;