const verifyAdmin = (req, res, next) => { 
    
    try {
        if(req.role !== "admin") {
            return res.status(403).send({message: "Forbidden: You do not have permission to access this resource"});
        }
        next(); 
    } catch (error) {
        res
        .status(500)
        .send({message: "Server Error"});
    }
}

module.exports = verifyAdmin;