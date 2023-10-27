import { sequelize } from "../database/conecta.js"
import { Aluno } from "../models/Aluno.js"
import { Curso } from "../models/Curso.js"
import { Matricula } from "../models/Matricula.js"

//função de get - vai listar os cursos
export async function matriculasIndex(req, res) {
    try {
        const matriculas = await Matricula.findAll({
            include: [
                {
                  model: Aluno,
                  attributes: ['nome'],
                },
                {
                  model: Curso,
                  attributes: ['nome'],
                },
              ],
        });
        res.status(200).json(matriculas);
    } catch (error) {
        res.status(400).send(error);
    }
}

//criar matricula
export async function matriculasCreate(req, res) {
    const { matricula, aluno_id, curso_id } = req.body;
  
    if (!matricula || !aluno_id || !curso_id) {
      return res.status(400).json({ error: "Informe a matrícula, o ID do aluno e o ID do curso." });
    }
    const t = await sequelize.transaction();
  
    try {
      const matriculas = await Matricula.create(
        {
          matricula,
          aluno_id,
          curso_id,
        },
        { transaction: t }
      );
  
      const curso = await Curso.findByPk(curso_id, { transaction: t });
      if (curso) {
        curso.alunos_matriculados++;
        await curso.save({ transaction: t });
      }
  
      await t.commit();
  
      return res.status(200).json(matriculas);
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: "Erro ao criar a matrícula." });
    }
  }


//deletar matricula
export async function matriculasDelete(req, res) {
    const matriculaId = req.params.id;
  
    try {
      const t = await sequelize.transaction();
  
      const deletedMatricula = await Matricula.destroy({
        where: {
          id: matriculaId,
        },
        transaction: t,
      });
  
      if (deletedMatricula) {
        const matricula = await Matricula.findByPk(matriculaId, { transaction: t });
  
        if (matricula) {
          const cursoId = matricula.curso_id;
  
          const curso = await Curso.findByPk(cursoId, { transaction: t });
  
          if (curso) {
 
            curso.alunos_matriculados -= 1;
            await curso.save({ transaction: t });
          }
        }
        await t.commit();
  
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Matrícula não encontrada.' });
      }
    } catch (error) {
      await t.rollback();
      res.status(400).json({ error: 'Erro ao excluir a matrícula.' });
    }
  }