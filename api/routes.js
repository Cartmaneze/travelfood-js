'use strict';

const controllers    = require('./controllers');
const dayController  = controllers.dayController;
const foodController = controllers.foodController;

module.exports = [
    //day
    {type: 'get',              path: '/day',               method: dayController.getAll},

    //food
    {type: 'get',              path: '/food',              method: foodController.getAll}
];