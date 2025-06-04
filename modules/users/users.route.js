let UserCtrl = require("./users.ctrl");
let middlewareToken = require("./../../middlewares/auth.middleware").tokenValid;

module.exports = (app, router) => {
    router.post("/api/v1/users/save",[], UserCtrl.SaveUser);
    router.get("/api/v1/users/validate-username",[], UserCtrl.ValidateUsername);
    router.post("/api/v1/users/count",[], UserCtrl.GetUsersCount);
    router.post("/api/v1/users/list",[], UserCtrl.GetUsersList);
    router.post("/api/v1/users/remove",[], UserCtrl.RemoveUser);
    router.get("/api/v1/users/byId/:id",[], UserCtrl.GetUserById);
    router.post("/api/v1/users/update",[], UserCtrl.UpdateUser);
}