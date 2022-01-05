const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/users/change-password", [authJwt.verifyToken], controller.changePassword);

  app.get("/api/users/get-user-info",[authJwt.verifyToken], controller.getUserInfo);

  app.post("/api/users/update-address", [authJwt.verifyToken], controller.updateUserAddress);
  app.post("/api/users/update-email", [authJwt.verifyToken], controller.updateUserEmail);
  app.post("/api/users/update-username", [authJwt.verifyToken], controller.updateUserName);
  app.post("/api/users/update-nickname", [authJwt.verifyToken], controller.updateUserNickName);
  app.post("/api/users/update-dateofbirth", [authJwt.verifyToken], controller.updateUserDateOfBirth);

  app.get("/api/users/get-list-users",[authJwt.verifyToken, authJwt.isAdmin], controller.getListUsers);
};
