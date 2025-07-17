const { Datatype, DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      name: {
        type: DataTypes.STRING,
        allowNull: false
    },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
  tableName: 'product',
  timestamps: false,
  freezeTableName: true  
})

module.exports = Product