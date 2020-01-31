'use strict';

const session  = require('koa-session');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

module.exports = function(app) {
    // sessions
    app.keys = ['super-secret-key'];
    app.use(session(app));

    // body parser
    app.use(bodyParser());
    app.use(async (ctx, next) =>  {
        ctx.body = ctx.request.body;
        await next();
    });

    // authentication
    require('../auth');
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(async (ctx, next) => {
        if (ctx.isUnauthenticated() && (ctx.originalUrl !== '/login' && ctx.originalUrl !== '/register')) {
            return ctx.redirect('/login');
        }
        await next();
    })
};