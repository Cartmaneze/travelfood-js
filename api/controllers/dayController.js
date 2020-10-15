'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const dayService     = services.dayService;

class DayController {
    constructor() {}

    async getAll(ctx) {
        let journeyId = ctx.query.journeyId;
        let allDays = await dayService.getAll(journeyId);
        if (allDays) {
            ctx.response.status = 200;
            ctx.body = allDays;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'days'};
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
        let updatedDay = await dayService.update(ctx.params.id, ctx.body);
        if (updatedDay) {
            ctx.response.status = 201;
            ctx.body = updatedDay;
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
