const Produto = require('../models/produto')

exports.listar = async (req,res)=>{
    try{
        const produtos = await Produto.findAll();
        res.render('lista', { produtos })
    } catch (err){
        res.status(500).send('Erro ao carregar a pagina!')
        console.error(err)
    }
}