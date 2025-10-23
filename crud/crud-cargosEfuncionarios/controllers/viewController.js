const { Cargo, Funcionario } = require('../models');

exports.tabelas = async (req, res) => {
  const cargos = await Cargo.findAll({
    include: { model: Funcionario, as: 'funcionarios' }
  });

  const funcionarios = await Funcionario.findAll({
    include: { model: Cargo, as: 'cargo' }
  });

  res.render('lista', { cargos, funcionarios });
};

exports.options = async (req, res) => {
  const cargos = await Cargo.findAll();
  res.render('lista', { cargos });
};
