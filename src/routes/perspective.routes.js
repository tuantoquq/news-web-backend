const controller = require("../controller/perspective.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });  
    app.get("/api/perspective/get-all-perspectives", controller.getAllPerspective);
    app.get("/api/perspective/get-perspectives-by-author", controller.getPerspectiveByAuthor);
  };