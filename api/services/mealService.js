'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const mealModel      = models.meals;
const log            = require('../../logging');

class MealService {
    constructor() {}

    async getAll() {
        log.debug(`Service meal, method: getAll`);
        return mealModel.findAll({
            attributes: ['id', 'weight'],
            include: [
                {
                    model: models.foods,
                    attributes: ['id', 'name', 'calories']
                }
                /* ,
                {
                    model: models.days,
                    attributes: ['id', 'number'],
                    include: [{
                        model: models.journeys,
                        attributes: ['id', 'name'],
                        include: [{
                            model: models.users,
                            attributes: ['id', 'email']
                        }]
                    }]
                } */
            ]
        }).catch(err => {
            log.error(`Service meal, method: getAll, error: ${err}`);
        });
    }

    async get(id) {
        log.debug(`Service meal, method: get, id = ${id}`);
        return mealModel.findOne({
            where: {id},
            attributes: ['id', 'weight'],
            include: [
                {
                    model: models.foods,
                    attributes: ['id', 'name', 'calories']
                },
                {
                    model: models.days,
                    attributes: ['id', 'number'],
                    include: [{
                        model: models.journeys,
                        attributes: ['id', 'name'],
                        include: [{
                            model: models.users,
                            attributes: ['id', 'email']
                        }]
                    }]
                }
            ]
        }).catch(err => {
            log.error(`Service meal, method: get, error: ${err}`);
        });
    }

    async create(meal) {
        log.debug(`Service meal, method: create, meal = ${JSON.stringify(meal)}`);
        return mealModel.create(meal)
            .catch(err => {
                log.error(`Service meal, method: create, error: ${err}`);
            });
    }

    async update(id, newMeal) {
        log.debug(`Service meal, method: update, newMeal = ${JSON.stringify(newMeal)}, id = ${id}`);
        return mealModel.findOne({
            where: {id},
            attributes: ['id', 'weight']
        }).then(meal => {
            return meal.update({
                id: id,
                weight: newMeal.weight
            })
        }).catch(err => {
            log.error(`Service meal, method: update, error: ${err}`);
        });
    }

    async delete(id) {
        log.debug(`Service meal, method: delete, id = ${id}`);
        return mealModel.findOne({
            where: {id},
            attributes: ['id', 'weight']
        }).then(() => {
            return mealModel.destroy({
                where: {
                    id: id
                }
            })
        }).catch(err => {
            log.error(`Service meal, method: delete, error: ${err}`);
        });
    }
}

module.exports = new MealService();