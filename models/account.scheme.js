const mongoose = require("mongoose");
const Scheme = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AccountScheme = new Scheme({
    userId: { type: Scheme.Types.ObjectId, ref: "users" }
});

AccountScheme.plugin(passportLocalMongoose);
module.exports = mongoose.model("accounts", AccountScheme);