'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const foodService    = services.foodService;

class FoodController {
    constructor() {}

    async getAll(ctx) {
        let ret = await foodService.getAll();
        if (ret) ctx.response.status = 200;
    }

    async create(ctx) {
        let ret = await foodService.create(ctx.body);
        if (ret) ctx.res.status = 200;
    }
}

module.exports = new FoodController();