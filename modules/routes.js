let UserRoute = require("./users/users.route");

module.exports = (app, router) => {
    UserRoute(app, router);
}