'use strict';

module.exports = function(sequelize, DataTypes) {
    let Day = sequelize.define('days', {
        freezeTableName: true,
        id: {
            primaryKey:   true,
            type:         DataTypes.NUMBER,
            autoIncrement: true
        },
        number: {
            type: DataTypes.STRING
        },
        order: {
            type: DataTypes.STRING
        }
    });

    Day.associate = function (models) {
        Day.belongsTo(models.journeys, { onDelete: 'CASCADE', foreignKey: 'journey_id', hooks: true, constraints: true });
        Day.hasMany(models.meals);
    };
};