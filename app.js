const express = require("express");
const app = express();
const router = express.Router();
const routes = require("./modules/routes")(app, router);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const AccountSchema = require("./models/account.scheme");
const bodyParser = require("body-parser");
const session = require("express-session");
require('dotenv').config();
const GetPermissionsActiveByProfiles = require("./modules/profiles/profiles.lib").GetPermissionsActiveByProfiles;
const port = process.env.PORT;

app.secret = process.env.JWT_SECRET;

passport.use(new LocalStrategy(AccountSchema.authenticate()));
passport.serializeUser(AccountSchema.serializeUser());
passport.deserializeUser(AccountSchema.deserializeUser());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', router);

const connectDb = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);
        console.log("Connected Db");
    } catch (error) {
        console.log(error);
    }
}

connectDb();
global["profiles"] = GetPermissionsActiveByProfiles();

app.listen(port, ()=> console.log(`UCAN app listening on port ${port}!`))