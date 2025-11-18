const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Usuario = require("../models/Usuario")

//dotenv - Criar variaveis de ambiente
const SECRET = "segredo_super_forte";
const SALT_ROUNDS = 10;

exports.login = async (req,res) =>{
    const { login, senha }=req.body;

    if(!login || !senha){
        return res.status(400).json({ erro: "Login e senha são obrigatórios."})
    }

    try{
        const usuario = await Usuario.findOne({ where:{login}})
        if(!usuario) res.status(401).json({erro:"Usuário ou senha inválidos."});

        const senhaCorreto = await bcrypt.compare(senha, usuario.senha);

        if(!senhaCorreto) res.status(401).json({erro:"Usuário ou senha inválidos."});

        const token = jwt.sign({ id: usuario.id, login: usuario.login }, SECRET, { expiresIn: "2h" })

        res.json({ token })
    }catch (err){
        console.error(err)
        res.status(500).json({ erro:"Erro ao autenticar usuário."})
    }
}

exports.cadastrar = async (req,res) =>{
    const { login, senha}= req.body

    if(!login || !senha){
        return res.status(400).json({ erro: "Login e senha são obrigatórios."})
    }

    try {
        const existente = await Usuario.findOne({ where:{ login }})

        if(existente) res.status(400).json({ erro:"Login já está em uso."});

        const senhaCriptografada = await bcrypt.hash(senha, SALT_ROUNDS);

        const novo = await Usuario.create({login, senha: senhaCriptografada});

        res.status(201).json({
            mensagem: "Usuário criado com sucesso.",
            usuario:{ id:novo.id, login: novo.login}
        })
    } catch (error) {
        console.error(err)
        res.status(500).json({ erro:"Erro ao criar usuário."})
    }
}