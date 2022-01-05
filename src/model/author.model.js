const mongoose = require("mongoose");

const Author = mongoose.model(
    "Author",
    new mongoose.Schema({
        author_id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        author_role: {
            type: String,
        },
        author_avt: {
            type: String,
        }
    })
);

module.exports = Author;