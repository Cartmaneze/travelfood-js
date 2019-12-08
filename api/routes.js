'use strict';

const controllers    = require('./controllers');
const dayController  = controllers.dayController;
const foodController = controllers.foodController;
const userController = controllers.userController;

module.exports = [
    //day
    {type: 'get',              path: '/day',               method: dayController.getAll},

    //food
    {type: 'get',              path: '/food',              method: foodController.getAll},
    {type: 'post',             path: '/food',              method: foodController.create},

    //user
    {type: 'post',             path: '/user',              method: userController.create}
];