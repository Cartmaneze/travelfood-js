'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const dayModel       = models.days;

class DayService {
    constructor() {}

    async getAll() {
        return dayModel.findAll({
            attributes: ['id', 'number', 'journey_id']
        });
    }
}

module.exports = new DayService();