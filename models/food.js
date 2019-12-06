'use strict';

module.exports = function(sequelize, DataTypes) {
    let Food = sequelize.define('foods', {
        freezeTableName: true,
        id: {
            primaryKey:   true,
            type:         DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING
        },
        calories: {
            type: DataTypes.NUMBER
        }
    });

    Food.associate = function (models) {
        Food.belongsTo(models.users, { onDelete: 'CASCADE', foreignKey: 'user_id' });
        Food.hasMany(models.meals);
    };
};