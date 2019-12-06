'use strict';

const Router = require('koa-router');
const router = new Router();

module.exports = function(app) {
    const routes = require('../api/routes');
    routes.map(route => {
        router[route.type](route.path, route.method);
    });
    app.use(router.routes());
};