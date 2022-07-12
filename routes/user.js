// Importation du package, du middleware et du controllers
const express           = require('express');
const passwordValidator = require('../middleware/password-validator')
const userCtrl          = require('../controllers/user');
// Création du router express
const router    = express.Router();

// SIGNUP USER
router.post('/signup', passwordValidator, userCtrl.signup);
// LOGIN USER
router.post('/login', userCtrl.login);

// Exportation du router
module.exports = router;