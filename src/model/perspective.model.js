const mongoose = require("mongoose");

const Perspectives = mongoose.model(
    "Perspectives",
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
        author: {
            type: String,
            required: true
        },
        author_role: {
            type: String
        },
        author_image: {
            type: String
        },
        extend_description: {
            type: String,
            required: true
        }
    })
);

module.exports = Perspectives;