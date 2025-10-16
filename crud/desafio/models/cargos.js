const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Cargos = sequelize.define('Cargos',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Cargos