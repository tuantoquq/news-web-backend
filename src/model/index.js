const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.topic = require("./topic.model");
db.perspective = require("./perspective.model");
db.author = require("./author.model");
db.news = require("./news.model");
db.comment = require("./comment.model");
db.watchLater = require("./watchLater.model");
db.ROLES = ["USER", "ADMIN"];

module.exports = db;