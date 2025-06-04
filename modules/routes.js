let AuthRoute = require("./auth/auth.route");
let UserRoute = require("./users/users.route");

module.exports = (app, router) => {
    AuthRoute(app, router);
    UserRoute(app, router);
}