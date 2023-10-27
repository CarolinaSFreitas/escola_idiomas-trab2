import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Aluno = sequelize.define('aluno', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matricula: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nome_curso: { 
        type: DataTypes.STRING,
}, 
}, {
    timestamps: false  
});



