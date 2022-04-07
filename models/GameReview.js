const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class GameReview extends Model {}

GameReview.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        
    }
)