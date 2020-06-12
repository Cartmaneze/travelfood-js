'use strict';

module.exports = function(sequelize, DataTypes) {
    let Food = sequelize.define('foods', {
        freezeTableName: true,
        id: {
            primaryKey:    true,
            type:          DataTypes.NUMBER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        calories: {
            type: DataTypes.NUMBER
        }
    });

    Food.associate = function (models) {
        Food.belongsTo(models.users);
        Food.hasMany(models.meals);
    };
};