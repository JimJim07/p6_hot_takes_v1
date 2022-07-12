// Importation du package 'jsonwebtoken'
const jwt  = require('jsonwebtoken');
// Importation du password pour le token
const pass = require('../passwords');

// Exportation du module
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, pass.token);
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};