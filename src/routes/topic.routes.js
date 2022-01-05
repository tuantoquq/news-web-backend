const controller = require("../controller/topic.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });  
    app.get("/api/topic/get-all-topics", controller.getAllTopic);
    app.get("/api/topic/get-list-main-topic", controller.getListMainTopic);
  };