'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const userModel      = models.users;
const log            = require('../../logging');

class UserService {
    constructor() {}

    async create(user) {
        log.debug(`Service user, method: create`);
        const services = ServiceLocator.Services;
        const journeyService = services.journeyService;
        
        try {
            const createdUser = await userModel.create(user)
            if (createdUser) {
                journeyService.create({
                    name: "new journey",
                    user_id: createdUser.id
                });
                return createdUser;
            }
        } catch (err) {
            log.error(`Service user, method: create, error: ${err}`);
        }
    }
}

module.exports = new UserService();