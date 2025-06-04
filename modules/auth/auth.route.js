const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserLib = require("./../users/users.lib");
const ProfileLib = require("./../profiles/profiles.lib");
const AuthLib = require("./auth.lib");

module.exports = (app, router) => {
    router.post("/v1/login", (req, res, next) => {
        return passport.authenticate("local", async (err, account, info) => {
            if (account) {
                if (account && account.userId) {
                    let user = await UserLib.GetUser({ _id: account.userId });

                    if (user) {
                        let profile = await ProfileLib.GetProfileByName({ name: user.profile.name });
                        if (!profile || profile === null) res.status(401).json({ message: "Lo sentimos, tu usuario no tiene asignado un perfil." });
                        let token = jwt.sign(user.toJSON(), app.secret, { expiresIn : "1d" });
                        //let configML = await AuthLib.GetConfigurationML();
                        //let configAmz = await AuthLib.GetConfigurationAmz();

                        return res.status(200).send({ 
                            succes: true, 
                            token: token, 
                            user: user, 
                            profile: { _id: profile._id, name: profile.name }, 
                            //tokenML: configML.lastToken,
                            //tokenAmz: configAmz.lastToken
                        });

                    } else res.status(401).json({ message: "No se encontró información del usuario" });
                }
            } else res.status(401).json({ message: "No existe la cuenta" });
        })(req, res, next)
    });
}