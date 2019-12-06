'use strict';

let store = {};

/**
 * @module registry
 * @class ServiceLocator
 * @type {{
 *  initModels: Function,
 *  initServices: Function,
 *  initSocket: Function,
 *  initPolicies: Function,
 *  Models: {Models},
 *  Sequelize,
 *  Services,
 *  Socket}
 * }
 */
let ServiceLocator = {

    initModels(models) {
        store.models = models;
    },

    initServices(services) {
        store.services = services;
    },

    initSequelizeInstance(sequelizeInstance) {
        store.sequelizeInstance = sequelizeInstance;
    },

    get sequelizeInstance() {
        return store.sequelizeInstance;
    },

    get Models() {
        return store.models;
    },

    get Services() {
        return store.services;
    }
};

module.exports = ServiceLocator;

/**
 * @module registry
 * @class ServiceLocator
 * @type {{
 *  initModels: Function,
 *  initServices: Function,
 *  Models: {Models},
 *  Sequelize,
 *  Services}
 * }
 */
