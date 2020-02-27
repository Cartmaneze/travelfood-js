'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models = ServiceLocator.Models;
const journeyModel = models.journeys;
const log = require('../../logging');

class JourneyService {
    constructor() { }

    async getAll() {
        log.debug(`Service journey, method: getAll`);
        return journeyModel.findAll({
            attributes: ['id', 'name', 'user_id']
        }).catch(err => {
            log.error(`Service journey, method: getAll, error: ${err}`);
        });
    }

    async get(id) {
        log.debug(`Service journey, method: get, id = ${id}`);
        return journeyModel.findOne({
            where: { id },
            attributes: ['id', 'name', 'user_id']
        }).catch(err => {
            log.error(`Service journey, method: get, error: ${err}`);
        });
    }

    async create(journey) {
        log.debug(`Service journey, method: create, journey = ${JSON.stringify(journey)}`);
        return journeyModel.create(journey)
            .catch(err => {
                log.error(`Service journey, method: create, error: ${err}`);
            });
    }

    async update(id, newJourney) {
        log.debug(`Service journey, method: update, newJourney = ${JSON.stringify(newJourney)}, id = ${id}`);
        return journeyModel.findOne({
            where: { id },
            attributes: ['id', 'name', 'user_id']
        }).then(journey => {
            return journey.update({
                id: id,
                name: newJourney.name,
                calories: newJourney.calories,
                user_id: newJourney.user_id
            })
        }).catch(err => {
            log.error(`Service journey, method: update, error: ${err}`);
        });
    }

    async delete(id) {
        log.debug(`Service journey, method: delete, id = ${id}`);
        return journeyModel.findOne({
            where: { id },
            attributes: ['id', 'name', 'user_id']
        }).then(() => {
            return journeyModel.destroy({
                where: {
                    id: id
                }
            })
        }).catch(err => {
            log.error(`Service journey, method: delete, error: ${err}`);
        });
    }
}

module.exports = new JourneyService();