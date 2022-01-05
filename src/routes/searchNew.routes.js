const searchController = require("../controller/search.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });  
    app.post("/api/search/searchByTitle", searchController.searchByTitle);
  };