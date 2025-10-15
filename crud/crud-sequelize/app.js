const express = require('express')
const sequelize = require('./config/database')
const rotasProduto = require('./routes/produtoRoutes')
const app = express()
const port = 3000

app.use(express.json())

app.use('/produtos', rotasProduto)

sequelize.sync().then(()=>{
    console.log('Banco de dados sincronizado');
    app.listen(port,()=>{console.log('Servidor rodando em http://127.0.0.1:'+port)})
})