import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';
import { Aluno } from './Aluno.js';
import { Curso } from './Curso.js';

export const Matricula = sequelize.define('matricula', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  matricula: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
    timestamps: false,
    tableName: "matricula",
});

//relacionamento com aluno
Matricula.belongsTo(Aluno, {
    foreignKey: 'aluno_id', 
    onDelete: 'CASCADE',
  });

Matricula.belongsTo(Curso, {
    foreignKey: 'curso_id',
    onDelete: 'CASCADE',
  });