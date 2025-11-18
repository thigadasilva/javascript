const express = require('express')
const router = express.Router()
const controller = require('../controllers/produtoController')
const authMiddleware = require("../middlewares/authMiddleware")

router.get('/', authMiddleware ,controller.listar)
router.get('/:id',  authMiddleware ,controller.buscarPorId)
router.post('/',  authMiddleware ,controller.criar)
router.put('/:id',  authMiddleware ,controller.atuaizar)
router.delete('/:id',  authMiddleware ,controller.deletar)

module.exports = router;