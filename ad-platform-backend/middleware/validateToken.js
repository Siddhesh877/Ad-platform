const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) => {
    
    try{
        let token;
        const header = req.headers.authorization || req.headers.Authorization;
        console.log(header);
        if (header && header.startsWith('Bearer')) {
            token = header.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Access denied' });
            }
            console.log(token);
        }
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.userId = decoded.id; //since we are using the same token for both business and viewer
        next();
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
    
}

module.exports = validateToken;