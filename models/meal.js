'use strict';

module.exports = function(sequelize, DataTypes) {
    let Meal = sequelize.define('meals', {
        freezeTableName: true,
        id: {
            primaryKey:   true,
            type:         DataTypes.NUMBER,
            autoIncrement: true
        },
        weight: {
            type: DataTypes.NUMBER
        }
    });

    Meal.associate = function (models) {
        Meal.belongsTo(models.days, { onDelete: 'CASCADE', foreignKey: 'day_id' });
        Meal.belongsTo(models.foods, { onDelete: 'CASCADE', foreignKey: 'food_id' });
    };
};