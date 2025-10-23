const express = require("express")
const router = express.Router();
const cargoController = require("../controllers/cargoController")

router.get("/", cargoController.listar);
router.get("/:id",cargoController.buscarPorId);
router.post("/",cargoController.criar);
router.put("/:id",cargoController.atualizar);
router.delete("/:id",cargoController.remover);

module.exports = router