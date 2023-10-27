import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Professor = sequelize.define('professor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    timestamps: false,
    tableName: "professores",
});

