const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next)=>{ 
    try {
        const token = req.cookies.token;
        
        if(!token) {
            return res.status(200).send({message: "Invalid Token"})
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded) {
            return res.status(200).send({message: "Invalid Token or Not Valid"})
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.error("Error While Veryifying Token", error);
        res.status(500).send({message: "Server Error"})
    }
}

module.exports = verifyToken;