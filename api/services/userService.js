'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const userModel      = models.users;
const log            = require('../../logging');

class UserService {
    constructor() {}

    async create(user) {
        log.debug(`Service user, method: create`);
        return userModel.create(user).catch(err => {
            log.error(`Service user, method: create, error: ${err}`);
        });
    }
}

module.exports = new UserService();