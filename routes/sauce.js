const express   = require('express');
const router    = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth      = require('../middleware/auth');

// ADD SAUCE IN CONSOLE.LOG
router.post('/', auth, sauceCtrl.createSauceLog);

// ADD SAUCE IN MONGODB
// router.post('/', auth, sauceCtrl.createSauce);

// MODIFY SAUCE
router.put('/:id', auth, sauceCtrl.modifySauce);

// DELETE ONE SAUCE
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);

// GET ONE SAUCE
router.get('/:id', auth, sauceCtrl.getOneSauce);

// GET ALL SAUCES
// router.get('/', auth, sauceCtrl.getAllSauces);

// GET ALL SAUCES TEST
router.get('/', auth, sauceCtrl.getAllSaucesTest);

module.exports = router;