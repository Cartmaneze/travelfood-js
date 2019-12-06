'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const foodService     = services.foodService;

class FoodController {
    constructor() {}

    async getAll(ctx) {
        let ret = await foodService.getAll();
        ctx.body = ret;
    }
}

module.exports = new FoodController();