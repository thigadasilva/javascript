const { Cargo, Funcionario } = require('../models');

exports.listar= async (req,res) =>{
    const funcionarios = await Funcionario.findAll({
        include: {
            model: Cargo,
            as: "cargo",
            attributes:["nome"]
        }
    })

    const resultado = funcionarios.map( f=>({
        id: f.id,
        nome:f.nome,
        email:f.email,
        cargo:f.cargo.nome,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt
    }))

    res.json(resultado)
}

exports.buscarPorId = async (req,res) =>{
    const { id }= req.params
    const funcionario = await Funcionario.findByPk(id,{
        include: {
            model: Cargo,
            as: "cargo",
            attributes:["nome"]
        }
    })
    
    if(!funcionario) return res.status(404).json({erro: "Funcionário não encontrado"});

    const resultado = {
        id: funcionario.id,
        nome: funcionario.nome,
        email: funcionario.email,
        cargo: funcionario.cargo.nome,
        createdAt: funcionario.createdAt,
        updatedAt: funcionario.updatedAt
    }

    res.json(resultado)
}

exports.criar = async (req,res)=>{
    try{
        const { nome, email, cargoId} = req.body

        if(!nome || !email || !cargoId) return res.status(400).json({erro: "Preencha com os campos Obrigatorios"});

        const cargo = await Cargo.findByPk(cargoId);

        if(!cargo) return res.status(400).json({erro:"Cargo informado não existe"});

        const funcionario = await Funcionario.create({nome,email,cargoId})

        res.status(201).json(funcionario)
    } catch(err){
        console.error(err);
        res.status(500).json({erro:"Erro ao criar funcionário, tente novamente."})
    }
}

exports.atualizar = async (req,res)=>{
    const funcionario = await Funcionario.findByPk(req.params.id)

    if(!funcionario) return res.status(404).json({erro:"Funcionario não encontrado"});

    await funcionario.update(req.body)
    res.json(funcionario)
}

exports.remover = async (req,res)=>{
    const {id} = req.params
    const funcionario = await Funcionario.findByPk(id)
    if(!funcionario) return res.status(404).json({erro:"Funcionario não encontrado"});
    await funcionario.destroy()
    res.sendStatus(204)
}