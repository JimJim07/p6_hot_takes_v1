// Importation des packages
const mongoose          = require('mongoose');
const uniqueValidator   = require('mongoose-unique-validator');

// Création du schéma pour la base de données MongoDB
const userSchema = mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

// Exportation du schéma
module.exports = mongoose.model('User', userSchema);