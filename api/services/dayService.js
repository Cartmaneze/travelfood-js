'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const dayModel       = models.days;
const log            = require('../../logging');
const Sequelize      = require('sequelize');
const Op             = Sequelize.Op;

class DayService {
    constructor() {}

    async getAll(journeyId) {
        log.debug(`Service day, method: getAll, journeyId = ${journeyId}`);
        if(!journeyId || journeyId === "undefined") throw new Error('journeyId not specified')
        const days = await dayModel.findAll({
            attributes: ['id'],
            where: {
                'journey_id': {
                    [Op.eq]: journeyId
                }
            }
        })
        return days;
    }

    async create(day) {
        log.debug(`Service day, method: create, food = ${JSON.stringify(day)}`);
        return dayModel.create(day)
            .then(data => {
                return {
                    id: data.id
                }
            }) 
            .catch(err => {
                log.error(`Service day, method: create, error: ${err}`);
            });
    }

    async delete(id) {
        log.debug(`Service day, method: delete, id = ${id}`);
        return dayModel.findOne({
            where: {id},
            attributes: ['id', 'number', 'journey_id']
        }).then(() => {
            return dayModel.destroy({
                where: {
                    id: id
                }
            })
        }).catch(err => {
            log.error(`Service day, method: delete, error: ${err}`);
        });
    }
}

module.exports = new DayService();