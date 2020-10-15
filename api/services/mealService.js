'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const mealModel      = models.meals;
const dayModel       = models.days;
const log            = require('../../logging');
const Sequelize      = require('sequelize');
const Op             = Sequelize.Op;

class MealService {
    constructor() {}

    async getAll(dayId) {
        log.debug(`Service meal, method: getAll`);
        try {
            let meals = await mealModel.findAll({
                where: {'day_id': {
                    [Op.eq]: dayId
                }},
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
            })
            let order = await dayModel.findOne({
                where: {'id': {
                    [Op.eq]: dayId
                }},
                attributes: ['order']
            })
            order = order ? order.dataValues.order ? order.dataValues.order.split(',') : null : null;
            return {meals: meals, order: order}
        } catch (err) {
            log.error(`Service meal, method: getAll, error: ${err}`);
        }
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
        try {
            let index = meal.index;
            delete meal.index;
            let newMeal = await mealModel.create(meal);
            let day = await dayModel.findOne({
                where: {
                    id: newMeal.day_id
                },
                attributes: ['id', 'order']
            })
            let order = day.order || [];
            let orderArray = !Array.isArray(order) ? order.split(',') : order;
            orderArray.splice(index, 0, newMeal.id.toString());
            day.update({
                id: meal.dayId,
                order: orderArray.toString()
            })
            return meal;
        } catch (err) {
            log.error(`Service meal, method: create, error: ${err}`);
        }
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