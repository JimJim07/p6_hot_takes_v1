// Importation du package 'express'
const express   = require('express');
// Création du router express
const router    = express.Router();

// Importation du controllers
const userCtrl  = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du router
module.exports = router;