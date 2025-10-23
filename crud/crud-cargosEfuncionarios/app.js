const express = require("express")
const sequelize = require("./config/database")
const cargoRoutes = require("./routes/cargoRoutes")
const funcionarioRoutes = require("./routes/funcionariosRoutes")
const rotasView = require('./routes/viewRoutes')

const app = express()
const porta = 3000

app.use(express.json())

app.set('view engine', 'ejs')

app.use("/cargos", cargoRoutes)
app.use("/funcionarios", funcionarioRoutes)
app.use("/", rotasView)

sequelize.sync().then(() =>{
    console.log("Banco sincronizado!")
    app.listen(porta, ()=>{
        console.log("Servidor rodando em http://localhost:"+porta)
    })
})