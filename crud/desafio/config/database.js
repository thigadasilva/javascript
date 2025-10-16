const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'../empresa.db',
    logging: true
})

module.exports = sequelize