'use strict';

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('users', {
        freezeTableName: true,
        id: {
            primaryKey:   true,
            type:         DataTypes.NUMBER
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