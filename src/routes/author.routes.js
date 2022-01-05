const controller = require("../controller/author.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });  
    app.get("/api/author/get-author-by-id", controller.getAuthorById);
    app.get("/api/author/get-author-by-name", controller.getAuthorByName);
  };