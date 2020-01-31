'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const journeyService = services.journeyService;

class JourneyController {
    constructor() {}

    async getAll(ctx) {
        let allJourneys = await journeyService.getAll();
        if (allJourneys) {
            ctx.response.status = 200;
            ctx.body = allJourneys;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'journey'};
        }
    }

    async get(ctx) {
        let params = ctx.params;
        let journey = await journeyService.get(params.id);
        if (journey) {
            ctx.response.status = 200;
            ctx.body = journey;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'no such journey'};
        }
    }

    async create(ctx) {
        let createdJourney = await journeyService.create(ctx.body);
        if (createdJourney) {
            ctx.response.status = 200;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'journey was not created'};
        }
    }

    async update(ctx) {
        let id = ctx.params.id;
        let createdJourney = await journeyService.update(id, ctx.body);
        if (createdJourney) {
            ctx.response.status = 201;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'journey was not updated'};
        }
    }

    async delete(ctx) {
        let id = ctx.params.id;
        let deletedJourney = await journeyService.delete(id);
        if (deletedJourney) {
            ctx.response.status = 204;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'no such journey'};
        }
    }
}

module.exports = new JourneyController();