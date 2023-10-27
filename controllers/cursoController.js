import { sequelize } from "../database/conecta.js"
import { Curso } from "../models/Curso.js"
import { Professor } from "../models/Professor.js"

//função de get - vai listar os cursos
export async function cursoIndex(req, res) {
    try {
        const cursos = await Curso.findAll({
            include: {
                model: Professor,
                attributes: ['nome']
            }
        })
        res.status(200).json(cursos)
    } catch (error) {
        res.status(400).send(error)
    }
}

// função de create - vai criar um novo registro no insomnia
export async function cursoCreate(req, res) {
    const { nome, alunos_matriculados, professor_id } = req.body

    if (!nome || !alunos_matriculados || !professor_id) {
        res.status(400).json("Erro... Informe os dados corretamente.")
        return
    }

    try {
        const curso = await Curso.create({
            nome, alunos_matriculados, professor_id
        })
        res.status(201).json(curso)
    } catch (error) {
        res.status(400).send(error)
    }
}


