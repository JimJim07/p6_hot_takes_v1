// Importation du package, du controllers et des middleware
const express   = require('express');
const sauceCtrl = require('../controllers/sauce');
const auth      = require('../middleware/auth');
const multer    = require('../middleware/multer-config');
// Création du router express
const router    = express.Router();

// CREATE SAUCE
router.post('/', auth, multer, sauceCtrl.createSauce);

// MODIFY SAUCE
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// DELETE ONE SAUCE
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);

// GET ONE SAUCE
router.get('/:id', auth, sauceCtrl.getOneSauce);

// GET ALL SAUCES
router.get('/', auth, sauceCtrl.getAllSauces);

// POST LIKE
router.post('/:id/like', auth, sauceCtrl.postLikeSauce);

// Exportation du router
module.exports = router;