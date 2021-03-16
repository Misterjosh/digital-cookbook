const keys = require("./keys");
// passport-jwt is used for JSON web token authentication
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

const db = require("../models");

// boiler plate from npmjs.com/package/passport-jwt
const opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// lets passport make a token based off of Users model
module.exports = passport => {
    passport.use(
        new jwtStrategy(opts, (jwtPayload, done) => {
            db.User.findById(jwtPayload.id)
            .then((user) => {
                if (user) { 
                    return done(null, user) 
                }
                    return done(null, false)
            })
            .catch((Err) => console.log(Err))
        })
    )
}