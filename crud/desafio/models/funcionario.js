const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Funcionario = sequelize.define('Funcionario',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salario: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = Funcionario