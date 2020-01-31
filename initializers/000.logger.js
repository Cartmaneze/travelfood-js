'use strict';

//const {KoaReqLogger} = require('koa-req-logger');
const log = require('../logging');

module.exports = function (app) {
    app.use(async (ctx, next) => {
        log.info(`method: ${ctx.request.method}, url: ${ctx.request.url}`);
     //   log.info(`method: ${ctx.request.method}, url: ${ctx.request.url}, request: ${JSON.stringify(ctx.request)}`);
        await next();
     //   log.info(`response: ${JSON.stringify(ctx.response)}, body: ${JSON.stringify(ctx.body)}`);
    });

    /*const logger = new KoaReqLogger({
        disableIdHeader: false
    });

    app.use(logger.getMiddleware());*/
};