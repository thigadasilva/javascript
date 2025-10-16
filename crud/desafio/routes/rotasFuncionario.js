const express = require('express')
const router = express.Router()
const controller = require('../controllers/funcionarioController')

router.get('/', controller.listar)
router.get('/:id', controller.buscarPorId)
router.post('/', controller.criar)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)
router.delete('/', controller.deletarTudo)

module.exports = router