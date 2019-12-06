'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const dayService     = services.dayService;

class DayController {
    constructor() {}

    async getAll(ctx, done) {
        let rek = await dayService.getAll();
        ctx.body = JSON.stringify(rek);
        done();
    }
}

module.exports = new DayController();