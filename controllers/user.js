// Importation des packages, du model et du password
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const User      = require('../models/User');
const pass      = require('../passwords');

// RAPPEL des différentes méthodes utilisés pour la base de données MongoDb
// ( save )         permet de sauvegarder dans la base de données
// ( findOne )      permet de chercher un objet dans la base de données

exports.signup = (req, res) => {
    // On utilse bcrypt pour le hachage du mot de passe, pour plus d'info (ctrl + clic) le lien en dessous
    // https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466506-creez-des-utilisateurs#/id/r-6466496
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
            email: req.body.email,
            password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            }
            // Nous utilisons la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                } else {
                    res.status(200).json({
                        userId: user._id,
                        // Fonction sign() permet de chiffrer un nouveau token
                        token: jwt.sign(
                            { userId: user._id },
                            pass.token,
                            { expiresIn: '24h' })
                    });
                }  
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};