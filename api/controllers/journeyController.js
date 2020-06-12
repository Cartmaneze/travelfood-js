'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const journeyService = services.journeyService;

class JourneyController {
    constructor() {}

    async getAll(ctx) {
        let userId = ctx.session.passport.user.id;
        let allJourneys = await journeyService.getAll(userId);
        if (allJourneys) {
            ctx.response.status = 200;
            ctx.body = allJourneys;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'journey'};
        }
    }

    async create(ctx) {
        let userId = ctx.session.passport.user.id;
        let params = ctx.body;
        params.user_id = userId;
        let createdJourney = await journeyService.create(params);
        if (createdJourney) {
            ctx.body = {id: createdJourney.id};
            ctx.response.status = 200;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'journey was not created'};
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