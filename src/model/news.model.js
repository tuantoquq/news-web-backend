const mongoose = require("mongoose");

const News = mongoose.model(
    "News",
    new mongoose.Schema({
        url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: Array,
            required: true
        },
        url_image: {
            type: Array
        },
        description: {
            type: String,
            required: true
        },
        extend_description: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        news_id: {
            type: Number,
            required: true,
            unique: true
        },
        views: {
            type: Number,
            required: true
        }
    })
);

module.exports = News;