'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const userModel      = models.users;

class UserService {
    constructor() {}

    async create(food) {
        return userModel.create(food).catch(err => {
            console.log(err);
        });
    }
}

module.exports = new UserService();