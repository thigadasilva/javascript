const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express()
const port = 3000

app.use(express.json())

//Conexão com banco SQLITE (arquivo produtos.db)
const db = new sqlite3.Database('produtos.db')

// Criar tabelas, se não existir
db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS produtos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL
        )`)
})

app.get("/",(req,res)=>{
    res.send("Hello Word!!!")
})

app.get("/produtos",(req,res)=>{
    db.all('SELECT * FROM produtos', (err,rows)=>{
        if(err) return res.status(500).json({erro:err.message});
        res.json(rows)
    })
})

app.get("/produtos/:id", (req,res)=>{
    const { id } = req.params
    const produto = produtos.find((p)=>p.id ===parseInt(id));
    if(!produto){
        return res.status(404).json({ erro:"Produto não encontrado."})
    }
    res.json(produto)
})

app.post("/produtos",(req,res)=>{
    const { nome, preco } = req.body
    if(!nome || !preco){
        return res.status(400).json({erro:"Nome e preço são obrigatórios"})
    }
    db.run('INSERT INTO produtos (nome,preco) VALUES (?,?)',[nome,preco], function (err){
        if(err) return res.status(500).json({erro:err.message});
        res.status(201).json({id:this.lastID, nome,preco})
    })
})

app.put("/produtos/:id",(req,res)=>{
    const {id} = req.params
    const {nome,preco} = req.body
    const produto = produtos.find((p)=>p.id ===parseInt(id));
    if(!produto){
        return res.status(404).json({ erro:"Produto não encontrado."})
    }
    if(!nome || !preco){
        return res.status(400).json({ erro:"Nome e Preço são obrigatorios!"})
    }
    produto.nome=nome;
    produto.preco=preco;
    res.json(produto);
})

app.delete("/produtos",(req,res)=>{
    produtos.splice(0,produtos.length);
    res.sendStatus(200);
})

app.delete("/produtos/:id",(req,res)=>{
    const{id}=req.params

    const index = produtos.findIndex((p)=> p.id === parseInt(id))

    if(index === -1){
        return res.status(404).json({ erro:"Produto não encontrado."})
    }

    const produtoRemovido = produtos.splice(index,1);
    res.json(produtoRemovido[0])
})

app.patch("/produtos/:porcentagem",(req,res)=>{
    const {porcentagem}=req.params
    const desconto = parseFloat(porcentagem)

    if(isNaN(desconto) || desconto<0 || desconto>100){
        return res.status(400).json({ erro:"Informe uma porcentagem valida entre 0 e 100."})
    }

    produtos = produtos.map((produto)=>({
        ...produto,
        preco:parseFloat((produto.preco*(1-desconto/100)).toFixed(2))
    }))

    res.json({
        mensagem: "Desconto de "+desconto+"% aplicado com sucesso",
        produtos
    })

})

app.listen(port,()=>{
    console.log("Servidor rodando em http://127.0.0.1:"+port)
})