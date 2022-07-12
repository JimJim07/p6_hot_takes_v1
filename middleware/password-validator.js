// Importation du package 'password-validator'
var passwordValidator = require('password-validator');

// Création d'un passwordSchema
var passwordSchema = new passwordValidator();

// Ajouts de propriétés
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(25)                                   // Maximum length 25
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.has().not().symbols()                          // Should not have symbols
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next()
    } else {
        return res
        .status(400)
        .json({ error : 'Le mot de passe n\'est pas correct : ' + passwordSchema.validate(req.body.password, { list: true})})
    }
}

// Test de validation
// console.log(passwordSchema.validate('valid PASS=123', { list: true }));