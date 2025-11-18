const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./produtos.db',
    logging:true
})

module.exports = sequelize;