'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const journeyModel   = models.journeys;
const dayModel       = models.days;
const log            = require('../../logging');
const Sequelize      = require('sequelize');
const Op             = Sequelize.Op;

class JourneyService {
    constructor() { }

    async getAll(userId) {
        log.debug(`Service journey, method: getAll`);
        return journeyModel.findAll({
            attributes: ['id'],
            where: {
                'user_id': {
                    [Op.eq]: userId
                }
            }
        }).catch(err => {
            log.error(`Service journey, method: getAll, error: ${err}`);
        });
    }

    async create(journey) {
        log.debug(`Service journey, method: create, journey = ${JSON.stringify(journey)}`);
        const services = ServiceLocator.Services;
        const dayService = services.dayService;

        try {
            const createdJourney = await journeyModel.create(journey);
            if (createdJourney) {
                dayService.create({
                    number: "1",
                    journey_id: createdJourney.id
                });
                return createdJourney;
            }
        } catch (err) {
            log.error(`Service journey, method: create, error: ${err}`);
        }
    }

    async delete(id) {
        log.debug(`Service journey, method: delete, id = ${id}`);

        try {
            let result = await journeyModel.destroy({
                where: {
                    id: id
                }
            })
            await dayModel.destroy({
                where: {
                    journey_id: id
                }
            })
            return result;
        } catch(err) {
            log.error(`Service journey, method: delete, error: ${err}`);
        }
    }
}

module.exports = new JourneyService();