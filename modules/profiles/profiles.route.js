let ProfileCtrl = require("./profiles.ctrl");
let middlewareToken = require("./../../middlewares/auth.middleware").tokenValid;

module.exports = function (app, router) {
    router.route("/api/v1/profiles/save").post([middlewareToken], ProfileCtrl.SaveProfile);
    router.route("/api/v1/profiles/update").post([middlewareToken], ProfileCtrl.UpdateProfile);
    router.route("/api/v1/profiles/remove").post([middlewareToken], ProfileCtrl.RemoveProfile);
}