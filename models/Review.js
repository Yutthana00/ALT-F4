const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Review extends Model {}

Review.init(
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
        user_name: {
            

        }
    }
)