'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const models         = ServiceLocator.Models;
const userModel      = models.users;

class UserService {
    constructor() {}

}

module.exports = new UserService();