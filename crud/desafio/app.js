const express = require('express')
const app = express()
const sequelize = require('./config/database')
const rotasFuncionarios = require('./routes/rotasFuncionario')
const rotasCargos = require('./routes/rotasCargos')
const port = 3000

app.use(express.json())

app.use('/funcionarios', rotasFuncionarios)
app.use('/cargos', rotasCargos)

sequelize.sync().then(()=>{
    console.log('Banco de dados sincronizado')
    app.listen(port, ()=>{console.log('Servidor rodando em http:127.0.0.1:'+port)})
})