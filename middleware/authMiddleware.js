const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    if(authHeader.split("")[0] !== "Bearer" || !authHeader.split(" ")[1]){
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    const token = authHeader.split(" ")[1];

    const decoded =jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({
            error: "Invalid or expired token"
        });   
    }
    req.user = decoded;

    next();
};