const sequelize = require('sequelize')
const Sequelize = require('sequelize')
const connection = new Sequelize('guiapress', 'root', 'root', {
    host: 'localhost', 
    port: 8889,
    dialect: 'mysql'
})

module.exports = connection