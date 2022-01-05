const controller = require("../controller/news.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });  
    app.get("/api/news/get-news-by-id", controller.getNewsById);
    app.get("/api/news/get-views-by-id", controller.countViews);
    app.get("/api/news/get-hot-news", controller.getHotNews);
    app.get("/api/news/get-top10-hot-news", controller.getTop10News);
    app.post("/api/news/add-news", controller.addNews);
  };