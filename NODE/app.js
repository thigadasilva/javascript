const express = require('express')
const sequelize = require('./config/database')
const rotasProduto = require('./routes/produtoRoutes')
const rotasView = require('./routes/viewRoutes')
const rotasAuth = require('./routes/authRoutes')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())

app.set('view engine', 'ejs')

app.use(cors())
app.use('/produtos', rotasProduto)
app.use('/auth', rotasAuth)
app.use('/', rotasView)


sequelize.sync().then(()=>{
    console.log('Banco de dados sincronizado');
    app.listen(port,()=>{console.log('Servidor rodando em http://127.0.0.1:'+port)})
})