const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const { DB_HOST, DB_PORT, DB_PASSWORD, DB_NAME, DB_USER, DB_DIALECT, CA} = process.env

const koneksi = new Sequelize( DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    dialectModule: require('mysql2'),
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, '..', 'cert.pem'))
      }
  },
})

module.exports = koneksi