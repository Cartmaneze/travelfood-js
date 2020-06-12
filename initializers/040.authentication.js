'use strict';

const session  = require('koa-session');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

module.exports = function(app) {
    // sessions
    app.keys = ['test'];

    const CONFIG = {
        key: 'travelfood', /** (string) cookie key (default is koa.sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        autoCommit: true, /** (boolean) automatically commit headers (default true) */
        overwrite: false, /** (boolean) can overwrite or not (default true) */
        httpOnly: false, /** (boolean) httpOnly or not (default true) */
        signed: false, /** (boolean) signed or not (default true) */
        rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
        secure: false, /** (boolean) secure cookie*/
        sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
    };

    const CONFIG2 = {
        key: 'travelfood', /** (string) cookie key (default is koa.sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        autoCommit: true, /** (boolean) automatically commit headers (default true) */
        overwrite: false, /** (boolean) can overwrite or not (default true) */
        httpOnly: false, /** (boolean) httpOnly or not (default true) */
        signed: false, /** (boolean) signed or not (default true) */
        rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
        secure: false, /** (boolean) secure cookie*/
        sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
    };

    app.use(session(CONFIG2, app));

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
        if (ctx.isAuthenticated()){
            //console.log('authenticated');
            if (ctx.originalUrl === '/login' || ctx.originalUrl === '/register') {
                console.log('already authenticated');
            } else {
                await next();
            }
        } else {
            if (ctx.originalUrl === '/login' || ctx.originalUrl === '/register') {
                //console.log('login or register');
                await next();
            } else {
                //console.log('not authenticated');
                ctx.status = 400;
                ctx.body = 'not authenticated';
            }
        }
    })
};