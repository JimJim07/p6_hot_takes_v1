// Importation des packages
const express     = require('express');
const mongoose    = require('mongoose');
const path        = require('path');

// Importation des routes
const userRoutes  = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Création de l'application express    
const app = express();

// Importation du password pour MongoDB
const pass        = require('./passwords');
// Connexion MongoDB
mongoose.connect( pass.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
   
// Erreurs de CORS
app.use((req, res, next) => {
    // Permet d'accéder à notre API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Permet d'accéder au corps de la requête ou bodyparser plus ancien
app.use(express.json());

// Les routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// Exportation de l'application express
module.exports = app;