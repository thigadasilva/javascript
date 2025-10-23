const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Funcionario = sequelize.define("Funcionario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Funcionario;
