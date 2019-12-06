'use strict';

const ServiceLocator = require('../../serviceLocator.js');
const services       = ServiceLocator.Services;
const userService    = services.userService;

class UserController {
    constructor() {}

}

module.exports = new UserController();