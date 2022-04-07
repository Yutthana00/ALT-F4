const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagelink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'game'
    }
)
