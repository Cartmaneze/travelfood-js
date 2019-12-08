'use strict';

const Router     = require('koa-router');
const router     = new Router();
const bodyParser = require('koa-bodyparser');

module.exports = function(app) {
    app.use(bodyParser());
    app.use(async (ctx, next) =>  {
        ctx.body = ctx.request.body;
        await next();
    });

    const routes = require('../api/routes');
    routes.map(route => {
        router[route.type](route.path, route.method);
    });
    app.use(router.routes());
};