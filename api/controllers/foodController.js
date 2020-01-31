'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const foodService    = services.foodService;

class FoodController {
    constructor() {}

    async getAll(ctx) {
        let allFood = await foodService.getAll();
        if (allFood) {
            ctx.response.status = 200;
            ctx.body = allFood;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'food'};
        }
    }

    async get(ctx) {
        let params = ctx.params;
        let food = await foodService.get(params.id);
        if (food) {
            ctx.response.status = 200;
            ctx.body = food;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'no such food'};
        }
    }

    async create(ctx) {
        let createdFood = await foodService.create(ctx.body);
        if (createdFood) {
            ctx.response.status = 200;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'food was not created'};
        }
    }

    async update(ctx) {
        let id = ctx.params.id;
        let createdFood = await foodService.update(id, ctx.body);
        if (createdFood) {
            ctx.response.status = 201;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'food was not updated'};
        }
    }

    async delete(ctx) {
        let id = ctx.params.id;
        let deletedFood = await foodService.delete(id);
        if (deletedFood) {
            ctx.response.status = 204;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'no such food'};
        }
    }
}

module.exports = new FoodController();