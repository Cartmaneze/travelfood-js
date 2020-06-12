'use strict';

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('users', {
        id: {
            primaryKey:   true,
            type:         DataTypes.NUMBER,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });

    User.associate = function (models) {
        User.hasMany(models.journeys);
    };
};