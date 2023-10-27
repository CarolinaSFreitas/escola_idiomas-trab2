import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';
import { Professor } from '../models/Professor.js';

export const Curso = sequelize.define('curso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alunos_matriculados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
}, {
    timestamps: false,
    tableName: "curso",
});

//rel curso e prof
Curso.belongsTo(Professor, {
    foreignKey: 'professor_id',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});

Professor.hasMany(Curso, {
    foreignKey: 'professor_id',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });


