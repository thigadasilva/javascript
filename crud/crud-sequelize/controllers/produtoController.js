const Produto = require('../models/produto')

// GET /produtos
exports.listar = async (req,res) =>{
    const produtos = await Produto.findAll();
    res.json(produtos);
}

// GET /produtos/:id
exports.buscarPorId = async (req,res) =>{
    const produto = await Produto.findByPk(req.params.id);
    if(produto) res.json(produto)
    else res.status(404).json({erro:"Produto não encontrado."})
}

// POST /produtos
exports.criar = async (req,res) =>{
    const { nome, preco} = req.body;
    const novo = await Produto.create({nome,preco})
    res.status(201).json(novo)
}

// PUT /produtos/:id
exports.atualizar = async (req,res) =>{
    const produto = await Produto.findByPk(req.params.id);
    if(!produto) return res.status(404).json({erro:"Produto não encontrado!"});
    await produto.update(req.body);
    res.json(produto);
}

//DELETE /produtos/:id
exports.deletar = async (req,res) =>{
    const produto = await Produto.findByPk(req.params.id)
    if(!produto) return res.status(404).json({erro:"Produto não encontrado!"});
    await produto.destroy();
    res.sendStatus(200);

}
