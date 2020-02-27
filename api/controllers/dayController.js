'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const dayService     = services.dayService;

class DayController {
    constructor() {}

    async getAll(ctx) {
        let allDays = await dayService.getAll();
        if (allDays) {
            ctx.response.status = 200;
            ctx.body = allDays;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'days'};
        }
    }

    async get(ctx) {
        let id = ctx.params.id;
        let day = await dayService.get(id);
        if (day) {
            ctx.response.status = 200;
            ctx.body = day;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'no such day'};
        }
    }

    async create(ctx) {
        let createdDay = await dayService.create(ctx.body);
        if (createdDay) {
            ctx.response.status = 200;
            ctx.body = createdDay;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'day was not created'};
        }
    }

    async update(ctx) {
        let id = ctx.params.id;
        let createdDay = await dayService.update(id, ctx.body);
        if (createdDay) {
            ctx.response.status = 201;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'day was not updated'};
        }
    }

    async delete(ctx) {
        let id = ctx.params.id;
        let deletedDay = await dayService.delete(id);
        if (deletedDay) {
            ctx.response.status = 204;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'no such day'};
        }
    }
}

module.exports = new DayController();
