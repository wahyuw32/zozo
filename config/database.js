const { Sequelize } = require('sequelize')
require('dotenv').config()

const { DB_HOST, DB_PORT, DB_PASSWORD, DB_NAME, DB_USER, DB_DIALECT, CA} = process.env

const koneksi = new Sequelize( DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    dialectModule: require('mysql2'),
    dialectOptions: {
      ssl: {
        ca: CA
      }
  },
})

module.exports = koneksi