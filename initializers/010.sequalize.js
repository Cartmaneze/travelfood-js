'use strict';

const ServiceLocator = require('../serviceLocator');
const Sequelize      = require('sequelize');
const path           = require('path');

module.exports = function () {
    let dir = path.dirname(__dirname).split('\\').join('/');
    dir += '/db/travelFood.sqlite';
    Sequelize.Promise.config({longStackTraces: true});
    let sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dir,
        define: {
            timestamps: false
        }
    });

    function connect(authenticate) {
        return authenticate.call(sequelize)
            .then(() => {
                console.log('Database connected');
            })
            .catch((err) => {
                console.log(`Database connection failed. Error: ${err}.`);
            });
    }

    ServiceLocator.initSequelizeInstance(sequelize);
    return connect(sequelize.authenticate)
        .then(function () {
            console.log('Connection to database has been established successfully');
        });
};
