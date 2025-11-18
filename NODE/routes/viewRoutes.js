const express = require('express')
const router = express.Router()
const viewController = require('../controllers/viewController')

router.get('/', viewController.listar);

module.exports = router;