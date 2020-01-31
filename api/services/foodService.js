'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const foodModel      = models.foods;
const log            = require('../../logging');

class FoodService {
    constructor() {}

    async getAll() {
        log.debug(`Service food, method: getAll`);
        return foodModel.findAll({
            attributes: ['id', 'name', 'calories', 'user_id']
        }).catch(err => {
            log.error(`Service food, method: getAll, error: ${err}`);
        });
    }

    async get(id) {
        log.debug(`Service food, method: get, id = ${id}`);
        return foodModel.findOne({
            where: {id},
            attributes: ['id', 'name', 'calories', 'user_id']
        }).catch(err => {
            log.error(`Service food, method: get, error: ${err}`);
        });
    }

    async create(food) {
        log.debug(`Service food, method: create, food = ${JSON.stringify(food)}`);
        return foodModel.create(food)
            .catch(err => {
                log.error(`Service food, method: create, error: ${err}`);
            });
    }

    async update(id, newFood) {
        log.debug(`Service food, method: update, newFood = ${JSON.stringify(newFood)}, id = ${id}`);
        return foodModel.findOne({
            where: {id},
            attributes: ['id', 'name', 'calories', 'user_id']
        }).then(food => {
            return food.update({
                id: id,
                name: newFood.name,
                calories: newFood.calories,
                user_id: newFood.user_id
            })
        }).catch(err => {
            log.error(`Service food, method: update, error: ${err}`);
        });
    }

    async delete(id) {
        log.debug(`Service food, method: delete, id = ${id}`);
        return foodModel.findOne({
            where: {id},
            attributes: ['id', 'name', 'calories', 'user_id']
        }).then(() => {
            return foodModel.destroy({
                where: {
                    id: id
                }
            })
        }).catch(err => {
            log.error(`Service food, method: delete, error: ${err}`);
        });
    }
}

module.exports = new FoodService();