const express = require('express')
const router = express.Router()
const controller = require('../controllers/produtoController')

router.get('/', controller.listar)
router.get('/:id', controller.buscarPorId)
router.post('/', controller.criar)
router.put('/:id', controller.atuaizar)
router.delete('/:id', controller.deletar)

module.exports = router;