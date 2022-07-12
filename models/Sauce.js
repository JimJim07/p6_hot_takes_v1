// Importation du package 'mongoose'
const mongoose = require('mongoose');

// Création du schéma pour la base de données MongoDB
const sauceSchema = mongoose.Schema({
    userId:         { type: String, required: true },
    name:           { type: String, required: true },
    manufacturer:   { type: String, required: true },
    description:    { type: String, required: true },
    mainPepper:     { type: String, required: true },
    imageUrl:       { type: String, required: true },
    heat:           { type: Number, required: true },
    likes:          { type: Number, required: true },
    dislikes:       { type: Number, required: true },
    usersLiked:     { type: Array, required: true },
    usersDisliked:  { type: Array, required: true }
});

// Exportation du schéma
module.exports = mongoose.model('Sauce', sauceSchema);