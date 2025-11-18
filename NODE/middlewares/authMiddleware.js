const jwt = require("jsonwebtoken")

//dotenv
const SECRET = "segredo_super_forte";

module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader) res.status(401).json({erro:"Token não fornecido."});

    const token = authHeader.split(" ")[1];
    // Bearer "uhdasiy97890ohlsahdspoyu"

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({erro: "Token inválido ou expirado."})
    }
}