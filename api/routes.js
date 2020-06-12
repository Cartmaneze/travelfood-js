'use strict';

const controllers       = require('./controllers');
const dayController     = controllers.dayController;
const foodController    = controllers.foodController;
const mealController    = controllers.mealController;
const userController    = controllers.userController;
const journeyController = controllers.journeyController;

module.exports = [
    //user
    {type: 'post',             path: '/login',             method: userController.login},
    {type: 'post',             path: '/register',          method: userController.register},
    {type: 'get',              path: '/logout',            method: userController.logout},

    //journey
    {type: 'get',              path: '/journey',           method: journeyController.getAll},
    {type: 'post',             path: '/journey',           method: journeyController.create},
    {type: 'delete',           path: '/journey/:id',       method: journeyController.delete},

    //day
    {type: 'get',              path: '/day',               method: dayController.getAll},
    {type: 'post',             path: '/day',               method: dayController.create},
    {type: 'delete',           path: '/day/:id',           method: dayController.delete},

    //food
    {type: 'get',              path: '/food',              method: foodController.getAll},
    {type: 'get',              path: '/food/:id',          method: foodController.get},
    {type: 'post',             path: '/food',              method: foodController.create},
    {type: 'put',              path: '/food/:id',          method: foodController.update},
    {type: 'delete',           path: '/food/:id',          method: foodController.delete},

    //meal
    {type: 'get',              path: '/meal',              method: mealController.getAll},
    {type: 'get',              path: '/meal/:id',          method: mealController.get},
    {type: 'post',             path: '/meal',              method: mealController.create},
    {type: 'put',              path: '/meal/:id',          method: mealController.update},
    {type: 'delete',           path: '/meal/:id',          method: mealController.delete},
];