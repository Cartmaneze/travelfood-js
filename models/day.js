'use strict';

module.exports = function(sequelize, DataTypes) {
    let Day = sequelize.define('days', {
        freezeTableName: true,
        id: {
            primaryKey:   true,
            type:         DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        number: {
            type: DataTypes.STRING
        }
    });

    Day.associate = function (models) {
        Day.belongsTo(models.journeys, { onDelete: 'CASCADE', foreignKey: 'journey_id' });
        Day.hasMany(models.meals);
    };
};