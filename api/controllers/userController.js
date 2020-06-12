'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const userService    = services.userService;
const journeyService = services.journeyService;
const passport       = require('koa-passport');
const fs             = require('fs');
const path           = require('path');

class UserController {
    constructor() {}

    async login(ctx) {
        return passport.authenticate('local', (err, user, info, status) => {
            if (user) {
                ctx.login(user);
                ctx.body = 'you are authenticated';
                //ctx.cookies.set('user', 'id')
                /* ctx.header['Access-Control-Allow-Credentials'] = true;
                ctx.header['Access-Control-Allow-Origin'] = 'http://localhost:1234'; */
                ctx.status = 200;
            } else {
                ctx.status = 401;
                ctx.body = 'wrong email or password';
            }
        })(ctx);
    }

    async logout(ctx) {
        await ctx.logout();
        ctx.session = null;
    }

    async register(ctx) {
        let user = await userService.create(ctx.body);
        if (!user) {
            ctx.status = 401;
            ctx.body = 'user with this email already exists';
        } else {
            return passport.authenticate('local', (err, user, info, status) => {
                if (user) {
                    ctx.login(user);
                    ctx.redirect('/food');
                } else {
                    ctx.status = 400;
                    ctx.body = { status: 'error' };
                }
            })(ctx);
        }
    }
}

module.exports = new UserController();