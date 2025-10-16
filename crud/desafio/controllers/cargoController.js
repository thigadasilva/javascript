const {Cargos, Funcionario} = require('../models')

// get todos os funcionarios do cargo

exports.listarFuncionarios = async(req, res) =>{
    try{
        const cargo = await Cargos.findByPk(req.params.CargoId)
        if(!cargo){
            return res.status(404).send('Cargo não encontrado.')
        }
        const funcionarios = await cargo.getFuncionarios()
        res.json(funcionarios)
    } catch(error){
        res.status(500).send(error.message)
    }
}

// get todos os cargos existentes

exports.listarCargos = async(req, res) => {
        const cargos = await Cargos.findAll()
        res.json(cargos)
}

// post

exports.criarCargo = async(req, res) =>{
    const {nome} = req.body
    try{
        const novo = await Cargos.create({nome})
        res.status(201).json(novo)
    } catch(error){
        res.status(500).json({ erro: error.message });
    }
}

// put 

exports.atualizar = async(req, res)=>{
    const cargo = await Cargos.findByPk(req.params.id)
    if(!cargo) return res.status(404).json({erro:"Cargo não encontrado."})

    await cargo.update(req.body)
    res.json(cargo)
}

// delete unitário

exports.deletar = async(req, res)=>{
    const cargo = await Cargos.findByPk(req.params.id)
    if(!cargo) return res.status(404).json({erro: "Cargo não encontrado"})
    await cargo.destroy();
    res.sendStatus(200);
}

// delete geral

exports.deletarTudo = async(req, res)=>{
    const cargo = await Cargos.findAll()
    await cargo.destroy()
    res.sendStatus(200)
}
