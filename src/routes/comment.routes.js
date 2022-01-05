const controller = require("../controller/comment.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });  
    
    app.get("/api/comment/get-list-comment-in-news", controller.getListCommentOfNews);
    app.get("/api/comment/get-number-comment-in-news", controller.countNumberCommentOfNews);
    app.post("/api/comment/add-comment", [authJwt.verifyToken],controller.addCommentForNews);
  };