const passport = require('koa-passport');
const userModel = require("./serviceLocator").Models.users;
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    return userModel.findOne({
        where: {email: user.email},
        attributes: ['id', 'email', 'password']
    })
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err, null);
        });
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }
    ,(ctx, email, password, done) => {
    userModel.findOne({
        where: {email: email, password: password},
        attributes: ['id', 'email', 'password']
    })
        .then((user) => {
            if (!user) return done(null, false);
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => { return done(err); });
}));
