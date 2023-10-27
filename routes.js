import { Router } from "express"

import { cursoIndex, cursoCreate } from "./controllers/cursoController.js"

import { matriculasIndex, matriculasCreate, matriculasDelete } from "./controllers/matriculaController.js"

const router = Router()

// --------------------------------------------------------- ROTAS DE CURSOS
router.get("/cursos", cursoIndex) //rota pra listagem
      .post("/cursos", cursoCreate) //rota pra criação de registro



 // --------------------------------------------------------- ROTAS DE MATRICULAS
router.get("/matriculas", matriculasIndex) //rota pra listagem matriculas
      .post("/matriculas", matriculasCreate) //rota pra criação de registro
      .delete("/matriculas/:id", matriculasDelete)
export default router