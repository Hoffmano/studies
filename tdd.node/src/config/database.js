const Sequelize = require('sequelize')

const sequelize = new Sequelize('hoaxify', 'hoaxify', 'hoaxify', {
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
})

module.exports = sequelize
