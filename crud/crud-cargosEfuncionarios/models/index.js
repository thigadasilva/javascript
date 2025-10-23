const Cargo = require('./Cargo');
const Funcionario = require('./Funcionario');

Cargo.hasMany(Funcionario, {
  foreignKey: 'cargoId',
  as: 'funcionarios'
});

Funcionario.belongsTo(Cargo, {
  foreignKey: 'cargoId',
  as: 'cargo'
});

module.exports = {
  Cargo,
  Funcionario
};
