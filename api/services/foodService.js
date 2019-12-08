'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const foodModel      = models.foods;

class FoodService {
    constructor() {}

    async getAll() {
        return foodModel.findAll({
            attributes: ['id']
        });
    }

    async create(food) {
        return foodModel.create(food).catch(err => {
            console.log(err);
        });
    }
}

module.exports = new FoodService();