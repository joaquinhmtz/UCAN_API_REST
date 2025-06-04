let ProfileLib = require("./profiles.lib");

const SaveProfile = async (req, res, next) => {
    try {
        let { name, description, permissions } = req.body;
        let validName = await ProfileLib.GetProfileByName({ name: name.toUpperCase() });
        if (validName && validName !== null) res.status(500).send({ success: false, message: "Ya existe un perfil con este nombre." });
        else {
            let saveProf = await ProfileLib.SaveProfile({ name, description, permissions });
            global["profiles"] = await ProfileLib.GetPermissionsActiveByProfiles();

            res.status(201).send({ success: true, message: "El perfil se guardo correctamente." });
        }

    } catch (e) {
        console.log("Error - SaveProfile: ", e);
        next(e);
    }
}

const UpdateProfile = async (req, res, next) => {
    try {
        let { _id, description, permissions } = req.body;
        let upd = await ProfileLib.UpdateProfile({ _id, description, permissions });
        global["profiles"] = await ProfileLib.GetPermissionsActiveByProfiles();

        res.status(200).send({ success: true, message: "El perfil se actualizó correctamente." });

    } catch (e) {
        console.log("Error - UpdateProfile: ", e);
        next(e);
    }
}

const RemoveProfile = async (req, res, next) => {
    try {
        let { _id } = req.body;
        let dlt = await ProfileLib.RemoveProfile({ _id });
        global["profiles"] = await ProfileLib.GetPermissionsActiveByProfiles();

        res.status(200).send({ success: true, message: "El perfil se borró correctamente." });

    } catch (e) {
        console.log("Error - UpdateProfile: ", e);
        next(e);
    }
}

module.exports.SaveProfile = SaveProfile;
module.exports.UpdateProfile = UpdateProfile;
module.exports.RemoveProfile = RemoveProfile;