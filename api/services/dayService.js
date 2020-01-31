'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const dayModel       = models.days;
const log            = require('../../logging');

class DayService {
    constructor() {}

    async getAll() {
        log.debug(`Service day, method: getAll`);
        return dayModel.findAll({
            attributes: ['id', 'number', 'journey_id']
        }).catch(err => {
            log.error(`Service day, method: getAll, error: ${err}`);
        });
    }

    async get(id) {
        log.debug(`Service day, method: get, id = ${id}`);
        return dayModel.findOne({
            where: {id},
            attributes: ['id', 'number', 'journey_id']
        }).catch(err => {
            log.error(`Service day, method: get, error: ${err}`);
        });
    }

    async create(day) {
        log.debug(`Service day, method: create, food = ${JSON.stringify(day)}`);
        return dayModel.create(day)
            .catch(err => {
                log.error(`Service day, method: create, error: ${err}`);
            });
    }

    async update(id, newDay) {
        log.debug(`Service day, method: update, newFood = ${JSON.stringify(newDay)}, id = ${id}`);
        return dayModel.findOne({
            where: {id},
            attributes: ['id', 'number', 'journey_id']
        }).then(food => {
            return food.update({
                id: id,
                number: newDay.number,
                journey_id: newDay.journey_id
            })
        }).catch(err => {
            log.error(`Service day, method: update, error: ${err}`);
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