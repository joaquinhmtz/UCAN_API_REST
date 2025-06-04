const AccountScheme = require("./../../models/account.scheme");

const SaveAccount = async (data) => {
    let account = await AccountScheme.register(
        new AccountScheme({ userId: data.userId, username: data.username }),
        data.password
    );

    return account;
}

const RemoveAccount = async (data) => {
    try {
        const result = await AccountScheme.deleteOne({ userId: data._id });

        if (result.deletedCount === 0) return false;

        return true;
        
    } catch (err) {
        console.error("Error al eliminar cuenta:", err);
        throw err;
    }
}

module.exports.SaveAccount = SaveAccount;
module.exports.RemoveAccount = RemoveAccount;