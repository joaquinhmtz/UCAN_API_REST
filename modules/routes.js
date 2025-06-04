let AuthRoute = require("./auth/auth.route");
let UserRoute = require("./users/users.route");
let ProfileRoute = require("./profiles/profiles.route");

module.exports = (app, router) => {
    AuthRoute(app, router);
    UserRoute(app, router);
    ProfileRoute(app, router);
}