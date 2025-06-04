let ProfileScheme = require("../../models/profile.scheme");

const SaveProfile = async (params) => {
    try {
        let { name, description, permissions } = params;
        let profile = new ProfileScheme({ name, description, permissions });
        let save = await profile.save();

        return save;

    } catch (e) {
        console.log("Err SaveProfile: ", e);
        throw new Error(e);
    }
}

const GetProfileByName = async (params) => {
    try {
        let { name } = params;
        let profile = await ProfileScheme.findOne({ name });

        return profile;

    } catch (e) {
        console.log("Err GetProfileByName: ", e);
        throw new Error(e);
    }
}

const UpdateProfile = async (params) => {
    try {
        let { _id, description, permissions } = params;
        let profile = await ProfileScheme.findOneAndUpdate({ _id }, { $set: { description, permissions } });

        return profile;

    } catch (e) {
        console.log("Err UpdateProfile: ", e);
        throw new Error(e);
    }
}

const RemoveProfile = async (params) => {
    try {
        let { _id } = params;
        let profile = await ProfileScheme.deleteOne({ _id });

        return profile;

    } catch (e) {
        console.log("Err RemoveProfile: ", e);
        throw new Error(e);
    }
}

const GetPermissionsActiveByProfiles = async () => {
    try {
        let pipeline = [];
        pipeline.push({ $unwind: "$permissions" });
        pipeline.push({ $unwind: "$permissions.privileges" });
        pipeline.push({ $match: { "permissions.privileges.active": true } });
        pipeline.push({
            $group: {
                _id: {
                    "_id":"$_id",
                    "name":"$name",
                    "moduleId": "$permissions.moduleId",
                    "module": "$permissions.module"
                },
                privileges: {
                    $push: { "name" : "$permissions.privileges.name", "active" : "$permissions.privileges.active", "method" : "$permissions.privileges.method" }
                }
            }
        });
        pipeline.push({
            $group: {
                _id: "$_id._id",
                name: { $first: "$_id.name" },
                permissions: {
                    $push: {
                        "moduleId": "$_id.moduleId",
                        "module": "$_id.module",
                        "privileges": "$privileges"
                    }
                }      
            }
        });

        let results = await ProfileScheme.aggregate(pipeline);

        return results;

    } catch (e) {
        console.log('GetPermissionsActiveByProfiles err: ', e);
        throw new Error(e);
    }
}

module.exports.SaveProfile = SaveProfile;
module.exports.GetProfileByName = GetProfileByName;
module.exports.UpdateProfile = UpdateProfile;
module.exports.RemoveProfile = RemoveProfile;
module.exports.GetPermissionsActiveByProfiles = GetPermissionsActiveByProfiles;