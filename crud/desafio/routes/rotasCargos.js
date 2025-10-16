const express = require('express')
const router = express.Router()
const controller = require('../controllers/cargoController')

router.get('/:CargoId/funcionarios', controller.listarFuncionarios)
router.get('/', controller.listarCargos)
router.post('/', controller.criarCargo)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)
router.delete('/', controller.deletarTudo)

module.exports = router