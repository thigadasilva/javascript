const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cargo = sequelize.define("Cargo", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salarioBase: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Cargo;
