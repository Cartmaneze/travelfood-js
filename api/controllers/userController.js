'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const userService    = services.userService;
const passport       = require('koa-passport');
const fs             = require('fs');
const path           = require('path');

class UserController {
    constructor() {}

    async loginPage(ctx) {
        ctx.type = 'html';
        let pat = path.resolve(__dirname + '../../../views', 'login.html');
        ctx.body = await fs.createReadStream(pat);
    }

    async login(ctx) {
        return passport.authenticate('local', (err, user, info, status) => {
            if (user) {
                ctx.login(user);
                ctx.redirect('/food');
            } else {
                ctx.status = 400;
                ctx.body = { status: 'wrong email or password' };
            }
        })(ctx);
    }

    async logout(ctx) {
        await ctx.logout();
        ctx.session = null;
    }

    async registerPage(ctx) {
        ctx.type = 'html';
        let pat = path.resolve(__dirname + '../../../views', 'register.html');
        ctx.body = await fs.createReadStream(pat);
    }

    async register(ctx) {
        let user = await userService.create(ctx.body);
        if (user) {
            return passport.authenticate('local', (err, user, info, status) => {
                if (user) {
                    ctx.login(user);
                    ctx.redirect('/food');
                } else {
                    ctx.status = 400;
                    ctx.body = { status: 'error' };
                }
            })(ctx);
        } else {
            ctx.status = 400;
            ctx.body = 'user with this email already exists';
        }
    }
}

module.exports = new UserController();