'use strict';

const ServiceLocator = require('../serviceLocator');

module.exports = function() {
    const services = require('../api/services');
    ServiceLocator.initServices(services);
};