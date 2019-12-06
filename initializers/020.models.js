'use strict';

const ServiceLocator = require('../serviceLocator');
const Models   = require('../models');

module.exports = function() {
    let sequelize = ServiceLocator.sequelizeInstance;
    let initializedModels = {};

    Models.forEach(file => {
        sequelize.import(file);
    });

    let keys = Object.keys(sequelize.models);

    for (let key of keys) {
        initializedModels[key] = sequelize.models[key];
    }

    Object.keys(initializedModels)
        .forEach(modelName => {
            if ('associate' in initializedModels[modelName]) {
                initializedModels[modelName].associate(initializedModels);
            }
            if ('initialize' in initializedModels[modelName]) {
                initializedModels[modelName].initialize();
            }
        });

    ServiceLocator.initModels(sequelize.models);
};