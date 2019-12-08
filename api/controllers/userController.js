'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const userService    = services.userService;

class UserController {
    constructor() {}

    async create(ctx) {
        let user = await userService.create(ctx.body);
        if (user) {
            ctx.res.statusCode = 201;
            ctx.body = 'created';
        } else {
            ctx.res.statusCode = 400;
            ctx.body = 'not created';
        }
    }
}

module.exports = new UserController();