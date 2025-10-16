const {Cargos, Funcionario} = require('../models')

exports.listar = async(req, res) =>{
    const funcionarios = await Funcionario.findAll({
        include:{
            model: Cargos,
            attributes: ['nome']
        }
    })
    res.json(funcionarios)
}

// get unitario

exports.buscarPorId = async (req, res) =>{
    const funcionario = await Funcionario.findByPk(req.params.id, {
        include: {model: Cargos,
            attributes: ['nome']
        }
    })
    if(funcionario) res.json(funcionario)
    else res.status(404).json({erro:"Funcionário não encontrado."})
}

// post 

exports.criar = async(req,res) => {
    const{nome, salario, CargoId} = req.body

    if (!CargoId) {
        return res.status(400).json({ erro: "O campo 'CargoId' é obrigatório." });
    }

    try{
    const novo = await Funcionario.create({nome, salario, CargoId})
    res.status(201).json(novo)
} catch (error){
     res.status(500).json({ erro: error.message });
}
}

// put 

exports.atualizar = async(req, res)=>{
    const funcionario = await Funcionario.findByPk(req.params.id)
    if(!funcionario) return res.status(404).json({erro:"Funcionário não encontrado."})

    await funcionario.update(req.body)
    res.json(funcionario)
}

// delete unitário

exports.deletar = async(req, res)=>{
    const funcionario = await Funcionario.findByPk(req.params.id)
    if(!funcionario) return res.status(404).json({erro: "Funcionário não encontrado"})
    await funcionario.destroy();
    res.sendStatus(200);
}

// delete geral

exports.deletarTudo = async(req, res)=>{
    const funcionarios = await Funcionario.findAll()
    await funcionarios.destroy()
    res.sendStatus(200)
}

