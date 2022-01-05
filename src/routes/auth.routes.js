const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function (app){
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    })

    app.post(
        "/api/auth/signup",
        [
          verifySignUp.checkDuplicateUsernameOrEmail,
          verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    
    app.post("/api/auth/signin", controller.signin);
}