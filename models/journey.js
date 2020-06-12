'use strict';

module.exports = function(sequelize, DataTypes) {
    let Jorney = sequelize.define('journeys', {
        freezeTableName: true,
        id: {
            primaryKey:   true,
            type:         DataTypes.NUMBER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    });

    Jorney.associate = function (models) {
        Jorney.belongsTo(models.users, { onDelete: 'CASCADE', foreignKey: 'user_id' });
        Jorney.hasMany(models.days, { onDelete: 'CASCADE', foreignKey: 'journey_id', hooks: true, constraints: true });
    };
};
