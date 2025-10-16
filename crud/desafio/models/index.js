const Funcionario = require('../models/funcionario')
const Cargos = require('../models/cargos')

Cargos.hasMany(Funcionario)
Funcionario.belongsTo(Cargos)

module.exports = {Cargos, Funcionario}