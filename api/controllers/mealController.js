'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const mealService    = services.mealService;

class MealController {
    constructor() {}

    async getAll(ctx) {
        let allMeals = await mealService.getAll();
        if (allMeals) {
            ctx.response.status = 200;
            ctx.body = allMeals;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'meal'};
        }
    }

    async get(ctx) {
        let params = ctx.params;
        let meal = await mealService.get(params.id);
        if (meal) {
            ctx.response.status = 200;
            ctx.body = meal;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'no such meal'};
        }
    }

    async create(ctx) {
        let createdMeal = await mealService.create(ctx.body);
        if (createdMeal) {
            ctx.response.status = 200;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'meal was not created'};
        }
    }

    async update(ctx) {
        let id = ctx.params.id;
        let createdMeal = await mealService.update(id, ctx.body);
        if (createdMeal) {
            ctx.response.status = 201;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'meal was not updated'};
        }
    }

    async delete(ctx) {
        let id = ctx.params.id;
        let deletedMeal = await mealService.delete(id);
        if (deletedMeal) {
            ctx.response.status = 204;
        } else {
            ctx.response.status = 400;
            ctx.body = {error: 'no such meal'};
        }
    }
}

module.exports = new MealController();