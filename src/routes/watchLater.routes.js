const watchLaterController = require("../controller/watchLater.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });  
    app.post("/api/watch-later/add-news", [authJwt.verifyToken],watchLaterController.addNewsToListWatchLater);
    app.get("/api/watch-later/get-list", [authJwt.verifyToken], watchLaterController.getListWatchLaterOrderByTime);
    app.get("/api/watch-later/get-list-by-topic",[authJwt.verifyToken], watchLaterController.getListWatchLaterOrderByTimeEveryTopic);
    app.delete("/api/watch-later/delete-news",[authJwt.verifyToken],watchLaterController.deleteNewsFromWatchLater);
  };